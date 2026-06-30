import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../../layouts/MainLayout'
import PageHeader from '../../../components/PageHeader'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Alert from '../../../components/Alert'
import { C, T } from '../../../theme'
import { medicoService } from '../services/medicoService'

const EMPTY = {
  nombre: '',
  apellidos: '',
  cedula: '',
  fecha_nacimiento: '',
  genero: '',
  telefono: '',
  email: '',
  direccion: '',
  especialidad_id: '',
  num_licencia: '',
  nombre_usuario: '',
  password: '',
}

const GENERO_OPTS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
  { value: 'O', label: 'Otro' },
]

const ESPECIALIDAD_OPTS = [
  { value: '1', label: 'Medicina General' },
  { value: '2', label: 'Pediatría' },
  { value: '3', label: 'Cardiología' },
  { value: '4', label: 'Dermatología' },
  { value: '5', label: 'Ginecología' },
  { value: '6', label: 'Odontología' },
  { value: '7', label: 'Neurología' },
]

export default function RegistrarMedicoScreen() {
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido'
    if (!form.apellidos.trim()) e.apellidos = 'Los apellidos son requeridos'
    if (!form.cedula.trim()) e.cedula = 'La cédula es requerida'
    if (!form.email.trim()) e.email = 'El correo es requerido'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'El correo no es válido'
    if (!form.especialidad_id) e.especialidad_id = 'La especialidad es requerida'
    if (!form.num_licencia.trim()) e.num_licencia = 'El número de licencia es requerido'
    if (!form.nombre_usuario.trim()) e.nombre_usuario = 'El nombre de usuario es requerido'
    if (!form.password.trim()) e.password = 'La contraseña es requerida'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    setApiError(null)
    setSuccessMsg(null)
    try {
      await medicoService.create(form)
      setSuccessMsg('Médico registrado correctamente.')
      setForm(EMPTY)
      setErrors({})
      setTimeout(() => navigate('/medicos'), 1200)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <MainLayout pageTitle="Registrar médico">
      <PageHeader
        title="Registrar nuevo médico"
        subtitle="Completa la información para registrar al médico en el sistema"
        actions={
          <Button variant="outline" onClick={() => navigate('/medicos')}>
            Volver a la lista
          </Button>
        }
      />

      <div style={{ maxWidth: '900px', margin: '24px 0' }}>
        <div style={{ backgroundColor: C.white, borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          {apiError && <Alert type="error" message={apiError} onClose={() => setApiError(null)} style={{ marginBottom: '16px' }} />}
          {successMsg && <Alert type="success" message={successMsg} onClose={() => setSuccessMsg(null)} style={{ marginBottom: '16px' }} />}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontSize: T.size.sm, fontWeight: T.weight.bold, color: C.medicalBlue, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                Información personal
              </legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <Input label="Nombre(s)" placeholder="Ej: Juan Carlos" value={form.nombre} onChange={set('nombre')} error={errors.nombre} required />
                <Input label="Apellidos" placeholder="Ej: Pérez Mora" value={form.apellidos} onChange={set('apellidos')} error={errors.apellidos} required />
                <Input label="Cédula" placeholder="Ej: 101110111" value={form.cedula} onChange={set('cedula')} error={errors.cedula} required />
                <Input label="Fecha de nacimiento" type="date" value={form.fecha_nacimiento} onChange={set('fecha_nacimiento')} />
                <Select label="Género" options={GENERO_OPTS} value={form.genero} onChange={set('genero')} placeholder="Seleccionar..." />
                <Input label="Teléfono" placeholder="Ej: 88881234" value={form.telefono} onChange={set('telefono')} />
              </div>
            </fieldset>

            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontSize: T.size.sm, fontWeight: T.weight.bold, color: C.medicalBlue, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                Contacto y profesional
              </legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <Input label="Correo electrónico" type="email" placeholder="Ej: juan@gmail.com" value={form.email} onChange={set('email')} error={errors.email} required />
                <Select label="Especialidad" options={ESPECIALIDAD_OPTS} value={form.especialidad_id} onChange={set('especialidad_id')} error={errors.especialidad_id} placeholder="Seleccionar..." />
                <Input label="Número de licencia" placeholder="Ej: 12345" value={form.num_licencia} onChange={set('num_licencia')} error={errors.num_licencia} required />
                <Input label="Dirección" placeholder="Ej: San José, Costa Rica" value={form.direccion} onChange={set('direccion')} />
              </div>
            </fieldset>

            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontSize: T.size.sm, fontWeight: T.weight.bold, color: C.medicalBlue, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                Acceso del sistema
              </legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <Input label="Nombre de usuario" placeholder="Ej: doctor01" value={form.nombre_usuario} onChange={set('nombre_usuario')} error={errors.nombre_usuario} required />
                <Input label="Contraseña" type="password" placeholder="********" value={form.password} onChange={set('password')} error={errors.password} required />
              </div>
            </fieldset>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button variant="outline" type="button" onClick={() => navigate('/medicos')}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" loading={saving}>
                Registrar médico
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
