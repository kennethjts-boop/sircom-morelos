const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const run = async () => {
  const findings = [];
  try {
    console.log('📡 [RADAR] Escaneando Protección Civil / Riesgos...');
    
    // Using a generic national or local PC site, or CONAGUA as proxy for testing
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const { data } = await axios.get('https://smn.conagua.gob.mx/es/', {
      httpsAgent,
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    
    const $ = cheerio.load(data);
    
    $('a').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr('href');
      
      if (!link || title.length < 15) return;
      
      const fullUrl = link.startsWith('http') ? link : `https://smn.conagua.gob.mx${link}`;
      const textLower = title.toLowerCase();
      
      const terms = ['alerta', 'riesgo', 'clima', 'incendio', 'lluvia', 'contingencia', 'cierre', 'recomendación', 'emergencia', 'sismo', 'volcán'];
      
      if (terms.some(term => textLower.includes(term))) {
        findings.push({
          source_name: 'Protección Civil / SMN',
          source_type: 'official',
          title: title,
          description: 'Alerta de Protección Civil / Clima',
          url: fullUrl,
          published_at: new Date().toISOString(),
          entity: 'Protección Civil',
          location: 'Morelos / Nacional',
          category: 'alerta',
          raw_text: title,
          confidence_level: 'official_high'
        });
      }
    });
    
    return findings;
  } catch (error) {
    console.error(`❌ [RADAR ERROR] Protección Civil: ${error.message}`);
    return [];
  }
};

module.exports = { run };
