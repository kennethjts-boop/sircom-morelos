/* global React */
// SIRCOM — Icon system + Logo marks
// All icons share a 24×24 viewBox, 1.6 stroke, geometric monoline
// Designed to feel institutional/data-platform, not policial

const SircomIcon = ({ name, size = 20, color = 'currentColor', strokeWidth = 1.6, style }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round',
    style,
  };
  switch (name) {
    case 'security': return (
      <svg {...props}><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>
    );
    case 'fire': return (
      <svg {...props}><path d="M12 3c.8 3 3 4.5 3 7.5 0 1.6-.8 2.8-2 3.4.5-1 .3-2-.5-2.8C12 11 11 11.5 11 13c0 1.4-1 1.8-1.6 1.6C8.5 14.3 8 13 8 11.5 8 7.5 12 7 12 3Z"/><path d="M6 16.5c0 3 2.7 5 6 5s6-2 6-5c0-1.6-.8-3-2-4"/></svg>
    );
    case 'rain': return (
      <svg {...props}><path d="M7 14a4 4 0 0 1 .8-7.9A6 6 0 0 1 19 8.5a3.5 3.5 0 0 1-1 6.5"/><path d="m9 18-1 3M13 18l-1 3M17 18l-1 3"/></svg>
    );
    case 'river': return (
      <svg {...props}><path d="M3 8c2 0 2 1.5 4 1.5S9 8 11 8s2 1.5 4 1.5S17 8 19 8M3 13c2 0 2 1.5 4 1.5S9 13 11 13s2 1.5 4 1.5S17 13 19 13M3 18c2 0 2 1.5 4 1.5S9 18 11 18s2 1.5 4 1.5S17 18 19 18"/></svg>
    );
    case 'quake': return (
      <svg {...props}><path d="M3 12h2l2-5 3 10 3-14 3 18 2-9h3"/></svg>
    );
    case 'volcano': return (
      <svg {...props}><path d="M3 20h18M6 20l3.5-7h5L18 20"/><path d="M9 9V5M12 7V3M15 9V6"/></svg>
    );
    case 'health': return (
      <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/></svg>
    );
    case 'heat': return (
      <svg {...props}><path d="M12 3v9.5"/><circle cx="12" cy="17" r="3.5"/><path d="M12 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 5l-1.5 1.5M6 5l1.5 1.5M20 11h-2M6 11H4"/></svg>
    );
    case 'mobility': return (
      <svg {...props}><path d="M4 17h16M6 17V9l3-3h6l3 3v8M9 6V4M15 6V4"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/></svg>
    );
    case 'school': return (
      <svg {...props}><path d="m3 8 9-4 9 4-9 4-9-4Z"/><path d="M7 10v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5M21 8v6"/></svg>
    );
    case 'community': return (
      <svg {...props}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.2"/><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6M15 19c0-2 .8-3.7 2-5 .9 1 2 2.5 2 5"/></svg>
    );
    case 'alert-critical': return (
      <svg {...props}><path d="M10.3 3.5 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.5a2 2 0 0 0-3.4 0Z"/><path d="M12 9v5M12 17.5v.01"/></svg>
    );
    case 'verified': return (
      <svg {...props}><path d="m3.7 12 2-3-1-3.5 3.4-1L9.5 1.5h5l1.4 3 3.4 1-1 3.5 2 3-2 3 1 3.5-3.4 1-1.4 3h-5l-1.4-3-3.4-1 1-3.5-2-3Z"/><path d="m9 12 2 2 4-4"/></svg>
    );
    case 'unverified': return (
      <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M9 9.5a3 3 0 1 1 4.5 2.6c-.9.5-1.5 1-1.5 2M12 17v.01"/></svg>
    );
    case 'official': return (
      <svg {...props}><path d="M12 3 4 6v6c0 4 3 7.5 8 9 5-1.5 8-5 8-9V6l-8-3Z"/><path d="M9.5 12 11 13.5 14.5 10"/></svg>
    );
    case 'citizen': return (
      <svg {...props}><circle cx="12" cy="8" r="3.2"/><path d="M5.5 19.5c.7-3.4 3.4-5.5 6.5-5.5s5.8 2.1 6.5 5.5"/></svg>
    );
    case 'radar': return (
      <svg {...props}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><path d="M12 12 19 7"/></svg>
    );
    case 'map': return (
      <svg {...props}><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z"/><path d="M9 4v14M15 6v14"/></svg>
    );
    case 'pin': return (
      <svg {...props}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>
    );
    case 'bell': return (
      <svg {...props}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>
    );
    case 'menu': return (
      <svg {...props}><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    );
    case 'search': return (
      <svg {...props}><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/></svg>
    );
    case 'filter': return (
      <svg {...props}><path d="M3 5h18l-7 9v6l-4-2v-4L3 5Z"/></svg>
    );
    case 'check': return (<svg {...props}><path d="m4 12 5 5L20 6"/></svg>);
    case 'x': return (<svg {...props}><path d="M5 5l14 14M19 5 5 19"/></svg>);
    case 'arrow-right': return (<svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
    case 'chevron-right': return (<svg {...props}><path d="m9 6 6 6-6 6"/></svg>);
    case 'chevron-down': return (<svg {...props}><path d="m6 9 6 6 6-6"/></svg>);
    case 'plus': return (<svg {...props}><path d="M12 5v14M5 12h14"/></svg>);
    case 'clock': return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
    case 'home': return (<svg {...props}><path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z"/></svg>);
    case 'settings': return (
      <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
    );
    case 'wave': return (
      <svg {...props}><path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/></svg>
    );
    case 'doc': return (
      <svg {...props}><path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v4h4M9 13h6M9 17h6M9 9h2"/></svg>
    );
    default: return null;
  }
};

// ── Map of Morelos — abstract polygon, recognizable but stylized ─────
// Used as background and inside logo lockups
const MorelosMap = ({ size = 80, stroke = 'currentColor', fill = 'none', strokeWidth = 1.4, opacity = 1, withPulse = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block', opacity }}>
    {/* Abstracted Morelos silhouette — evocative, not literal */}
    <path
      d="M28 12 L46 8 L62 14 L74 22 L82 36 L86 52 L80 66 L72 78 L58 86 L44 88 L30 82 L20 70 L14 56 L16 40 L20 26 Z"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    {withPulse && (
      <>
        <circle cx="50" cy="50" r="6" fill={stroke} opacity=".9"/>
        <circle cx="50" cy="50" r="14" fill="none" stroke={stroke} strokeWidth="1" opacity=".5"/>
        <circle cx="50" cy="50" r="22" fill="none" stroke={stroke} strokeWidth="1" opacity=".3"/>
      </>
    )}
  </svg>
);

// ── LOGOS — 4 variations ─────────────────────────────────────────────
// All share IBM Plex Sans wordmark + Morelos territory motif

const LogoLockup = ({ variant = 'A', mono = false, scale = 1, dark = false }) => {
  const ink = dark ? '#FFFFFF' : '#0B2545';
  const accent = mono ? ink : '#1F7A57';
  const amber = mono ? ink : '#E8A21C';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 * scale, fontFamily: 'IBM Plex Sans' }}>
      <Isotype variant={variant} size={56 * scale} ink={ink} accent={accent} amber={amber}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 * scale, lineHeight: 1 }}>
        <div style={{ fontSize: 22 * scale, fontWeight: 600, color: ink, letterSpacing: '-0.01em' }}>
          SIRCOM <span style={{ fontWeight: 300 }}>MORELOS</span>
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 9 * scale, color: dark ? 'rgba(255,255,255,.7)' : '#4A5468', letterSpacing: '.14em', textTransform: 'uppercase' }}>
          Sistema de Inteligencia · Riesgos Comunitarios
        </div>
      </div>
    </div>
  );
};

const Isotype = ({ variant = 'A', size = 56, ink = '#0B2545', accent = '#1F7A57', amber = '#E8A21C' }) => {
  // Variant A: Mapa + radar pulses (recommended)
  // Variant B: Escudo suave con territorio
  // Variant C: Monograma S geométrico con onda
  // Variant D: Radar concéntrico puro
  if (variant === 'A') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke={ink} strokeWidth="2" opacity=".15"/>
        <circle cx="50" cy="50" r="34" fill="none" stroke={ink} strokeWidth="1" opacity=".2" strokeDasharray="2 3"/>
        <path d="M28 18 L48 14 L64 20 L76 30 L82 46 L78 62 L70 76 L54 82 L38 80 L24 70 L18 54 L20 36 Z"
              fill={ink} opacity=".08"/>
        <path d="M28 18 L48 14 L64 20 L76 30 L82 46 L78 62 L70 76 L54 82 L38 80 L24 70 L18 54 L20 36 Z"
              fill="none" stroke={ink} strokeWidth="2.4" strokeLinejoin="round"/>
        <circle cx="50" cy="48" r="4.5" fill={amber}/>
        <circle cx="50" cy="48" r="10" fill="none" stroke={accent} strokeWidth="1.5" opacity=".7"/>
        <circle cx="50" cy="48" r="18" fill="none" stroke={accent} strokeWidth="1" opacity=".4"/>
      </svg>
    );
  }
  if (variant === 'B') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <path d="M50 6 L86 18 V50 C86 72 70 88 50 94 C30 88 14 72 14 50 V18 Z"
              fill={ink} opacity=".06"/>
        <path d="M50 6 L86 18 V50 C86 72 70 88 50 94 C30 88 14 72 14 50 V18 Z"
              fill="none" stroke={ink} strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M34 36 L46 32 L58 36 L66 44 L62 56 L52 64 L40 60 L32 50 Z"
              fill="none" stroke={accent} strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="48" cy="48" r="3" fill={amber}/>
      </svg>
    );
  }
  if (variant === 'C') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="6" y="6" width="88" height="88" rx="14" fill={ink}/>
        <path d="M68 30 C68 24 62 20 54 20 H40 C32 20 28 26 28 32 C28 38 32 42 40 44 H56 C64 46 68 50 68 56 C68 64 62 68 54 68 H30"
              fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round"/>
        <circle cx="74" cy="74" r="4" fill={amber}/>
        <circle cx="74" cy="74" r="10" fill="none" stroke="white" strokeWidth="1.5" opacity=".5"/>
      </svg>
    );
  }
  // D — radar puro
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill={ink}/>
      <circle cx="50" cy="50" r="34" fill="none" stroke="white" strokeWidth="1" opacity=".25"/>
      <circle cx="50" cy="50" r="22" fill="none" stroke="white" strokeWidth="1" opacity=".4"/>
      <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="1" opacity=".6"/>
      <path d="M50 50 L84 30" stroke={amber} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="50" r="3.5" fill={amber}/>
    </svg>
  );
};

window.SircomIcon = SircomIcon;
window.MorelosMap = MorelosMap;
window.Isotype = Isotype;
window.LogoLockup = LogoLockup;
