const rules = {
  lluvia_tormenta: {
    rojo: ['desbordamiento', 'evacuación', 'emergencia', 'alerta roja', 'inundación severa', 'riesgo alto', 'corriente peligrosa'],
    naranja: ['lluvia fuerte', 'tormenta eléctrica', 'acumulados relevantes', 'zonas afectadas', 'riesgo de encharcamiento'],
    amarillo: ['probabilidad de lluvia', 'lluvia aislada', 'aviso preventivo']
  },
  rio_inundacion: {
    rojo: ['desbordamiento confirmado', 'evacuación', 'cierre de paso', 'rescate', 'alerta oficial de inundación', 'alerta roja'],
    naranja: ['crecida relevante', 'zona baja en vigilancia', 'escurrimientos fuertes', 'alerta naranja'],
    amarillo: ['aumento preventivo', 'lluvia en zona de cauces']
  },
  incendio: {
    rojo: ['incendio activo confirmado', 'evacuación', 'viviendas en riesgo', 'cierre carretero', 'emergencia por incendio'],
    naranja: ['puntos de calor cercanos', 'incendio forestal', 'condiciones de propagación'],
    amarillo: ['punto de calor aislado', 'quema posible', 'humo reportado']
  },
  sismo: {
    rojo: ['daños reportados', 'evacuación', 'comunicado oficial de afectación', 'magnitud alta cercana', 'sismo fuerte'],
    naranja: ['sismo perceptible ampliamente', 'reportes ciudadanos múltiples', 'magnitud relevante'],
    amarillo: ['sismo perceptible leve', 'magnitud moderada', 'magnitud baja']
  },
  volcan_ceniza: {
    rojo: ['alerta oficial severa', 'caída intensa', 'afectación a municipios', 'suspensión de actividades', 'semáforo rojo'],
    naranja: ['caída probable de ceniza', 'explosiones moderadas', 'recomendación preventiva'],
    amarillo: ['exhalaciones', 'monitoreo preventivo', 'semáforo amarillo']
  },
  seguridad_ciudadana: {
    rojo: ['alto impacto confirmado', 'afectación directa comunitaria', 'múltiples fuentes confiables'],
    naranja: ['varias señales similares', 'fuente periodística local', 'patrón emergente'],
    amarillo: ['señal ciudadana no verificada', 'asalto', 'robo', 'reportan', 'vecinos']
  },
  salud_publica: {
    rojo: ['brote confirmado', 'emergencia sanitaria', 'suspensión oficial'],
    naranja: ['incremento de casos', 'aviso epidemiológico', 'riesgo escolar'],
    amarillo: ['recomendación preventiva', 'vigilancia epidemiológica']
  },
  calor_extremo: {
    rojo: ['ola de calor severa', 'temperaturas extremas', 'riesgo fuerte para salud'],
    naranja: ['temperaturas altas relevantes', 'riesgo para grupos vulnerables'],
    amarillo: ['calor moderado']
  },
  movilidad: {
    rojo: ['cierre total', 'emergencia vial', 'bloqueo regional', 'deslave'],
    naranja: ['cierre parcial', 'accidente relevante', 'bloqueo localizado'],
    amarillo: ['tráfico', 'reporte menor']
  },
  convocatorias: {
    rojo: [],
    naranja: ['urgente', 'último día'],
    amarillo: ['convocatoria', 'becas', 'registro', 'apoyo']
  }
};

const defaultCategories = [
  'PROTECCION_CIVIL', 'LLUVIA_TORMENTA', 'RIO_INUNDACION', 'INCENDIO',
  'SISMO', 'VOLCAN_CENIZA', 'SEGURIDAD_CIUDADANA', 'SALUD_PUBLICA',
  'CALOR_EXTREMO', 'MOVILIDAD', 'RIESGO_ESCOLAR', 'SERVICIOS_BASICOS',
  'DESINFORMACION_RUMOR', 'APOYOS_PROGRAMAS_PUBLICOS', 'CONVOCATORIAS', 'OTRO'
];

module.exports = {
  rules,
  defaultCategories
};
