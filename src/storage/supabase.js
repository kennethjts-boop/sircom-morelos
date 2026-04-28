const { createClient } = require('@supabase/supabase-js');
const config = require('../config');
const localStore = require('./index'); // Fallback local

let supabase = null;
const isConfigured = !!(config.supabase.url && config.supabase.key);

if (isConfigured) {
  supabase = createClient(config.supabase.url, config.supabase.key);
}

const getClient = () => supabase;

const saveFindings = async (findings) => {
  if (!isConfigured) {
    // Local fallback is handled in the main pipeline
    return findings;
  }
  
  if (!findings || findings.length === 0) return [];

  const toInsert = findings.map(f => ({
    source_name: f.source_name,
    source_type: f.source_type,
    title: f.title,
    raw_text: f.raw_text,
    category: f.category,
    location: f.location,
    confidence_level: f.confidence_level,
    risk_level: f.risk_level,
    score: f.score,
    url: f.url,
    published_at: f.published_at,
    hash: f.hash || f.raw_html_hash,
    is_secondary_signal: f.confidence_level === 'secondary_signal',
    personal_data_removed: f.personal_data_removed || false,
    opportunity_type: f.opportunity_type || null,
    urgency: f.urgency || 'baja'
  }));

  try {
    const { data, error } = await supabase
      .from('findings')
      .upsert(toInsert, { onConflict: 'hash', ignoreDuplicates: true });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`❌ [Supabase] Error guardando findings: ${error.message}`);
    return null;
  }
};

const getRecentFindings = async ({ limit = 50, category, riskLevel }) => {
  if (!isConfigured) {
    // local fallback
    let all = localStore.getFindings();
    if (category) all = all.filter(f => f.category === category);
    if (riskLevel) all = all.filter(f => f.risk_level === riskLevel);
    return all.slice(0, limit);
  }

  let query = supabase.from('findings').select('*').order('detected_at', { ascending: false }).limit(limit);
  
  if (category) query = query.eq('category', category);
  if (riskLevel) query = query.eq('risk_level', riskLevel);

  const { data, error } = await query;
  if (error) {
    console.error(`❌ [Supabase] Error leyendo findings: ${error.message}`);
    return [];
  }
  return data;
};

const getFindingByHash = async (hash) => {
  if (!isConfigured) {
    const all = localStore.getFindings();
    return all.find(f => f.hash === hash || f.raw_html_hash === hash);
  }
  const { data, error } = await supabase.from('findings').select('id').eq('hash', hash).single();
  return data || null;
};

const saveReport = async (reportData) => {
  if (!isConfigured) return;
  try {
    await supabase.from('reports').insert([reportData]);
  } catch (e) {
    console.error(`❌ [Supabase] Error guardando reporte: ${e.message}`);
  }
};

const getLatestReport = async () => {
  if (!isConfigured) return null;
  const { data } = await supabase.from('reports').select('*').order('created_at', { ascending: false }).limit(1).single();
  return data;
};

const saveRun = async (runData) => {
  if (!isConfigured) {
    const runs = localStore.readJSON(config.paths.runs);
    runs.push(runData);
    localStore.writeJSON(config.paths.runs, runs);
    return { id: runData.id || new Date().getTime().toString() };
  }
  const { data } = await supabase.from('runs').insert([runData]).select().single();
  return data;
};

const updateRun = async (runId, updateData) => {
  if (!isConfigured) {
    const runs = localStore.readJSON(config.paths.runs);
    const runIdx = runs.findIndex(r => r.id === runId);
    if (runIdx > -1) {
      runs[runIdx] = { ...runs[runIdx], ...updateData };
      localStore.writeJSON(config.paths.runs, runs);
    }
    return;
  }
  await supabase.from('runs').update(updateData).eq('id', runId);
};

const saveTelegramLog = async (logData) => {
  if (!isConfigured) return;
  await supabase.from('telegram_logs').insert([logData]);
};

module.exports = {
  isConfigured,
  getClient,
  saveFindings,
  getRecentFindings,
  getFindingByHash,
  saveReport,
  getLatestReport,
  saveRun,
  updateRun,
  saveTelegramLog
};
