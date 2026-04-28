/* global React, SircomIcon */
// SIRCOM — Stylized Morelos map with 36 municipios as risk dots

const MORELOS_MUNICIPIOS = [
  // Approximate normalized [x, y] inside a 100×100 box.
  { id: 'cuernavaca', name: 'Cuernavaca', x: 38, y: 36, pop: 366321 },
  { id: 'jiutepec', name: 'Jiutepec', x: 42, y: 40, pop: 215357 },
  { id: 'temixco', name: 'Temixco', x: 36, y: 43, pop: 116143 },
  { id: 'emiliano-zapata', name: 'Emiliano Zapata', x: 44, y: 45, pop: 100590 },
  { id: 'xochitepec', name: 'Xochitepec', x: 38, y: 50, pop: 71390 },
  { id: 'cuautla', name: 'Cuautla', x: 64, y: 50, pop: 187841 },
  { id: 'yautepec', name: 'Yautepec', x: 50, y: 42, pop: 102690 },
  { id: 'jojutla', name: 'Jojutla', x: 42, y: 64, pop: 56329 },
  { id: 'zacatepec', name: 'Zacatepec', x: 46, y: 62, pop: 37550 },
  { id: 'tlaltizapan', name: 'Tlaltizapán', x: 48, y: 56, pop: 51368 },
  { id: 'puente-de-ixtla', name: 'Puente de Ixtla', x: 36, y: 62, pop: 64151 },
  { id: 'mazatepec', name: 'Mazatepec', x: 30, y: 58, pop: 9560 },
  { id: 'tetecala', name: 'Tetecala', x: 26, y: 60, pop: 7591 },
  { id: 'coatlan', name: 'Coatlán del Río', x: 22, y: 56, pop: 9471 },
  { id: 'amacuzac', name: 'Amacuzac', x: 30, y: 70, pop: 19131 },
  { id: 'tlaquiltenango', name: 'Tlaquiltenango', x: 50, y: 70, pop: 32299 },
  { id: 'tepalcingo', name: 'Tepalcingo', x: 64, y: 68, pop: 27270 },
  { id: 'jonacatepec', name: 'Jonacatepec', x: 70, y: 60, pop: 16952 },
  { id: 'axochiapan', name: 'Axochiapan', x: 72, y: 70, pop: 36433 },
  { id: 'jantetelco', name: 'Jantetelco', x: 72, y: 56, pop: 16737 },
  { id: 'tepoztlan', name: 'Tepoztlán', x: 48, y: 30, pop: 53895 },
  { id: 'tlayacapan', name: 'Tlayacapan', x: 54, y: 28, pop: 19495 },
  { id: 'totolapan', name: 'Totolapan', x: 60, y: 24, pop: 11992 },
  { id: 'atlatlahucan', name: 'Atlatlahucan', x: 60, y: 32, pop: 22587 },
  { id: 'yecapixtla', name: 'Yecapixtla', x: 66, y: 38, pop: 51388 },
  { id: 'ocuituco', name: 'Ocuituco', x: 72, y: 32, pop: 17945 },
  { id: 'tetela', name: 'Tetela del Volcán', x: 78, y: 28, pop: 21534 },
  { id: 'zacualpan', name: 'Zacualpan', x: 74, y: 36, pop: 9758 },
  { id: 'temoac', name: 'Temoac', x: 76, y: 44, pop: 16787 },
  { id: 'ayala', name: 'Ayala', x: 60, y: 54, pop: 89635 },
  { id: 'tlalnepantla', name: 'Tlalnepantla', x: 56, y: 22, pop: 7188 },
  { id: 'huitzilac', name: 'Huitzilac', x: 32, y: 26, pop: 19206 },
  { id: 'miacatlan', name: 'Miacatlán', x: 26, y: 50, pop: 27595 },
  { id: 'tetela-monte', name: 'Tetela del Monte', x: 36, y: 28, pop: 9450 },
  { id: 'coatetelco', name: 'Coatetelco', x: 32, y: 52, pop: 7000 },
  { id: 'xoxocotla', name: 'Xoxocotla', x: 40, y: 56, pop: 21208 },
];

// Risk-level seeded so it looks realistic and stable
const RISK_LEVELS = ['none', 'low', 'medium', 'high', 'critical'];
const seedRisk = (id, hour = 0) => {
  let h = hour;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return RISK_LEVELS[h % RISK_LEVELS.length];
};

const RISK_COLOR = {
  none: '#CCD2DB',
  low: '#1F7A57',
  medium: '#E8A21C',
  high: '#D97706',
  critical: '#C8362D',
};
const RISK_LABEL = {
  none: 'Sin alerta',
  low: 'Vigilancia',
  medium: 'Preventiva',
  high: 'Riesgo alto',
  critical: 'Crítico',
};

const MorelosRiskMap = ({
  width = 560,
  height = 480,
  onSelect,
  selected,
  filter = 'all',     // radar filter
  hour = 6,
  showLabels = false,
  compact = false,
}) => {
  // Bounded shape — abstract polygon recognizable as Morelos
  const SHAPE = 'M14 22 L26 14 L40 8 L56 6 L72 12 L82 22 L88 36 L86 52 L82 64 L74 76 L64 84 L52 90 L40 90 L28 84 L20 74 L14 60 L10 46 L10 32 Z';
  return (
    <div style={{ position: 'relative', width, height, background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2F7 100%)', borderRadius: 12, overflow: 'hidden', border: '1px solid #E2E5EA' }}>
      {/* grid */}
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="sircom-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E2E5EA" strokeWidth=".5"/>
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#sircom-grid)"/>
      </svg>

      {/* Map shape */}
      <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0 }}>
        <path d={SHAPE} fill="#0B2545" opacity=".04"/>
        <path d={SHAPE} fill="none" stroke="#0B2545" strokeWidth=".6" strokeLinejoin="round" opacity=".4"/>
        {/* Internal divisions — abstract regions */}
        <path d="M30 30 L52 24 M50 24 L60 40 L74 38 M40 50 L58 48 L62 62 M28 60 L44 60 M52 70 L66 66" stroke="#0B2545" strokeWidth=".3" opacity=".25" fill="none"/>

        {/* Radar pulse from Cuernavaca */}
        <g>
          <circle cx="38" cy="36" r="3" fill="#1F7A57" opacity=".7">
            <animate attributeName="r" values="3;18;3" dur="3.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values=".7;0;.7" dur="3.6s" repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Municipio dots */}
        {MORELOS_MUNICIPIOS.map(m => {
          const risk = seedRisk(m.id + filter, hour);
          const isSel = selected === m.id;
          const r = risk === 'critical' ? 1.8 : risk === 'high' ? 1.5 : risk === 'medium' ? 1.3 : 1.1;
          return (
            <g key={m.id} style={{ cursor: 'pointer' }} onClick={() => onSelect && onSelect(m)}>
              {(risk === 'critical' || risk === 'high') && (
                <circle cx={m.x} cy={m.y} r={r * 2.5} fill={RISK_COLOR[risk]} opacity=".25">
                  <animate attributeName="r" values={`${r*2};${r*4};${r*2}`} dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values=".25;0;.25" dur="2.5s" repeatCount="indefinite"/>
                </circle>
              )}
              <circle cx={m.x} cy={m.y} r={r} fill={RISK_COLOR[risk]} stroke={isSel ? '#0B2545' : 'white'} strokeWidth={isSel ? 1 : .4}/>
            </g>
          );
        })}

        {showLabels && MORELOS_MUNICIPIOS.filter(m => ['cuernavaca','cuautla','jojutla','tepoztlan','yautepec','tetela'].includes(m.id)).map(m => (
          <text key={m.id} x={m.x + 2.5} y={m.y + 1} fontSize="2.2" fill="#0B2545" fontFamily="IBM Plex Mono">{m.name}</text>
        ))}
      </svg>

      {/* Compass + legend overlays */}
      {!compact && (
        <>
          <div style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'IBM Plex Mono', fontSize: 10, color: '#4A5468', letterSpacing: '.12em' }}>
            18.7°N · 99.0°W · MORELOS, MX
          </div>
          <div style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'IBM Plex Mono', fontSize: 10, color: '#4A5468', letterSpacing: '.08em', textAlign: 'right' }}>
            36 MUNICIPIOS<br/>{MORELOS_MUNICIPIOS.filter(m => ['high','critical'].includes(seedRisk(m.id + filter, hour))).length} EN ALERTA
          </div>
          <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 12, alignItems: 'center', background: 'rgba(255,255,255,.9)', padding: '6px 10px', borderRadius: 6, border: '1px solid #E2E5EA' }}>
            {['none','low','medium','high','critical'].map(r => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'IBM Plex Mono', fontSize: 9, color: '#4A5468', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                <span style={{ width: 8, height: 8, background: RISK_COLOR[r], borderRadius: 2 }}/>{RISK_LABEL[r]}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

window.MORELOS_MUNICIPIOS = MORELOS_MUNICIPIOS;
window.RISK_COLOR = RISK_COLOR;
window.RISK_LABEL = RISK_LABEL;
window.seedRisk = seedRisk;
window.MorelosRiskMap = MorelosRiskMap;
