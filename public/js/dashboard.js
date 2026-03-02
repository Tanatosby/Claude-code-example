/* ═══════════════════════════════════════════════════════════
   INDUSTRIAL DASHBOARD — Client-side logic
   ═══════════════════════════════════════════════════════════ */

const socket = io();
let activeFilter = 'all';
let latestData = null;

// Trend history: { machineId: { tagName: [values] } }
const HISTORY_LEN = 30;
const trendHistory = {};
const charts = {}; // Chart.js instances per machine

// ── Connection status ────────────────────────────────────────
const connDot   = document.getElementById('connDot');
const connLabel = document.getElementById('connLabel');

socket.on('connect', () => {
  connDot.classList.add('online');
  connLabel.textContent = 'En línea';
});
socket.on('disconnect', () => {
  connDot.classList.remove('online');
  connLabel.textContent = 'Sin conexión';
});

// ── Data handler ─────────────────────────────────────────────
socket.on('data', (snapshot) => {
  latestData = snapshot;
  updateLastUpdate();
  updateSummary(snapshot);
  render(snapshot);
});

function updateLastUpdate() {
  const now = new Date();
  document.getElementById('lastUpdate').textContent =
    now.toLocaleTimeString('es-PE', { hour12: false });
}

function updateSummary(snapshot) {
  let normal = 0, warning = 0, alarm = 0, totalTags = 0;
  for (const m of Object.values(snapshot)) {
    if (m.status === 'normal')  normal++;
    else if (m.status === 'warning') warning++;
    else alarm++;
    for (const g of Object.values(m.groups))
      totalTags += Object.keys(g).length;
  }
  document.getElementById('sumNormal').textContent  = normal;
  document.getElementById('sumWarning').textContent = warning;
  document.getElementById('sumAlarm').textContent   = alarm;
  document.getElementById('sumTags').textContent    = totalTags;
}

// ── Render machines ──────────────────────────────────────────
function render(snapshot) {
  const container = document.getElementById('machineContainer');
  const machines = Object.entries(snapshot);

  for (const [machineId, machine] of machines) {
    // Update trend history
    if (!trendHistory[machineId]) trendHistory[machineId] = {};
    for (const tags of Object.values(machine.groups)) {
      for (const [tagName, tag] of Object.entries(tags)) {
        if (!trendHistory[machineId][tagName]) trendHistory[machineId][tagName] = [];
        trendHistory[machineId][tagName].push(tag.value);
        if (trendHistory[machineId][tagName].length > HISTORY_LEN)
          trendHistory[machineId][tagName].shift();
      }
    }

    const visible = activeFilter === 'all' || activeFilter === machineId;
    let section = document.getElementById(`section-${machineId}`);

    if (!section) {
      section = createMachineSection(machineId, machine);
      container.appendChild(section);
    }

    section.classList.toggle('hidden', !visible);
    if (!visible) continue;

    updateMachineSection(section, machineId, machine);
  }
}

// Build machine section DOM (first time)
function createMachineSection(machineId, machine) {
  const section = document.createElement('div');
  section.className = 'machine-section';
  section.id = `section-${machineId}`;

  section.innerHTML = `
    <div class="machine-header">
      <span class="machine-icon">${machine.icon}</span>
      <span class="machine-title" style="color:${machine.color}">${machine.label}</span>
      <span class="machine-status-badge ${machine.status}" id="badge-${machineId}">
        ${statusLabel(machine.status)}
      </span>
      <span class="machine-tag-count" id="tagcount-${machineId}"></span>
    </div>
    <div class="machine-groups" id="groups-${machineId}"></div>
    <div class="trend-section">
      <div class="group-label">📈 Tendencia en tiempo real</div>
      <div class="trend-chart-wrap">
        <canvas id="chart-${machineId}"></canvas>
      </div>
    </div>
  `;
  return section;
}

// Update machine section each tick
function updateMachineSection(section, machineId, machine) {
  // Status badge
  const badge = document.getElementById(`badge-${machineId}`);
  badge.className = `machine-status-badge ${machine.status}`;
  badge.textContent = statusLabel(machine.status);

  // Tag count
  let totalTags = 0;
  for (const g of Object.values(machine.groups)) totalTags += Object.keys(g).length;
  document.getElementById(`tagcount-${machineId}`).textContent = `${totalTags} tags`;

  // Groups & tag cards
  const groupsEl = document.getElementById(`groups-${machineId}`);
  for (const [groupName, tags] of Object.entries(machine.groups)) {
    let groupEl = groupsEl.querySelector(`[data-group="${CSS.escape(groupName)}"]`);
    if (!groupEl) {
      groupEl = document.createElement('div');
      groupEl.dataset.group = groupName;
      groupEl.innerHTML = `<div class="group-label">${groupName}</div><div class="tag-grid" id="grid-${machineId}-${safeId(groupName)}"></div>`;
      groupsEl.appendChild(groupEl);
    }

    const grid = document.getElementById(`grid-${machineId}-${safeId(groupName)}`);
    for (const [tagName, tag] of Object.entries(tags)) {
      const cardId = `tag-${machineId}-${safeId(tagName)}`;
      let card = document.getElementById(cardId);

      if (!card) {
        card = document.createElement('div');
        card.id = cardId;
        card.className = `tag-card ${tag.status}`;
        card.innerHTML = `
          <span class="tag-status-icon" id="icon-${cardId}">${statusIcon(tag.status)}</span>
          <div class="tag-name" title="${tagName}">${tagName}</div>
          <div class="tag-value-row">
            <span class="tag-value" id="val-${cardId}">${tag.value}</span>
            <span class="tag-unit">${tag.unit}</span>
          </div>
          <div class="tag-threshold-bar">
            <div class="tag-threshold-fill" id="bar-${cardId}" style="width:${pct(tag)}%"></div>
          </div>
        `;
        grid.appendChild(card);
      } else {
        // Update existing card
        card.className = `tag-card ${tag.status}`;
        document.getElementById(`val-${cardId}`).textContent  = tag.value;
        document.getElementById(`bar-${cardId}`).style.width  = `${pct(tag)}%`;
        document.getElementById(`icon-${cardId}`).textContent = statusIcon(tag.status);
      }
    }
  }

  // Update or create trend chart
  updateTrendChart(machineId, machine);
}

// ── Trend chart ──────────────────────────────────────────────
const CHART_COLORS = [
  '#4fc3f7','#ce93d8','#ffb74d','#80cbc4','#a5d6a7',
  '#f48fb1','#ffe082','#80deea','#bcaaa4','#90caf9',
];

function updateTrendChart(machineId, machine) {
  const canvas = document.getElementById(`chart-${machineId}`);
  if (!canvas) return;

  // Pick up to 6 representative tags for the trend
  const allTags = [];
  for (const tags of Object.values(machine.groups))
    for (const tagName of Object.keys(tags)) allTags.push(tagName);
  const chartTags = allTags.slice(0, 6);

  const labels = Array.from({ length: HISTORY_LEN }, (_, i) => (i % 5 === 0 ? `-${HISTORY_LEN - i}s` : ''));

  const datasets = chartTags.map((tagName, idx) => ({
    label: tagName.split('/').pop(),
    data: (trendHistory[machineId][tagName] || []).slice(-HISTORY_LEN),
    borderColor: CHART_COLORS[idx % CHART_COLORS.length],
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    pointRadius: 0,
    tension: 0.3,
  }));

  if (!charts[machineId]) {
    charts[machineId] = new Chart(canvas, {
      type: 'line',
      data: { labels, datasets },
      options: chartOptions(),
    });
  } else {
    charts[machineId].data.datasets = datasets;
    charts[machineId].data.labels   = labels;
    charts[machineId].update('none'); // no animation for real-time
  }
}

function chartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#8b949e', font: { size: 10 }, boxWidth: 12, padding: 10 },
      },
      tooltip: {
        backgroundColor: '#1c2128',
        borderColor: '#30363d',
        borderWidth: 1,
        titleColor: '#e6edf3',
        bodyColor: '#8b949e',
      },
    },
    scales: {
      x: {
        ticks: { color: '#484f58', font: { size: 10 }, maxRotation: 0 },
        grid:  { color: '#21262d' },
      },
      y: {
        ticks: { color: '#484f58', font: { size: 10 } },
        grid:  { color: '#21262d' },
      },
    },
  };
}

// ── Filter buttons ───────────────────────────────────────────
document.getElementById('filterBar').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  activeFilter = btn.dataset.machine;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (latestData) render(latestData);
});

// ── Chatbot ──────────────────────────────────────────────────
const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');
const chatSend     = document.getElementById('chatSend');

function sendChatMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  chatInput.value = '';
  appendChatMsg(msg, 'user');
  socket.emit('chat', msg);
}

chatSend.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChatMessage(); });

socket.on('chatReply', ({ bot }) => {
  appendChatMsg(bot, 'bot');
});

function appendChatMsg(text, role) {
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;

  // Render simple markdown: **bold**, *italic*, \n
  const formatted = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');

  div.innerHTML = `
    <div class="chat-bubble">${formatted}</div>
    <span class="chat-meta">${role === 'user' ? 'Tú' : '🤖 Asistente'} · ${new Date().toLocaleTimeString('es-PE', { hour12: false })}</span>
  `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Quick prompts
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    chatInput.value = btn.dataset.msg;
    sendChatMessage();
  });
});

// Collapse chatbot
document.getElementById('chatbotToggle').addEventListener('click', (e) => {
  if (e.target.closest('.chat-send-btn') || e.target === chatInput) return;
  const panel = document.getElementById('chatbotPanel');
  const colBtn = document.getElementById('collapseBtn');
  panel.classList.toggle('collapsed');
  colBtn.textContent = panel.classList.contains('collapsed') ? '▲' : '▼';
});

// ── Helpers ──────────────────────────────────────────────────
function statusLabel(s) {
  return s === 'alarm' ? '🔴 ALARMA' : s === 'warning' ? '🟡 ADVERTENCIA' : '🟢 NORMAL';
}
function statusIcon(s) {
  return s === 'alarm' ? '🔴' : s === 'warning' ? '🟡' : '🟢';
}
function safeId(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '_');
}
function pct(tag) {
  const { value, thresholds: t } = tag;
  const range = t.max - t.min;
  return range > 0 ? Math.min(100, Math.max(0, ((value - t.min) / range) * 100)).toFixed(1) : 0;
}
