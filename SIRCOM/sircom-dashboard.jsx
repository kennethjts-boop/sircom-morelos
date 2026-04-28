/* global React, SircomIcon, MorelosRiskMap, MORELOS_MUNICIPIOS, seedRisk, RISK_COLOR, RISK_LABEL, LogoLockup, Isotype */
// SIRCOM — Dashboard Web (institucional, claro)

const RADARS = [
  { id: 'security', name: 'Seguridad', icon: 'security', color: '#0B2545' },
  { id: 'fire', name: 'Incendios', icon: 'fire', color: '#C8362D' },
  { id: 'rain', name: 'Lluvias', icon: 'rain', color: '#1F4A7A' },
  { id: 'river', name: 'Ríos / Inundación', icon: 'river', color: '#1F7A57' },
  { id: 'quake', name: 'Sismos', icon: 'quake', color: '#5B4B8A' },
  { id: 'volcano', name: 'Volcán Popocatépetl', icon: 'volcano', color: '#8a5d04' },
  { id: 'health', name: 'Epidemiológico', icon: 'health', color: '#1F7A57' },
  { id: 'heat', name: 'Calor extremo', icon: 'heat', color: '#E8A21C' },
  { id: 'mobility', name: 'Movilidad', icon: 'mobility', color: '#143761' },
  { id: 'school', name: 'Escolar / Comunitario', icon: 'school', color: '#0B2545' },
];

const RECENT_EVENTS = [
  { id: 'EV-2410', radar: 'fire', mun: 'Tepoztlán', level: 'high', time: '14:22', source: 'NASA FIRMS · CONAFOR', verified: true, msg: 'Punto de calor detectado en zona forestal noroeste. Brigada de CONAFOR informada.' },
  { id: 'EV-2409', radar: 'rain', mun: 'Cuernavaca', level: 'medium', time: '14:05', source: 'CONAGUA · SMN', verified: true, msg: 'Lluvia fuerte 30-50mm próximas 3h. Posible encharcamiento en zonas bajas.' },
  { id: 'EV-2408', radar: 'security', mun: 'Cuautla', level: 'medium', time: '13:48', source: 'Reportes ciudadanos · Medios locales', verified: false, msg: 'Reportes en redes sobre incidente vial col. centro. En verificación con autoridades.' },
  { id: 'EV-2407', radar: 'volcano', mun: 'Tetela del Volcán', level: 'low', time: '13:30', source: 'CENAPRED', verified: true, msg: 'Actividad moderada Popocatépetl. Sin caída de ceniza reportada en Morelos.' },
  { id: 'EV-2406', radar: 'river', mun: 'Jojutla', level: 'medium', time: '13:12', source: 'CONAGUA', verified: true, msg: 'Nivel del río Apatlaco en aumento. Vigilancia preventiva en zonas ribereñas.' },
  { id: 'EV-2405', radar: 'health', mun: 'Estado', level: 'low', time: '12:50', source: 'SSA Morelos', verified: true, msg: 'Casos de dengue en aumento en zona oriente. Recomendaciones de prevención.' },
  { id: 'EV-2404', radar: 'heat', mun: 'Axochiapan', level: 'high', time: '12:30', source: 'SMN', verified: true, msg: 'Temperatura 38°C. Riesgo para adultos mayores y trabajadores al aire libre.' },
  { id: 'EV-2403', radar: 'mobility', mun: 'Yautepec', level: 'medium', time: '12:15', source: 'SCT · Reportes', verified: true, msg: 'Cierre parcial autopista por accidente. Tiempo estimado: 45 min.' },
];

const Stat = ({ label, value, sub, tone = 'ink' }) => (
  <div style={{ background: '#fff', border: '1px solid #E2E5EA', borderRadius: 8, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
    <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 10, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 500, color: tone === 'red' ? '#C8362D' : tone === 'amber' ? '#8a5d04' : tone === 'civic' ? '#1F7A57' : '#0B2545', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: '#4A5468' }}>{sub}</div>}
  </div>
);

const RadarChip = ({ radar, active, count, onClick }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '8px 12px', borderRadius: 6,
    border: active ? '1px solid #0B2545' : '1px solid #E2E5EA',
    background: active ? '#0B2545' : '#fff',
    color: active ? '#fff' : '#0F1B2D',
    cursor: 'pointer', fontSize: 12, fontWeight: 500, letterSpacing: '-0.005em', whiteSpace: 'nowrap',
  }}>
    <SircomIcon name={radar.icon} size={16} color={active ? '#fff' : radar.color}/>
    <span>{radar.name}</span>
    {count != null && (
      <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 10, padding: '1px 6px', borderRadius: 999, background: active ? 'rgba(255,255,255,.15)' : '#F5F6F8', color: active ? '#fff' : '#4A5468' }}>{count}</span>
    )}
  </button>
);

const EventRow = ({ ev, onSelect }) => {
  const radar = RADARS.find(r => r.id === ev.radar);
  return (
    <button onClick={() => onSelect && onSelect(ev)} style={{
      display: 'grid', gridTemplateColumns: '64px 24px 1fr auto', gap: 12, alignItems: 'center',
      padding: '12px 14px', border: 0, borderBottom: '1px solid #EAEDF1', background: 'transparent',
      width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
    }}>
      <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 10, color: '#7A8294', letterSpacing: '.05em' }}>{ev.time}</span>
      <span style={{ width: 24, height: 24, borderRadius: 6, background: '#F5F6F8', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <SircomIcon name={radar.icon} size={14} color={radar.color}/>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ fontSize: 12, color: '#0F1B2D', fontWeight: 500 }}>
          {ev.mun} · <span style={{ color: '#4A5468', fontWeight: 400 }}>{ev.msg}</span>
        </span>
        <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 9, color: '#7A8294', letterSpacing: '.05em', textTransform: 'uppercase' }}>
          {ev.id} · {ev.source} · {ev.verified ? 'verificado' : 'en verificación'}
        </span>
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: RISK_COLOR[ev.level] }}/>
        <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 10, color: '#4A5468', textTransform: 'uppercase' }}>{RISK_LABEL[ev.level]}</span>
      </span>
    </button>
  );
};

const SircomDashboard = ({ width = 1280, height = 820 }) => {
  const [filter, setFilter] = React.useState('all');
  const [selectedMun, setSelectedMun] = React.useState(null);
  const [selectedEv, setSelectedEv] = React.useState(null);

  const counts = React.useMemo(() => {
    const c = { all: RECENT_EVENTS.length };
    RADARS.forEach(r => { c[r.id] = RECENT_EVENTS.filter(e => e.radar === r.id).length; });
    return c;
  }, []);

  const filteredEvents = filter === 'all' ? RECENT_EVENTS : RECENT_EVENTS.filter(e => e.radar === filter);

  return (
    <div className="sircom" style={{
      width, height, background: '#F5F6F8', display: 'flex', flexDirection: 'column',
      borderRadius: 8, overflow: 'hidden', border: '1px solid #E2E5EA',
    }}>
      {/* Topbar */}
      <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 24px', background: '#fff', borderBottom: '1px solid #E2E5EA', gap: 24 }}>
        <LogoLockup variant="A" scale={0.65}/>
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#F5F6F8', borderRadius: 6, minWidth: 280 }}>
          <SircomIcon name="search" size={14} color="#7A8294"/>
          <input placeholder="Buscar municipio, evento, fuente…" style={{ border: 0, background: 'transparent', outline: 'none', flex: 1, fontSize: 12, fontFamily: 'inherit', color: '#0F1B2D' }}/>
          <span className="mono" style={{ fontSize: 9, color: '#7A8294', padding: '2px 4px', border: '1px solid #E2E5EA', borderRadius: 3 }}>⌘K</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="sircom-pill is-civic"><span className="sircom-dot" style={{ background: '#1F7A57' }}/>Sistemas operativos</span>
          <SircomIcon name="bell" size={18} color="#4A5468"/>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: '#0B2545', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>CO</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 320px', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <div style={{ background: '#fff', borderRight: '1px solid #E2E5EA', padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
          <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase', padding: '6px 10px' }}>Navegación</div>
          {[
            { name: 'Centro de mando', icon: 'home', active: true },
            { name: 'Mapa de riesgos', icon: 'map' },
            { name: 'Alertas', icon: 'bell' },
            { name: 'Eventos', icon: 'doc' },
            { name: 'Fuentes', icon: 'wave' },
            { name: 'Verificación', icon: 'verified' },
            { name: 'Publicaciones', icon: 'arrow-right' },
            { name: 'Comunidades', icon: 'community' },
          ].map(item => (
            <div key={item.name} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6,
              background: item.active ? '#EEF2F7' : 'transparent',
              color: item.active ? '#0B2545' : '#4A5468',
              fontSize: 12, fontWeight: item.active ? 500 : 400, cursor: 'pointer',
            }}>
              <SircomIcon name={item.icon} size={16} color={item.active ? '#0B2545' : '#7A8294'}/>
              {item.name}
            </div>
          ))}
          <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase', padding: '14px 10px 6px' }}>Radares activos</div>
          {RADARS.slice(0, 6).map(r => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', fontSize: 11, color: '#4A5468' }}>
              <SircomIcon name={r.icon} size={14} color={r.color}/>{r.name}
              <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: 999, background: '#1F7A57' }}/>
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: 10, background: '#FAFBFC', border: '1px solid #E2E5EA', borderRadius: 6 }}>
            <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.1em' }}>SISTEMA</div>
            <div style={{ fontSize: 11, color: '#0F1B2D', marginTop: 2 }}>Última sincronización</div>
            <div className="mono" style={{ fontSize: 10, color: '#1F7A57', marginTop: 2 }}>hace 47 segundos</div>
          </div>
        </div>

        {/* Main */}
        <div style={{ padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.15em', textTransform: 'uppercase' }}>Centro de mando · Estado actual</div>
              <h1 style={{ fontSize: 24, fontWeight: 500, color: '#0F1B2D', margin: '6px 0 0', letterSpacing: '-0.02em' }}>Estado de Morelos · 27 ABR 2026 · 14:30</h1>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '8px 14px', border: '1px solid #E2E5EA', background: '#fff', borderRadius: 6, fontSize: 12, color: '#0F1B2D', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <SircomIcon name="filter" size={14} color="#4A5468"/> Filtros
              </button>
              <button style={{ padding: '8px 14px', border: 0, background: '#0B2545', color: '#fff', borderRadius: 6, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
                <SircomIcon name="plus" size={14} color="#fff"/> Generar publicación
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <Stat label="Alertas activas" value="14" sub="↑ 3 en última hora" tone="amber"/>
            <Stat label="Riesgo crítico" value="2" sub="Tepoztlán · Axochiapan" tone="red"/>
            <Stat label="Municipios cubiertos" value="36 / 36" sub="Cobertura total" tone="civic"/>
            <Stat label="Eventos / 24h" value="187" sub="142 verificados · 45 en revisión"/>
          </div>

          {/* Radar filters */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <RadarChip radar={{ id: 'all', name: 'Todos los radares', icon: 'radar', color: '#0B2545' }} active={filter === 'all'} count={counts.all} onClick={() => setFilter('all')}/>
            {RADARS.map(r => (
              <RadarChip key={r.id} radar={r} active={filter === r.id} count={counts[r.id]} onClick={() => setFilter(r.id)}/>
            ))}
          </div>

          {/* Map + Events split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
            <div style={{ background: '#fff', border: '1px solid #E2E5EA', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#0F1B2D' }}>Mapa territorial</div>
                  <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 2 }}>36 municipios · señal en vivo</div>
                </div>
                <div className="mono" style={{ fontSize: 9, color: '#1F7A57', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="sircom-dot" style={{ background: '#1F7A57' }}/> EN VIVO
                </div>
              </div>
              <MorelosRiskMap width={420} height={360} filter={filter} onSelect={m => setSelectedMun(m)} selected={selectedMun?.id} showLabels/>
              {selectedMun && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: '#EEF2F7', borderRadius: 6 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#0F1B2D' }}>{selectedMun.name}</div>
                    <div className="mono" style={{ fontSize: 10, color: '#4A5468' }}>{selectedMun.pop.toLocaleString('es-MX')} hab · {RISK_LABEL[seedRisk(selectedMun.id + filter, 6)]}</div>
                  </div>
                  <SircomIcon name="arrow-right" size={16} color="#0B2545"/>
                </div>
              )}
            </div>

            <div style={{ background: '#fff', border: '1px solid #E2E5EA', borderRadius: 8, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid #EAEDF1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#0F1B2D' }}>Últimos eventos detectados</div>
                  <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 2 }}>{filteredEvents.length} eventos · ordenados por hora</div>
                </div>
                <span className="sircom-pill is-ink">flujo continuo</span>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredEvents.map(ev => <EventRow key={ev.id} ev={ev} onSelect={setSelectedEv}/>)}
              </div>
            </div>
          </div>

          {/* Verification panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#fff', border: '1px solid #E2E5EA', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#0F1B2D', marginBottom: 10 }}>Panel de verificación</div>
              {[
                { name: 'CONAGUA · SMN', n: 23, conf: 99 },
                { name: 'NASA FIRMS', n: 14, conf: 97 },
                { name: 'CENAPRED', n: 8, conf: 99 },
                { name: 'Reportes ciudadanos', n: 42, conf: 68 },
                { name: 'Medios locales', n: 31, conf: 74 },
              ].map(s => (
                <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '1.4fr auto 80px auto', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: '1px dashed #EAEDF1' }}>
                  <span style={{ fontSize: 12, color: '#0F1B2D' }}>{s.name}</span>
                  <span className="mono" style={{ fontSize: 10, color: '#7A8294' }}>{s.n} eventos</span>
                  <div style={{ height: 4, background: '#F5F6F8', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${s.conf}%`, height: '100%', background: s.conf > 90 ? '#1F7A57' : s.conf > 70 ? '#E8A21C' : '#C8362D' }}/>
                  </div>
                  <span className="mono" style={{ fontSize: 10, color: '#4A5468', minWidth: 32, textAlign: 'right' }}>{s.conf}%</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', border: '1px solid #E2E5EA', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#0F1B2D', marginBottom: 10 }}>Aprobación de alertas</div>
              {[
                { id: 'AL-0024', radar: 'fire', mun: 'Tepoztlán', text: 'Punto de calor activo · zona forestal', urgent: true },
                { id: 'AL-0023', radar: 'rain', mun: 'Cuernavaca', text: 'Lluvia fuerte próximas 3h', urgent: false },
                { id: 'AL-0022', radar: 'heat', mun: 'Axochiapan', text: 'Temp. 38°C · personas vulnerables' },
              ].map(a => (
                <div key={a.id} style={{ display: 'flex', gap: 10, padding: 10, border: '1px solid #EAEDF1', borderRadius: 6, marginBottom: 8, alignItems: 'center' }}>
                  <SircomIcon name={a.radar} size={18} color={RADARS.find(r => r.id === a.radar).color}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{a.mun} · <span style={{ color: '#4A5468', fontWeight: 400 }}>{a.text}</span></div>
                    <div className="mono" style={{ fontSize: 10, color: '#7A8294' }}>{a.id} {a.urgent ? '· urgente' : ''}</div>
                  </div>
                  <button style={{ padding: '6px 10px', border: '1px solid #E2E5EA', background: '#fff', borderRadius: 5, fontSize: 11, cursor: 'pointer' }}>Revisar</button>
                  <button style={{ padding: '6px 10px', border: 0, background: '#1F7A57', color: '#fff', borderRadius: 5, fontSize: 11, cursor: 'pointer' }}>Aprobar</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div style={{ background: '#fff', borderLeft: '1px solid #E2E5EA', padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Detalle de evento</div>
            {selectedEv ? (
              <div style={{ border: '1px solid #E2E5EA', borderRadius: 8, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <SircomIcon name={RADARS.find(r => r.id === selectedEv.radar).icon} size={20} color={RADARS.find(r => r.id === selectedEv.radar).color}/>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{RADARS.find(r => r.id === selectedEv.radar).name}</span>
                  <span style={{ marginLeft: 'auto' }} className={`sircom-pill ${selectedEv.level === 'critical' || selectedEv.level === 'high' ? 'is-red' : selectedEv.level === 'medium' ? 'is-amber' : 'is-civic'}`}>{RISK_LABEL[selectedEv.level]}</span>
                </div>
                <div className="mono" style={{ fontSize: 10, color: '#7A8294' }}>{selectedEv.id} · {selectedEv.time}</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 6 }}>{selectedEv.mun}</div>
                <div style={{ fontSize: 12, color: '#4A5468', marginTop: 6, lineHeight: 1.5 }}>{selectedEv.msg}</div>
                <div style={{ borderTop: '1px solid #EAEDF1', marginTop: 12, paddingTop: 10 }}>
                  <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fuente</div>
                  <div style={{ fontSize: 12, marginTop: 2 }}>{selectedEv.source}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  <button style={{ flex: 1, padding: '8px', border: 0, background: '#0B2545', color: '#fff', borderRadius: 5, fontSize: 11, cursor: 'pointer' }}>Generar publicación</button>
                  <button style={{ padding: '8px 10px', border: '1px solid #E2E5EA', background: '#fff', borderRadius: 5, fontSize: 11, cursor: 'pointer' }}>Ver fuentes</button>
                </div>
              </div>
            ) : (
              <div style={{ border: '1px dashed #E2E5EA', borderRadius: 8, padding: 18, textAlign: 'center', color: '#7A8294', fontSize: 12 }}>
                Selecciona un evento de la lista para ver detalle, fuente y opciones de publicación.
              </div>
            )}
          </div>

          <div>
            <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Resumen 24 h</div>
            <div style={{ background: '#FAFBFC', border: '1px solid #E2E5EA', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Bar label="Lluvias" pct={72} color="#1F4A7A"/>
              <Bar label="Calor" pct={64} color="#E8A21C"/>
              <Bar label="Movilidad" pct={48} color="#143761"/>
              <Bar label="Seguridad" pct={36} color="#0B2545"/>
              <Bar label="Incendios" pct={28} color="#C8362D"/>
              <Bar label="Salud" pct={22} color="#1F7A57"/>
            </div>
          </div>

          <div>
            <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Nota legal</div>
            <div style={{ fontSize: 10, color: '#4A5468', lineHeight: 1.5, padding: 10, background: '#FAFBFC', border: '1px solid #E2E5EA', borderRadius: 6 }}>
              Información preventiva de fuentes abiertas. SIRCOM Morelos no sustituye avisos oficiales de Protección Civil. Ante emergencia, llame al <strong>911</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Bar = ({ label, pct, color }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 36px', gap: 8, alignItems: 'center' }}>
    <span style={{ fontSize: 11, color: '#0F1B2D' }}>{label}</span>
    <div style={{ height: 6, background: '#fff', border: '1px solid #EAEDF1', borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color }}/>
    </div>
    <span className="mono" style={{ fontSize: 10, color: '#4A5468', textAlign: 'right' }}>{pct}%</span>
  </div>
);

window.SircomDashboard = SircomDashboard;
window.RADARS = RADARS;
window.RECENT_EVENTS = RECENT_EVENTS;
