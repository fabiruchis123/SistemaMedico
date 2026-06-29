// api.js
import axios from "axios";

// ==========================================
// 1. CONFIGURACIÓN DE AXIOS E INTERCEPTOR
// ==========================================

// Ajustado al puerto 5000 donde corre su API
const BASE_URL = "http://localhost:5000/api";

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
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  getById: async (id) => {
    try {
      const res = await customAxios.get(`/${endpoint}/id/${id}`);
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
      const res = await customAxios.delete(`/${endpoint}/id/${id}`);
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

// Servicio de Pacientes (Añadido)
// Esto mapea automáticamente a /pacientes/all, /pacientes/id/:id, etc.
export const pacientesAPI = createApiMethods("pacientes");

export const productosAPI = createApiMethods("productos", {
  update: async (data) => {
    try {
      const res = await customAxios.put(`/productos`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByFamilia: async (codigoFamilia) => {
    try {
      const url = `/productos/consulta/ProductosPorFamilia/${encodeURIComponent(codigoFamilia)}`;
      console.log("Llamando a:", url);
      const res = await customAxios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByUsuario: async (idUsuario) => {
    try {
      const url = `/productos/consulta/porUsuario/${encodeURIComponent(idUsuario)}`;
      console.log("📦 Consultando productos por usuario:", url);
      const res = await customAxios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  }
});

export const familiasAPI = createApiMethods("familias", {
  getById: async (identificacion) => {
    try {
      const res = await customAxios.get(
        `/familias/consulta/familiaConJefe/${encodeURIComponent(identificacion)}`
      );
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  egresar: async (payload) => {
    try {
      const data = {
        id: payload.id,
        idModificacion: Number(payload.idModificacion)
      };
      const res = await customAxios.put(`/familias/egreso`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  getNextNumero: async (canton) => {
    try {
      const res = await customAxios.get(
        `/familias/requerimiento/indentificador/${encodeURIComponent(canton)}`
      );
      return res.data.identificador;
    } catch (error) {
      handleError(error);
    }
  },

  getByUsuario: async (idUsuario) => {
    try {
      const res = await customAxios.get(`/familias/consulta/porUsuario/${encodeURIComponent(idUsuario)}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
});