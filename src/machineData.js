// Machine tag definitions with realistic ranges and thresholds
// Tags extracted from context notebooks (EC101, Turbina, Caldero, Difusor, Molino)

const machines = {
  EC101: {
    label: 'EC101 — Preparación Caña',
    icon: '⚙️',
    color: '#4fc3f7',
    groups: {
      'Picadora 1': {
        'P1/TT_LL':         { unit: '°C', min: 20,  max: 90,  warnHigh: 70, alarmHigh: 85 },
        'P1/I_Pic':         { unit: 'A',  min: 50,  max: 500, warnHigh: 400, alarmHigh: 470 },
        'P1/TT_PicR':       { unit: '°C', min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'P1/TT_PicS':       { unit: '°C', min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'P1/TT_PicT':       { unit: '°C', min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'P1/VT_PicLL':      { unit: 'mm/s', min: 0, max: 15,  warnHigh: 10, alarmHigh: 13 },
        'P1/TT_MotorUH':    { unit: '°C', min: 30,  max: 90,  warnHigh: 70, alarmHigh: 85 },
        'P1/TT_LA':         { unit: '°C', min: 25,  max: 80,  warnHigh: 65, alarmHigh: 75 },
        'P1/TensionUH':     { unit: 'V',  min: 200, max: 480, warnLow: 210, alarmLow: 200 },
        'P1/TT_ChumLL':     { unit: '°C', min: 20,  max: 85,  warnHigh: 65, alarmHigh: 80 },
      },
      'Picadora 2': {
        'P2/TT_ChumPic2LA': { unit: '°C', min: 20,  max: 85,  warnHigh: 65, alarmHigh: 80 },
        'P2/TT_ChumPic2LL': { unit: '°C', min: 20,  max: 85,  warnHigh: 65, alarmHigh: 80 },
        'P2/I_Pic2':        { unit: 'A',  min: 50,  max: 500, warnHigh: 400, alarmHigh: 470 },
        'P2/TT_Pic2R':      { unit: '°C', min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'P2/TT_Pic2S':      { unit: '°C', min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'P2/TT_Pic2T':      { unit: '°C', min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'P2/TensionPic2':   { unit: 'V',  min: 200, max: 480, warnLow: 210, alarmLow: 200 },
        'P2/VT_Pic2LL':     { unit: 'mm/s', min: 0, max: 15,  warnHigh: 10, alarmHigh: 13 },
        'P2/TT_ReductorAceite': { unit: '°C', min: 30, max: 90, warnHigh: 70, alarmHigh: 85 },
        'P2/TensionPic2Red':{ unit: 'V',  min: 200, max: 480, warnLow: 210, alarmLow: 200 },
      },
      'Desfibrador': {
        'Desf/I_MotorDesf':    { unit: 'A',  min: 100, max: 800, warnHigh: 650, alarmHigh: 750 },
        'Desf/TT_MotorDesfR':  { unit: '°C', min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'Desf/TT_MotorDesfS':  { unit: '°C', min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'Desf/TT_MotorDesfT':  { unit: '°C', min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'Desf/TT_MotorLA':     { unit: '°C', min: 25,  max: 80,  warnHigh: 65, alarmHigh: 75 },
        'Desf/TT_MotorLL':     { unit: '°C', min: 25,  max: 80,  warnHigh: 65, alarmHigh: 75 },
        'Desf/TT_ChumLA':      { unit: '°C', min: 20,  max: 85,  warnHigh: 65, alarmHigh: 80 },
        'Desf/TT_ChumLL':      { unit: '°C', min: 20,  max: 85,  warnHigh: 65, alarmHigh: 80 },
        'Desf/TT_MotorAceite': { unit: '°C', min: 30,  max: 90,  warnHigh: 70, alarmHigh: 85 },
        'Desf/VT_MotorLL':     { unit: 'mm/s', min: 0, max: 15,  warnHigh: 10, alarmHigh: 13 },
      },
      'Conductores': {
        'Conductor/I_EC101':   { unit: 'A',  min: 10, max: 200, warnHigh: 160, alarmHigh: 185 },
        'Conductor/ST_EC101':  { unit: '%',  min: 0,  max: 100, warnLow: 20, alarmLow: 10 },
        'Conductor/I_MC101':   { unit: 'A',  min: 10, max: 150, warnHigh: 120, alarmHigh: 140 },
        'Conductor/I_MC102':   { unit: 'A',  min: 10, max: 150, warnHigh: 120, alarmHigh: 140 },
        'Conductor/I_EC102':   { unit: 'A',  min: 10, max: 200, warnHigh: 160, alarmHigh: 185 },
        'Conductor/I_EC103':   { unit: 'A',  min: 10, max: 200, warnHigh: 160, alarmHigh: 185 },
      },
    },
  },

  turbina: {
    label: 'Turbina — Generación Vapor',
    icon: '🌀',
    color: '#ce93d8',
    groups: {
      'Condensador': {
        'Condensador/FT_Caudal':    { unit: 'm³/h', min: 100, max: 800, warnLow: 150, alarmLow: 110 },
        'Condensador/TT_Condensado':{ unit: '°C',   min: 30,  max: 60,  warnHigh: 55, alarmHigh: 58 },
        'Condensador/PT_VacioCond': { unit: 'mbar', min: 50,  max: 200, warnHigh: 180, alarmHigh: 195 },
        'Condensador/LP_Extraccion':{ unit: '%',    min: 0,   max: 100, warnLow: 20, alarmLow: 10 },
      },
      'Lubricación': {
        'U. Lub/TT_Aceite':  { unit: '°C',  min: 30, max: 70,  warnHigh: 60, alarmHigh: 68 },
        'U. Lub/PT_Filtro':  { unit: 'bar', min: 0,  max: 5,   warnHigh: 4.2, alarmHigh: 4.7 },
        'U. Lub/PT_Aceite':  { unit: 'bar', min: 1,  max: 6,   warnLow: 1.5, alarmLow: 1.1 },
      },
      'Parámetros Operación': {
        'Param. Op./SPD_Gen_01': { unit: 'rpm', min: 1000, max: 3600, warnLow: 1200, alarmLow: 1050 },
        'Param. Op./PT_Ingreso': { unit: 'bar', min: 10,   max: 45,   warnLow: 12, alarmLow: 10.5 },
        'Param. Op./PT_Turb':    { unit: 'bar', min: 0.5,  max: 10,   warnHigh: 8.5, alarmHigh: 9.5 },
        'Param. Op./Pot_Act':    { unit: 'MW',  min: 0,    max: 12,   warnLow: 1, alarmLow: 0.5 },
        'Param. Op./TT_Ingreso': { unit: '°C',  min: 200,  max: 400,  warnLow: 220, alarmLow: 205 },
        'Param. Op./TT_Turb':    { unit: '°C',  min: 50,   max: 200,  warnHigh: 175, alarmHigh: 190 },
      },
      'Parámetros Estado': {
        'Param. Estado/ZT_TurbLeft':         { unit: 'mm',   min: 0, max: 2,    warnHigh: 1.5, alarmHigh: 1.8 },
        'Param. Estado/ZT_TurbRight':        { unit: 'mm',   min: 0, max: 2,    warnHigh: 1.5, alarmHigh: 1.8 },
        'Param. Estado/TT_R':                { unit: '°C',   min: 30, max: 100, warnHigh: 80, alarmHigh: 95 },
        'Param. Estado/TT_S':                { unit: '°C',   min: 30, max: 100, warnHigh: 80, alarmHigh: 95 },
        'Param. Estado/TT_T':                { unit: '°C',   min: 30, max: 100, warnHigh: 80, alarmHigh: 95 },
        'Param. Estado/VT_TurbLLA':          { unit: 'mm/s', min: 0, max: 15,  warnHigh: 10, alarmHigh: 13 },
        'Param. Estado/VT_TurbLAA':          { unit: 'mm/s', min: 0, max: 15,  warnHigh: 10, alarmHigh: 13 },
        'Param. Estado/TT_RadialLA':         { unit: '°C',   min: 30, max: 90,  warnHigh: 70, alarmHigh: 85 },
        'Param. Estado/TT_RadialLL':         { unit: '°C',   min: 30, max: 90,  warnHigh: 70, alarmHigh: 85 },
      },
    },
  },

  caldero: {
    label: 'Caldero — Generación Vapor',
    icon: '🔥',
    color: '#ffb74d',
    groups: {
      'Flujo y Presión': {
        'FT_Vapor':  { unit: 't/h', min: 0,  max: 100, warnLow: 10, alarmLow: 5 },
        'PT_Cald':   { unit: 'bar', min: 10, max: 45,  warnLow: 12, alarmLow: 10.5 },
        'FT_Agua':   { unit: 'm³/h', min: 0, max: 80, warnLow: 5, alarmLow: 2 },
        'PT_Agua':   { unit: 'bar', min: 5,  max: 30,  warnLow: 6, alarmLow: 5.2 },
        'PT_Domo':   { unit: 'bar', min: 10, max: 45,  warnLow: 12, alarmHigh: 43 },
        'PT_Hogar':  { unit: 'mbar', min: -50, max: 50, warnHigh: 30, alarmHigh: 45 },
        'PT_Aireprimario': { unit: 'mbar', min: 0, max: 200, warnLow: 20, alarmLow: 10 },
      },
      'Temperatura': {
        'TT_Cald':          { unit: '°C', min: 150, max: 450, warnLow: 180, alarmLow: 155 },
        'TT_Agua':          { unit: '°C', min: 20,  max: 120, warnHigh: 100, alarmHigh: 115 },
        'TT_GasesHorno':    { unit: '°C', min: 100, max: 600, warnHigh: 550, alarmHigh: 580 },
        'TT_InferiorHogar': { unit: '°C', min: 200, max: 1000, warnHigh: 900, alarmHigh: 970 },
        'TT_IngresoAire':   { unit: '°C', min: 20,  max: 80,  warnHigh: 70, alarmHigh: 78 },
        'TT_MedioHogar':    { unit: '°C', min: 300, max: 1100, warnHigh: 1000, alarmHigh: 1080 },
        'TT_Chimenea':      { unit: '°C', min: 100, max: 250, warnHigh: 220, alarmHigh: 240 },
      },
      'Nivel y Control': {
        'LT_Domo':         { unit: '%', min: 0, max: 100, warnLow: 20, alarmLow: 10, warnHigh: 80, alarmHigh: 90 },
        'LV_IngresoAgua':  { unit: '%', min: 0, max: 100, warnLow: 10, alarmLow: 5 },
        'MV_IngresoAgua':  { unit: '%', min: 0, max: 100, warnLow: 10, alarmLow: 5 },
        'MV_Reductora':    { unit: '%', min: 0, max: 100, warnHigh: 90, alarmHigh: 97 },
        'PV_Reductora':    { unit: 'bar', min: 0, max: 20, warnHigh: 17, alarmHigh: 19 },
      },
      'Dosadores': {
        'I_MDosador1': { unit: 'A', min: 0, max: 50, warnHigh: 42, alarmHigh: 48 },
        'I_MDosador2': { unit: 'A', min: 0, max: 50, warnHigh: 42, alarmHigh: 48 },
        'I_MDosador3': { unit: 'A', min: 0, max: 50, warnHigh: 42, alarmHigh: 48 },
        'I_Exahustor1': { unit: 'A', min: 0, max: 150, warnHigh: 125, alarmHigh: 142 },
        'I_Exahustor2': { unit: 'A', min: 0, max: 150, warnHigh: 125, alarmHigh: 142 },
        'I_EsparcidorBagazo': { unit: 'A', min: 0, max: 80, warnHigh: 68, alarmHigh: 76 },
      },
    },
  },

  difusor: {
    label: 'Difusor — Extracción Jugo',
    icon: '💧',
    color: '#80cbc4',
    groups: {
      'Agua Imbibición': {
        'AguaImbibicion/FT':            { unit: 'm³/h', min: 0, max: 200, warnLow: 20, alarmLow: 10 },
        'AguaImbibicion/TT':            { unit: '°C',   min: 50, max: 100, warnLow: 55, alarmLow: 51 },
      },
      'Motor Principal': {
        'Motor/I':                      { unit: 'A', min: 50, max: 600, warnHigh: 500, alarmHigh: 570 },
        'UH/I_UH':                      { unit: 'A', min: 10, max: 150, warnHigh: 125, alarmHigh: 142 },
        'UH/PT_UH':                     { unit: 'bar', min: 5, max: 25,  warnLow: 6, alarmLow: 5.2 },
        'Reductor/VT_Dif_I_Alta':       { unit: 'mm/s', min: 0, max: 15, warnHigh: 10, alarmHigh: 13 },
        'Reductor/VT_Dif_II_Alta':      { unit: 'mm/s', min: 0, max: 15, warnHigh: 10, alarmHigh: 13 },
        'Reductor/VT_Dif_III_Alta':     { unit: 'mm/s', min: 0, max: 15, warnHigh: 10, alarmHigh: 13 },
      },
      'Bombas': {
        'Bombas/I_A':    { unit: 'A', min: 5, max: 80, warnHigh: 68, alarmHigh: 76 },
        'Bombas/I_C1':   { unit: 'A', min: 5, max: 80, warnHigh: 68, alarmHigh: 76 },
        'Bombas/I_C2':   { unit: 'A', min: 5, max: 80, warnHigh: 68, alarmHigh: 76 },
        'Bombas/I_C3':   { unit: 'A', min: 5, max: 80, warnHigh: 68, alarmHigh: 76 },
        'Bombas/I_C4':   { unit: 'A', min: 5, max: 80, warnHigh: 68, alarmHigh: 76 },
        'Bombas/I_C5':   { unit: 'A', min: 5, max: 80, warnHigh: 68, alarmHigh: 76 },
        'Bombas/I_C6':   { unit: 'A', min: 5, max: 80, warnHigh: 68, alarmHigh: 76 },
        'Bombas/I_CAB1': { unit: 'A', min: 5, max: 80, warnHigh: 68, alarmHigh: 76 },
        'Bombas/I_CAB2': { unit: 'A', min: 5, max: 80, warnHigh: 68, alarmHigh: 76 },
        'Bombas/I_CAB3': { unit: 'A', min: 5, max: 80, warnHigh: 68, alarmHigh: 76 },
      },
      'Captadores': {
        'Captadores/TT_A':    { unit: '°C', min: 40, max: 90, warnHigh: 78, alarmHigh: 87 },
        'Captadores/TT_C3':   { unit: '°C', min: 40, max: 90, warnHigh: 78, alarmHigh: 87 },
        'Captadores/TT_C6':   { unit: '°C', min: 40, max: 90, warnHigh: 78, alarmHigh: 87 },
        'Captadores/TT_C10':  { unit: '°C', min: 40, max: 90, warnHigh: 78, alarmHigh: 87 },
        'Captadores/TT_CAB3': { unit: '°C', min: 40, max: 90, warnHigh: 78, alarmHigh: 87 },
        'Chumaceras/TT_ChumLL':{ unit: '°C', min: 20, max: 85, warnHigh: 65, alarmHigh: 80 },
        'Chumaceras/TT_ChumLM':{ unit: '°C', min: 20, max: 85, warnHigh: 65, alarmHigh: 80 },
        'Helicoidales/Helicoidal_4': { unit: 'A', min: 5, max: 60, warnHigh: 50, alarmHigh: 57 },
        'Helicoidales/Helicoidal_6': { unit: 'A', min: 5, max: 60, warnHigh: 50, alarmHigh: 57 },
      },
    },
  },

  molino: {
    label: 'Molino — Molienda Caña',
    icon: '🏭',
    color: '#a5d6a7',
    groups: {
      'Unidad Hidráulica': {
        'UH/I':  { unit: 'A',   min: 10, max: 100, warnHigh: 85, alarmHigh: 95 },
        'UH/PT': { unit: 'bar', min: 5,  max: 30,  warnLow: 6, alarmLow: 5.2 },
      },
      'Motor': {
        'motor/I':      { unit: 'A',    min: 100, max: 800, warnHigh: 680, alarmHigh: 760 },
        'motor/ST':     { unit: '%',    min: 0,   max: 100, warnLow: 20, alarmLow: 10 },
        'motor/TT_DE':  { unit: '°C',  min: 30,  max: 100, warnHigh: 82, alarmHigh: 95 },
        'motor/TT_NDE': { unit: '°C',  min: 30,  max: 100, warnHigh: 82, alarmHigh: 95 },
        'motor/TT_R':   { unit: '°C',  min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'motor/TT_S':   { unit: '°C',  min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'motor/TT_T':   { unit: '°C',  min: 30,  max: 100, warnHigh: 80, alarmHigh: 95 },
        'motor/VT_DE':       { unit: 'mm/s', min: 0, max: 15, warnHigh: 10, alarmHigh: 13 },
        'motor/VT_MotorNDE': { unit: 'mm/s', min: 0, max: 15, warnHigh: 10, alarmHigh: 13 },
      },
      'Masa': {
        'masa/TT_MasaCanLL': { unit: '°C', min: 20, max: 80, warnHigh: 68, alarmHigh: 77 },
        'masa/TT_MasaCanLM': { unit: '°C', min: 20, max: 80, warnHigh: 68, alarmHigh: 77 },
        'masa/TT_MasaSupLL': { unit: '°C', min: 20, max: 80, warnHigh: 68, alarmHigh: 77 },
        'masa/TT_MasaSupLM': { unit: '°C', min: 20, max: 80, warnHigh: 68, alarmHigh: 77 },
      },
      'Reductor': {
        'reductor/VT_I':   { unit: 'mm/s', min: 0, max: 15, warnHigh: 10, alarmHigh: 13 },
        'reductor/VT_rII': { unit: 'mm/s', min: 0, max: 15, warnHigh: 10, alarmHigh: 13 },
      },
    },
  },
};

/**
 * Get tag status based on thresholds
 * Returns: 'normal' | 'warning' | 'alarm'
 */
function getTagStatus(value, tag) {
  if (tag.alarmHigh !== undefined && value >= tag.alarmHigh) return 'alarm';
  if (tag.alarmLow  !== undefined && value <= tag.alarmLow)  return 'alarm';
  if (tag.warnHigh  !== undefined && value >= tag.warnHigh)  return 'warning';
  if (tag.warnLow   !== undefined && value <= tag.warnLow)   return 'warning';
  return 'normal';
}

/**
 * Generate a random value for a tag, with slight drift from previous value
 */
const lastValues = {};
function randomValue(machineId, tagName, tag) {
  const key = `${machineId}:${tagName}`;
  const range = tag.max - tag.min;
  if (lastValues[key] === undefined) {
    // Initialize in the normal operating range (middle 60%)
    lastValues[key] = tag.min + range * (0.2 + Math.random() * 0.6);
  }
  // Drift ±3% of range per tick
  const drift = (Math.random() - 0.5) * range * 0.06;
  lastValues[key] = Math.max(tag.min, Math.min(tag.max, lastValues[key] + drift));
  return parseFloat(lastValues[key].toFixed(2));
}

/**
 * Generate a full snapshot of all machine data
 */
function generateSnapshot() {
  const snapshot = {};
  for (const [machineId, machine] of Object.entries(machines)) {
    snapshot[machineId] = {
      label: machine.label,
      icon: machine.icon,
      color: machine.color,
      groups: {},
      status: 'normal', // will be updated below
    };
    let machineStatus = 'normal';

    for (const [groupName, tags] of Object.entries(machine.groups)) {
      snapshot[machineId].groups[groupName] = {};
      for (const [tagName, tag] of Object.entries(tags)) {
        const value = randomValue(machineId, tagName, tag);
        const status = getTagStatus(value, tag);
        snapshot[machineId].groups[groupName][tagName] = {
          value,
          unit: tag.unit,
          status,
          thresholds: {
            min: tag.min,
            max: tag.max,
            warnHigh: tag.warnHigh,
            warnLow: tag.warnLow,
            alarmHigh: tag.alarmHigh,
            alarmLow: tag.alarmLow,
          },
        };
        if (status === 'alarm') machineStatus = 'alarm';
        else if (status === 'warning' && machineStatus !== 'alarm') machineStatus = 'warning';
      }
    }
    snapshot[machineId].status = machineStatus;
  }
  return snapshot;
}

module.exports = { machines, generateSnapshot };
