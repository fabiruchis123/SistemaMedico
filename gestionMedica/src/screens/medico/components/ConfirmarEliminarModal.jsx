import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import { C, T, ICONS } from '../../../theme'

const ConfirmarEliminarModal = ({ medico, isOpen, onClose, onConfirm, loading }) => {
  if (!medico) return null
  const nombre = `${medico.nombre} ${medico.apellidos}`

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Desactivar médico"
      size="sm"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>Sí, desactivar</Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '8px 0' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ICONS.trash color={C.alertRed} size={26} />
        </div>
        <p style={{ margin: 0, fontSize: T.size.base, color: C.grayDark, fontFamily: T.family, textAlign: 'center', lineHeight: T.leading.relaxed }}>
          ¿Estás seguro de que deseas desactivar al médico{' '}
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

export default ConfirmarEliminarModal
