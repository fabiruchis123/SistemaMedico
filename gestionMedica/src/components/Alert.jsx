/**
 * Alert — Alerta / notificación del sistema
 *
 * Props:
 *   type      : 'success' | 'warning' | 'error' | 'info'
 *   title     : string
 *   message   : string (requerido)
 *   onClose   : function (si se pasa, muestra botón X)
 *   icon      : boolean (mostrar ícono, default true)
 *
 * Uso:
 *   <Alert type="success" title="Cita confirmada" message="Su cita fue agendada para el lunes." />
 *   <Alert type="error" message="No se pudo guardar. Intente nuevamente." onClose={() => setError(null)} />
 */

const CONFIG = {
  success: {
    bg:      '#ECFDF5',
    border:  '#27AE60',
    color:   '#27AE60',
    title:   '#1a7a45',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  warning: {
    bg:     '#FFF7ED',
    border: '#F2994A',
    color:  '#F2994A',
    title:  '#b56c1f',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F2994A" strokeWidth="2.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  error: {
    bg:     '#FEF2F2',
    border: '#EB5757',
    color:  '#EB5757',
    title:  '#c0392b',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB5757" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
  info: {
    bg:     '#EFF6FF',
    border: '#2F80ED',
    color:  '#2F80ED',
    title:  '#1a5bbf',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F80ED" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
}

export default function Alert({
  type    = 'info',
  title,
  message,
  onClose,
  icon    = true,
}) {
  const c = CONFIG[type] ?? CONFIG.info

  return (
    <div
      role="alert"
      style={{
        display:         'flex',
        alignItems:      'flex-start',
        gap:             '12px',
        backgroundColor: c.bg,
        borderLeft:      `4px solid ${c.border}`,
        borderRadius:    '8px',
        padding:         '14px 16px',
        fontFamily:      "'Poppins', sans-serif",
        position:        'relative',
      }}
    >
      {icon && (
        <span style={{ flexShrink: 0, marginTop: '1px' }}>{c.icon}</span>
      )}

      <div style={{ flex: 1 }}>
        {title && (
          <p style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: 600, color: c.title }}>
            {title}
          </p>
        )}
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 400, color: '#4B5563', lineHeight: '1.5' }}>
          {message}
        </p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          style={{
            background:  'none',
            border:      'none',
            cursor:      'pointer',
            color:       '#828282',
            padding:     '0',
            display:     'flex',
            alignItems:  'center',
            flexShrink:  0,
          }}
          aria-label="Cerrar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
}
