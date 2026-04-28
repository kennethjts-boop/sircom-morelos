const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const run = async () => {
  const findings = [];
  try {
    console.log('📡 [RADAR] Escaneando Diario Oficial de la Federación (DOF)...');
    
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const { data } = await axios.get('https://dof.gob.mx/', {
      httpsAgent,
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    
    const $ = cheerio.load(data);
    
    $('a').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr('href');
      
      if (!link || title.length < 15) return;
      
      const fullUrl = link.startsWith('http') ? link : `https://dof.gob.mx/${link.replace(/^\//, '')}`;
      const textLower = title.toLowerCase();
      
      const terms = ['convocatoria', 'apoyo', 'programa', 'subsidio', 'lineamientos', 'reglas de operación', 'educación', 'salud', 'cultura', 'deporte', 'municipio', 'morelos', 'protección civil', 'licitación', 'emergencia', 'bienestar', 'comunidades', 'jóvenes', 'mujeres', 'escuelas'];
      
      const isRelevant = terms.some(term => textLower.includes(term));
      
      if (isRelevant) {
        findings.push({
          source_name: 'Diario Oficial de la Federación',
          source_type: 'official',
          title: title,
          description: 'Publicación oficial del DOF',
          url: fullUrl,
          published_at: new Date().toISOString(),
          entity: 'Gobierno Federal',
          location: 'Nacional / Morelos',
          category: 'oficial',
          raw_text: title,
          confidence_level: 'official_high'
        });
      }
    });
    
    return findings;
  } catch (error) {
    console.error(`❌ [RADAR ERROR] DOF: ${error.message}`);
    return []; // Return empty array to not break the pipeline
  }
};

module.exports = { run };
