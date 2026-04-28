/* global React, SircomIcon, RADARS, RISK_COLOR, RISK_LABEL, MorelosRiskMap, MORELOS_MUNICIPIOS, seedRisk, Isotype */
// SIRCOM — App móvil (8 pantallas) en frame de iPhone

const phoneStatusBar = (
  <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', fontSize: 12, fontWeight: 600, color: '#0F1B2D' }}>
    <span>9:41</span>
    <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <svg width="16" height="10" viewBox="0 0 16 10"><rect x="0" y="2" width="3" height="6" rx="1" fill="#0F1B2D"/><rect x="4" y="0" width="3" height="8" rx="1" fill="#0F1B2D"/><rect x="8" y="-1" width="3" height="9" rx="1" fill="#0F1B2D"/><rect x="12" y="-2" width="3" height="10" rx="1" fill="#0F1B2D"/></svg>
      <svg width="22" height="10" viewBox="0 0 22 10"><rect x="0" y="0" width="18" height="10" rx="2" fill="none" stroke="#0F1B2D" strokeWidth="1"/><rect x="2" y="2" width="14" height="6" rx="1" fill="#0F1B2D"/><rect x="19" y="3" width="2" height="4" rx="1" fill="#0F1B2D"/></svg>
    </span>
  </div>
);

const Phone = ({ children, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase' }}>{label}</div>
    <div style={{
      width: 320, height: 660, background: '#0B2545', borderRadius: 38, padding: 8,
      boxShadow: '0 30px 60px -20px rgba(11,37,69,.25), 0 0 0 1px rgba(11,37,69,.1)',
    }}>
      <div style={{ width: '100%', height: '100%', background: '#F5F6F8', borderRadius: 32, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 90, height: 22, background: '#0B2545', borderRadius: 999, zIndex: 10 }}/>
        {phoneStatusBar}
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>{children}</div>
      </div>
    </div>
  </div>
);

const PhoneTabBar = ({ active = 'home' }) => (
  <div style={{ height: 70, borderTop: '1px solid #E2E5EA', background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', alignItems: 'center', padding: '0 6px 14px' }}>
    {[
      { id: 'home', icon: 'home', label: 'Inicio' },
      { id: 'map', icon: 'map', label: 'Mapa' },
      { id: 'alerts', icon: 'bell', label: 'Alertas' },
      { id: 'report', icon: 'plus', label: 'Reportar' },
      { id: 'profile', icon: 'community', label: 'Perfil' },
    ].map(t => (
      <div key={t.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: active === t.id ? '#0B2545' : '#7A8294' }}>
        <SircomIcon name={t.icon} size={20} color={active === t.id ? '#0B2545' : '#7A8294'}/>
        <span style={{ fontSize: 10, fontWeight: active === t.id ? 600 : 400 }}>{t.label}</span>
      </div>
    ))}
  </div>
);

const PhoneHeader = ({ title, sub, back, action }) => (
  <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderBottom: '1px solid #EAEDF1' }}>
    {back && <SircomIcon name="chevron-right" size={20} style={{ transform: 'rotate(180deg)' }} color="#0F1B2D"/>}
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
      {sub && <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.05em' }}>{sub}</div>}
    </div>
    {action}
  </div>
);

// ── Screen 1: Inicio
const ScreenInicio = () => (
  <>
    <PhoneHeader title="Cuernavaca" sub="MORELOS · ACTUALIZADO 14:30" action={<SircomIcon name="bell" size={20} color="#4A5468"/>}/>
    <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 12, background: '#F5F6F8' }}>
      <div style={{ background: '#0B2545', color: '#fff', borderRadius: 12, padding: 16, position: 'relative', overflow: 'hidden' }}>
        <Isotype variant="A" size={32} ink="#fff" accent="#1F7A57" amber="#E8A21C"/>
        <div className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,.7)', letterSpacing: '.12em', marginTop: 12 }}>NIVEL DE ALERTA</div>
        <div style={{ fontSize: 22, fontWeight: 500, marginTop: 4 }}>Preventiva · 2 alertas activas</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.8)', marginTop: 6 }}>Lluvia fuerte y calor extremo en tu zona.</div>
      </div>

      <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase' }}>Alertas para ti</div>
      {[
        { radar: 'rain', title: 'Lluvia fuerte 30-50mm', sub: 'Próximas 3h · Cuernavaca', level: 'medium' },
        { radar: 'heat', title: 'Calor extremo 36°C', sub: 'Hoy 14-17h · zona poniente', level: 'high' },
      ].map((a, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #EAEDF1' }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SircomIcon name={a.radar} size={20} color={RADARS.find(r => r.id === a.radar).color}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{a.title}</div>
            <div className="mono" style={{ fontSize: 10, color: '#7A8294', marginTop: 2 }}>{a.sub}</div>
          </div>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: RISK_COLOR[a.level] }}/>
        </div>
      ))}

      <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 4 }}>Radares activos</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {RADARS.slice(0, 8).map(r => (
          <div key={r.id} style={{ background: '#fff', borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, border: '1px solid #EAEDF1' }}>
            <SircomIcon name={r.icon} size={20} color={r.color}/>
            <span style={{ fontSize: 9, color: '#4A5468', textAlign: 'center', lineHeight: 1.2 }}>{r.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>

      <div style={{ background: '#FCF3DD', borderRadius: 10, padding: 12, display: 'flex', gap: 10, alignItems: 'flex-start', border: '1px solid rgba(232,162,28,.3)' }}>
        <SircomIcon name="alert-critical" size={18} color="#8a5d04"/>
        <div style={{ fontSize: 11, color: '#5a3e02', lineHeight: 1.4 }}>
          <strong>Recomendación escolar:</strong> Por calor extremo, evitar actividades al aire libre 14-17h.
        </div>
      </div>
    </div>
    <PhoneTabBar active="home"/>
  </>
);

// ── Screen 2: Alertas por municipio
const ScreenAlertasMunicipio = () => (
  <>
    <PhoneHeader title="Alertas" sub="36 MUNICIPIOS · 14 ACTIVAS" back/>
    <div style={{ flex: 1, overflowY: 'auto', background: '#F5F6F8' }}>
      <div style={{ display: 'flex', gap: 6, padding: '10px 14px', overflowX: 'auto' }}>
        {['Todos', 'Mi zona', 'Cuernavaca', 'Cuautla', 'Jojutla', 'Tepoztlán'].map((c, i) => (
          <span key={c} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: i === 1 ? '#0B2545' : '#fff', color: i === 1 ? '#fff' : '#0F1B2D', border: '1px solid #E2E5EA', whiteSpace: 'nowrap' }}>{c}</span>
        ))}
      </div>
      <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { mun: 'Tepoztlán', radar: 'fire', text: 'Punto de calor zona forestal', level: 'high', time: 'hace 8 min' },
          { mun: 'Cuernavaca', radar: 'rain', text: 'Lluvia fuerte próximas 3h', level: 'medium', time: 'hace 25 min' },
          { mun: 'Axochiapan', radar: 'heat', text: 'Temperatura 38°C', level: 'high', time: 'hace 2h' },
          { mun: 'Jojutla', radar: 'river', text: 'Nivel río Apatlaco en aumento', level: 'medium', time: 'hace 1h' },
          { mun: 'Yautepec', radar: 'mobility', text: 'Cierre parcial autopista', level: 'medium', time: 'hace 2h' },
          { mun: 'Estado', radar: 'health', text: 'Casos de dengue al alza', level: 'low', time: 'hoy' },
        ].map((a, i) => {
          const radar = RADARS.find(r => r.id === a.radar);
          return (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', gap: 6, border: '1px solid #EAEDF1', borderLeft: `3px solid ${RISK_COLOR[a.level]}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <SircomIcon name={radar.icon} size={16} color={radar.color}/>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{a.mun}</span>
                <span style={{ marginLeft: 'auto' }} className="mono" />
                <span className="mono" style={{ fontSize: 9, color: '#7A8294' }}>{a.time}</span>
              </div>
              <div style={{ fontSize: 13, color: '#0F1B2D' }}>{a.text}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase' }}>{RISK_LABEL[a.level]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <PhoneTabBar active="alerts"/>
  </>
);

// ── Screen 3: Radares activos
const ScreenRadares = () => (
  <>
    <PhoneHeader title="Radares activos" sub="10 SISTEMAS · OPERATIVOS" back/>
    <div style={{ flex: 1, overflowY: 'auto', background: '#F5F6F8', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {RADARS.map(r => (
        <div key={r.id} style={{ background: '#fff', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #EAEDF1' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SircomIcon name={r.icon} size={18} color={r.color}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
            <div className="mono" style={{ fontSize: 10, color: '#7A8294', marginTop: 2 }}>Activo · {Math.floor(2 + Math.random() * 8)} eventos / 24h</div>
          </div>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: '#1F7A57' }}/>
        </div>
      ))}
    </div>
    <PhoneTabBar/>
  </>
);

// ── Screen 4: Mapa
const ScreenMapa = () => (
  <>
    <PhoneHeader title="Mapa de Morelos" sub="EN VIVO · 36 MUNICIPIOS" action={<SircomIcon name="filter" size={18} color="#4A5468"/>}/>
    <div style={{ flex: 1, position: 'relative', background: '#F5F6F8' }}>
      <MorelosRiskMap width={304} height={420} compact/>
      <div style={{ position: 'absolute', left: 10, right: 10, bottom: 10, background: '#fff', borderRadius: 10, padding: 12, border: '1px solid #EAEDF1', boxShadow: '0 8px 24px rgba(11,37,69,.08)' }}>
        <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.1em' }}>RIESGO MÁS ALTO</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <SircomIcon name="fire" size={18} color="#C8362D"/>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Tepoztlán · Punto de calor</span>
        </div>
        <div style={{ fontSize: 11, color: '#4A5468', marginTop: 4 }}>Brigada CONAFOR notificada · zona forestal</div>
      </div>
    </div>
    <PhoneTabBar active="map"/>
  </>
);

// ── Screen 5: Reporte ciudadano
const ScreenReporte = () => (
  <>
    <PhoneHeader title="Reportar" sub="INFORMACIÓN PREVENTIVA" back/>
    <div style={{ flex: 1, overflowY: 'auto', background: '#F5F6F8', padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, color: '#4A5468', lineHeight: 1.5 }}>
        Tu reporte ayudará a alertar a tu comunidad. Será verificado antes de publicarse.
      </div>
      <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase' }}>Tipo de reporte</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
        {RADARS.slice(0, 9).map((r, i) => (
          <div key={r.id} style={{ background: i === 2 ? '#EEF2F7' : '#fff', border: i === 2 ? '1.5px solid #0B2545' : '1px solid #EAEDF1', borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <SircomIcon name={r.icon} size={20} color={r.color}/>
            <span style={{ fontSize: 9, color: '#4A5468', textAlign: 'center' }}>{r.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
      <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase' }}>Ubicación</div>
      <div style={{ background: '#fff', border: '1px solid #EAEDF1', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <SircomIcon name="pin" size={18} color="#1F7A57"/>
        <span style={{ fontSize: 12 }}>Cuernavaca · Centro</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#0B2545', fontWeight: 500 }}>Cambiar</span>
      </div>
      <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase' }}>Descripción</div>
      <div style={{ background: '#fff', border: '1px solid #EAEDF1', borderRadius: 10, padding: 12, fontSize: 12, color: '#7A8294', minHeight: 80 }}>
        Describe lo que observas con claridad y sin alarmar...
      </div>
      <button style={{ background: '#0B2545', color: '#fff', border: 0, borderRadius: 10, padding: 14, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
        Enviar reporte preventivo
      </button>
      <div style={{ fontSize: 10, color: '#7A8294', textAlign: 'center', lineHeight: 1.5 }}>
        Información preventiva. Para emergencias llame al 911.
      </div>
    </div>
  </>
);

// ── Screen 6: Recomendaciones
const ScreenRecomendaciones = () => (
  <>
    <PhoneHeader title="Recomendaciones" sub="HOY · CUERNAVACA" back/>
    <div style={{ flex: 1, overflowY: 'auto', background: '#F5F6F8', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {[
        { icon: 'heat', title: 'Calor extremo · 36°C', items: ['Hidratarse cada 30 min', 'Evitar exposición 14-17h', 'Ropa clara y holgada', 'Vigilar adultos mayores y niños'] },
        { icon: 'rain', title: 'Lluvia fuerte próximas 3h', items: ['Evita zonas bajas y barrancas', 'No cruces caminos inundados', 'Recoge tendido eléctrico al aire'] },
        { icon: 'school', title: 'Para escuelas', items: ['Suspender educación física', 'Reforzar hidratación en recreo', 'Revisar accesos por lluvia'] },
      ].map((rec, i) => {
        const radar = RADARS.find(r => r.id === rec.icon);
        return (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #EAEDF1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <SircomIcon name={rec.icon} size={20} color={radar?.color || '#0B2545'}/>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{rec.title}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {rec.items.map((it, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <SircomIcon name="check" size={14} color="#1F7A57" style={{ marginTop: 2 }}/>
                  <span style={{ fontSize: 12, color: '#0F1B2D', lineHeight: 1.4 }}>{it}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </>
);

// ── Screen 7: Notificaciones
const ScreenNotificaciones = () => (
  <>
    <PhoneHeader title="Notificaciones" sub="CONFIGURACIÓN" back/>
    <div style={{ flex: 1, overflowY: 'auto', background: '#F5F6F8', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase' }}>Por radar</div>
      {RADARS.map((r, i) => (
        <div key={r.id} style={{ background: '#fff', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #EAEDF1' }}>
          <SircomIcon name={r.icon} size={18} color={r.color}/>
          <span style={{ fontSize: 12, fontWeight: 500, flex: 1 }}>{r.name}</span>
          <div style={{ width: 36, height: 22, background: i % 3 === 2 ? '#E2E5EA' : '#1F7A57', borderRadius: 999, position: 'relative', transition: 'background .2s' }}>
            <div style={{ position: 'absolute', top: 2, left: i % 3 === 2 ? 2 : 16, width: 18, height: 18, background: '#fff', borderRadius: 999, transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.15)' }}/>
          </div>
        </div>
      ))}
      <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 6 }}>Nivel mínimo de alerta</div>
      <div style={{ background: '#fff', borderRadius: 10, padding: 4, display: 'flex', gap: 4, border: '1px solid #EAEDF1' }}>
        {['Vigilancia', 'Preventiva', 'Alto', 'Crítico'].map((n, i) => (
          <div key={n} style={{ flex: 1, padding: '8px 0', textAlign: 'center', fontSize: 10, fontWeight: 500, borderRadius: 6, background: i === 1 ? '#0B2545' : 'transparent', color: i === 1 ? '#fff' : '#4A5468' }}>{n}</div>
        ))}
      </div>
    </div>
  </>
);

// ── Screen 8: Perfil comunidad / escuela
const ScreenPerfilComunidad = () => (
  <>
    <PhoneHeader title="Mi comunidad" sub="ESCUELA · COMITÉ"/>
    <div style={{ flex: 1, overflowY: 'auto', background: '#F5F6F8' }}>
      <div style={{ background: '#fff', padding: '16px 14px', borderBottom: '1px solid #EAEDF1', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: '#0B2545', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>EP</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Esc. Prim. Benito Juárez</div>
          <div className="mono" style={{ fontSize: 10, color: '#7A8294', marginTop: 2 }}>CUERNAVACA · 320 ESTUDIANTES</div>
        </div>
      </div>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#fff', borderRadius: 10, padding: 12, border: '1px solid #EAEDF1' }}>
          <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.1em' }}>RECOMENDACIONES VIGENTES</div>
          <div style={{ fontSize: 22, fontWeight: 500, marginTop: 4, color: '#8a5d04' }}>3</div>
          <div style={{ fontSize: 11, color: '#4A5468', marginTop: 4 }}>Calor extremo · Lluvia · Recomendación escolar</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 12, border: '1px solid #EAEDF1' }}>
            <div className="mono" style={{ fontSize: 9, color: '#7A8294' }}>RIESGO HOY</div>
            <div style={{ fontSize: 18, fontWeight: 500, marginTop: 4, color: '#8a5d04' }}>Preventivo</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, padding: 12, border: '1px solid #EAEDF1' }}>
            <div className="mono" style={{ fontSize: 9, color: '#7A8294' }}>FAMILIAS</div>
            <div style={{ fontSize: 18, fontWeight: 500, marginTop: 4 }}>248 / 320</div>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 12, border: '1px solid #EAEDF1' }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Acciones rápidas</div>
          {[
            { icon: 'doc', text: 'Generar comunicado a padres' },
            { icon: 'community', text: 'Compartir alerta con docentes' },
            { icon: 'check', text: 'Marcar acción ejecutada' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i ? '1px solid #EAEDF1' : 0 }}>
              <SircomIcon name={a.icon} size={16} color="#0B2545"/>
              <span style={{ fontSize: 12 }}>{a.text}</span>
              <SircomIcon name="chevron-right" size={14} color="#7A8294" style={{ marginLeft: 'auto' }}/>
            </div>
          ))}
        </div>
      </div>
    </div>
    <PhoneTabBar active="profile"/>
  </>
);

const SircomMobileSet = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 320px)', gap: 32, padding: 20 }}>
    <Phone label="01 · Inicio"><ScreenInicio/></Phone>
    <Phone label="02 · Alertas por municipio"><ScreenAlertasMunicipio/></Phone>
    <Phone label="03 · Radares activos"><ScreenRadares/></Phone>
    <Phone label="04 · Mapa"><ScreenMapa/></Phone>
    <Phone label="05 · Reporte ciudadano"><ScreenReporte/></Phone>
    <Phone label="06 · Recomendaciones"><ScreenRecomendaciones/></Phone>
    <Phone label="07 · Notificaciones"><ScreenNotificaciones/></Phone>
    <Phone label="08 · Perfil comunidad"><ScreenPerfilComunidad/></Phone>
  </div>
);

window.SircomMobileSet = SircomMobileSet;
