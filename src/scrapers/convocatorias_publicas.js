const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const run = async () => {
  const findings = [];
  try {
    console.log('📡 [RADAR] Escaneando Convocatorias y Apoyos...');
    
    // We can target gob.mx or similar
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const { data } = await axios.get('https://www.gob.mx/busqueda?utf8=%E2%9C%93&site=convocatorias', {
      httpsAgent,
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    
    const $ = cheerio.load(data);
    
    $('a').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr('href');
      
      if (!link || title.length < 15) return;
      
      const fullUrl = link.startsWith('http') ? link : `https://www.gob.mx${link}`;
      const textLower = title.toLowerCase();
      
      const terms = ['convocatoria', 'apoyo', 'beca', 'fondo', 'subsidio', 'donataria', 'osc'];
      
      if (terms.some(term => textLower.includes(term))) {
        findings.push({
          source_name: 'Portal de Convocatorias',
          source_type: 'official',
          title: title,
          description: 'Oportunidad pública detectada',
          url: fullUrl,
          published_at: new Date().toISOString(),
          entity: 'Gobierno',
          location: 'Nacional / Morelos',
          category: 'convocatoria',
          raw_text: title,
          confidence_level: 'official_medium'
        });
      }
    });
    
    return findings;
  } catch (error) {
    console.error(`❌ [RADAR ERROR] Convocatorias y Apoyos: ${error.message}`);
    return [];
  }
};

module.exports = { run };
