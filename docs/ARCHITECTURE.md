# Arquitectura General de SIRCOM

El Sistema de Inteligencia de Riesgos Comunitarios de Morelos (SIRCOM) se estructura mediante un pipeline lineal (ETL especializado) enfocado a obtener señales crudas del entorno web y transformarlas en alertas de alta calidad.

## 1. El Flujo de Datos

El ciclo de vida de un hallazgo sigue este orden:

\`\`\`
Fuentes públicas (Web/APIs)
        ↓
Scrapers (Radares Node.js / Cheerio)
        ↓
Raw findings (JSON Crudo)
        ↓
Normalización (Estandarización al modelo SIRCOM)
        ↓
Sanitización (Remoción de Placas, Teléfonos, Nombres, Acusaciones)
        ↓
Scoring (Evaluación heurística basada en Reglas Strict)
        ↓
Deduplicación (Hash SHA-256 vs Storage Local y Supabase)
        ↓
Storage Local (JSON Fallback) o Supabase (PostgreSQL / REST)
        ↓
Reportes (Generador Markdown)
        ↓
Telegram (Alertas Anti-spam, Resumen Ejecutivo)
        ↓
API (Endpoints REST locales)
        ↓
Dashboard Futuro (Interfaz web o app interactiva)
\`\`\`

## 2. Componentes Principales

### Scrapers (`/src/scrapers/`)
Radares que realizan scraping responsable de sitios gubernamentales y noticias locales. Implementan lógica de reintentos (Retries) y mitigación de fallas SSL sin depender del rechazo global de certificados a menos que sea estrictamente necesario.

### Normalizers (`/src/normalizers/`)
Convierte la respuesta heterogénea de múltiples sitios en un objeto `finding` estandarizado, otorgándole un UID, fecha de detección e invocando al sanitizador de textos.

### Scoring (`/src/scoring/`)
Contiene `rules.js` y heurística avanzada. Detecta si un evento corresponde a "Lluvias" o "Sismos", luego busca palabras severas (ej. "evacuación") para asignarle un color de Riesgo (VERDE, AMARILLO, NARANJA, ROJO).

### Storage (`/src/storage/`)
Maneja de manera híbrida el guardado:
1. Intenta contactar a Supabase vía PostgREST utilizando la librería `@supabase/supabase-js`.
2. Si falla o no está configurado, persiste de manera elegante como JSON en la carpeta local `/data`.
*Maneja también el Hash SHA-256 estabilizado.*

### Reports (`/src/reports/`)
Construye documentos estructurados (`.md`) para consumo rápido y auditoría de los runs históricos.

### Alerts (`/src/alerts/`)
Módulo seguro que encapsula las peticiones al Bot de Telegram. Mantiene variables en memoria de la sesión para limitar a un "Máximo de 5 envíos" y evitar bloqueos en la plataforma.

### Scheduler (`/src/scheduler.js`)
Motor Worker alimentado por `node-cron`. Corre en background cada `RUN_INTERVAL_HOURS` horas, detonando todo el pipeline.

### API (`/src/server.js`)
Endpoints Express que sirven como puente entre este Backend-Motor OSINT y cualquier cliente Frontend (App Móvil o Web Dashboard) que se le quiera conectar en el futuro.

## 3. Despliegue en Railway
Dado el diseño de SIRCOM, puede levantarse como un contenedor o proceso background (Worker) que simplemente escuche el cron. Basta con hacer commit en la rama `main` y que Railway dispare el `npm run worker:schedule`.
