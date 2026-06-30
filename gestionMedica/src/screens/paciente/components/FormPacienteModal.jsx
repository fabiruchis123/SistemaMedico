// src/screens/paciente/components/FormPacienteModal.jsx
// ─── Modal: Crear / Editar paciente (solo admin) ──────────────────────────────

import { useState, useEffect } from 'react'
import Modal  from '../../../components/Modal'
import Input  from '../../../components/Input'
import Select from '../../../components/Select'
import Button from '../../../components/Button'
import Alert  from '../../../components/Alert'
import { C, T } from '../../../theme'

const EMPTY = {
  nombre: '', apellidos: '', cedula: '', fecha_nacimiento: '',
  genero: '', telefono: '', email: '', direccion: '',
  tipo_sangre: '', observaciones: '',
}

const GENERO_OPTS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino'  },
  { value: 'O', label: 'Otro'      },
]

const SANGRE_OPTS = ['A+','A-','B+','B-','AB+','AB-','O+','O-']
  .map(v => ({ value: v, label: v }))

export default function FormPacienteModal({ paciente, isOpen, onClose, onSave }) {
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [apiError, setApiError] = useState(null)

  const isEditing = Boolean(paciente?.persona_id)

  // Prellenar al editar
  useEffect(() => {
    if (paciente) {
      setForm({ ...EMPTY, ...paciente })
    } else {
      setForm(EMPTY)
    }
    setErrors({})
    setApiError(null)
  }, [paciente, isOpen])

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  // Validación básica
  const validate = () => {
    const e = {}
    if (!form.nombre.trim())    e.nombre    = 'El nombre es requerido'
    if (!form.apellidos.trim()) e.apellidos = 'Los apellidos son requeridos'
    if (!form.cedula.trim())    e.cedula    = 'La cédula es requerida'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    setApiError(null)
    try {
      await onSave(form)
      onClose()
    } catch (e) {
      setApiError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar paciente' : 'Registrar nuevo paciente'}
      subtitle="Completa los datos del paciente"
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave} loading={saving}>
            {isEditing ? 'Guardar cambios' : 'Registrar paciente'}
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {apiError && (
          <Alert type="error" message={apiError} onClose={() => setApiError(null)} />
        )}

        {/* ── Información personal ── */}
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend
            style={{
              fontSize:   T.size.sm,
              fontWeight: T.weight.bold,
              color:      C.medicalBlue,
              fontFamily: T.family,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '12px',
            }}
          >
            Información personal
          </legend>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <Input
              label="Nombre(s)"
              placeholder="Ej: Juan Carlos"
              value={form.nombre}
              onChange={set('nombre')}
              error={errors.nombre}
              required
            />
            <Input
              label="Apellidos"
              placeholder="Ej: Pérez Mora"
              value={form.apellidos}
              onChange={set('apellidos')}
              error={errors.apellidos}
              required
            />
            <Input
              label="Cédula"
              placeholder="Ej: 101110111"
              value={form.cedula}
              onChange={set('cedula')}
              error={errors.cedula}
              required
            />
            <Input
              label="Fecha de nacimiento"
              type="date"
              value={form.fecha_nacimiento}
              onChange={set('fecha_nacimiento')}
            />
            <Select
              label="Género"
              options={GENERO_OPTS}
              value={form.genero}
              onChange={set('genero')}
              placeholder="Seleccionar..."
            />
            <Select
              label="Tipo de sangre"
              options={SANGRE_OPTS}
              value={form.tipo_sangre}
              onChange={set('tipo_sangre')}
              placeholder="Seleccionar..."
            />
          </div>
        </fieldset>

        {/* ── Contacto ── */}
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend
            style={{
              fontSize:   T.size.sm,
              fontWeight: T.weight.bold,
              color:      C.medicalBlue,
              fontFamily: T.family,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '12px',
            }}
          >
            Contacto
          </legend>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <Input
              label="Teléfono"
              placeholder="Ej: 88881234"
              value={form.telefono}
              onChange={set('telefono')}
            />
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="Ej: juan@gmail.com"
              value={form.email}
              onChange={set('email')}
            />
            <div style={{ gridColumn: '1 / -1' }}>
              <Input
                label="Dirección"
                placeholder="Ej: San José, Costa Rica"
                value={form.direccion}
                onChange={set('direccion')}
              />
            </div>
          </div>
        </fieldset>

        {/* ── Observaciones médicas ── */}
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend
            style={{
              fontSize:   T.size.sm,
              fontWeight: T.weight.bold,
              color:      C.medicalBlue,
              fontFamily: T.family,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '12px',
            }}
          >
            Información médica
          </legend>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              style={{
                fontFamily: T.family,
                fontSize:   T.size.md,
                fontWeight: T.weight.semibold,
                color:      C.grayDark,
              }}
            >
              Observaciones
            </label>
            <textarea
              value={form.observaciones}
              onChange={set('observaciones')}
              placeholder="Alergias, condiciones preexistentes, notas relevantes..."
              rows={3}
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
        </fieldset>
      </div>
    </Modal>
  )
}
