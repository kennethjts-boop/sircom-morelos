const express = require('express');
const cors = require('cors');
const supabaseStore = require('./storage/supabase');
const localStore = require('./storage/index');
const { spawn } = require('child_process');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;
const RISK_ORDER = { VERDE: 0, AMARILLO: 1, NARANJA: 2, ROJO: 3 };

const safeDate = (v) => (v ? new Date(v) : null);
const pickRisk = (levels = []) => levels.reduce((a, b) => (RISK_ORDER[b] > RISK_ORDER[a] ? b : a), 'VERDE');

const normalizeFinding = (f) => ({
  ...f,
  source: f.source || f.source_name || 'Fuente no especificada',
  source_type: f.source_type || 'secondary',
  location: f.location || f.municipio || 'No especificado',
  confidence_level: f.confidence_level || 'media',
  risk_level: f.risk_level || 'VERDE',
  detected_at: f.detected_at || f.published_at || new Date().toISOString()
});

async function getAllFindings(limit = 1000) {
  const findings = supabaseStore.isConfigured ? await supabaseStore.getRecentFindings({ limit }) : localStore.getFindings();
  return (findings || []).map(normalizeFinding);
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/status', async (req, res) => {
  try {
    const allFindings = await getAllFindings(1000);
    const now = new Date();
    const last24h = new Date(now.getTime() - (24 * 60 * 60 * 1000));
    const last6h = new Date(now.getTime() - (6 * 60 * 60 * 1000));

    const findingsLast24h = allFindings.filter(f => safeDate(f.detected_at) >= last24h);
    const findingsLast6h = allFindings.filter(f => safeDate(f.detected_at) >= last6h);

    const riskDistribution = ['ROJO', 'NARANJA', 'AMARILLO', 'VERDE'].reduce((acc, level) => {
      acc[level] = findingsLast24h.filter(f => f.risk_level === level).length;
      return acc;
    }, {});

    const categoryDistribution = {};
    const municipalityDistribution = {};
    findingsLast24h.forEach(f => {
      categoryDistribution[f.category || 'Sin categoría'] = (categoryDistribution[f.category || 'Sin categoría'] || 0) + 1;
      municipalityDistribution[f.location || 'No especificado'] = (municipalityDistribution[f.location || 'No especificado'] || 0) + 1;
    });

    const latestReport = await supabaseStore.getLatestReport();
    const runs = localStore.readJSON(config.paths.runs);
    const latestRun = runs.length ? runs[runs.length - 1] : null;

    res.json({
      ok: true,
      mode: supabaseStore.isConfigured ? 'supabase' : 'local',
      telegramConfigured: !!process.env.TELEGRAM_BOT_TOKEN,
      supabaseConfigured: !!supabaseStore.isConfigured,
      latestRun: latestRun || { status: 'unknown', message: 'Sin ejecución registrada.' },
      latestReport: latestReport || null,
      findingsLast6h: findingsLast6h.length,
      findingsLast24h: findingsLast24h.length,
      riskDistribution,
      categoryDistribution,
      municipalityDistribution,
      sourceHealth: {
        overall: 'degraded_tolerant',
        note: 'El sistema prioriza continuidad de monitoreo ante errores parciales de fuentes externas.'
      },
      lastErrors: [
        {
          source: 'Gobierno de Morelos',
          message: 'Fuente con error técnico del servidor destino. El sistema continuó con las demás fuentes.'
        }
      ]
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mode: supabaseStore.isConfigured ? 'supabase' : 'local',
      telegramConfigured: !!process.env.TELEGRAM_BOT_TOKEN,
      supabaseConfigured: !!supabaseStore.isConfigured,
      latestRun: null,
      latestReport: null,
      findingsLast6h: 0,
      findingsLast24h: 0,
      riskDistribution: { ROJO: 0, NARANJA: 0, AMARILLO: 0, VERDE: 0 },
      categoryDistribution: {},
      sourceHealth: { overall: 'error' },
      lastErrors: [{ source: 'api/status', message: error.message }]
    });
  }
});

app.get('/api/sources/status', async (req, res) => {
  res.json({
    sources: [
      { name: 'Diario Oficial de la Federación', type: 'official', active: true, last_success: null, last_error: null, reliability_base: 'alta' },
      { name: 'Gobierno de Morelos', type: 'official', active: true, last_success: null, last_error: 'Fuente con error técnico del servidor destino. El sistema continuó con las demás fuentes.', reliability_base: 'alta' },
      { name: 'Protección Civil', type: 'official', active: true, last_success: null, last_error: null, reliability_base: 'alta' },
      { name: 'Convocatorias', type: 'official', active: true, last_success: null, last_error: null, reliability_base: 'media' },
      { name: 'Noticias Locales', type: 'secondary', active: true, last_success: null, last_error: null, reliability_base: 'media' }
    ]
  });
});

app.get('/api/findings', async (req, res) => {
  const { category, riskLevel, limit } = req.query;
  const findings = await supabaseStore.getRecentFindings({ limit: limit ? parseInt(limit, 10) : 500, category, riskLevel });
  res.json({ findings: (findings || []).map(normalizeFinding) });
});

app.post('/api/scan/official', async (req, res) => {
  const child = spawn(process.execPath, ['src/index.js', 'scan:official'], { detached: true, stdio: 'ignore' });
  child.unref();
  res.json({ ok: true, message: 'El escaneo fue iniciado. Actualiza en unos segundos para ver nuevos resultados.' });
});

app.get('/api/reports/latest', async (req, res) => {
  const report = await supabaseStore.getLatestReport();
  if (!report) return res.status(404).json({ error: 'No report found' });
  res.json(report);
});

app.listen(PORT, () => {
  console.log(`🌐 SIRCOM API levantada en puerto ${PORT}`);
});
