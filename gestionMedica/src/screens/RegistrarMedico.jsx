import React, { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'
import { medicosAPI } from "../connections/api";


const navItems = [
  { id: 'home', label: 'Inicio', icon: <span>🏠</span> },
  { id: 'medicos', label: 'Médicos', icon: <span>👨‍⚕️</span> },
  { id: 'pacientes', label: 'Pacientes', icon: <span>🧑‍🤝‍🧑</span> },
  { id: 'citas', label: 'Citas', icon: <span>📅</span>, badge: 3 },
  { id: 'registrar-medico', label: 'Registrar médico', icon: <span>➕</span> },
]

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

  const [active, setActive] = useState('registrar-medico')

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

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar
        items={navItems}
        activeId={active}
        onSelect={setActive}
        user={{ name: 'Dra. García', role: 'Médico General' }}
        appName="MediGestión"
        onLogout={() => alert('Sesión cerrada')}
      />

      {/* Contenido principal */}
      <div style={{ flex: 1 }}>
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
                  <label style={styles.label}>Nombres</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Ej. Juan Carlos"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Apellidos</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Ej. Pérez Gómez"
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Especialidad</label>
                  <select
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">Seleccionar especialidad</option>
                    <option value="Cardiología">Cardiología</option>
                    <option value="Pediatría">Pediatría</option>
                    <option value="Dermatología">Dermatología</option>
                    <option value="Neurología">Neurología</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Número de colegiado</label>
                  <input
                    type="text"
                    name="numeroColegiacion"
                    value={formData.numeroColegiacion}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Ej. 12345"
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Ej. +503 7123 4567"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Correo electrónico</label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Ej. juanperez@gmail.com"
                  />
                </div>
              </div>

              {/* Información profesional */}
              <h3 style={styles.sectionTitle}>Información profesional</h3>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Consultorio / Clínica</label>
                  <input
                    type="text"
                    name="consultorio"
                    value={formData.consultorio}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Ej. Clínica Médica San Benito"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Ej. Av. La Capilla #123, San Salvador"
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Horario de atención</label>
                  <select
                    name="horario"
                    value={formData.horario}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">Seleccionar horario</option>
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noche">Noche</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              {/* Botones */}
              <div style={styles.buttonRow}>
                <button type="button" style={styles.cancelButton}>
                  Cancelar
                </button>
               <button type="submit" onClick={handleSubmit}>
              Guardar médico
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
const styles = {
  container: {
    backgroundColor: '#F2F4F7',
    minHeight: '100vh', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', 
    paddingTop: '3rem', 
    fontFamily: 'Poppins, sans-serif'
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    width: '750px',
    textAlign: 'left'
  },
  title: {
    color: '#333333',
    fontWeight: '700',
    fontSize: '1.5rem',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#828282',
    fontSize: '0.95rem',
    marginBottom: '1.5rem'
  },
  sectionTitle: {
    color: '#2F80ED',
    fontWeight: '600',
    fontSize: '1rem',
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
  label: {
    fontSize: '0.85rem',
    color: '#4F4F4F',
    marginBottom: '0.3rem'
  },
  input: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
    fontSize: '0.9rem',
    outline: 'none'
  },
  select: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#FFFFFF'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    color: '#333333',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '0.9rem 1.5rem',
    cursor: 'pointer',
    fontWeight: '500'
  },
  saveButton: {
    backgroundColor: '#27AE60',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    padding: '0.9rem 1.5rem',
    cursor: 'pointer',
    fontWeight: '600'
  }
}

export default RegistrarMedico
