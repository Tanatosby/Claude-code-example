// Rule-based industrial AI chatbot
// Responds to queries about machines, tags, thresholds, and status

const machineInfo = {
  EC101: {
    fullName: 'EC101 — Preparación de Caña',
    description: 'Sistema de preparación de caña que incluye Picadoras 1 y 2, Desfibrador y Conductores.',
    tags: ['corriente de motores (I)', 'temperaturas (TT)', 'vibración (VT)', 'tensión (Tensión)', 'velocidad de conductor (ST)'],
    umbral: 'Las alarmas se activan cuando la corriente supera el 94% del rango nominal o la temperatura excede 95°C en motores.',
  },
  turbina: {
    fullName: 'Turbina — Generación de Energía',
    description: 'Turbina de vapor para generación eléctrica. Monitorea condensador, lubricación y parámetros operativos.',
    tags: ['velocidad (SPD)', 'presión de ingreso (PT_Ingreso)', 'temperatura (TT)', 'potencia activa (Pot_Act)', 'vibración (VT)', 'vacío condensador (PT_VacioCond)'],
    umbral: 'La velocidad nominal es ~3000-3600 rpm. Alarma si presión de ingreso baja de 10.5 bar o vibración supera 13 mm/s.',
  },
  caldero: {
    fullName: 'Caldero — Generación de Vapor',
    description: 'Caldera de biomasa (bagazo) que genera vapor para la turbina y proceso. Monitorea flujos, presiones, temperaturas y dosadores.',
    tags: ['flujo de vapor (FT_Vapor)', 'presión domo (PT_Domo)', 'temperatura hogar (TT_MedioHogar)', 'nivel domo (LT_Domo)', 'corriente exhaustores (I_Exahustor)'],
    umbral: 'La temperatura del hogar medio no debe superar 1080°C. La presión del domo debe mantenerse entre 12-43 bar. El nivel del domo entre 20-80%.',
  },
  difusor: {
    fullName: 'Difusor — Extracción de Jugo',
    description: 'Sistema de extracción de jugo de caña por difusión. Monitorea bombas, captadores de temperatura, motor principal y agua de imbibición.',
    tags: ['corriente motor (Motor/I)', 'flujo agua imbibición (AguaImbibicion/FT)', 'temperatura captadores (Captadores/TT)', 'vibración reductores (VT_Dif)', 'corriente bombas (Bombas/I)'],
    umbral: 'La temperatura del agua de imbibición debe estar entre 55-100°C. Vibración en reductores no debe superar 13 mm/s.',
  },
  molino: {
    fullName: 'Molino — Molienda de Caña',
    description: 'Tándem de molinos para extracción mecánica de jugo. Monitorea motor principal, unidad hidráulica, masa y reductor.',
    tags: ['corriente motor (motor/I)', 'temperatura motor (motor/TT)', 'vibración (motor/VT)', 'presión hidráulica (UH/PT)', 'temperatura masa (masa/TT)'],
    umbral: 'La corriente del motor no debe superar los 760 A. La presión hidráulica debe mantenerse por encima de 5.2 bar.',
  },
};

const responses = [
  // Machine-specific queries
  { patterns: ['ec101', 'picadora', 'desfibrador', 'conductor', 'preparacion', 'preparación'],
    handler: () => `**${machineInfo.EC101.fullName}**\n\n${machineInfo.EC101.description}\n\n**Tags monitoreados:** ${machineInfo.EC101.tags.join(', ')}\n\n**Umbrales clave:** ${machineInfo.EC101.umbral}` },

  { patterns: ['turbina', 'generacion', 'generación', 'condensador', 'lubricacion', 'lubricación'],
    handler: () => `**${machineInfo.turbina.fullName}**\n\n${machineInfo.turbina.description}\n\n**Tags monitoreados:** ${machineInfo.turbina.tags.join(', ')}\n\n**Umbrales clave:** ${machineInfo.turbina.umbral}` },

  { patterns: ['caldero', 'caldera', 'vapor', 'domo', 'bagazo', 'hogar'],
    handler: () => `**${machineInfo.caldero.fullName}**\n\n${machineInfo.caldero.description}\n\n**Tags monitoreados:** ${machineInfo.caldero.tags.join(', ')}\n\n**Umbrales clave:** ${machineInfo.caldero.umbral}` },

  { patterns: ['difusor', 'jugo', 'imbibicion', 'imbibición', 'bomba', 'captador'],
    handler: () => `**${machineInfo.difusor.fullName}**\n\n${machineInfo.difusor.description}\n\n**Tags monitoreados:** ${machineInfo.difusor.tags.join(', ')}\n\n**Umbrales clave:** ${machineInfo.difusor.umbral}` },

  { patterns: ['molino', 'molienda', 'masa', 'hidraulica', 'hidráulica', 'reductor'],
    handler: () => `**${machineInfo.molino.fullName}**\n\n${machineInfo.molino.description}\n\n**Tags monitoreados:** ${machineInfo.molino.tags.join(', ')}\n\n**Umbrales clave:** ${machineInfo.molino.umbral}` },

  // Threshold / alarm queries
  { patterns: ['umbral', 'umbrales', 'threshold', 'alarma', 'alerta', 'limite', 'límite'],
    handler: () => `**Umbrales de alarma por activo:**\n\n🔴 **Alarma** (rojo): valor fuera del rango operativo seguro → acción inmediata requerida.\n🟡 **Advertencia** (amarillo): valor en zona de precaución → monitoreo continuo.\n🟢 **Normal** (verde): operación dentro de parámetros.\n\nCada tag tiene umbrales individuales configurados según el rango nominal del sensor. Puedes hacer clic en cualquier tarjeta del dashboard para ver los umbrales específicos de cada tag.` },

  // Vibration
  { patterns: ['vibracion', 'vibración', 'vt_', 'mm/s'],
    handler: () => `**Vibración:** Los sensores de vibración (VT) miden en mm/s RMS.\n\n- 🟢 Normal: < 10 mm/s\n- 🟡 Advertencia: 10–13 mm/s\n- 🔴 Alarma: > 13 mm/s\n\nLos equipos monitoreados incluyen motores eléctricos, reductores y chumaceras en todos los activos.` },

  // Temperature
  { patterns: ['temperatura', 'tt_', 'grados', 'celsius', 'calor'],
    handler: () => `**Temperatura:** Los sensores TT (Temperature Transmitter) monitorean:\n\n- Motores eléctricos (devanados R, S, T)\n- Chumaceras y rodamientos (LA = Lado Accionamiento, LL = Lado Libre)\n- Fluidos de proceso (aceite, agua, vapor, masa)\n- Gases de combustión (caldero)\n\nLas alarmas de temperatura en motores se activan generalmente por encima de 95°C.` },

  // Current / amperage
  { patterns: ['corriente', 'amperio', 'amp', '_ a ', '/i ', 'i_', 'intensidad'],
    handler: () => `**Corriente eléctrica (I):** Monitorea la carga de motores en Amperios.\n\nUna corriente alta puede indicar:\n- Sobrecarga mecánica del equipo\n- Problemas en el proceso (exceso de material)\n- Falla inminente en el motor\n\nEl umbral de alarma suele ser el 95% de la corriente nominal del motor.` },

  // Status / health
  { patterns: ['estado', 'status', 'salud', 'health', 'operativo', 'funcionando'],
    handler: (snapshot) => {
      if (!snapshot) return 'No hay datos de máquinas disponibles aún. Por favor espera unos segundos.';
      const lines = Object.entries(snapshot).map(([id, m]) => {
        const icon = m.status === 'alarm' ? '🔴' : m.status === 'warning' ? '🟡' : '🟢';
        return `${icon} **${m.label}**: ${m.status.toUpperCase()}`;
      });
      return `**Estado actual de activos:**\n\n${lines.join('\n')}`;
    }},

  // Help / default
  { patterns: ['ayuda', 'help', 'puedo', 'qué', 'que', 'como', 'cómo', 'hola', 'hello', 'hi'],
    handler: () => `**Asistente de Dashboard Industrial**\n\nPuedes preguntarme sobre:\n\n- 🏭 **Activos**: EC101, Turbina, Caldero, Difusor, Molino\n- 📊 **Umbrales y alarmas** de cualquier equipo\n- 🌡️ **Temperatura, vibración, corriente, presión**\n- 💚 **Estado operativo** de las máquinas\n\nEjemplos:\n*"¿Cuál es el estado del caldero?"*\n*"¿Qué son los umbrales de vibración?"*\n*"Información sobre el difusor"*` },
];

/**
 * Process a user message and return a bot response
 * @param {string} message - User input
 * @param {object|null} snapshot - Latest machine snapshot (optional)
 * @returns {string} Bot response in markdown
 */
function processMessage(message, snapshot = null) {
  const lower = message.toLowerCase();

  for (const rule of responses) {
    if (rule.patterns.some(p => lower.includes(p))) {
      return rule.handler(snapshot);
    }
  }

  // Fallback
  return `No encontré información específica sobre tu consulta. Intenta preguntar sobre alguno de los activos: **EC101, Turbina, Caldero, Difusor o Molino**, o pregunta sobre umbrales, alarmas o el estado operativo.`;
}

module.exports = { processMessage };
