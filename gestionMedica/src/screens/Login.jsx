import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { C, T } from '../theme'
import { Input, Button, Card, Alert } from '../components'
import { useAuth } from '../context/AuthContext'
import session from '../connections/session'

const Login = () => {
  const [email, setEmail] = useState('admin@clinica.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

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

    setLoading(true)
    try {
      await session.login(email, password)
      const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      login(userData)
      navigate('/home')
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión. Verifica tus credenciales.')
    } finally {
      setLoading(false)
    }
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
              disabled={loading}
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <div style={styles.forgotContainer}>
              <a href="#" style={styles.forgot}>¿Olvidaste tu contraseña?</a>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              style={styles.button}
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>

            {error && <Alert type="error" message={error} />}

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
    fontFamily: T.family,
    backgroundColor: C.grayLight
  },
  left: {
    flex: 1,
    backgroundColor: C.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  },
  logo: {
    color: C.medicalBlue,
    fontWeight: T.weight.bold,
    fontSize: T.size.h1,
    marginBottom: '0.5rem'
  },
  title: {
    color: C.grayDark,
    fontWeight: T.weight.semibold,
    fontSize: T.size.lg,
    marginBottom: '0.5rem'
  },
  text: {
    color: C.grayMid,
    fontSize: T.size.base,
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
    backgroundColor: C.grayLight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: C.white,
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    width: '380px',
    textAlign: 'left'
  },
  formTitle: {
    color: C.grayDark,
    fontWeight: T.weight.semibold,
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: T.size.h3
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
    color: C.medicalBlue,
    fontSize: T.size.sm,
    textDecoration: 'none'
  },
  button: {
    marginTop: '0.5rem',
  },
  error: {
    color: C.alertRed,
    fontSize: T.size.sm,
    marginTop: '1rem',
    textAlign: 'center'
  },
  register: {
    marginTop: '1rem',
    fontSize: T.size.sm,
    color: C.grayMid,
    textAlign: 'center'
  },
  link: {
    color: C.medicalBlue,
    textDecoration: 'none',
    fontWeight: T.weight.medium
  }
}

export default Login
