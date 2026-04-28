/* global React, SircomIcon, RADARS, RISK_COLOR, RISK_LABEL, Isotype */
// SIRCOM — Plantillas de Facebook + WhatsApp + Imágenes institucionales

// FACEBOOK templates: 1080×1080 (square)
const FBTemplate = ({ children, label, bg = '#0B2545', text = '#fff' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.1em', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ width: 360, height: 360, background: bg, color: text, borderRadius: 8, padding: 24, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 16px rgba(11,37,69,.08)' }}>
      {children}
    </div>
  </div>
);

const FBHeader = ({ dark = true }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Isotype variant="A" size={26} ink={dark ? '#fff' : '#0B2545'} accent="#1F7A57" amber="#E8A21C"/>
    <div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>SIRCOM MORELOS</div>
      <div className="mono" style={{ fontSize: 8, color: dark ? 'rgba(255,255,255,.7)' : '#7A8294', letterSpacing: '.1em' }}>INTELIGENCIA COMUNITARIA</div>
    </div>
  </div>
);

const FBFooter = ({ dark = true }) => (
  <div style={{ position: 'absolute', bottom: 16, left: 24, right: 24 }}>
    <div className="mono" style={{ fontSize: 7, color: dark ? 'rgba(255,255,255,.55)' : '#7A8294', letterSpacing: '.08em', lineHeight: 1.4 }}>
      INFORMACIÓN PREVENTIVA DE FUENTES ABIERTAS.<br/>NO SUSTITUYE AVISOS OFICIALES. EMERGENCIA · 911
    </div>
  </div>
);

const FBReporte6h = () => (
  <FBTemplate label="Reporte general · cada 6 h" bg="#0B2545">
    <FBHeader/>
    <div className="mono" style={{ fontSize: 9, color: '#E8A21C', letterSpacing: '.18em', marginTop: 22 }}>CORTE INFORMATIVO · 14:30</div>
    <div style={{ fontSize: 22, fontWeight: 500, marginTop: 6, lineHeight: 1.15, letterSpacing: '-0.01em' }}>Estado de Morelos<br/><span style={{ color: '#E8A21C' }}>14 alertas activas</span></div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 14 }}>
      {[['Lluvias',4,'#1F4A7A'],['Calor',3,'#E8A21C'],['Movilidad',2,'#143761'],['Incendios',2,'#C8362D'],['Salud',2,'#1F7A57'],['Otros',1,'#5B4B8A']].map(([n,c,col]) => (
        <div key={n} style={{ background: 'rgba(255,255,255,.06)', borderRadius: 6, padding: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: col }}>{c}</div>
          <div className="mono" style={{ fontSize: 8, color: 'rgba(255,255,255,.65)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{n}</div>
        </div>
      ))}
    </div>
    <FBFooter/>
  </FBTemplate>
);

const FBSeguridad = () => (
  <FBTemplate label="Alerta · Seguridad" bg="#fff" text="#0F1B2D">
    <FBHeader dark={false}/>
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 999, background: '#FCF3DD', color: '#8a5d04', marginTop: 16 }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: '#E8A21C' }}/>
      <span className="mono" style={{ fontSize: 9, letterSpacing: '.12em' }}>PREVENTIVA · SEGURIDAD CIUDADANA</span>
    </div>
    <div style={{ fontSize: 22, fontWeight: 500, marginTop: 14, lineHeight: 1.2, letterSpacing: '-0.01em' }}>Reportes en redes sobre incidente vial</div>
    <div style={{ fontSize: 13, color: '#4A5468', marginTop: 8, lineHeight: 1.5 }}>Cuautla · Col. Centro<br/>Hoy 13:48</div>
    <div style={{ fontSize: 12, color: '#0F1B2D', marginTop: 12, lineHeight: 1.5, padding: 10, background: '#F5F6F8', borderRadius: 6 }}>
      <strong>Recomendación:</strong> Evita la zona si es posible. Mantente con personas de confianza. En verificación con autoridades.
    </div>
    <div className="mono" style={{ fontSize: 9, color: '#7A8294', marginTop: 12, letterSpacing: '.08em' }}>FUENTE · MEDIOS LOCALES + REPORTES CIUDADANOS</div>
    <FBFooter dark={false}/>
  </FBTemplate>
);

const FBIncendio = () => (
  <FBTemplate label="Alerta · Incendio" bg="#7a1f17" text="#fff">
    <FBHeader/>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
      <SircomIcon name="fire" size={36} color="#E8A21C"/>
      <div>
        <div className="mono" style={{ fontSize: 9, color: '#E8A21C', letterSpacing: '.18em' }}>ALERTA · RIESGO ALTO</div>
        <div style={{ fontSize: 22, fontWeight: 500, marginTop: 4, letterSpacing: '-0.01em' }}>Punto de calor activo</div>
      </div>
    </div>
    <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.4 }}>Tepoztlán · Zona forestal noroeste<br/><span style={{ color: 'rgba(255,255,255,.7)', fontSize: 12 }}>14:22 · Brigada CONAFOR notificada</span></div>
    <div style={{ marginTop: 12, padding: 12, background: 'rgba(255,255,255,.08)', borderRadius: 6, fontSize: 12, lineHeight: 1.5 }}>
      <strong>Si estás en la zona:</strong> No te acerques. Mantén ventanas cerradas. Reporta humo al 911.
    </div>
    <div className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,.7)', marginTop: 10, letterSpacing: '.08em' }}>FUENTE · NASA FIRMS · CONAFOR</div>
    <FBFooter/>
  </FBTemplate>
);

const FBLluvia = () => (
  <FBTemplate label="Alerta · Lluvia" bg="#143761" text="#fff">
    <FBHeader/>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
      <SircomIcon name="rain" size={36} color="#E8A21C"/>
      <div>
        <div className="mono" style={{ fontSize: 9, color: '#E8A21C', letterSpacing: '.18em' }}>PREVENTIVA · LLUVIAS</div>
        <div style={{ fontSize: 22, fontWeight: 500, marginTop: 4 }}>Lluvia fuerte 30-50mm</div>
      </div>
    </div>
    <div style={{ marginTop: 14, fontSize: 14 }}>Cuernavaca · próximas 3 horas<br/><span style={{ color: 'rgba(255,255,255,.7)', fontSize: 12 }}>Hoy 14:00 a 17:00</span></div>
    <div style={{ marginTop: 12, padding: 12, background: 'rgba(255,255,255,.08)', borderRadius: 6, fontSize: 12, lineHeight: 1.5 }}>
      Evita zonas bajas y barrancas. Posible encharcamiento en av. principales.
    </div>
    <div className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,.7)', marginTop: 10, letterSpacing: '.08em' }}>FUENTE · CONAGUA · SMN</div>
    <FBFooter/>
  </FBTemplate>
);

const FBVolcan = () => (
  <FBTemplate label="Alerta · Volcán / Ceniza" bg="#2a2435" text="#fff">
    <FBHeader/>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
      <SircomIcon name="volcano" size={36} color="#E8A21C"/>
      <div>
        <div className="mono" style={{ fontSize: 9, color: '#E8A21C', letterSpacing: '.18em' }}>VIGILANCIA · POPOCATÉPETL</div>
        <div style={{ fontSize: 22, fontWeight: 500, marginTop: 4 }}>Actividad moderada</div>
      </div>
    </div>
    <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.5 }}>Tetela del Volcán · Ocuituco · Yecapixtla<br/><span style={{ color: 'rgba(255,255,255,.7)' }}>Sin caída de ceniza reportada en Morelos</span></div>
    <div style={{ marginTop: 12, padding: 12, background: 'rgba(255,255,255,.08)', borderRadius: 6, fontSize: 12, lineHeight: 1.5 }}>
      Mantén cubrebocas a la mano. Vigila ojos y vías respiratorias en personas vulnerables.
    </div>
    <div className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,.7)', marginTop: 10, letterSpacing: '.08em' }}>FUENTE · CENAPRED</div>
    <FBFooter/>
  </FBTemplate>
);

const FBResumenSemanal = () => (
  <FBTemplate label="Resumen semanal" bg="#fff" text="#0F1B2D">
    <FBHeader dark={false}/>
    <div className="mono" style={{ fontSize: 9, color: '#7A8294', letterSpacing: '.18em', marginTop: 18 }}>SEMANA 17 · 21–27 ABRIL 2026</div>
    <div style={{ fontSize: 22, fontWeight: 500, marginTop: 6, letterSpacing: '-0.01em' }}>Lo que pasó en Morelos</div>
    <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        ['Eventos detectados','1,247','#0B2545'],
        ['Alertas emitidas','187','#E8A21C'],
        ['Verificadas','142','#1F7A57'],
        ['Municipios cubiertos','36 / 36','#143761'],
      ].map(([n,v,c]) => (
        <div key={n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #EAEDF1', paddingBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#4A5468' }}>{n}</span>
          <span style={{ fontSize: 18, fontWeight: 500, color: c, fontFamily: 'IBM Plex Mono' }}>{v}</span>
        </div>
      ))}
    </div>
    <FBFooter dark={false}/>
  </FBTemplate>
);

const SircomFacebook = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 360px)', gap: 24, padding: 20 }}>
    <FBReporte6h/>
    <FBSeguridad/>
    <FBIncendio/>
    <FBLluvia/>
    <FBVolcan/>
    <FBResumenSemanal/>
  </div>
);

// ── WHATSAPP ─────────────────────────────────────────────────────────
const WAMessage = ({ children }) => (
  <div style={{ background: '#DCF8C6', borderRadius: 8, padding: 12, maxWidth: 280, fontSize: 13, color: '#0F1B2D', lineHeight: 1.5, position: 'relative', boxShadow: '0 1px 1px rgba(0,0,0,.08)', fontFamily: '-apple-system, "Segoe UI", system-ui, sans-serif' }}>
    {children}
    <div style={{ position: 'absolute', bottom: 4, right: 8, fontSize: 10, color: '#5a7a4a' }}>14:32 ✓✓</div>
  </div>
);

const SircomWhatsApp = () => (
  <div className="sircom" style={{ background: '#fff', padding: 32, width: 880, border: '1px solid #E2E5EA', borderRadius: 8 }}>
    <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.15em', textTransform: 'uppercase' }}>WhatsApp · Formatos</div>
    <h2 style={{ fontSize: 24, fontWeight: 500, margin: '8px 0 8px', letterSpacing: '-0.02em' }}>Alertas breves, claras, móviles primero</h2>
    <p style={{ fontSize: 12, color: '#4A5468', marginBottom: 22, maxWidth: 600 }}>Estructura fija de 5 líneas: emoji-icono visual + nivel + qué + dónde + recomendación + fuente + nota legal. Texto plano, sin alarmar.</p>
    <div style={{ background: '#ECE5DD', padding: 24, borderRadius: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <WAMessage>
        <strong>🟠 SIRCOM · ALERTA PREVENTIVA</strong><br/>
        🌧️ Lluvia fuerte 30-50mm<br/>
        📍 Cuernavaca · próximas 3h<br/><br/>
        Evita zonas bajas y barrancas.<br/>
        Posible encharcamiento av. principales.<br/><br/>
        <span style={{ color: '#4A5468', fontSize: 11 }}>Fuente: CONAGUA · SMN · 14:30<br/>Información preventiva. No sustituye avisos oficiales. Emergencia 911.</span>
      </WAMessage>
      <WAMessage>
        <strong>🔴 SIRCOM · RIESGO ALTO</strong><br/>
        🔥 Punto de calor activo<br/>
        📍 Tepoztlán · zona forestal NO<br/><br/>
        No te acerques a la zona.<br/>
        Mantén ventanas cerradas.<br/>
        Reporta humo al 911.<br/><br/>
        <span style={{ color: '#4A5468', fontSize: 11 }}>Fuente: NASA FIRMS · CONAFOR · 14:22<br/>Brigada notificada. Información preventiva.</span>
      </WAMessage>
      <WAMessage>
        <strong>🟡 SIRCOM · ESCOLAR</strong><br/>
        🏫 Recomendación para escuelas<br/>
        📍 Cuernavaca · zona poniente<br/><br/>
        Calor extremo 14-17h.<br/>
        Suspender educación física.<br/>
        Reforzar hidratación.<br/><br/>
        <span style={{ color: '#4A5468', fontSize: 11 }}>Fuente: SMN · 12:30<br/>Información preventiva.</span>
      </WAMessage>
      <WAMessage>
        <strong>🟢 SIRCOM · CORTE 14:30</strong><br/>
        Estado de Morelos<br/><br/>
        14 alertas activas<br/>
        2 críticas · 5 preventivas · 7 vigilancia<br/><br/>
        Más alta: Tepoztlán (incendio)<br/>
        Cobertura: 36/36 municipios<br/><br/>
        <span style={{ color: '#4A5468', fontSize: 11 }}>Reporte cada 6h · sircom.morelos<br/>Información preventiva de fuentes abiertas.</span>
      </WAMessage>
    </div>
  </div>
);

// ── INSTITUTIONAL IMAGERY (placeholders) ─────────────────────────────
const InstPhoto = ({ caption, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div className="sircom-photo" style={{ width: '100%', aspectRatio: '4/3', alignItems: 'flex-end' }}>
      {label}
    </div>
    <div style={{ fontSize: 11, color: '#4A5468', lineHeight: 1.5 }}>{caption}</div>
  </div>
);

const SircomImagery = () => (
  <div className="sircom" style={{ background: '#fff', padding: 32, width: 880, border: '1px solid #E2E5EA', borderRadius: 8 }}>
    <div className="mono" style={{ fontSize: 10, color: '#7A8294', letterSpacing: '.15em', textTransform: 'uppercase' }}>Imágenes institucionales</div>
    <h2 style={{ fontSize: 24, fontWeight: 500, margin: '8px 0 8px', letterSpacing: '-0.02em' }}>Dirección fotográfica · prevención humana</h2>
    <p style={{ fontSize: 12, color: '#4A5468', marginBottom: 22, maxWidth: 640 }}>
      Personas reales, luz natural, contexto morelense. <strong>Nunca</strong> sangre, violencia, escenas alarmistas, ni montajes sensacionalistas. Brillo medio-alto, color cálido sutil. Encuadres horizontales para Facebook, verticales para historias.
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <InstPhoto label="01 · COMUNIDAD-INFORMADA" caption="Vecinos consultando el reporte SIRCOM en celular · plaza comunitaria"/>
      <InstPhoto label="02 · DOCENTE-ESCUELA" caption="Maestra revisando recomendación escolar antes del recreo"/>
      <InstPhoto label="03 · FAMILIA-AVISO" caption="Familia revisando aviso preventivo antes de salir"/>
      <InstPhoto label="04 · BRIGADISTAS-CAMPO" caption="Brigadistas de Protección Civil en operación preventiva"/>
      <InstPhoto label="05 · MAPA-DIGITAL" caption="Tablero del centro de mando con señales de riesgo"/>
      <InstPhoto label="06 · TABLERO-DATOS" caption="Operadora analizando alertas comunitarias por zona"/>
      <InstPhoto label="07 · JOVEN-REPORTE" caption="Joven enviando reporte preventivo desde el celular"/>
      <InstPhoto label="08 · PAISAJE-MORELOS" caption="Paisaje morelense en hora dorada · enfoque preventivo"/>
    </div>
  </div>
);

window.SircomFacebook = SircomFacebook;
window.SircomWhatsApp = SircomWhatsApp;
window.SircomImagery = SircomImagery;
