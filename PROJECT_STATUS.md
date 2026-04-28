# Estado Actual — SIRCOM Morelos

## Fecha de actualización
27 de Abril de 2026 (Local)

## Versión
v0.3.1-backend-productivo

## Estado general
El motor OSINT backend de SIRCOM se encuentra funcional, estable y debidamente calibrado para ejecutarse en entornos locales. Dispone de un fallback local resiliente en JSON, estando simultáneamente preparado y configurado a nivel código para conectarse a Supabase y enviar alertas vía Telegram.

## Funcionalidades operativas
- Escaneo OSINT de fuentes públicas y oficiales.
- Normalización centralizada de hallazgos.
- Deduplicación híbrida y resiliente (Local + Cloud).
- Scoring heurístico con reglas rígidas anti-falsas alertas.
- Reportes automatizados en Markdown.
- Sistema Telegram con protección Anti-Spam.
- Fallback local (FS persistente).
- Scheduler interno programado cada 6 horas.
- API REST básica (Express).

## Pendientes críticos antes de Fase 4
- Configurar llaves de Supabase reales.
- Ejecutar migraciones en el entorno Cloud de Supabase.
- Configurar tokens de Telegram reales.
- Desplegar Worker en entorno Serverless (Ej. Railway).
- Validar ejecución ininterrumpida del Scheduler.
- Documentar si es necesario activar `ALLOW_INSECURE_PUBLIC_SSL_FALLBACK` según el comportamiento futuro del sitio de Gobierno de Morelos.
- Preparar estructura de Frontend para el Dashboard interactivo.

## Riesgos técnicos conocidos
- Las páginas de gobierno u oficiales podrían cambiar su estructura HTML sin previo aviso (rompiendo los selectores de los scrapers).
- Gobierno de Morelos experimenta problemas intermitentes en la cadena de certificados de su servidor (`SSL alert 80`).
- Telegram interrumpirá temporalmente los bots si se intenta envíar spam (mitigado por nuestras reglas).
- Supabase requiere que la estructura de tablas esté sincronizada (mitigado mediante las migraciones SQL provistas).
- Riesgo de pánico si el Scoring detecta "lluvia" y emite una alerta "Roja" (mitigado mediante Fase 3.1).

## Decisiones tomadas
- **No** automatizar WhatsApp todavía.
- **No** automatizar Facebook todavía.
- **No** publicar información automáticamente en ningún medio masivo abierto sin que medie una revisión humana.
- **No** guardar ni publicar números de teléfono, correos, domicilios ni placas (Implementado módulo de Sanitización preventiva).
- **No** utilizar lenguaje acusatorio (Ej. "delincuente").
- **Priorizar en todo momento la protección comunitaria preventiva.**
