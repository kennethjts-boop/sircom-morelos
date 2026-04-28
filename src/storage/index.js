const fs = require('fs');
const path = require('path');
const config = require('../config');

// Ensure data files exist
const ensureFiles = () => {
  [config.paths.findings, config.paths.runs, config.paths.sources].forEach(filePath => {
    const fullPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, JSON.stringify([]));
    }
  });
};

const readJSON = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (err) {
    return [];
  }
};

const writeJSON = (filePath, data) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
};

const getFindings = () => readJSON(config.paths.findings);
const saveFindings = (findings) => writeJSON(config.paths.findings, findings);

const addFinding = (finding) => {
  const findings = getFindings();
  findings.push(finding);
  saveFindings(findings);
};

ensureFiles();

module.exports = {
  getFindings,
  saveFindings,
  addFinding,
  readJSON,
  writeJSON
};
