const axios = require('axios');
const config = require('../config');
const supabaseStore = require('../storage/supabase');

let alertsSentThisRun = 0;
const MAX_INDIVIDUAL_ALERTS = 5;

const sendAlert = async (finding) => {
  const { botToken, chatId } = config.telegram;
  if (!botToken || !chatId) {
    console.warn(`⚠️ [Telegram] Sin configurar. Omitiendo alerta individual: ${finding.title}`);
    return;
  }

  const allowNaranja = process.env.TELEGRAM_ALERT_NARANJA === 'true';
  const thresholdMet = finding.risk_level === 'ROJO' || (allowNaranja && finding.risk_level === 'NARANJA');

  if (thresholdMet) {
    if (alertsSentThisRun >= MAX_INDIVIDUAL_ALERTS) {
      console.log('⚠️ [Telegram] Máximo de alertas individuales alcanzado. Agrupando en resumen.');
      return;
    }

    const message = `
${finding.risk_level === 'ROJO' ? '🔴 *ALERTA CRÍTICA*' : '🟠 *ALERTA PREVENTIVA*'} SIRCOM
*Categoría:* ${finding.category}

*Detalle:* ${finding.title}
*Fuente:* ${finding.source_name} (${finding.confidence_level === 'secondary_signal' ? 'Ciudadana/Medios' : 'Oficial'})
*Ubicación aproximada:* ${finding.location}

*Recomendación:* ${finding.recommended_action}
*Consulta:* ${finding.url}

_Información preventiva de fuentes abiertas. No sustituye avisos oficiales._
`.trim();

    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      await axios.post(url, { chat_id: chatId, text: message, parse_mode: 'Markdown' });
      alertsSentThisRun++;
      await supabaseStore.saveTelegramLog({ chat_id: chatId, message_type: 'individual_alert', content: finding.title, status: 'sent' });
    } catch (error) {
      console.error(`❌ [Telegram] Error individual:`, error.message);
      await supabaseStore.saveTelegramLog({ chat_id: chatId, message_type: 'individual_alert', content: finding.title, status: 'error', error: error.message });
    }
  }
};

const sendSummary = async (findings) => {
  const { botToken, chatId } = config.telegram;
  if (!botToken || !chatId) return;

  const rojos = findings.filter(f => f.risk_level === 'ROJO').length;
  const naranjas = findings.filter(f => f.risk_level === 'NARANJA').length;
  const amarillos = findings.filter(f => f.risk_level === 'AMARILLO').length;
  const total = findings.length;

  if (total === 0) return;

  let nivelGeneral = '🟢 VERDE';
  if (rojos > 0) nivelGeneral = '🔴 ROJO';
  else if (naranjas > 0) nivelGeneral = '🟠 NARANJA';
  else if (amarillos > 0) nivelGeneral = '🟡 AMARILLO';

  const catCount = {};
  findings.forEach(f => {
    catCount[f.category] = (catCount[f.category] || 0) + 1;
  });

  let catsStr = '';
  Object.keys(catCount).slice(0, 3).forEach(c => {
    catsStr += `- ${c}: ${catCount[c]}\n`;
  });

  const message = `
🛡️ *SIRCOM MORELOS*
Corte: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
Periodo: Últimas 6 horas

*Nivel general:* ${nivelGeneral}
Hallazgos nuevos: ${total}
Eventos críticos: ${rojos}

*Principales Radares Activos:*
${catsStr || 'Sin actividad inusual'}

*Conclusión Operativa:*
${rojos > 0 ? 'Se requiere revisión de alertas críticas vigentes.' : 'Monitoreo preventivo normal. Condiciones estables.'}

_Información preventiva. No sustituye avisos oficiales._
`.trim();

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await axios.post(url, { chat_id: chatId, text: message, parse_mode: 'Markdown' });
    await supabaseStore.saveTelegramLog({ chat_id: chatId, message_type: 'summary', content: 'Resumen Ejecutivo', status: 'sent' });
  } catch (error) {
    console.error(`❌ [Telegram] Error resumen:`, error.message);
  }
};

const resetCounter = () => {
  alertsSentThisRun = 0;
};

module.exports = {
  sendAlert,
  sendSummary,
  resetCounter
};
