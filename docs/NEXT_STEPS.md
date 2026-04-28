# Próximos Pasos (Next Steps)

Este repositorio es la "Base Cero" productiva. Al clonarlo, estarás listo para interactuar con la Fase 3 completada y estabilizada.

Sigue estos pasos en orden cronológico tras subir/clonar el código:

## 1. Configurar Supabase
1. Ingresa a `supabase.com` y crea un proyecto.
2. Ve al SQL Editor y corre el contenido completo de `supabase/migrations/001_init_sircom.sql`.
3. Posteriormente, corre el seeder de `supabase/seed.sql` para añadir las 5 fuentes oficiales.
4. Obtén el `URL` de tu base y la `Service Role Key`. Pégalos en tu `.env` local.

## 2. Configurar Alertas
1. Usa Telegram y busca al `@BotFather`.
2. Crea un bot, copia el HTTP API Token (`TELEGRAM_BOT_TOKEN`).
3. Agrega tu bot al canal/chat donde desees alertas.
4. Obtén el ID numérico del canal (`TELEGRAM_CHAT_ID`) y ponlo en `.env`.

## 3. Pruebas Locales (Sanity Check)
Antes de seguir programando nuevas interfaces, ejecuta en tu terminal:

\`\`\`bash
npm run test:scoring
npm run supabase:check
npm run scan:official
npm run dev:api
\`\`\`

Todo debería mostrar color "verde", y el último reporte debió guardarse con éxito en la nube de Supabase y en Telegram (Si hubo un hallazgo urgente).

## 4. Fase 4: Dashboard
Una vez que domines este backend, la siguiente misión es construir el Dashboard Frontend.
- Tienes una API en `http://localhost:3001` lista para consumirse.
- Deberás crear un proyecto independiente (ej. con Next.js o Vite) y apuntar `fetch` hacia tu API de SIRCOM.
- Usa los objetos `riskDistribution` expuestos en `/api/status` para graficar la realidad de Morelos en tiempo real.
