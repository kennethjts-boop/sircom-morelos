const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const run = async () => {
  const findings = [];
  try {
    console.log('📡 Escaneando noticias locales de Morelos...');
    
    // Using a generic local news site or fallback to avoid strict TLS issues
    const url = 'https://www.diariodemorelos.com/';
    
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    
    const { data } = await axios.get(url, {
      httpsAgent,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(data);
    
    $('a').each((i, el) => {
      const title = $(el).text().trim();
      let link = $(el).attr('href');
      
      if (!link) return;
      if (link.startsWith('/')) link = `https://www.diariodemorelos.com${link}`;
      
      // Keywords that trigger SIRCOM heuristics
      const textLower = title.toLowerCase();
      if (
        title.length > 20 && 
        (textLower.includes('convocatoria') || 
         textLower.includes('alerta') || 
         textLower.includes('riesgo') || 
         textLower.includes('gobierno') || 
         textLower.includes('municipio') || 
         textLower.includes('clima') ||
         textLower.includes('seguridad'))
      ) {
        findings.push({
          source_name: 'Diario de Morelos',
          source_type: 'web_scraping',
          title: title,
          url: link,
          entity: 'General',
          category: 'noticias_locales',
          why_it_matters: 'Monitoreo de noticias públicas relevantes para la comunidad.',
          raw_text: title
        });
      }
    });
    
    // Deduplicate
    const uniqueFindings = [];
    const urls = new Set();
    for (const f of findings) {
      if (!urls.has(f.url)) {
        urls.add(f.url);
        uniqueFindings.push(f);
      }
    }
    
    return uniqueFindings;
  } catch (error) {
    console.error('❌ Error en radar:', error.message);
    return [];
  }
};

module.exports = {
  run
};
