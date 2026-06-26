/**
 * Card — Tarjeta contenedora
 *
 * Props:
 *   title    : string
 *   subtitle : string
 *   footer   : ReactNode
 *   accent   : boolean  (borde izquierdo azul médico)
 *   padding  : 'sm' | 'md' | 'lg'
 *   children : ReactNode
 *   style    : object
 *
 * Uso:
 *   <Card title="Próxima cita" subtitle="Lunes 30 de junio">
 *     <p>Dr. Ramírez · Cardiología</p>
 *   </Card>
 *
 *   <Card accent>
 *     <p>Información destacada</p>
 *   </Card>
 */

const PADDING = {
  sm: '16px',
  md: '24px',
  lg: '32px',
}

export default function Card({
  title,
  subtitle,
  footer,
  accent   = false,
  padding  = 'md',
  children,
  style: extraStyle = {},
}) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius:    '12px',
        boxShadow:       '0 1px 4px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.04)',
        borderLeft:      accent ? '4px solid #2F80ED' : 'none',
        overflow:        'hidden',
        ...extraStyle,
      }}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div
          style={{
            padding:      `${PADDING[padding]} ${PADDING[padding]} 0`,
            borderBottom: children ? '1px solid #F2F4F7' : 'none',
            paddingBottom: children ? '16px' : undefined,
            marginBottom:  children ? '0' : undefined,
          }}
        >
          {title && (
            <h3
              style={{
                fontFamily:  "'Poppins', sans-serif",
                fontSize:    '16px',
                fontWeight:  600,
                color:       '#333333',
                margin:      '0 0 4px',
              }}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize:   '13px',
                fontWeight: 400,
                color:      '#828282',
                margin:     0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Body */}
      {children && (
        <div style={{ padding: PADDING[padding] }}>
          {children}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div
          style={{
            padding:       `14px ${PADDING[padding]}`,
            borderTop:     '1px solid #F2F4F7',
            backgroundColor: '#FAFBFC',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  )
}
