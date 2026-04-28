const express = require('express');
const cors = require('cors');
const supabaseStore = require('./storage/supabase');
const localStore = require('./storage/index');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/status', async (req, res) => {
  let allFindings = [];
  if (supabaseStore.isConfigured) {
    allFindings = await supabaseStore.getRecentFindings({ limit: 1000 });
  } else {
    allFindings = localStore.getFindings();
  }

  const now = new Date();
  const last24h = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  const last6h = new Date(now.getTime() - (6 * 60 * 60 * 1000));

  const findingsLast24h = allFindings.filter(f => new Date(f.detected_at) >= last24h);
  const findingsLast6h = allFindings.filter(f => new Date(f.detected_at) >= last6h);

  const riskDistribution = {
    ROJO: findingsLast24h.filter(f => f.risk_level === 'ROJO').length,
    NARANJA: findingsLast24h.filter(f => f.risk_level === 'NARANJA').length,
    AMARILLO: findingsLast24h.filter(f => f.risk_level === 'AMARILLO').length,
    VERDE: findingsLast24h.filter(f => f.risk_level === 'VERDE').length,
  };

  const categoryDistribution = {};
  findingsLast24h.forEach(f => {
    categoryDistribution[f.category] = (categoryDistribution[f.category] || 0) + 1;
  });

  const latestReport = await supabaseStore.getLatestReport();

  res.json({
    ok: true,
    mode: supabaseStore.isConfigured ? 'supabase' : 'local',
    telegramConfigured: !!(process.env.TELEGRAM_BOT_TOKEN),
    system_version: '3.1.0-Fase3.1',
    latestReport: latestReport ? latestReport.title : 'N/A',
    stats: {
      findingsLast6h: findingsLast6h.length,
      findingsLast24h: findingsLast24h.length,
      riskDistribution,
      categoryDistribution
    }
  });
});

app.get('/api/sources/status', async (req, res) => {
  // Mock data for now as sources tracking table was just created
  res.json({
    sources: [
      { name: 'Diario Oficial de la Federación', type: 'official', active: true },
      { name: 'Gobierno de Morelos', type: 'official', active: true },
      { name: 'Protección Civil', type: 'official', active: true },
      { name: 'Convocatorias', type: 'official', active: true },
      { name: 'Noticias Locales', type: 'secondary', active: true }
    ]
  });
});

app.get('/api/findings', async (req, res) => {
  const { category, riskLevel, limit } = req.query;
  const findings = await supabaseStore.getRecentFindings({
    limit: limit ? parseInt(limit) : 50,
    category,
    riskLevel
  });
  res.json({ findings });
});

app.get('/api/reports/latest', async (req, res) => {
  const report = await supabaseStore.getLatestReport();
  if (!report) return res.status(404).json({ error: 'No report found' });
  res.json(report);
});

app.listen(PORT, () => {
  console.log(`🌐 SIRCOM API levantada en puerto ${PORT}`);
});
