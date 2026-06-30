/**
 * DoctorCard — Tarjeta de médico
 *
 * Props:
 *   doctor : {
 *     name       : string
 *     specialty  : string
 *     rating     : number  (0-5)
 *     available  : boolean
 *     schedule   : string  (ej: 'Lun – Vie · 8:00 – 17:00')
 *     phone      : string
 *     avatarSrc  : string
 *     appointmentsToday : number
 *   }
 *   onBook : function(doctor)
 *   onView : function(doctor)
 *
 * Uso:
 *   <DoctorCard doctor={doctor} onBook={handleBook} onView={handleView} />
 */

import Avatar from '../../../components/Avatar'
import Button from '../../../components/Button'

const StarIcon = ({ filled }) => (
  <svg width="13" height="13" viewBox="0 0 24 24"
    fill={filled ? '#F2C94C' : 'none'}
    stroke={filled ? '#F2C94C' : '#E2E8F0'}
    strokeWidth="1.5"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

function Stars({ rating = 0 }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(n => (
        <StarIcon key={n} filled={n <= Math.round(rating)} />
      ))}
    </div>
  )
}

export default function DoctorCard({ doctor = {}, onBook, onView }) {
  const {
    name, specialty, rating = 0, available = false,
    schedule, phone, avatarSrc, appointmentsToday,
  } = doctor

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius:    '12px',
        boxShadow:       '0 1px 4px rgba(0,0,0,0.07)',
        padding:         '22px',
        fontFamily:      "'Poppins', sans-serif",
        display:         'flex',
        flexDirection:   'column',
        gap:             '16px',
      }}
    >
      {/* Encabezado */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <Avatar name={name} src={avatarSrc} size="lg" status={available ? 'online' : 'offline'} />

        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 3px', fontSize: '15px', fontWeight: 700, color: '#333333' }}>
            {name || '—'}
          </h3>
          <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#2F80ED', fontWeight: 500 }}>
            {specialty || '—'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Stars rating={rating} />
            <span style={{ fontSize: '12px', color: '#828282' }}>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Disponibilidad */}
        <div
          style={{
            display:         'flex',
            alignItems:      'center',
            gap:             '5px',
            backgroundColor: available ? '#ECFDF5' : '#F2F4F7',
            borderRadius:    '999px',
            padding:         '4px 10px',
            flexShrink:      0,
          }}
        >
          <span
            style={{
              width:           '7px',
              height:          '7px',
              borderRadius:    '50%',
              backgroundColor: available ? '#27AE60' : '#828282',
            }}
          />
          <span
            style={{
              fontSize:   '11px',
              fontWeight: 500,
              color:      available ? '#27AE60' : '#828282',
            }}
          >
            {available ? 'Disponible' : 'No disponible'}
          </span>
        </div>
      </div>

      {/* Detalles */}
      <div
        style={{
          backgroundColor: '#F2F4F7',
          borderRadius:    '8px',
          padding:         '12px 14px',
          display:         'flex',
          flexDirection:   'column',
          gap:             '6px',
        }}
      >
        {schedule && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#828282" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8"  y1="2" x2="8"  y2="6" />
              <line x1="3"  y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ fontSize: '12px', color: '#4B5563' }}>{schedule}</span>
          </div>
        )}

        {phone && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#828282" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.94 5.94l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span style={{ fontSize: '12px', color: '#4B5563' }}>{phone}</span>
          </div>
        )}

        {appointmentsToday !== undefined && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#828282" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span style={{ fontSize: '12px', color: '#4B5563' }}>
              <strong>{appointmentsToday}</strong> citas hoy
            </span>
          </div>
        )}
      </div>

      {/* Acciones */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {onView && (
          <Button variant="outline" size="sm" onClick={() => onView(doctor)} style={{ flex: 1 }}>
            Ver perfil
          </Button>
        )}
        {onBook && (
          <Button
            variant="primary"
            size="sm"
            disabled={!available}
            onClick={() => onBook(doctor)}
            style={{ flex: 1 }}
          >
            Agendar cita
          </Button>
        )}
      </div>
    </div>
  )
}
