import { C, T } from '../theme'
import MainLayout from '../layouts/MainLayout'

export default function Home() {
  return (
    <MainLayout pageTitle="Sistema de Gestión Médica">
      <div style={styles.container}>
        <h1 style={styles.title}>Sistema de Gestión Médica</h1>
        <p style={styles.subtitle}>Sistema de gestión médica para optimizar el proceso de atención al paciente.</p>
      </div>
    </MainLayout>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: C.grayLight,
    padding: '2rem'
  },
  title: {
    fontSize: T.size.h1,
    fontWeight: T.weight.bold,
    color: C.grayDark,
    marginBottom: '1rem',
    fontFamily: T.family
  },
  subtitle: {
    fontSize: T.size.base,
    color: C.grayMid,
    fontFamily: T.family
  }
}
