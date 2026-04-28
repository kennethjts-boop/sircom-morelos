# Reglas Éticas y de Seguridad

SIRCOM Morelos ha sido concebido desde el día uno como un **sistema ético de prevención ciudadana**, no como un portal de nota roja o vigilancia social.

Todas las interacciones, tanto automáticas como manuales, están supeditadas a las siguientes normas inquebrantables.

## Lo que SIRCOM NO HACE
1. **No acusa personas:** Bajo ninguna circunstancia el sistema asume, predice ni pública condenas contra individuos.
2. **No expone datos personales:** Los scrapers no almacenarán nombres de sospechosos, placas, números telefónicos privados ni domicilios exactos de víctimas.
3. **No realiza vigilancia individual:** El sistema monitorea fenómenos (clima, bloqueos, convocatorias, reportes macro), no rastrea la ubicación ni actividad de una persona.
4. **No vulnera grupos privados:** Toda fuente procesada es legalmente pública (Fuentes Abiertas - OSINT puro).
5. **No evade controles técnicos agresivos:** Si una página implementa Captchas, se asume un bloqueo y se retira el radar.
6. **No genera pánico:** Las notificaciones están filtradas y calibradas. Una lluvia aislada o un sismo imperceptible nunca generará alertas "ROJAS".
7. **No sustituye a la autoridad:** SIRCOM siempre incluye un *Disclaimer* indicando que su información es preventiva y no reemplaza los canales oficiales de Protección Civil.

## Niveles de Confianza (Confidence Level)
- **Oficial (Alta / Media):** Gobiernos, Boletines del SMN, SSN, CENAPRED, Institutos.
- **Señal Secundaria:** Periódicos, blogs, reportes ciudadanos en foros abiertos.

*Las señales secundarias sufren una penalización de puntaje y no pueden catalogarse como Riesgo ROJO a menos que haya múltiples confirmaciones.*

## Lenguaje y Sanitización
Se implementa una función de Sanitización en `normalizers/index.js` que detecta y reemplaza textos.

### Lenguaje Permitido y Deseado
- "Señal preventiva"
- "Reporte ciudadano no verificado"
- "Fuente oficial"
- "Fuente secundaria"
- "Posible riesgo"
- "Monitoreo recomendado"
- "Nivel de riesgo"

### Lenguaje Prohibido (Auto-Omitido)
- "Delincuente"
- "Culpable"
- "[Nombre de persona] robó..."
- "Zona tomada"
- "Alerta máxima" (Si no proviene de un canal gubernamental validado)

## Publicación Manual Asistida
Actualmente SIRCOM no tuitea ni postea de manera autónoma. Todo el resultado se empaqueta en reportes Markdown o se envía a grupos internos (privados) de Telegram, donde **deberá intervenir un ser humano** antes de que la información escale a grupos vecinales, redes sociales abiertas u otros canales públicos.
