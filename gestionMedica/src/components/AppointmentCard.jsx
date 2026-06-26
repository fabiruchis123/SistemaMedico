/**
 * AppointmentCard — Tarjeta de cita médica
 *
 * Props:
 *   appointment : {
 *     id          : string
 *     patientName : string
 *     doctorName  : string
 *     specialty   : string
 *     date        : string  (ej: '2025-07-02')
 *     time        : string  (ej: '10:30')
 *     status      : 'confirmed' | 'pending' | 'cancelled' | 'inProgress'
 *     notes       : string  (opcional)
 *     avatarSrc   : string  (URL foto del doctor, opcional)
 *   }
 *   onConfirm   : function(id)
 *   onCancel    : function(id)
 *   onView      : function(id)
 *   showActions : boolean (default true)
 *
 * Uso:
 *   <AppointmentCard
 *     appointment={cita}
 *     onConfirm={handleConfirm}
 *     onCancel={handleCancel}
 *     onView={handleView}
 *   />
 */

import Badge  from './Badge'
import Avatar from './Avatar'
import Button from './Button'

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#828282" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8"  y1="2" x2="8"  y2="6" />
    <line x1="3"  y1="10" x2="21" y2="10" />
  </svg>
)

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#828282" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const StethoscopeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#828282" strokeWidth="2">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <line x1="8" y1="15" x2="8" y2="17" />
    <circle cx="16" cy="18" r="2" />
    <path d="M8 17a5 5 0 0 0 8 0" />
  </svg>
)

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const [year, month, day] = dateStr.split('-')
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                   'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`
}

export default function AppointmentCard({
  appointment   = {},
  onConfirm,
  onCancel,
  onView,
  showActions   = true,
}) {
  const {
    id, patientName, doctorName, specialty,
    date, time, status = 'pending', notes, avatarSrc,
  } = appointment

  const canConfirm = status === 'pending' && onConfirm
  const canCancel  = (status === 'pending' || status === 'confirmed') && onCancel

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius:    '12px',
        boxShadow:       '0 1px 4px rgba(0,0,0,0.07)',
        padding:         '20px',
        fontFamily:      "'Poppins', sans-serif",
        display:         'flex',
        flexDirection:   'column',
        gap:             '16px',
        borderLeft:      status === 'inProgress' ? '4px solid #2F80ED' : 'none',
      }}
    >
      {/* Top: doctor + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar name={doctorName} src={avatarSrc} size="md" />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 600, color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {doctorName || '—'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#828282' }}>
            <StethoscopeIcon />
            <span style={{ fontSize: '12px' }}>{specialty || '—'}</span>
          </div>
        </div>

        <Badge status={status} />
      </div>

      {/* Paciente */}
      {patientName && (
        <div
          style={{
            backgroundColor: '#F2F4F7',
            borderRadius:    '8px',
            padding:         '10px 14px',
            fontSize:        '13px',
            color:           '#4B5563',
          }}
        >
          <span style={{ color: '#828282', marginRight: '6px' }}>Paciente:</span>
          <span style={{ fontWeight: 600, color: '#333333' }}>{patientName}</span>
        </div>
      )}

      {/* Fecha y hora */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CalendarIcon />
          <span style={{ fontSize: '13px', color: '#4B5563' }}>{formatDate(date)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ClockIcon />
          <span style={{ fontSize: '13px', color: '#4B5563' }}>{time || '—'}</span>
        </div>
      </div>

      {/* Notas */}
      {notes && (
        <p
          style={{
            margin:      0,
            fontSize:    '12px',
            color:       '#828282',
            fontStyle:   'italic',
            lineHeight:  '1.5',
            borderLeft:  '3px solid #BEE3F8',
            paddingLeft: '10px',
          }}
        >
          {notes}
        </p>
      )}

      {/* Acciones */}
      {showActions && (
        <div
          style={{
            display:       'flex',
            gap:           '8px',
            justifyContent: 'flex-end',
            paddingTop:    '4px',
            borderTop:     '1px solid #F2F4F7',
          }}
        >
          {onView && (
            <Button variant="ghost" size="sm" onClick={() => onView(id)}>
              Ver detalles
            </Button>
          )}
          {canCancel && (
            <Button variant="outline" size="sm" onClick={() => onCancel(id)}
              style={{ color: '#EB5757', borderColor: '#EB5757' }}
            >
              Cancelar
            </Button>
          )}
          {canConfirm && (
            <Button variant="primary" size="sm" onClick={() => onConfirm(id)}>
              Confirmar
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
