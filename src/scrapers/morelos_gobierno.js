const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
const config = require('../config');

const run = async () => {
  const findings = [];
  try {
    console.log('📡 [RADAR] Escaneando Gobierno de Morelos...');
    
    // Retry logic
    let data;
    let success = false;
    let attempts = 0;
    
    // Check if insecure SSL fallback is enabled via env
    const allowInsecure = process.env.ALLOW_INSECURE_PUBLIC_SSL_FALLBACK === 'true';
    const httpsAgent = allowInsecure ? new https.Agent({ rejectUnauthorized: false }) : new https.Agent();

    while (attempts < 2 && !success) {
      try {
        attempts++;
        const res = await axios.get('https://morelos.gob.mx/', {
          httpsAgent,
          timeout: 10000,
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SIRCOM/1.0' }
        });
        data = res.data;
        success = true;
      } catch (err) {
        if (attempts >= 2) throw err;
        console.log(`⏳ Reintentando conexión a Gobierno de Morelos (Intento ${attempts + 1})...`);
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    
    const $ = cheerio.load(data);
    
    $('a').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr('href');
      
      if (!link || title.length < 15) return;
      
      const fullUrl = link.startsWith('http') ? link : `https://morelos.gob.mx/${link.replace(/^\//, '')}`;
      const textLower = title.toLowerCase();
      
      const categories = ['programas sociales', 'salud', 'educación', 'cultura', 'deporte', 'protección civil', 'desarrollo económico', 'obras públicas', 'municipio', 'juventud', 'mujeres', 'campo', 'seguridad'];
      
      const isRelevant = categories.some(cat => textLower.includes(cat)) || textLower.includes('convocatoria') || textLower.includes('apoyo');
      
      if (isRelevant) {
        findings.push({
          source_name: 'Gobierno de Morelos',
          source_type: 'official',
          title: title,
          description: 'Comunicado / Publicación de Gobierno',
          url: fullUrl,
          published_at: new Date().toISOString(),
          entity: 'Gobierno Estatal',
          location: 'Morelos',
          category: 'institucional',
          raw_text: title,
          confidence_level: 'official_high'
        });
      }
    });
    
    return findings;
  } catch (error) {
    console.error(`❌ [RADAR ERROR] Gobierno Morelos: ${error.message}`);
    // Register error but do not throw, so it continues
    return [];
  }
};

module.exports = { run };
