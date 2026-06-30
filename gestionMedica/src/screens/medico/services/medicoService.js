// src/screens/medico/services/medicoService.js
// ─── Servicio de médicos ────────────────────────────────────────────────────
// Conecta con el backend vía customAxios.

import { customAxios } from '../../../connections/api'

const handleError = (error) => {
  const msg =
    error.response?.data?.message ??
    error.response?.data?.error ??
    error.message ??
    'Error desconocido'
  throw new Error('Error al conectar con la API: ' + msg)
}

const normalizePayload = (payload = {}) => {
  const normalized = { ...payload }

  if (!normalized.apellidos && normalized.apellido) {
    normalized.apellidos = normalized.apellido
  }

  if (!normalized.email && normalized.correo) {
    normalized.email = normalized.correo
  }

  if (!normalized.nombre_usuario) {
    normalized.nombre_usuario = normalized.email?.split('@')[0] || `doctor${Date.now()}`
  }

  if (!normalized.password) {
    normalized.password = 'Password123!'
  }

  if (!normalized.fecha_ingreso) {
    normalized.fecha_ingreso = new Date().toISOString().slice(0, 10)
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

  if (!normalized.apellidos) {
    normalized.apellidos = 'Sin apellidos'
  }

  if (!normalized.cedula) {
    normalized.cedula = `TMP-${Date.now()}`
  }

  if (!normalized.num_licencia) {
    normalized.num_licencia = `LIC-${Date.now()}`
  }

  if (normalized.especialidad && !normalized.especialidad_id) {
    const mapping = {
      'Medicina General': 1,
      'Pediatría': 2,
      'Cardiología': 3,
      'Dermatología': 4,
      'Ginecología': 5,
      'Odontología': 6,
      'Neurología': 7,
    }
    normalized.especialidad_id = mapping[normalized.especialidad] ?? normalized.especialidad
  }

  return normalized
}

export const medicoService = {
  getAll: async () => {
    try {
      const response = await customAxios.get('/doctores/all')
      return response.data?.data || []
    } catch (e) { handleError(e) }
  },

  getById: async (id) => {
    try {
      const response = await customAxios.get(`/doctores/${id}`)
      return response.data?.data || {}
    } catch (e) { handleError(e) }
  },

  create: async (payload) => {
    try {
      const response = await customAxios.post('/doctores', normalizePayload(payload))
      return response.data?.data || {}
    } catch (e) { handleError(e) }
  },

  update: async (id, payload) => {
    try {
      const response = await customAxios.put(`/doctores/${id}`, normalizePayload(payload))
      return response.data?.data || {}
    } catch (e) { handleError(e) }
  },

  remove: async (id) => {
    try {
      const response = await customAxios.patch(`/doctores/${id}/desactivar`)
      return response.data?.data || {}
    } catch (e) { handleError(e) }
  },
}
