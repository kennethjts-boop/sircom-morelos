const supabaseStore = require('./supabase');

const runCheck = async () => {
  console.log('🧪 Iniciando prueba de conexión con Supabase...');

  if (!supabaseStore.isConfigured) {
    console.log('⚠️ Las variables de Supabase (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) no están configuradas en .env');
    console.log('   El sistema utilizará el almacenamiento JSON local de forma predeterminada.');
    process.exit(0);
  }

  try {
    const client = supabaseStore.getClient();
    const { data, error } = await client.from('sources').select('count', { count: 'exact' });
    
    if (error) throw error;

    console.log('✅ Conexión REST a Supabase exitosa.');
    console.log(`✅ Lectura validada.`);
    console.log('🚀 El entorno productivo está listo.');

  } catch (err) {
    console.error('❌ Error conectando con Supabase:', err.message);
    console.error('   Revisa que tu URL y Key sean correctos y que las migraciones se hayan ejecutado.');
    process.exit(1);
  }
};

runCheck();
