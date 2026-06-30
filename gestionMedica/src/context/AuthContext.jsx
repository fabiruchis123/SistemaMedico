// src/contexts/AuthContext.jsx
// ─── Contexto de autenticación ────────────────────────────────────────────────
// Provee: user, role, login, logout, isAdmin, isDoctor

import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('userData')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const role = user?.role ?? null // 'admin' | 'doctor' | 'secretario'

  const login = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('token', userData.token ?? '')
    setUser(userData)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      role,
      isAdmin:     role === 'admin',
      isDoctor:    role === 'doctor',
      isSecretary: role === 'secretario',
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
