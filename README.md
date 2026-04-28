# SIRCOM Morelos

## Significado
SIRCOM significa Sistema de Inteligencia de Riesgos Comunitarios de Morelos.

## Qué es
SIRCOM es un motor OSINT comunitario preventivo diseñado para analizar fuentes abiertas, datos oficiales y señales públicas sobre riesgos que pueden afectar la vida diaria y la seguridad de la población de Morelos. Su enfoque central es la protección civil y comunitaria.

## Qué hace
El sistema integra diversos radares que extraen, normalizan, clasifican y reportan información en las siguientes categorías:
- Protección civil
- Lluvias y tormentas
- Ríos e inundaciones
- Incendios
- Sismos
- Popocatépetl / ceniza
- Seguridad ciudadana
- Salud pública
- Calor extremo
- Movilidad
- Riesgo escolar
- Servicios básicos
- Desinformación / rumores
- Apoyos y programas públicos
- Convocatorias

## Qué NO hace
Para garantizar un comportamiento ético y legal, el sistema se rige bajo estrictas reglas operativas:
- No acusa personas.
- No identifica sospechosos ni perpetradores.
- No publica datos personales (teléfonos, placas, direcciones exactas).
- No sustituye los avisos ni canales oficiales de las autoridades.
- No hace vigilancia individual ni espionaje corporativo.
- No usa fuentes ilegales, foros cerrados, ni grupos privados.
- No evade captchas ni firewalls (No bypass agresivo).
- No publica automáticamente en redes sociales en esta fase.

## Estado actual del proyecto
Actualmente se encuentra en la **Fase 3.1** productiva:
- Motor OSINT backend completado.
- Scrapers iniciales funcionales.
- Normalización y sanitización robusta.
- Scoring de calibración de riesgos.
- Reportes Markdown estructurados.
- Telegram preparado y calibrado (Anti-spam).
- Supabase preparado y migraciones SQL listas.
- Fallback local JSON 100% resiliente.
- Scheduler cada 6 horas.
- API básica (REST).

## Instalación local
Para clonar y poner en marcha el proyecto:

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar el entorno local
cp .env.example .env

# 3. Validar el almacenamiento
npm run test:storage

# 4. Iniciar el escáner oficial (recomendado)
npm run scan:official

# 5. Generar reporte consolidado
npm run report

# 6. Validar estado general del sistema
npm run status

# 7. Levantar la API local
npm run dev:api
```

## Scripts disponibles
El archivo `package.json` incluye los siguientes comandos:
- `npm run scan` (alias para scan:all)
- `npm run scan:official` (Escanea solo fuentes gubernamentales oficiales)
- `npm run scan:all` (Escanea oficiales + fuentes secundarias/noticias)
- `npm run report` (Genera el reporte Markdown)
- `npm run test:telegram` (Prueba conexión de Telegram)
- `npm run test:storage` (Valida si usa JSON o Supabase)
- `npm run test:scoring` (Corre la suite de calibración de falsos positivos)
- `npm run worker:schedule` (Inicia el cron job de 6 horas)
- `npm run status` (Devuelve el estado de la conexión)
- `npm run dev:api` (Levanta el servidor Express)

## Variables de entorno
Las principales variables del `.env` son:
- `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`: Para el envío de alertas automáticas.
- `TELEGRAM_ALERT_NARANJA`: (true/false) Define si se mandan notificaciones por riesgo medio.
- `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`: Conectan a PostgREST para base de datos en nube.
- `RUN_INTERVAL_HOURS`: Define el ciclo del scheduler (default: 6).
- `SCORING_STRICT_MODE`: Habilita heurísticas estrictas para evitar alertas falsas.
- `ALLOW_INSECURE_PUBLIC_SSL_FALLBACK`: Permite evadir errores de certificados vencidos en sitios oficiales (usar con precaución).

## Supabase
Para conectar el backend a Supabase:
- **Migraciones:** Se ubican en `supabase/migrations/001_init_sircom.sql`. Se deben correr manualmente en el editor de Supabase. Existen tablas como `sources`, `findings`, `reports`, `runs` y `telegram_logs`.
- **Seeders:** Datos iniciales de radares en `supabase/seed.sql`.
- **Fallback Local:** Si no se ingresan las credenciales de Supabase en el `.env`, el sistema no falla, utilizará `data/findings.json` mediante persistencia de archivos de forma transparente.

## Telegram
Para integrar Telegram de manera segura:
1. Crea un bot usando `@BotFather` y copia el token (`TELEGRAM_BOT_TOKEN`).
2. Obtén el ID de tu canal o chat privado (`TELEGRAM_CHAT_ID`).
3. **Reglas anti-spam:** El sistema está calibrado para enviar *máximo 5 alertas individuales por ciclo* sólo si el riesgo es ROJO inminente.
4. Si ocurren eventos menores (AMARILLO o NARANJA), el bot no envía alertas intrusivas, simplemente envía un "Resumen Ejecutivo" cada 6 horas agrupando las incidencias.

## Scheduler
El worker que ejecuta la automatización del rastreo se arranca con:
```bash
npm run worker:schedule
```
Se ejecuta una vez al arrancar, y luego espera un intervalo de 6 horas para re-iniciar el proceso de extracción, deduplicación y envío de reportes.

## API
Se expone un servidor Express local/remoto con los siguientes endpoints:
- `GET /health` (Estado del servicio)
- `GET /api/status` (Estadísticas 24h, modo de operación y distribución de riesgos)
- `GET /api/findings` (Retorna los hallazgos con soporte de filtros: `limit`, `category`, `riskLevel`)
- `GET /api/reports/latest` (Devuelve el último reporte generado)
- `GET /api/sources/status` (Healthcheck lógico de los radares)

## Despliegue Railway
1. Sube este repositorio a tu cuenta de GitHub.
2. Crea un proyecto en Railway y selecciona el repositorio.
3. Agrega tus secretos en la sección `Variables` (Telegram y Supabase).
4. El Start Command debe ser: `npm run worker:schedule`
5. Observa los logs para verificar el primer "Escaneo oficial".
6. Todo correrá en background de manera persistente.

## Próxima fase
Fase 4 — Dashboard web SIRCOM (Interfaz para consulta de mapa y alertas interactivas).
