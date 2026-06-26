/**
 * Modal — Diálogo modal
 *
 * Props:
 *   isOpen   : boolean
 *   onClose  : function
 *   title    : string
 *   subtitle : string
 *   size     : 'sm' | 'md' | 'lg'
 *   footer   : ReactNode (botones de acción)
 *   children : ReactNode
 *
 * Uso:
 *   <Modal
 *     isOpen={showModal}
 *     onClose={() => setShowModal(false)}
 *     title="Confirmar cita"
 *     footer={
 *       <>
 *         <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
 *         <Button variant="primary" onClick={handleConfirm}>Confirmar</Button>
 *       </>
 *     }
 *   >
 *     <p>¿Desea confirmar la cita con el Dr. Ramírez?</p>
 *   </Modal>
 */

const SIZES = {
  sm: '400px',
  md: '560px',
  lg: '720px',
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  size     = 'md',
  footer,
  children,
}) {
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          1000,
        backgroundColor: 'rgba(31, 78, 121, 0.35)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '20px',
        backdropFilter:  'blur(2px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius:    '14px',
          width:           '100%',
          maxWidth:        SIZES[size],
          boxShadow:       '0 20px 60px rgba(0,0,0,0.15)',
          display:         'flex',
          flexDirection:   'column',
          maxHeight:       '90vh',
          overflow:        'hidden',
          fontFamily:      "'Poppins', sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display:         'flex',
            alignItems:      'flex-start',
            justifyContent:  'space-between',
            padding:         '24px 24px 20px',
            borderBottom:    '1px solid #F2F4F7',
            gap:             '16px',
          }}
        >
          <div>
            {title && (
              <h2 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 700, color: '#333333' }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{ margin: 0, fontSize: '13px', color: '#828282' }}>
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              background:   'none',
              border:       'none',
              cursor:       'pointer',
              color:        '#828282',
              padding:      '4px',
              borderRadius: '6px',
              display:      'flex',
              flexShrink:   0,
            }}
            aria-label="Cerrar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding:    '24px',
            overflowY:  'auto',
            flex:       1,
            fontSize:   '14px',
            color:      '#4B5563',
            lineHeight: '1.6',
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              display:         'flex',
              justifyContent:  'flex-end',
              gap:             '10px',
              padding:         '16px 24px',
              borderTop:       '1px solid #F2F4F7',
              backgroundColor: '#FAFBFC',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
