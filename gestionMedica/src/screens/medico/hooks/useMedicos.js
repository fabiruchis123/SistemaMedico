// src/screens/medico/hooks/useMedicos.js
// ─── Hook principal de la pantalla de médicos ───────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { medicoService } from '../services/medicoService'
import { useAuth } from '../../../context/AuthContext'

export function useMedicos() {
  const { isAdmin } = useAuth()

  const [medicos, setMedicos]   = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  // ── Carga ────────────────────────────────────────────────────────────────────
  const cargar = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await medicoService.getAll()
      setMedicos(data ?? [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { cargar() }, [cargar])

  // ── CRUD (solo admin) ────────────────────────────────────────────────────────
  const crear = async (payload) => {
    if (!isAdmin) return
    await medicoService.create(payload)
    await cargar()
  }

  const actualizar = async (id, payload) => {
    if (!isAdmin) return
    await medicoService.update(id, payload)
    await cargar()
  }

  const eliminar = async (id) => {
    if (!isAdmin) return
    await medicoService.remove(id)
    await cargar()
  }

  return {
    medicos,
    loading,
    error,
    cargar,
    crear: isAdmin ? crear : null,
    actualizar: isAdmin ? actualizar : null,
    eliminar: isAdmin ? eliminar : null,
  }
}
