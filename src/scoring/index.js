const { rules } = require('./rules');

const detectSeverityKeywords = (text, categoryRules) => {
  if (!categoryRules) return 'VERDE';
  
  const lowerText = text.toLowerCase();
  
  const matches = (keywords) => keywords.some(k => lowerText.includes(k.toLowerCase()));

  if (matches(categoryRules.rojo)) return 'ROJO';
  if (matches(categoryRules.naranja)) return 'NARANJA';
  if (matches(categoryRules.amarillo)) return 'AMARILLO';
  
  return 'VERDE';
};

const detectOfficialEmergencyLanguage = (text) => {
  const emergencyWords = ['alerta máxima', 'evacuación inmediata', 'declaratoria de emergencia', 'estado de emergencia', 'alerta oficial severa'];
  return emergencyWords.some(w => text.toLowerCase().includes(w));
};

const determineCategory = (text) => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('sismo') || lowerText.includes('temblor')) return 'SISMO';
  if (lowerText.includes('volcán') || lowerText.includes('ceniza') || lowerText.includes('popocatépetl')) return 'VOLCAN_CENIZA';
  if (lowerText.includes('lluvia') || lowerText.includes('tormenta') || lowerText.includes('huracán')) return 'LLUVIA_TORMENTA';
  if (lowerText.includes('río') || lowerText.includes('inundación') || lowerText.includes('desbordamiento')) return 'RIO_INUNDACION';
  if (lowerText.includes('incendio') || lowerText.includes('fuego') || lowerText.includes('punto de calor')) return 'INCENDIO';
  if (lowerText.includes('salud') || lowerText.includes('dengue') || lowerText.includes('brote') || lowerText.includes('epidemia')) return 'SALUD_PUBLICA';
  if (lowerText.includes('calor') || lowerText.includes('temperatura')) return 'CALOR_EXTREMO';
  if (lowerText.includes('seguridad') || lowerText.includes('violencia') || lowerText.includes('asalto') || lowerText.includes('robo')) return 'SEGURIDAD_CIUDADANA';
  if (lowerText.includes('tráfico') || lowerText.includes('bloqueo') || lowerText.includes('accidente') || lowerText.includes('cierre')) return 'MOVILIDAD';
  if (lowerText.includes('convocatoria') || lowerText.includes('licitación') || lowerText.includes('registro') || lowerText.includes('becas')) return 'CONVOCATORIAS';
  if (lowerText.includes('apoyo') || lowerText.includes('programa social') || lowerText.includes('subsidio')) return 'APOYOS_PROGRAMAS_PUBLICOS';
  if (lowerText.includes('protección civil') || lowerText.includes('emergencia')) return 'PROTECCION_CIVIL';
  
  return 'OTRO';
};

const calculateConfidenceLevel = (finding) => {
  if (finding.confidence_level === 'official_high' || finding.confidence_level === 'official_medium') {
    return finding.confidence_level;
  }
  return 'secondary_signal';
};

const calculateRiskLevel = (finding, category) => {
  const textToAnalyze = `${finding.title} ${finding.description} ${finding.category} ${finding.raw_text}`;
  
  let risk = 'VERDE';
  const categoryKey = category.toLowerCase();
  
  if (rules[categoryKey]) {
    risk = detectSeverityKeywords(textToAnalyze, rules[categoryKey]);
  } else if (category === 'PROTECCION_CIVIL') {
    if (detectOfficialEmergencyLanguage(textToAnalyze)) risk = 'ROJO';
    else if (textToAnalyze.toLowerCase().includes('emergencia')) risk = 'ROJO';
    else risk = 'AMARILLO';
  } else if (category === 'OTRO') {
    if (detectOfficialEmergencyLanguage(textToAnalyze)) risk = 'ROJO';
  }

  if (risk === 'VERDE') {
      if (calculateConfidenceLevel(finding) === 'secondary_signal' && category === 'SEGURIDAD_CIUDADANA') {
          risk = 'AMARILLO';
      }
      if (category === 'CONVOCATORIAS' || category === 'APOYOS_PROGRAMAS_PUBLICOS') {
          risk = 'AMARILLO';
      }
  }

  // Downgrade si no es oficial y es ROJO
  if (risk === 'ROJO' && calculateConfidenceLevel(finding) === 'secondary_signal') {
    if (!detectOfficialEmergencyLanguage(textToAnalyze)) {
      risk = 'NARANJA'; // Prevenir pánico de fuentes secundarias
    }
  }

  return risk;
};

const calculateScore = (finding) => {
  let score = 0;
  
  const text = `${finding.title} ${finding.description}`.toLowerCase();
  
  const category = finding.category && finding.category !== 'general' && finding.category !== 'institucional' && finding.category !== 'noticia' && finding.category !== 'oficial'
    ? finding.category 
    : determineCategory(text);
    
  finding.category = category;

  const riskLevel = calculateRiskLevel(finding, category);
  
  // Base score by risk
  if (riskLevel === 'ROJO') score += 80;
  else if (riskLevel === 'NARANJA') score += 60;
  else if (riskLevel === 'AMARILLO') score += 40;
  else score += 10; // VERDE

  // Ajustes
  if (calculateConfidenceLevel(finding).includes('official')) score += 10;
  if (calculateConfidenceLevel(finding) === 'secondary_signal') score -= 15;

  if (category === 'APOYOS_PROGRAMAS_PUBLICOS' || category === 'CONVOCATORIAS') {
    score = Math.min(score, 50); // Nunca superan 50 a menos que sean emergencias
    if (text.includes('emergencia') || text.includes('desastre')) score += 30; // Excepción
  }

  score = Math.max(0, Math.min(score, 100));

  let finalRiskLevel = riskLevel;
  if (score < 40 && riskLevel !== 'VERDE') finalRiskLevel = 'AMARILLO';
  
  // Explicit hard cap check
  if (score >= 80) finalRiskLevel = 'ROJO';
  else if (score >= 60 && finalRiskLevel !== 'ROJO') finalRiskLevel = 'NARANJA';

  return {
    score,
    level: finalRiskLevel,
    urgency: finalRiskLevel === 'ROJO' ? 'alta' : (finalRiskLevel === 'NARANJA' ? 'media' : 'baja')
  };
};

module.exports = {
  calculateScore,
  calculateRiskLevel,
  calculateConfidenceLevel,
  detectSeverityKeywords,
  detectOfficialEmergencyLanguage
};
