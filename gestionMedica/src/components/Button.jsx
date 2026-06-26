/**
 * Button — Botón reutilizable
 *
 * Props:
 *   variant  : 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
 *   size     : 'sm' | 'md' | 'lg'
 *   disabled : boolean
 *   loading  : boolean
 *   icon     : ReactNode (ícono opcional a la izquierda)
 *   onClick  : function
 *   children : ReactNode
 *
 * Uso:
 *   <Button variant="primary" onClick={handleSave}>Guardar cita</Button>
 *   <Button variant="danger" size="sm">Cancelar</Button>
 *   <Button variant="outline" loading>Cargando...</Button>
 */

const styles = {
  base: {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            '8px',
    fontFamily:     "'Poppins', sans-serif",
    fontWeight:     500,
    borderRadius:   '8px',
    border:         '1.5px solid transparent',
    cursor:         'pointer',
    transition:     'all 0.2s ease',
    whiteSpace:     'nowrap',
  },
  sizes: {
    sm: { padding: '6px 14px',  fontSize: '13px', lineHeight: '20px' },
    md: { padding: '10px 20px', fontSize: '14px', lineHeight: '22px' },
    lg: { padding: '13px 28px', fontSize: '15px', lineHeight: '24px' },
  },
  variants: {
    primary: {
      backgroundColor: '#2F80ED',
      color:           '#FFFFFF',
      borderColor:     '#2F80ED',
    },
    secondary: {
      backgroundColor: '#BEE3F8',
      color:           '#1F4E79',
      borderColor:     '#BEE3F8',
    },
    danger: {
      backgroundColor: '#EB5757',
      color:           '#FFFFFF',
      borderColor:     '#EB5757',
    },
    outline: {
      backgroundColor: 'transparent',
      color:           '#2F80ED',
      borderColor:     '#2F80ED',
    },
    ghost: {
      backgroundColor: 'transparent',
      color:           '#828282',
      borderColor:     'transparent',
    },
  },
  disabled: {
    opacity:   0.5,
    cursor:    'not-allowed',
  },
}

const Spinner = () => (
  <svg
    style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
    <path fill="currentColor" fillOpacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

export default function Button({
  variant  = 'primary',
  size     = 'md',
  disabled = false,
  loading  = false,
  icon     = null,
  onClick,
  children,
  type = 'button',
  style: extraStyle = {},
}) {
  const isDisabled = disabled || loading

  const combinedStyle = {
    ...styles.base,
    ...styles.sizes[size],
    ...styles.variants[variant],
    ...(isDisabled ? styles.disabled : {}),
    ...extraStyle,
  }

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      style={combinedStyle}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  )
}
