// src/screens/paciente/components/ConfirmarEliminarModal.jsx
// ─── Modal de confirmación antes de eliminar un paciente ─────────────────────

import Modal  from '../../../components/Modal'
import Button from '../../../components/Button'
import { C, T, ICONS } from '../../../theme'

export default function ConfirmarEliminarModal({ paciente, isOpen, onClose, onConfirm, loading }) {
  if (!paciente) return null
  const nombre = `${paciente.nombre} ${paciente.apellidos}`

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar paciente"
      size="sm"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            Sí, eliminar
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '8px 0' }}>
        <div
          style={{
            width:           '56px',
            height:          '56px',
            borderRadius:    '50%',
            backgroundColor: '#FEF2F2',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
          }}
        >
          <ICONS.trash color={C.alertRed} size={26} />
        </div>
        <p
          style={{
            margin:     0,
            fontSize:   T.size.base,
            color:      C.grayDark,
            fontFamily: T.family,
            textAlign:  'center',
            lineHeight: T.leading.relaxed,
          }}
        >
          ¿Estás seguro de que deseas eliminar al paciente{' '}
          <strong>{nombre}</strong>?
          <br />
          <span style={{ color: C.grayMid, fontSize: T.size.md }}>
            Esta acción no se puede deshacer.
          </span>
        </p>
      </div>
    </Modal>
  )
}
