const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const run = async () => {
  const findings = [];
  try {
    console.log('📡 [RADAR SECUNDARIO] Escaneando Noticias Locales de Morelos...');
    
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const { data } = await axios.get('https://www.diariodemorelos.com/', {
      httpsAgent,
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    
    const $ = cheerio.load(data);
    
    $('a').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr('href');
      
      if (!link || title.length < 20) return;
      
      const fullUrl = link.startsWith('http') ? link : `https://www.diariodemorelos.com${link}`;
      const textLower = title.toLowerCase();
      
      const terms = ['alerta', 'riesgo', 'seguridad', 'clima', 'municipio', 'comunidad'];
      
      if (terms.some(term => textLower.includes(term))) {
        findings.push({
          source_name: 'Diario de Morelos',
          source_type: 'news_secondary_signal',
          title: title,
          description: 'Noticia local - señal temprana',
          url: fullUrl,
          published_at: new Date().toISOString(),
          entity: 'Medio de Comunicación',
          location: 'Morelos',
          category: 'noticia',
          raw_text: title,
          confidence_level: 'secondary_signal'
        });
      }
    });
    
    return findings;
  } catch (error) {
    console.error(`❌ [RADAR ERROR] Noticias Locales: ${error.message}`);
    return [];
  }
};

module.exports = { run };
