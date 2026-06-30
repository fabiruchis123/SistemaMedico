// src/screens/paciente/hooks/usePacientes.js
// ─── Hook principal de la pantalla de pacientes ───────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { pacienteService } from '../services/pacienteService'
import { useAuth } from '../../../context/AuthContext'

export function usePacientes() {
  const { isAdmin, isDoctor, user } = useAuth()

  const [pacientes, setPacientes]   = useState([])
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)

  // ── Carga ────────────────────────────────────────────────────────────────────
  const cargar = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = isDoctor
        ? await pacienteService.getByDoctor(user.persona_id)
        : await pacienteService.getAll()
      setPacientes(data ?? [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [isDoctor, user?.persona_id])

  useEffect(() => { cargar() }, [cargar])

  // ── CRUD (solo admin) ────────────────────────────────────────────────────────
  const crear = async (payload) => {
    if (!isAdmin) return
    await pacienteService.create(payload)
    await cargar()
  }

  const actualizar = async (id, payload) => {
    if (!isAdmin) return
    await pacienteService.update(id, payload)
    await cargar()
  }

  const eliminar = async (id) => {
    if (!isAdmin) return
    await pacienteService.remove(id)
    await cargar()
  }

  return {
    pacientes,
    loading,
    error,
    cargar,
    crear: isAdmin ? crear : null,
    actualizar: isAdmin ? actualizar : null,
    eliminar: isAdmin ? eliminar : null,
  }
}
