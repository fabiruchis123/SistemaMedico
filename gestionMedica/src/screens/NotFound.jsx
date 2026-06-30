import { Link } from 'react-router-dom'
import { C, T } from '../theme'

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <p style={styles.message}>Página no encontrada</p>
      <Link to="/" style={styles.link}>
        Volver al inicio
      </Link>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: C.grayLight,
    fontFamily: T.family,
    padding: '2rem'
  },
  code: {
    fontSize: '72px',
    fontWeight: T.weight.bold,
    color: '#E2E8F0',
    margin: 0
  },
  message: {
    marginTop: '0.5rem',
    fontSize: T.size.base,
    color: C.grayMid
  },
  link: {
    marginTop: '1.5rem',
    padding: '0.75rem 1rem',
    backgroundColor: C.medicalBlue,
    color: C.white,
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: T.weight.medium,
    fontSize: T.size.base,
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    display: 'inline-block'
  }
}
