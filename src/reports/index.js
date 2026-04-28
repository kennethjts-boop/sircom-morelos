const fs = require('fs');
const path = require('path');
const config = require('../config');
const supabaseStore = require('../storage/supabase');

const generateReport = async (findings) => {
  const dateStr = new Date().toISOString().split('T')[0];
  const outputDir = path.resolve(process.cwd(), config.paths.reports);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const reportLatestPath = path.resolve(outputDir, `reporte_sircom_latest.md`);
  const reportDatePath = path.resolve(outputDir, `reporte_sircom_${dateStr}.md`);
  
  const rojas = findings.filter(f => f.risk_level === 'ROJO');
  const naranjas = findings.filter(f => f.risk_level === 'NARANJA');
  const amarillos = findings.filter(f => f.risk_level === 'AMARILLO');

  let nivelGeneral = 'VERDE';
  if (rojas.length > 0) nivelGeneral = 'ROJO';
  else if (naranjas.length > 0) nivelGeneral = 'NARANJA';
  else if (amarillos.length > 0) nivelGeneral = 'AMARILLO';

  let md = `# SIRCOM MORELOS\n`;
  md += `Sistema de Inteligencia de Riesgos Comunitarios de Morelos\n\n`;
  md += `**Corte:** ${new Date().toLocaleString()}\n`;
  md += `**Periodo:** Reciente\n`;
  md += `**Nivel general:** ${nivelGeneral}\n`;
  md += `**Hallazgos activos:** ${findings.length}\n\n`;
  
  md += `## 1. Resumen ejecutivo\n`;
  md += `El sistema ha analizado diversas fuentes abiertas y oficiales. Se reportan ${rojas.length} eventos críticos, ${naranjas.length} de riesgo medio y ${amarillos.length} preventivos. El enfoque actual es la protección comunitaria.\n\n`;
  
  md += `### Criterio de riesgo aplicado\n`;
  md += `El nivel general es **${nivelGeneral}** porque `;
  if (nivelGeneral === 'ROJO') md += `existen ${rojas.length} eventos categorizados como riesgo inminente, desastre o emergencia oficial que requieren acción humana inmediata.\n\n`;
  else if (nivelGeneral === 'NARANJA') md += `hay ${naranjas.length} eventos de atención moderada (ej. lluvias fuertes, acumulados) que requieren vigilancia comunitaria.\n\n`;
  else md += `la mayoría de los avisos son rutinas de monitoreo preventivo o convocatorias sin urgencia de vida o infraestructura.\n\n`;

  const writeSection = (title, categories) => {
    md += `## ${title}\n`;
    const sectionFindings = findings.filter(f => categories.some(cat => f.category && f.category.includes(cat)));
    if (sectionFindings.length === 0) {
      md += `*Sin reportes relevantes.*\n\n`;
    } else {
      sectionFindings.sort((a,b) => b.score - a.score).forEach(f => {
        md += `- [${f.risk_level}] **${f.title}**\n  Fuente: ${f.source_name} | Acción: ${f.recommended_action}\n`;
      });
      md += '\n';
    }
  };

  writeSection('2. Protección civil y clima', ['PROTECCION_CIVIL', 'LLUVIA_TORMENTA', 'RIO_INUNDACION']);
  writeSection('3. Incendios y puntos de calor', ['INCENDIO', 'CALOR_EXTREMO']);
  writeSection('4. Sismos y actividad volcánica', ['SISMO', 'VOLCAN_CENIZA']);
  writeSection('5. Seguridad ciudadana', ['SEGURIDAD_CIUDADANA', 'DESINFORMACION_RUMOR']);
  writeSection('6. Salud pública', ['SALUD_PUBLICA']);
  writeSection('7. Movilidad y servicios básicos', ['MOVILIDAD', 'SERVICIOS_BASICOS']);
  writeSection('8. Programas públicos y convocatorias', ['APOYOS_PROGRAMAS_PUBLICOS', 'CONVOCATORIAS', 'oficial', 'institucional']);

  md += `## 9. Fuentes y confiabilidad\n`;
  const sourcesList = [...new Set(findings.map(f => f.source_name))].join(', ');
  md += `Fuentes procesadas: ${sourcesList || 'Ninguna'}.\n\n`;

  md += `## 10. Recomendación operativa\n`;
  if (nivelGeneral === 'ROJO') md += `- **ALERTA INMEDIATA:** Revisar reportes críticos.\n`;
  else if (nivelGeneral === 'NARANJA') md += `- **Vigilancia preventiva:** Atender posibles acumulaciones de riesgo.\n`;
  else md += `- **Monitoreo normal:** Sin acciones inmediatas requeridas.\n`;

  md += `\n---\n`;
  md += `*Nota de responsabilidad:* Información preventiva basada en fuentes abiertas. No sustituye avisos oficiales ni constituye denuncia, investigación penal o acusación contra personas.\n`;
  
  fs.writeFileSync(reportLatestPath, md);
  fs.writeFileSync(reportDatePath, md);
  console.log(`📄 Reporte Markdown generado.`);

  await supabaseStore.saveReport({
    report_type: 'markdown_full',
    title: `Reporte SIRCOM ${dateStr}`,
    markdown_report: md,
    total_findings: findings.length,
    critical_findings: rojas.length,
    general_risk_level: nivelGeneral
  });

  return reportLatestPath;
};

module.exports = {
  generateReport
};
