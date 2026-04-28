const crypto = require('crypto');

const hashString = (str) => {
  return crypto.createHash('sha256').update(str).digest('hex');
};

const generateHash = (finding) => {
  // Generar hash estable por título + url + categoría
  const raw = `${finding.title || ''}|${finding.url || ''}|${finding.category || ''}`.trim().toLowerCase();
  return hashString(raw);
};

const isDuplicateLocal = (newFinding, existingFindings) => {
  const hash = newFinding.hash || generateHash(newFinding);
  return existingFindings.some(f => f.hash === hash || f.raw_html_hash === hash);
};

module.exports = {
  isDuplicateLocal,
  generateHash,
  hashString
};
