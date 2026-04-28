/* global React, SircomIcon, RADARS, RISK_COLOR, RISK_LABEL, Isotype, LogoLockup */
// SIRCOM — Brand pieces: palette, type, plantillas social, brand voice

// ── PALETTE ──────────────────────────────────────────────────────────
const Swatch = ({ color, name, hex, role, dark }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ width: '100%', aspectRatio: '1.4', background: color, borderRadius: 8, border: '1px solid rgba(11,37,69,.08)', display: 'flex', alignItems: 'flex-end', padding: 10 }}>
      <span className="mono" style={{ fontSize: 9, color: dark ? 'rgba(255,255,255,.85)' : 'rgba(11,37,69,.7)', letterSpacing: '.08em' }}>{hex}</span>
    </div>
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#0F1B2D' }}>{name}</div>
      <div style={{ fontSize: 11, color: '#4A5468', marginTop: 2 }}>{role}</div>
    </div>
  </div>
);

const SircomPalette = () => (
  <div className="sircom" style={{ background: '#fff', padding: 32, width: 880, border: '1px solid #E2E5EA', borderRadius: 8 }}>
    <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.15em', textTransform: 'uppercase' }}>Paleta · Sistema de color</div>
    <h2 style={{ fontSize: 24, fontWeight: 500, margin: '8px 0 24px', letterSpacing: '-0.02em' }}>Confianza, protección y alerta responsable</h2>
    <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Marca</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
      <Swatch color="#0B2545" hex="#0B2545" name="Azul SIRCOM" role="Primario · institucional" dark/>
      <Swatch color="#1F7A57" hex="#1F7A57" name="Verde Civil" role="Protección y comunidad" dark/>
      <Swatch color="#E8A21C" hex="#E8A21C" name="Ámbar Preventivo" role="Alerta responsable"/>
      <Swatch color="#C8362D" hex="#C8362D" name="Rojo Crítico" role="Solo riesgo crítico" dark/>
    </div>
    <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Niveles de alerta</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 28 }}>
      {[
        ['Sin alerta', '#CCD2DB', 'Operación normal'],
        ['Vigilancia', '#1F7A57', 'Monitoreo activo'],
        ['Preventiva', '#E8A21C', 'Tomar precauciones'],
        ['Riesgo alto', '#D97706', 'Acción recomendada'],
        ['Crítico', '#C8362D', 'Emergencia · 911'],
      ].map(([n, c, r]) => (
        <div key={n} style={{ border: '1px solid #E2E5EA', borderRadius: 8, padding: 12 }}>
          <div style={{ width: '100%', height: 36, background: c, borderRadius: 4 }}/>
          <div style={{ fontSize: 11, fontWeight: 600, marginTop: 8 }}>{n}</div>
          <div style={{ fontSize: 10, color: '#4A5468', marginTop: 2 }}>{r}</div>
          <div className="mono" style={{ fontSize: 9, color: '#7A8294', marginTop: 4 }}>{c}</div>
        </div>
      ))}
    </div>
    <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Neutros · interfaz</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
      {[
        ['#0F1B2D', 'Texto'],['#4A5468', 'Texto 2'],['#7A8294', 'Texto 3'],
        ['#CCD2DB', 'Borde 2'],['#E2E5EA', 'Borde'],['#F5F6F8', 'Fondo'],['#FFFFFF', 'Superficie'],
      ].map(([c, n]) => (
        <div key={c}>
          <div style={{ width: '100%', height: 48, background: c, borderRadius: 4, border: '1px solid #E2E5EA' }}/>
          <div style={{ fontSize: 10, color: '#4A5468', marginTop: 6 }}>{n}</div>
          <div className="mono" style={{ fontSize: 9, color: '#7A8294' }}>{c}</div>
        </div>
      ))}
    </div>
  </div>
);

// ── TYPOGRAPHY ───────────────────────────────────────────────────────
const SircomType = () => (
  <div className="sircom" style={{ background: '#fff', padding: 32, width: 880, border: '1px solid #E2E5EA', borderRadius: 8 }}>
    <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.15em', textTransform: 'uppercase' }}>Tipografía · Sistema</div>
    <h2 style={{ fontSize: 24, fontWeight: 500, margin: '8px 0 24px', letterSpacing: '-0.02em' }}>IBM Plex · institucional, técnica, humana</h2>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div style={{ borderTop: '1px solid #0B2545', paddingTop: 14 }}>
        <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase' }}>Plex Sans · UI · Reportes</div>
        <div style={{ fontFamily: 'IBM Plex Sans', fontWeight: 600, fontSize: 64, letterSpacing: '-0.03em', marginTop: 6, lineHeight: 1 }}>Aa</div>
        <div style={{ fontFamily: 'IBM Plex Sans', fontSize: 13, color: '#4A5468', marginTop: 8, letterSpacing: '.04em' }}>ABCDEFGHIJKLMNÑOPQRSTUVWXYZ<br/>0123456789 áéíóú ¿? ¡!</div>
        <div style={{ fontFamily: 'IBM Plex Sans', marginTop: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em' }}>Display 28 · medio</div>
          <div style={{ fontSize: 18, fontWeight: 500 }}>Heading 18 · medio</div>
          <div style={{ fontSize: 14 }}>Body 14 · regular para reportes</div>
          <div style={{ fontSize: 12, color: '#4A5468' }}>Caption 12 · descriptivo</div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #1F7A57', paddingTop: 14 }}>
        <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase' }}>Plex Mono · Datos · Códigos</div>
        <div className="mono" style={{ fontWeight: 500, fontSize: 64, letterSpacing: '-0.02em', marginTop: 6, lineHeight: 1 }}>Aa</div>
        <div className="mono" style={{ fontSize: 13, color: '#4A5468', marginTop: 8 }}>0123456789<br/>EV-2410 · 14:22 · 18.7°N</div>
        <div className="mono" style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 11, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase' }}>EYEBROW · OVERLINE</div>
          <div style={{ fontSize: 13 }}>EV-2410 · TEPOZTLÁN</div>
          <div style={{ fontSize: 11, color: '#4A5468' }}>Timestamps · Coords · IDs</div>
        </div>
      </div>
    </div>

    <div style={{ marginTop: 24, padding: 18, background: '#0B2545', color: '#fff', borderRadius: 8 }}>
      <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', letterSpacing: '.15em', textTransform: 'uppercase' }}>Aplicación tipográfica</div>
      <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', marginTop: 8, lineHeight: 1.15 }}>
        Inteligencia comunitaria preventiva para Morelos.
      </div>
      <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: '#E8A21C', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: 14 }}>
        SIRCOM · 27 ABR 2026 · 14:30 · CORTE INFORMATIVO
      </div>
    </div>
  </div>
);

// ── ICON SYSTEM grid ─────────────────────────────────────────────────
const SircomIconGrid = () => {
  const groups = [
    { title: 'Radares de riesgo', items: [
      ['security', 'Seguridad'],['fire', 'Incendios'],['rain', 'Lluvias'],['river', 'Ríos'],
      ['quake', 'Sismos'],['volcano', 'Volcán'],['health', 'Salud'],['heat', 'Calor'],
      ['mobility', 'Movilidad'],['school', 'Escolar'],
    ]},
    { title: 'Comunidad y verificación', items: [
      ['community', 'Comunidad'],['citizen', 'Ciudadano'],['official', 'Oficial'],
      ['verified', 'Verificado'],['unverified', 'Sin verificar'],['alert-critical', 'Alerta crítica'],
    ]},
    { title: 'Sistema · UI', items: [
      ['radar','Radar'],['map','Mapa'],['pin','Pin'],['bell','Alertas'],['filter','Filtro'],
      ['search','Buscar'],['clock','Tiempo'],['doc','Reporte'],
    ]},
  ];
  return (
    <div className="sircom" style={{ background: '#fff', padding: 32, width: 880, border: '1px solid #E2E5EA', borderRadius: 8 }}>
      <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.15em', textTransform: 'uppercase' }}>Iconografía</div>
      <h2 style={{ fontSize: 24, fontWeight: 500, margin: '8px 0 8px', letterSpacing: '-0.02em' }}>Sistema monoline · 24px · stroke 1.6</h2>
      <p style={{ fontSize: 12, color: '#4A5468', marginBottom: 22 }}>Iconos geométricos, neutrales, no agresivos. Cada radar conserva su color cuando se usa con etiqueta.</p>
      {groups.map(g => (
        <div key={g.title} style={{ marginBottom: 24 }}>
          <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>{g.title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8 }}>
            {g.items.map(([id, label]) => (
              <div key={id} style={{ border: '1px solid #E2E5EA', borderRadius: 6, padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <SircomIcon name={id} size={28} color="#0B2545"/>
                <span style={{ fontSize: 10, color: '#4A5468', textAlign: 'center' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── LOGO SHOWCASE ────────────────────────────────────────────────────
const SircomLogos = () => (
  <div className="sircom" style={{ background: '#fff', padding: 32, width: 880, border: '1px solid #E2E5EA', borderRadius: 8 }}>
    <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.15em', textTransform: 'uppercase' }}>Logo · Sistema</div>
    <h2 style={{ fontSize: 24, fontWeight: 500, margin: '8px 0 24px', letterSpacing: '-0.02em' }}>Identidad principal y variaciones</h2>

    <div style={{ background: '#FAFBFC', border: '1px solid #E2E5EA', borderRadius: 8, padding: 40, display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
      <LogoLockup variant="A" scale={1.4}/>
    </div>

    <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Variaciones de isotipo</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
      {[
        { v: 'A', name: 'Mapa + Radar', sub: 'Recomendada' },
        { v: 'B', name: 'Escudo civil', sub: 'Institucional' },
        { v: 'C', name: 'Monograma S', sub: 'App / favicon' },
        { v: 'D', name: 'Radar puro', sub: 'Dato / técnico' },
      ].map(o => (
        <div key={o.v} style={{ border: '1px solid #E2E5EA', borderRadius: 8, padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <Isotype variant={o.v} size={84}/>
          <div style={{ textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em' }}>VARIANTE {o.v}</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{o.name}</div>
            <div style={{ fontSize: 10, color: '#4A5468' }}>{o.sub}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Aplicaciones</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
      <div style={{ background: '#FAFBFC', border: '1px solid #E2E5EA', borderRadius: 8, padding: 24, display: 'flex', justifyContent: 'center' }}>
        <LogoLockup variant="A" scale={0.7}/>
      </div>
      <div style={{ background: '#0B2545', borderRadius: 8, padding: 24, display: 'flex', justifyContent: 'center' }}>
        <LogoLockup variant="A" scale={0.7} dark/>
      </div>
      <div style={{ background: '#fff', border: '1px solid #E2E5EA', borderRadius: 8, padding: 24, display: 'flex', justifyContent: 'center' }}>
        <LogoLockup variant="A" scale={0.7} mono/>
      </div>
    </div>
  </div>
);

// ── BRAND VOICE / lemas ──────────────────────────────────────────────
const SircomVoice = () => (
  <div className="sircom" style={{ background: '#0B2545', color: '#fff', padding: 36, width: 880, borderRadius: 8 }}>
    <div className="mono" style={{ fontSize: 10, color: '#E8A21C', letterSpacing: '.18em', textTransform: 'uppercase' }}>Personalidad · Voz · Lemas</div>
    <h2 style={{ fontSize: 36, fontWeight: 500, margin: '12px 0 24px', letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: 720 }}>
      Información que protege.<br/><span style={{ color: '#E8A21C' }}>Prevención inteligente para Morelos.</span>
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
      <div>
        <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>Sí somos</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Serios','Protectores','Confiables','Ciudadanos','Tecnológicos','Preventivos','Claros','Cercanos','Útiles','Neutrales'].map(t => (
            <span key={t} style={{ padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)', fontSize: 12 }}>{t}</span>
          ))}
        </div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>No somos</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Policíaco','Partidista','Sensacionalista','Agresivo','Amarillista','Improvisado','Conspirativo','Alarmista','Acusatorio','Político'].map(t => (
            <span key={t} style={{ padding: '6px 12px', borderRadius: 999, background: 'transparent', border: '1px dashed rgba(255,255,255,.25)', fontSize: 12, color: 'rgba(255,255,255,.55)', textDecoration: 'line-through', textDecorationColor: 'rgba(255,255,255,.35)' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
    <div style={{ marginTop: 28 }}>
      <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 14 }}>Lemas oficiales</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          'Información que protege.',
          'Prevención inteligente para Morelos.',
          'Datos, comunidad y protección.',
          'Alertas responsables para cuidar a Morelos.',
          'No generamos pánico: generamos prevención.',
          'Inteligencia comunitaria para prevenir.',
        ].map((l, i) => (
          <div key={i} style={{ padding: '14px 16px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="mono" style={{ fontSize: 10, color: '#E8A21C' }}>0{i+1}</span>
            <span style={{ fontSize: 14 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

window.SircomPalette = SircomPalette;
window.SircomType = SircomType;
window.SircomIconGrid = SircomIconGrid;
window.SircomLogos = SircomLogos;
window.SircomVoice = SircomVoice;
