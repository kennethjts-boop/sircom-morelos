const scrapers = require('./scrapers');
const normalizer = require('./normalizers');
const scoring = require('./scoring');
const storageLocal = require('./storage');
const deduplication = require('./storage/deduplication');
const telegram = require('./alerts/telegram');
const reports = require('./reports');
const supabaseStore = require('./storage/supabase');

const runScan = async (type) => {
  const runId = await supabaseStore.saveRun({ run_type: `scan:${type}`, status: 'running' });

  console.log('==========================================');
  console.log(`🤖 SIRCOM - Motor OSINT Iniciado [Modo: ${type}]`);
  console.log(`📡 Conexión Supabase: ${supabaseStore.isConfigured ? 'ACTIVA' : 'INACTIVA (Fallback Local)'}`);
  console.log('==========================================');

  telegram.resetCounter();
  const rawFindings = await scrapers.runAll(type);
  const existingFindings = storageLocal.getFindings();
  const newProcessedFindings = [];
  let importantCount = 0;
  let criticalCount = 0;

  for (const raw of rawFindings) {
    const finding = normalizer.normalizeFinding(raw);
    
    // Check local duplicate
    if (deduplication.isDuplicateLocal(finding, existingFindings) || deduplication.isDuplicateLocal(finding, newProcessedFindings)) {
      continue;
    }
    
    // Check Supabase duplicate
    const supaDup = await supabaseStore.getFindingByHash(finding.hash);
    if (supaDup) continue;

    const { score, level, urgency } = scoring.calculateScore(finding);
    finding.score = score;
    finding.risk_level = level;
    finding.urgency = urgency;

    if (level === 'ROJO' || level === 'NARANJA') importantCount++;
    if (level === 'ROJO') criticalCount++;

    newProcessedFindings.push(finding);
  }

  console.log(`\n📊 Resultados del Procesamiento:`);
  console.log(`- Hallazgos Crudos: ${rawFindings.length}`);
  console.log(`- Nuevos Hallazgos: ${newProcessedFindings.length}`);

  // Save to storage
  if (newProcessedFindings.length > 0) {
    await supabaseStore.saveFindings(newProcessedFindings);
    for (const finding of newProcessedFindings) {
      storageLocal.addFinding(finding);
      await telegram.sendAlert(finding);
    }
  }

  await telegram.sendSummary(newProcessedFindings);

  // Generate Report
  const allFindings = await supabaseStore.getRecentFindings({ limit: 100 });
  const reportPath = await reports.generateReport(allFindings);

  await supabaseStore.updateRun(runId.id, { 
    status: 'completed', 
    finished_at: new Date().toISOString(),
    total_raw: rawFindings.length,
    total_new: newProcessedFindings.length,
    total_alerts: criticalCount,
    report_path: reportPath
  });

  console.log('==========================================');
  console.log('✅ Escaneo Finalizado.');
};

const testStorage = () => {
  console.log('🧪 Probando Storage...');
  if (supabaseStore.isConfigured) {
    console.log('✅ Supabase configurado. Usando base de datos remota.');
  } else {
    console.log('⚠️ Supabase NO configurado. Usando JSON local.');
    storageLocal.readJSON('data/findings.json');
    console.log('✅ Base de datos JSON leída correctamente.');
  }
};

const statusCheck = async () => {
  console.log('📊 Estado del Sistema SIRCOM');
  console.log(`- Supabase: ${supabaseStore.isConfigured ? 'OK' : 'Off'}`);
  console.log(`- Telegram: ${process.env.TELEGRAM_BOT_TOKEN ? 'OK' : 'Off'}`);
  const rep = await supabaseStore.getLatestReport();
  if (rep) console.log(`- Último Reporte: ${rep.title}`);
};

const command = process.argv[2];

if (command === 'scan' || command === 'scan:all') {
  runScan('all').catch(err => console.error(err));
} else if (command === 'scan:official') {
  runScan('official').catch(err => console.error(err));
} else if (command === 'test:telegram') {
  telegram.sendSummary([{ risk_level: 'ROJO', category: 'TEST' }]).catch(console.error);
} else if (command === 'test:storage') {
  testStorage();
} else if (command === 'report') {
  supabaseStore.getRecentFindings({ limit: 100 }).then(f => reports.generateReport(f));
} else if (command === 'status') {
  statusCheck();
} else {
  console.log('Comando no reconocido.');
}
