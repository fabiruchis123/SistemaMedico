// src/App.jsx
// ─── Enrutamiento principal ──────────────────────────────────────────────────
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider }                 from './context/AuthContext'
import { ProtectedRoute }               from './components'

// Pantallas públicas
import Login    from './screens/Login'
import NotFound from './screens/NotFound'

// Pantallas principales (dentro de MainLayout)
import Home                   from './screens/Home'
import ListarMedicosScreen    from './screens/medico/screens/ListarMedicosScreen'
import PacientesScreen        from './screens/paciente/screens/PacientesScreen'
import RegistrarPacienteScreen from './screens/paciente/screens/RegistrarPacienteScreen'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Públicas */}
          <Route path="/"        element={<Login />} />
          <Route path="/login"   element={<Login />} />

          {/* Autenticadas - Protegidas */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/medicos" element={
            <ProtectedRoute>
              <ListarMedicosScreen />
            </ProtectedRoute>
          } />
          <Route path="/pacientes" element={
            <ProtectedRoute>
              <PacientesScreen />
            </ProtectedRoute>
          } />
          <Route path="/pacientes/nuevo" element={
            <ProtectedRoute>
              <RegistrarPacienteScreen />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
