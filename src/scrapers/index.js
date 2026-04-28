const dof = require('./dof');
const morelosGobierno = require('./morelos_gobierno');
const proteccionCivil = require('./proteccion_civil');
const convocatoriasPublicas = require('./convocatorias_publicas');
const noticiasMorelos = require('./noticias_morelos');

const runAll = async (type = 'all') => {
  let allFindings = [];
  
  // Official Sources
  if (type === 'official' || type === 'all') {
    const findingsDof = await dof.run();
    const findingsMorelos = await morelosGobierno.run();
    const findingsPC = await proteccionCivil.run();
    const findingsConvocatorias = await convocatoriasPublicas.run();
    
    allFindings = allFindings.concat(findingsDof, findingsMorelos, findingsPC, findingsConvocatorias);
  }
  
  // Secondary Sources
  if (type === 'all') {
    const findingsNoticias = await noticiasMorelos.run();
    allFindings = allFindings.concat(findingsNoticias);
  }
  
  return allFindings;
};

module.exports = {
  runAll
};
