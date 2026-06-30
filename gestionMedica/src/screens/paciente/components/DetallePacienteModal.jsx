// src/screens/paciente/components/DetallePacienteModal.jsx
// ─── Modal: Detalle completo de un paciente ───────────────────────────────────

import Modal  from '../../../components/Modal'
import Badge  from '../../../components/Badge'
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
      <h3
        style={{
          margin:     '0 0 2px',
          fontSize:   T.size.sm,
          fontWeight: T.weight.bold,
          color:      C.medicalBlue,
          fontFamily: T.family,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  )
}

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null
  const hoy  = new Date()
  const nac  = new Date(fechaNacimiento)
  let edad   = hoy.getFullYear() - nac.getFullYear()
  const diff = hoy.getMonth() - nac.getMonth()
  if (diff < 0 || (diff === 0 && hoy.getDate() < nac.getDate())) edad--
  return edad
}

export default function DetallePacienteModal({ paciente, isOpen, onClose }) {
  if (!paciente) return null

  const edad = calcularEdad(paciente.fecha_nacimiento)
  const nombreCompleto = `${paciente.nombre} ${paciente.apellidos}`

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalle del paciente"
      subtitle="Información completa registrada en el sistema"
      size="md"
    >
      {/* Encabezado: avatar + nombre */}
      <div
        style={{
          display:         'flex',
          alignItems:      'center',
          gap:             '16px',
          padding:         '4px 0 20px',
          borderBottom:    `2px solid ${C.grayLight}`,
          marginBottom:    '20px',
        }}
      >
        <Avatar name={nombreCompleto} size="xl" />
        <div>
          <h2
            style={{
              margin:     '0 0 4px',
              fontSize:   T.size.h3,
              fontWeight: T.weight.bold,
              color:      C.grayDark,
              fontFamily: T.family,
            }}
          >
            {nombreCompleto}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: T.size.md, color: C.grayMid, fontFamily: T.family }}>
              Cédula: <strong style={{ color: C.grayDark }}>{paciente.cedula}</strong>
            </span>
            {paciente.tipo_sangre && (
              <span
                style={{
                  display:         'inline-flex',
                  alignItems:      'center',
                  gap:             '4px',
                  backgroundColor: '#FEF2F2',
                  color:           C.alertRed,
                  borderRadius:    '6px',
                  padding:         '2px 8px',
                  fontSize:        T.size.sm,
                  fontWeight:      T.weight.bold,
                  fontFamily:      T.family,
                }}
              >
                <ICONS.heartPulse size={12} color={C.alertRed} />
                {paciente.tipo_sangre}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Información personal */}
      <Section title="Información personal">
        <InfoRow label="Edad"               value={edad ? `${edad} años` : null}   icon={ICONS.user} />
        <InfoRow label="Fecha de nacimiento" value={paciente.fecha_nacimiento}      icon={ICONS.calendar} />
        <InfoRow label="Género"             value={generoLabel[paciente.genero]}    icon={ICONS.user} />
        <InfoRow label="Dirección"          value={paciente.direccion}              icon={ICONS.clipboard} />
      </Section>

      {/* Contacto */}
      <Section title="Contacto">
        <InfoRow label="Teléfono"           value={paciente.telefono}   icon={ICONS.phone} />
        <InfoRow label="Correo electrónico" value={paciente.email}      icon={ICONS.mail}  />
      </Section>

      {/* Información médica */}
      {paciente.observaciones && (
        <Section title="Observaciones médicas">
          <div
            style={{
              backgroundColor: '#FFF7ED',
              borderLeft:      `3px solid ${C.alertOrange}`,
              borderRadius:    '6px',
              padding:         '12px 14px',
              marginTop:       '8px',
            }}
          >
            <p
              style={{
                margin:     0,
                fontSize:   T.size.md,
                color:      C.graySubtle,
                fontFamily: T.family,
                lineHeight: T.leading.relaxed,
              }}
            >
              {paciente.observaciones}
            </p>
          </div>
        </Section>
      )}

      {/* Fecha de registro */}
      <p
        style={{
          margin:     '16px 0 0',
          fontSize:   T.size.sm,
          color:      C.grayMid,
          fontFamily: T.family,
          textAlign:  'right',
        }}
      >
        Registrado el: {paciente.fecha_registro
          ? new Date(paciente.fecha_registro).toLocaleDateString('es-CR')
          : '—'}
      </p>
    </Modal>
  )
}
