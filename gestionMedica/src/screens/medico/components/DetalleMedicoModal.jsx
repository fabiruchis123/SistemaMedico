import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import Avatar from '../../../components/Avatar'
import { C, T, ICONS } from '../../../theme'

const generoLabel = { M: 'Masculino', F: 'Femenino', O: 'Otro' }

function InfoRow({ label, value, icon: Icon }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 0', borderBottom: `1px solid ${C.grayLight}` }}>
      {Icon && (
        <span style={{ color: C.grayMid, flexShrink: 0, marginTop: '1px' }}>
          <Icon size={15} />
        </span>
      )}
      <div>
        <p style={{ margin: 0, fontSize: T.size.xs, color: C.grayMid, fontFamily: T.family }}>{label}</p>
        <p style={{ margin: '2px 0 0', fontSize: T.size.base, color: C.grayDark, fontFamily: T.family, fontWeight: T.weight.medium }}>
          {value}
        </p>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ margin: '0 0 2px', fontSize: T.size.sm, fontWeight: T.weight.bold, color: C.medicalBlue, fontFamily: T.family, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  )
}

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null
  const hoy = new Date()
  const nac = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - nac.getFullYear()
  const diff = hoy.getMonth() - nac.getMonth()
  if (diff < 0 || (diff === 0 && hoy.getDate() < nac.getDate())) edad--
  return edad
}

const DetalleMedicoModal = ({ medico, isOpen, onClose, onEdit, onDelete }) => {
  if (!medico) return null

  const activo = medico.activo === 1 || medico.activo === true || medico.activo === '1'
  const nombreCompleto = `${medico.nombre} ${medico.apellidos || ''}`
  const edad = calcularEdad(medico.fecha_nacimiento)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalle del médico"
      subtitle="Información completa registrada en el sistema"
      size="md"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '4px 0 20px', borderBottom: `2px solid ${C.grayLight}`, marginBottom: '20px' }}>
        <Avatar name={nombreCompleto} size="xl" />
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: T.size.h3, fontWeight: T.weight.bold, color: C.grayDark, fontFamily: T.family }}>
            {nombreCompleto}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: T.size.md, color: C.grayMid, fontFamily: T.family }}>
              Cédula: <strong style={{ color: C.grayDark }}>{medico.cedula}</strong>
            </span>
            {medico.especialidad && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#EFF6FF', color: C.medicalBlue, borderRadius: '6px', padding: '2px 8px', fontSize: T.size.sm, fontWeight: T.weight.bold, fontFamily: T.family }}>
                <ICONS.stethoscope size={12} color={C.medicalBlue} />
                {medico.especialidad}
              </span>
            )}
          </div>
        </div>
      </div>

      <Section title="Información personal">
        <InfoRow label="Edad" value={edad ? `${edad} años` : null} icon={ICONS.user} />
        <InfoRow label="Fecha de nacimiento" value={medico.fecha_nacimiento} icon={ICONS.calendar} />
        <InfoRow label="Género" value={generoLabel[medico.genero]} icon={ICONS.user} />
        <InfoRow label="Dirección" value={medico.direccion} icon={ICONS.clipboard} />
      </Section>

      <Section title="Contacto">
        <InfoRow label="Teléfono" value={medico.telefono} icon={ICONS.phone} />
        <InfoRow label="Correo electrónico" value={medico.email} icon={ICONS.mail} />
      </Section>

      <Section title="Profesional">
        <InfoRow label="Número de licencia" value={medico.num_licencia} icon={ICONS.badge} />
        <InfoRow label="Usuario del sistema" value={medico.nombre_usuario} icon={ICONS.user} />
      </Section>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: `1px solid ${C.grayLight}`, paddingTop: '16px' }}>
        <Button variant="danger" onClick={() => { onDelete(medico); onClose(); }}>Desactivar</Button>
        <Button variant="primary" onClick={() => { onEdit(medico); onClose(); }}>Editar</Button>
      </div>
    </Modal>
  )
}

export default DetalleMedicoModal
