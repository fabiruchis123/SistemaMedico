// src/screens/paciente/screens/RegistrarPacienteScreen.jsx
// ─── Pantalla: Registrar Paciente (formulario standalone / ruta propia) ───────
// Esta pantalla puede usarse también como ruta directa si se necesita.
// Usa FormPacienteModal internamente, pero también puede renderizarse en página.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout   from '../../../layouts/MainLayout'
import Card         from '../../../components/Card'
import Input        from '../../../components/Input'
import Select       from '../../../components/Select'
import Button       from '../../../components/Button'
import Alert        from '../../../components/Alert'
import PageHeader   from '../../../components/PageHeader'
import { usePacientes } from '../hooks/usePacientes'
import { C, T, ICONS } from '../../../theme'

const GENERO_OPTS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino'  },
  { value: 'O', label: 'Otro'      },
]
const SANGRE_OPTS = ['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(v => ({ value: v, label: v }))

const EMPTY = {
  nombre: '', apellidos: '', cedula: '', fecha_nacimiento: '',
  genero: '', telefono: '', email: '', direccion: '',
  tipo_sangre: '', observaciones: '',
}

function SectionTitle({ children }) {
  return (
    <h3
      style={{
        margin:        '0 0 16px',
        fontSize:      T.size.sm,
        fontWeight:    T.weight.bold,
        color:         C.medicalBlue,
        fontFamily:    T.family,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        paddingBottom: '8px',
        borderBottom:  `2px solid ${C.medicalBlueLight}`,
      }}
    >
      {children}
    </h3>
  )
}

export default function RegistrarPacienteScreen() {
  const navigate          = useNavigate()
  const { crear }         = usePacientes()
  const [form, setForm]   = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [apiError, setApiError] = useState(null)

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.nombre.trim())    e.nombre    = 'El nombre es requerido'
    if (!form.apellidos.trim()) e.apellidos = 'Los apellidos son requeridos'
    if (!form.cedula.trim())    e.cedula    = 'La cédula es requerida'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSaving(true)
    setApiError(null)
    try {
      await crear(form)
      setSuccess(true)
      setForm(EMPTY)
      setTimeout(() => navigate('/pacientes'), 2000)
    } catch (e) {
      setApiError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <MainLayout pageTitle="Registrar paciente">
      <PageHeader
        title="Registrar nuevo paciente"
        subtitle="Completa los datos del paciente para agregarlo al sistema"
        back={() => navigate('/pacientes')}
      />

      {success && (
        <Alert
          type="success"
          title="¡Paciente registrado!"
          message="El paciente fue agregado al sistema correctamente. Redirigiendo..."
          style={{ marginBottom: '20px' }}
        />
      )}
      {apiError && (
        <Alert
          type="error"
          message={apiError}
          onClose={() => setApiError(null)}
          style={{ marginBottom: '20px' }}
        />
      )}

      <Card style={{ maxWidth: '780px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* ── Información personal ── */}
          <section>
            <SectionTitle>Información personal</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <Input label="Nombre(s)"     placeholder="Ej: Juan Carlos"  value={form.nombre}    onChange={set('nombre')}    error={errors.nombre}    required />
              <Input label="Apellidos"     placeholder="Ej: Pérez Mora"   value={form.apellidos} onChange={set('apellidos')} error={errors.apellidos} required />
              <Input label="Cédula"        placeholder="Ej: 101110111"    value={form.cedula}    onChange={set('cedula')}    error={errors.cedula}    required />
              <Input label="Fecha de nacimiento" type="date" value={form.fecha_nacimiento} onChange={set('fecha_nacimiento')} />
              <Select label="Género"       options={GENERO_OPTS} value={form.genero}      onChange={set('genero')}      placeholder="Seleccionar..." />
              <Select label="Tipo de sangre" options={SANGRE_OPTS} value={form.tipo_sangre} onChange={set('tipo_sangre')} placeholder="Seleccionar..." />
            </div>
          </section>

          {/* ── Contacto ── */}
          <section>
            <SectionTitle>Contacto</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <Input label="Teléfono"             placeholder="Ej: 88881234"     value={form.telefono}  onChange={set('telefono')} />
              <Input label="Correo electrónico"   type="email" placeholder="Ej: juan@gmail.com" value={form.email} onChange={set('email')} />
              <div style={{ gridColumn: '1 / -1' }}>
                <Input label="Dirección" placeholder="Ej: San José, Costa Rica" value={form.direccion} onChange={set('direccion')} />
              </div>
            </div>
          </section>

          {/* ── Observaciones ── */}
          <section>
            <SectionTitle>Observaciones médicas</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                style={{ fontFamily: T.family, fontSize: T.size.md, fontWeight: T.weight.semibold, color: C.grayDark }}
              >
                Observaciones
              </label>
              <textarea
                value={form.observaciones}
                onChange={set('observaciones')}
                placeholder="Alergias, condiciones preexistentes, notas relevantes..."
                rows={4}
                style={{
                  width:           '100%',
                  fontFamily:      T.family,
                  fontSize:        T.size.base,
                  color:           C.grayDark,
                  backgroundColor: C.white,
                  border:          `1.5px solid ${C.grayBorder}`,
                  borderRadius:    '8px',
                  padding:         '10px 14px',
                  outline:         'none',
                  resize:          'vertical',
                  boxSizing:       'border-box',
                  lineHeight:      T.leading.relaxed,
                }}
              />
            </div>
          </section>

          {/* ── Botones ── */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px', borderTop: `1px solid ${C.grayBorder}` }}>
            <Button variant="outline" onClick={() => navigate('/pacientes')} disabled={saving}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit} loading={saving}>
              Registrar paciente
            </Button>
          </div>
        </div>
      </Card>
    </MainLayout>
  )
}
