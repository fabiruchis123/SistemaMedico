/**
 * PageHeader — Encabezado de página
 *
 * Props:
 *   title    : string  (requerido)
 *   subtitle : string
 *   actions  : ReactNode (botones a la derecha)
 *   back     : function (muestra flecha de volver si se pasa)
 *   breadcrumb : Array<{ label, href? }>
 *
 * Uso:
 *   <PageHeader
 *     title="Gestión de Citas"
 *     subtitle="Administrá las citas del sistema"
 *     actions={<Button variant="primary">Nueva cita</Button>}
 *   />
 *
 *   <PageHeader
 *     title="Detalle de Cita"
 *     back={() => navigate(-1)}
 *     breadcrumb={[{ label: 'Citas', href: '/citas' }, { label: 'Detalle' }]}
 *   />
 */

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#828282" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function PageHeader({
  title,
  subtitle,
  actions,
  back,
  breadcrumb = [],
}) {
  return (
    <header
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom:    '1px solid #F2F4F7',
        padding:         '20px 28px',
        fontFamily:      "'Poppins', sans-serif",
      }}
    >
      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <nav
          style={{
            display:     'flex',
            alignItems:  'center',
            gap:         '4px',
            marginBottom: '12px',
          }}
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((item, i) => {
            const isLast = i === breadcrumb.length - 1
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {i > 0 && <ChevronIcon />}
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    style={{
                      fontSize:       '12px',
                      fontWeight:     400,
                      color:          '#2F80ED',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize:   '12px',
                      fontWeight: isLast ? 600 : 400,
                      color:      isLast ? '#333333' : '#828282',
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            )
          })}
        </nav>
      )}

      {/* Título + acciones */}
      <div
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {back && (
            <button
              onClick={back}
              style={{
                background:      'none',
                border:          '1.5px solid #E2E8F0',
                borderRadius:    '8px',
                cursor:          'pointer',
                color:           '#4B5563',
                padding:         '6px 8px',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                flexShrink:      0,
                transition:      'all 0.15s',
              }}
              aria-label="Volver"
            >
              <BackIcon />
            </button>
          )}

          <div>
            <h1
              style={{
                margin:     0,
                fontSize:   '22px',
                fontWeight: 700,
                color:      '#333333',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  margin:     '4px 0 0',
                  fontSize:   '13px',
                  fontWeight: 400,
                  color:      '#828282',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}
