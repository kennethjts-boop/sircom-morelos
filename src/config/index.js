require('dotenv').config();

module.exports = {
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.TELEGRAM_CHAT_ID || ''
  },
  supabase: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  },
  paths: {
    findings: 'data/findings.json',
    runs: 'data/runs.json',
    sources: 'data/sources.json',
    reports: 'outputs'
  }
};
