const { calculateScore } = require('./index');

const runTests = () => {
  let passed = 0;
  let failed = 0;

  const assertRisk = (name, text, expectedRisk, expectedCategory, confidence = 'official_high') => {
    const finding = { title: text, description: '', raw_text: '', category: 'general', confidence_level: confidence };
    const result = calculateScore(finding);
    if (result.level === expectedRisk && (expectedCategory ? finding.category === expectedCategory : true)) {
      console.log(`✅ [PASS] ${name} -> ${result.level} (${finding.category})`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name}`);
      console.error(`   Esperado: ${expectedRisk} [${expectedCategory}]`);
      console.error(`   Obtenido: ${result.level} [${finding.category}]`);
      failed++;
    }
  };

  console.log('🧪 Iniciando pruebas de Scoring y Calibración...\n');

  assertRisk('Lluvia ligera', 'Se pronostica lluvia aislada en Cuernavaca', 'AMARILLO', 'LLUVIA_TORMENTA');
  assertRisk('Lluvia fuerte', 'Tormenta eléctrica y lluvia fuerte esta noche', 'NARANJA', 'LLUVIA_TORMENTA');
  assertRisk('Desbordamiento', 'Evacuación por desbordamiento del río Yautepec. Alerta roja.', 'ROJO', 'RIO_INUNDACION');
  assertRisk('Popocatépetl normal', 'El volcán presenta exhalaciones moderadas', 'AMARILLO', 'VOLCAN_CENIZA');
  assertRisk('Ceniza probable', 'Caída probable de ceniza en Tetela del Volcán', 'NARANJA', 'VOLCAN_CENIZA');
  assertRisk('Emergencia volcánica', 'Alerta oficial severa, cambio a semáforo rojo volcánico', 'ROJO', 'VOLCAN_CENIZA');
  assertRisk('Sismo menor lejano', 'Sismo perceptible leve magnitud 4.0 en Guerrero', 'AMARILLO', 'SISMO');
  assertRisk('Sismo con daños', 'Sismo fuerte con daños reportados en Jojutla, evacuación en proceso', 'ROJO', 'SISMO');
  assertRisk('Seguridad señal', 'Vecinos reportan asalto en la colonia', 'AMARILLO', 'SEGURIDAD_CIUDADANA', 'secondary_signal');
  assertRisk('Seguridad múltiple', 'Fuente periodística local reporta patrón emergente de robos', 'NARANJA', 'SEGURIDAD_CIUDADANA', 'secondary_signal');
  assertRisk('Oficial crítica', 'Protección civil declara estado de emergencia', 'ROJO', 'PROTECCION_CIVIL');
  assertRisk('Convocatoria normal', 'Abren convocatoria para becas escolares', 'AMARILLO', 'CONVOCATORIAS');

  console.log('\n📊 Resumen de Pruebas:');
  console.log(`✅ Pasadas: ${passed}`);
  console.log(`❌ Fallidas: ${failed}`);
  
  if (failed > 0) process.exit(1);
};

runTests();
