import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Por favor completa todos los campos.')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('El correo electrónico no es válido.')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setError('')
    alert('Inicio de sesión simulado ✅')
  }

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1 style={styles.logo}>MediSalud</h1>
        <h3 style={styles.title}>Plataforma de Telemedicina y Citas Médicas</h3>
        <p style={styles.text}>
          Conecta con profesionales de la salud de manera fácil, rápida y segura.
        </p>
        <img
          src="https://img.freepik.com/premium-photo/online-doctor-concept-vector-cartoon-illustration-telemedicine-services_1240525-32132.jpg"
          alt="Doctora"
          style={styles.image}
        />
      </div>

      <div style={styles.right}>
        <Card style={styles.card}>
          <h2 style={styles.formTitle}>Iniciar sesión</h2>

          <form style={styles.form} onSubmit={handleSubmit}>
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div style={styles.forgotContainer}>
              <a href="#" style={styles.forgot}>¿Olvidaste tu contraseña?</a>
            </div>

            {/* Botón azul ajustado */}
            <button type="submit" style={styles.button}>
              Iniciar sesión
            </button>

            {error && <p style={styles.error}>{error}</p>}

            <p style={styles.register}>
              ¿No tienes cuenta? <a href="#" style={styles.link}>Regístrate aquí</a>
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#F2F4F7'
  },
  left: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  },
  logo: {
    color: '#2F80ED',
    fontWeight: 'bold',
    fontSize: '2rem',
    marginBottom: '0.5rem'
  },
  title: {
    color: '#333333',
    fontWeight: '600',
    fontSize: '1.1rem',
    marginBottom: '0.5rem'
  },
  text: {
    color: '#828282',
    fontSize: '0.9rem',
    textAlign: 'center',
    maxWidth: '300px',
    marginBottom: '1.5rem'
  },
  image: {
    width: '220px',
    marginTop: '1rem'
  },
  right: {
    flex: 1,
    backgroundColor: '#F2F4F7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    width: '380px',
    textAlign: 'left'
  },
  formTitle: {
    color: '#333333',
    fontWeight: '600',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  forgotContainer: {
    textAlign: 'center',
    marginTop: '-0.5rem'
  },
  forgot: {
    color: '#2F80ED',
    fontSize: '0.85rem',
    textDecoration: 'none'
  },
  button: {
    backgroundColor: '#2F80ED',
    color: '#FFFFFF',
    fontWeight: '500',
    borderRadius: '8px',
    padding: '0.9rem', 
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem', 
    width: '100%',
    marginTop: '0.5rem',
    textAlign: 'center',
    transition: 'background-color 0.3s ease'
  },
  error: {
    color: '#EB5757',
    fontSize: '0.85rem',
    marginTop: '1rem',
    textAlign: 'center'
  },
  register: {
    marginTop: '1rem',
    fontSize: '0.85rem',
    color: '#828282',
    textAlign: 'center'
  },
  link: {
    color: '#2F80ED',
    textDecoration: 'none',
    fontWeight: '500'
  }
}

export default Login
