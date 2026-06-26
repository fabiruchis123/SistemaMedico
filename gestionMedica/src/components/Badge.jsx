/**
 * Badge — Etiqueta de estado
 *
 * Props:
 *   status : 'confirmed' | 'pending' | 'cancelled' | 'available' | 'inProgress'
 *   label  : string (override del texto, opcional)
 *   size   : 'sm' | 'md'
 *
 * Uso:
 *   <Badge status="confirmed" />
 *   <Badge status="pending" label="En espera" />
 *   <Badge status="cancelled" size="sm" />
 */

const STATUS_CONFIG = {
  confirmed:  { label: 'Confirmada',  color: '#27AE60', bg: '#ECFDF5', dot: '#27AE60' },
  pending:    { label: 'Pendiente',   color: '#F2994A', bg: '#FFF7ED', dot: '#F2994A' },
  cancelled:  { label: 'Cancelada',  color: '#EB5757', bg: '#FEF2F2', dot: '#EB5757' },
  available:  { label: 'Disponible', color: '#27AE60', bg: '#F0FDF4', dot: '#6FCF97' },
  inProgress: { label: 'En curso',   color: '#2F80ED', bg: '#EFF6FF', dot: '#2F80ED' },
}

export default function Badge({ status = 'pending', label, size = 'md' }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending

  const sizeStyle = size === 'sm'
    ? { fontSize: '11px', padding: '2px 8px',  gap: '4px' }
    : { fontSize: '12px', padding: '4px 10px', gap: '6px' }

  return (
    <span
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        fontFamily:     "'Poppins', sans-serif",
        fontWeight:     500,
        borderRadius:   '999px',
        color:          config.color,
        backgroundColor: config.bg,
        ...sizeStyle,
      }}
    >
      <span
        style={{
          width:           '6px',
          height:          '6px',
          borderRadius:    '50%',
          backgroundColor: config.dot,
          flexShrink:      0,
        }}
      />
      {label ?? config.label}
    </span>
  )
}
