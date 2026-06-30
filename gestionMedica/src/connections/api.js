// api.js
import axios from "axios";

// ==========================================
// 1. CONFIGURACIÓN DE AXIOS E INTERCEPTOR
// ==========================================

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


const customAxios = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para agregar token automáticamente en cada petición
customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// 2. MANEJADOR DE ERRORES COMÚN
// ==========================================

const handleError = (error) => {
  const apiMessage =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Error desconocido";

  console.error("Detalles del error:", error.response?.data);
  throw new Error("Error al conectar con la API: " + apiMessage);
};

// ==========================================
// 3. MÉTODOS CRUD POR DEFECTO Y CONSTRUCTOR
// ==========================================

const defaultMethods = (endpoint) => ({
  getAll: async () => {
    try {
      const res = await customAxios.get(`/${endpoint}/all`);
      // console.log(`📦 Datos obtenidos de /${endpoint}/all:`, res.data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  getById: async (id) => {
    try {
      const res = await customAxios.get(`/${endpoint}/${id}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  create: async (data) => {
    try {
      const res = await customAxios.post(`/${endpoint}`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  update: async (id, data) => {
    try {
      const res = await customAxios.put(`/${endpoint}/${id}`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  remove: async (id) => {
    try {
      const res = await customAxios.delete(`/${endpoint}/${id}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
});

const createApiMethods = (endpoint, extraMethods = {}) => {
  return {
    ...defaultMethods(endpoint),
    ...extraMethods,
  };
};

// ==========================================
// 4. EXPORTACIÓN DE SERVICIOS CRUD INDIVIDUALES
// ==========================================


// Esto mapea automáticamente a /pacientes/all, /pacientes/id/:id, etc.


export const pacientesAPI = createApiMethods("pacientes");

export const doctoresAPI = createApiMethods("doctores");

export const citasAPI = createApiMethods("citas");

export { customAxios, createApiMethods };
