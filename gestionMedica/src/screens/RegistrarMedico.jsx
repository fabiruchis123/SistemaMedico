import React, { useState } from 'react'
import { C, T } from '../theme'
import { Button, Card, Input, Select } from '../components'
import MainLayout from '../layouts/MainLayout'

const RegistrarMedico = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    numeroColegiacion: '',
    correo: '',
    telefono: '',
    consultorio: '',
    direccion: '',
    horario: '',
    estado: 'Activo'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    medicosAPI.create(formData)
      .then(() => {
        alert('✅ Médico registrado con éxito')
        setFormData({
          nombre: '',
          apellido: '',
          especialidad: '',
          numeroColegiacion: '',
          correo: '',
          telefono: '',
          consultorio: '',
          direccion: '',
          horario: '',
          estado: 'Activo'
        })
      })
      .catch((error) => {
        console.error('Error al registrar médico:', error)
        alert('❌ Error al registrar médico')
      })
  }

  const specialtiesOptions = [
    { value: '', label: 'Seleccionar especialidad' },
    { value: 'Cardiología', label: 'Cardiología' },
    { value: 'Pediatría', label: 'Pediatría' },
    { value: 'Dermatología', label: 'Dermatología' },
    { value: 'Neurología', label: 'Neurología' }
  ]

  const scheduleOptions = [
    { value: '', label: 'Seleccionar horario' },
    { value: 'Mañana', label: 'Mañana' },
    { value: 'Tarde', label: 'Tarde' },
    { value: 'Noche', label: 'Noche' }
  ]

  const statusOptions = [
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' }
  ]

  return (
    <MainLayout pageTitle="Registrar nuevo médico">
      <div style={styles.container}>
        <Card style={styles.card}>
          <h2 style={styles.title}>Registrar nuevo médico</h2>
          <p style={styles.subtitle}>
            Completa la información para registrar al médico en el sistema.
          </p>

          <form style={styles.form} onSubmit={handleSubmit}>
            {/* Información personal */}
            <h3 style={styles.sectionTitle}>Información personal</h3>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <Input
                  label="Nombres"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Juan Carlos"
                />
              </div>
              <div style={styles.inputGroup}>
                <Input
                  label="Apellidos"
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Ej. Pérez Gómez"
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <Select
                  label="Especialidad"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                  options={specialtiesOptions}
                />
              </div>
              <div style={styles.inputGroup}>
                <Input
                  label="Número de colegiado"
                  type="text"
                  name="numeroColegiacion"
                  value={formData.numeroColegiacion}
                  onChange={handleChange}
                  placeholder="Ej. 12345"
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <Input
                  label="Teléfono"
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej. +503 7123 4567"
                />
              </div>
              <div style={styles.inputGroup}>
                <Input
                  label="Correo electrónico"
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="Ej. juanperez@gmail.com"
                />
              </div>
            </div>

            {/* Información profesional */}
            <h3 style={styles.sectionTitle}>Información profesional</h3>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <Input
                  label="Consultorio / Clínica"
                  type="text"
                  name="consultorio"
                  value={formData.consultorio}
                  onChange={handleChange}
                  placeholder="Ej. Clínica Médica San Benito"
                />
              </div>
              <div style={styles.inputGroup}>
                <Input
                  label="Dirección"
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Ej. Av. La Capilla #123, San Salvador"
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <Select
                  label="Horario de atención"
                  name="horario"
                  value={formData.horario}
                  onChange={handleChange}
                  options={scheduleOptions}
                />
              </div>
              <div style={styles.inputGroup}>
                <Select
                  label="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  options={statusOptions}
                />
              </div>
            </div>

            {/* Botones */}
            <div style={styles.buttonRow}>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar médico
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  )
}

const styles = {
  container: {
    backgroundColor: C.grayLight,
    minHeight: '100vh', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', 
    paddingTop: '2rem',
    paddingBottom: '2rem',
    fontFamily: T.family
  },
  card: {
    backgroundColor: C.white,
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '750px',
    textAlign: 'left'
  },
  title: {
    color: C.grayDark,
    fontWeight: T.weight.bold,
    fontSize: T.size.h2,
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: C.grayMid,
    fontSize: T.size.base,
    marginBottom: '1.5rem'
  },
  sectionTitle: {
    color: C.medicalBlue,
    fontWeight: T.weight.semibold,
    fontSize: T.size.lg,
    marginBottom: '0.5rem',
    marginTop: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  row: {
    display: 'flex',
    gap: '1rem'
  },
  inputGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem'
  }
}

export default RegistrarMedico
