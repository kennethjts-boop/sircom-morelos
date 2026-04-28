const cron = require('node-cron');
const { exec } = require('child_process');

console.log('🕒 SIRCOM Scheduler Iniciado.');
console.log('Configurado para correr cada 6 horas...');

// Correr al iniciar si se requiere
if (process.env.RUN_ON_START === 'true') {
  console.log('Iniciando primer escaneo (RUN_ON_START=true)...');
  exec('npm run scan:official', (error, stdout, stderr) => {
    if (error) console.error(`Error ejecución inicial: ${error}`);
    console.log(stdout);
  });
}

// Configurar Cron cada 6 horas
cron.schedule('0 */6 * * *', () => {
  console.log('⏰ Ejecutando escaneo cron programado (cada 6h)...');
  exec('npm run scan:official', (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error en cron job: ${error.message}`);
      return;
    }
    console.log(stdout);
    if (stderr) console.error(stderr);
  });
}, {
  scheduled: true,
  timezone: process.env.APP_TIMEZONE || "America/Mexico_City"
});
