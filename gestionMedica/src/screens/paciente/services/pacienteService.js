// src/screens/paciente/services/pacienteService.js
// ─── Servicio de pacientes ────────────────────────────────────────────────────
// Conecta con el backend vía customAxios.
// Endpoints esperados (ajustá según tu API real):
//   GET    /pacientes
//   GET    /pacientes/:id
//   POST   /pacientes
//   PUT    /pacientes/:id
//   DELETE /pacientes/:id
//   GET    /pacientes/doctor/:doctorId   → para rol doctor

import { customAxios } from '../../../connections/api'

const normalizePayload = (payload = {}) => {
  const normalized = { ...payload }

  if (!normalized.apellidos && normalized.apellido) {
    normalized.apellidos = normalized.apellido
  }

  if (!normalized.email && normalized.correo) {
    normalized.email = normalized.correo
  }

  if (!normalized.fecha_nacimiento) {
    normalized.fecha_nacimiento = '2000-01-01'
  }

  if (!normalized.genero) {
    normalized.genero = 'O'
  }

  if (!normalized.telefono) {
    normalized.telefono = '00000000'
  }

  if (!normalized.direccion) {
    normalized.direccion = 'Sin dirección registrada'
  }

  if (!normalized.tipo_sangre) {
    normalized.tipo_sangre = 'O+'
  }

  if (!normalized.observaciones) {
    normalized.observaciones = 'Sin observaciones'
  }

  if (!normalized.cedula) {
    normalized.cedula = `TMP-${Date.now()}`
  }

  return normalized
}

const handleError = (error) => {
  const msg =
    error.response?.data?.message ??
    error.response?.data?.error ??
    error.message ??
    'Error desconocido'
  throw new Error('Error al conectar con la API: ' + msg)
}

export const pacienteService = {
  /** Todos los pacientes (admin / secretario) */
  getAll: async () => {
    try {
      const response = await customAxios.get('/pacientes/all')
      return response.data?.data || []
    } catch (e) { handleError(e) }
  },

  /** Pacientes asignados a un doctor */
  getByDoctor: async (doctorId) => {
    try {
      const response = await customAxios.get('/pacientes/all')
      return response.data?.data || []
    } catch (e) { handleError(e) }
  },

  /** Detalle de un paciente */
  getById: async (id) => {
    try {
      const response = await customAxios.get(`/pacientes/${id}`)
      return response.data?.data || {}
    } catch (e) { handleError(e) }
  },

  /** Crear paciente nuevo */
  create: async (payload) => {
    try {
      const response = await customAxios.post('/pacientes', normalizePayload(payload))
      return response.data?.data || {}
    } catch (e) { handleError(e) }
  },

  /** Actualizar paciente (solo admin) */
  update: async (id, payload) => {
    try {
      const response = await customAxios.put(`/pacientes/${id}`, normalizePayload(payload))
      return response.data?.data || {}
    } catch (e) { handleError(e) }
  },

  /** Eliminar paciente (solo admin) */
  remove: async (id) => {
    try {
      const response = await customAxios.delete(`/pacientes/${id}`)
      return response.data?.data || {}
    } catch (e) { handleError(e) }
  },
}
