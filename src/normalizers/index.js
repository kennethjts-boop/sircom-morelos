const v4 = require('uuid').v4;
const { generateHash } = require('../storage/deduplication');

// Regla de privacidad: Remover datos sensibles si se detectan
const sanitizeText = (text) => {
  if (!text) return '';
  let clean = text;
  // Reglas simples de sanitización preventiva (Remover supuestos nombres, placas, nums)
  // Reemplazar patrones de teléfonos (10 dígitos)
  clean = clean.replace(/\b\d{10}\b/g, '[TELÉFONO OMITIDO]');
  // Reemplazar correos
  clean = clean.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '[EMAIL OMITIDO]');
  
  // Reemplazo de palabras prohibidas de señalamiento personal
  const prohibidas = ['delincuente', 'culpable', 'robó', 'ladrón'];
  prohibidas.forEach(p => {
    const regex = new RegExp(`\\b${p}\\b`, 'gi');
    if (regex.test(clean)) {
      clean = clean.replace(regex, 'posible implicado');
    }
  });

  return clean;
};

const normalizeFinding = (raw) => {
  const now = new Date().toISOString();
  
  const finding = {
    id: v4(),
    source_name: raw.source_name || 'Desconocido',
    source_type: raw.source_type || 'web',
    title: sanitizeText(raw.title || 'Sin Título'),
    description: sanitizeText(raw.description || ''),
    url: raw.url || '',
    published_at: raw.published_at || now,
    detected_at: now,
    entity: raw.entity || 'General',
    location: raw.location || 'Morelos',
    category: raw.category || 'general',
    tags: raw.tags || [],
    score: raw.score || 0,
    urgency: raw.urgency || 'baja',
    opportunity_type: raw.opportunity_type || null,
    risk_level: raw.risk_level || 'ninguno',
    confidence_level: raw.confidence_level || 'unknown',
    why_it_matters: raw.why_it_matters || '',
    recommended_action: raw.recommended_action || 'Monitoreo preventivo',
    raw_text: raw.raw_text || '',
    clean_text: sanitizeText(raw.raw_text || ''),
    hash: '', // will be set
    personal_data_removed: false,
    created_at: now,
    updated_at: now
  };

  finding.hash = generateHash(finding);
  
  // Flag si se limpió algo muy evidente (heurisitca simple)
  if (finding.title !== raw.title || finding.clean_text !== finding.raw_text) {
    finding.personal_data_removed = true;
    if (finding.confidence_level === 'secondary_signal') {
      finding.title = "Señal ciudadana no verificada sobre posible incidente en zona aproximada.";
      finding.description = "Se han omitido detalles por protocolo preventivo.";
    }
  }

  return finding;
};

module.exports = {
  normalizeFinding,
  sanitizeText
};
