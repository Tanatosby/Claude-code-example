const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
const path = require('path');

const authRouter = require('./routes/auth');
const { generateSnapshot } = require('./src/machineData');
const { processMessage } = require('./src/chatbot');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionMiddleware = session({
  secret: 'industrial-dashboard-secret-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
});
app.use(sessionMiddleware);

// Share session with Socket.io
io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res || {}, next);
});

// ── Static files ────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/', authRouter);

// Redirect root
app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.redirect('/login');
});

// Dashboard (protected)
app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile('dashboard.html', { root: './public' });
});

// ── Socket.io ────────────────────────────────────────────────────────────────
let latestSnapshot = generateSnapshot();

io.on('connection', (socket) => {
  const sess = socket.request.session;
  if (!sess || !sess.user) {
    socket.disconnect(true);
    return;
  }

  // Send immediately on connect
  socket.emit('data', latestSnapshot);

  // Chatbot messages
  socket.on('chat', (msg) => {
    const reply = processMessage(msg, latestSnapshot);
    socket.emit('chatReply', { user: msg, bot: reply });
  });
});

// Broadcast new data every 2 seconds
setInterval(() => {
  latestSnapshot = generateSnapshot();
  io.emit('data', latestSnapshot);
}, 2000);

// ── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n🏭  Industrial Dashboard running at http://localhost:${PORT}`);
  console.log(`    Login: admin / admin123  |  operador / op2024\n`);
});
