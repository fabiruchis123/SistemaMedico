/**
 * Avatar — Foto de perfil o iniciales
 *
 * Props:
 *   name   : string (genera iniciales si no hay imagen)
 *   src    : string (URL de la foto)
 *   size   : 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 *   status : 'online' | 'offline' | 'busy' (punto de disponibilidad)
 *   color  : string (color de fondo para iniciales, por defecto azul médico)
 *
 * Uso:
 *   <Avatar name="Ana García" size="md" />
 *   <Avatar src="/foto-doctor.jpg" name="Dr. López" size="lg" status="online" />
 */

const SIZES = {
  xs: { box: 28,  font: 11, dot: 7,  dotPos: 0  },
  sm: { box: 36,  font: 13, dot: 9,  dotPos: 0  },
  md: { box: 44,  font: 16, dot: 11, dotPos: 1  },
  lg: { box: 56,  font: 20, dot: 13, dotPos: 2  },
  xl: { box: 72,  font: 26, dot: 16, dotPos: 3  },
}

const STATUS_COLOR = {
  online:  '#27AE60',
  offline: '#828282',
  busy:    '#EB5757',
}

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '?'
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Paleta de colores de fondo para iniciales
const BG_COLORS = ['#2F80ED', '#27AE60', '#1F4E79', '#F2994A', '#6FCF97']
function pickColor(name = '') {
  const idx = name.charCodeAt(0) % BG_COLORS.length
  return BG_COLORS[idx]
}

export default function Avatar({
  name   = '',
  src,
  size   = 'md',
  status,
  color,
}) {
  const s  = SIZES[size] ?? SIZES.md
  const bg = color ?? pickColor(name)

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      <div
        style={{
          width:           `${s.box}px`,
          height:          `${s.box}px`,
          borderRadius:    '50%',
          overflow:        'hidden',
          backgroundColor: src ? 'transparent' : bg,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          flexShrink:      0,
        }}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize:   `${s.font}px`,
              fontWeight: 600,
              color:      '#FFFFFF',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {getInitials(name)}
          </span>
        )}
      </div>

      {status && (
        <span
          style={{
            position:        'absolute',
            bottom:          `${s.dotPos}px`,
            right:           `${s.dotPos}px`,
            width:           `${s.dot}px`,
            height:          `${s.dot}px`,
            borderRadius:    '50%',
            backgroundColor: STATUS_COLOR[status] ?? STATUS_COLOR.offline,
            border:          '2px solid #FFFFFF',
          }}
        />
      )}
    </div>
  )
}
