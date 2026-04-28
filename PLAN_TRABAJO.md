# Plan de Trabajo — SIRCOM Morelos

## Fase 0 — Concepto y alcance
**Estado:** Completado.
**Descripción:** Definición del sistema, objetivos, radares, enfoque ético y preventivo.

## Fase 1 — Diseño conceptual e identidad
**Estado:** Completado parcialmente.
**Descripción:** Identidad visual generada con AI Design. Assets listos para usarse en dashboard.

## Fase 2 — Motor OSINT inicial
**Estado:** Completado.
**Incluye:**
- scrapers iniciales
- DOF
- Gobierno Morelos
- Protección Civil / clima
- Convocatorias
- Noticias locales como señal secundaria
- normalización
- scoring inicial
- reportes Markdown
- Telegram preparado

## Fase 3 — Productivización backend
**Estado:** Completado.
**Incluye:**
- Supabase preparado
- fallback local
- scheduler cada 6 horas
- API mínima
- Telegram anti-spam
- reportes mejorados
- sanitización
- deduplicación híbrida

## Fase 3.1 — Calibración de riesgo
**Estado:** Completado.
**Objetivo:** Evitar falsas alertas rojas y mejorar scoring por severidad real.
**Tareas Logradas:**
- refactorizar scoring
- agregar reglas por radar
- agregar npm run test:scoring
- mejorar distribución de riesgo
- ajustar Telegram por umbral
- mejorar API status

## Fase 4 — Dashboard web
**Estado:** Pendiente.
**Objetivo:** Crear interfaz visual interactiva para consultar el sistema.
**Debe incluir:**
- estado general de Morelos
- tarjetas por radar
- tabla de hallazgos
- filtros
- último reporte
- copiar texto WhatsApp
- copiar texto Facebook
- estado de fuentes
- botón ejecutar scan
- semáforo de riesgo
- mapa o placeholder geográfico

## Fase 5 — Integración Supabase real y Railway
**Estado:** Pendiente.
**Objetivo:** Dejar el sistema corriendo 24/7 de manera ininterrumpida.

## Fase 6 — Publicación manual asistida
**Estado:** Pendiente.
**Objetivo:** Generar publicaciones listas para Facebook y WhatsApp, pero exclusivamente con aprobación humana.

## Fase 7 — Canales comunitarios
**Estado:** Pendiente.
**Objetivo:** Poner en marcha un Canal de WhatsApp, página de Facebook, Telegram interno y boletines.

## Fase 8 — Agente de consulta
**Estado:** Pendiente.
**Objetivo:** Integrar un LLM (Agente AI) para responder a preguntas geolocalizadas (Ej. "¿Cómo está Jojutla?", "¿Hay riesgo por ceniza en Cuautla?").

## Fase 9 — App móvil futura
**Estado:** Futuro.
**Objetivo:** Notificaciones push segmentadas por municipio, escuela, comercio o comunidad.

## Fase 10 — Modelo comercial
**Estado:** Futuro.
**Objetivo:** Desarrollar planes de inteligencia a medida para comercios, escuelas, fraccionamientos, municipios y asociaciones civiles.
