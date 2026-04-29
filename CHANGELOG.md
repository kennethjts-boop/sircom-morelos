## v0.4.1 — Dashboard MVP consolidado
- Consolidación de dashboard web con manejo robusto de loading/error/estados vacíos.
- Filtros avanzados de hallazgos (texto, municipio, categoría, riesgo, confianza) y paginación.
- Tarjetas por radar, gráficas simples CSS y panel territorial top municipios.
- Mejora de `/api/status` con estructura extendida y fallbacks seguros.
- Estado de fuentes con mensajes técnicos preventivos y sin alarmismo.

# Changelog — SIRCOM Morelos

## v0.3.1 — Calibración y Confiabilidad
- Introducción de `rules.js` para calibración estricta de scoring.
- Implementación de semántica para evitar falsos positivos "ROJO".
- Nueva lógica de Telegram con la flag `TELEGRAM_ALERT_NARANJA`.
- Inclusión del script `npm run test:scoring`.
- Endpoint mejorado `/api/status` y nuevo `/api/sources/status`.
- Preparación lista y documentada para repositorio público.

## v0.3 — Productivización backend
- Supabase preparado y migraciones SQL.
- Fallback local de base de datos JSON implementado de manera resiliente.
- Scheduler (Cron job) inyectado cada 6 horas.
- API básica (Express) construida.
- Telegram anti-spam implementado.
- Reportes Markdown reestructurados y jerarquizados por categorías de riesgo.
- Algoritmo de sanitización básica (oculta números y correos).
- Deduplicación híbrida (Hash estable + Local + Supabase).

## v0.2 — Motor OSINT inicial
- Scrapers iniciales desarrollados.
- Radares: DOF, Gobierno Morelos, Protección Civil / SMN, Convocatorias Públicas.
- Radar de Noticias locales como señal secundaria (penalizada por score).
- Lógica de normalización.
- Primer modelo de Reporte Markdown.

## v0.1 — Concepto inicial
- Definición de proyecto SIRCOM.
- Estructuración de Radares comunitarios.
- Establecimiento del enfoque 100% preventivo.
- Redacción de reglas éticas fundamentales.
