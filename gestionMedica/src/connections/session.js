// sesion.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_Auth || "http://localhost:5000/api/auth";

const inferRole = (email) => {
  if (!email) return "secretario";
  if (email.includes("admin")) return "admin";
  if (email.includes("doctor") || email.includes("medico")) return "doctor";
  return "secretario";
};

const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    console.log("=== ESTRUCTURA RECIBIDA DE LA API ===", res.data);

    const { token, user } = res.data.data;

    if (!user) {
      throw new Error("No se recibió información de usuario");
    }

    const { usuario_id, nombre_usuario, email: userEmail } = user;

    if (!usuario_id) {
      throw new Error("No se recibió el ID del usuario");
    }
    if (!token) {
      throw new Error("No se recibió un token de autenticación");
    }

    const normalizedUser = {
      id: usuario_id,
      nombre: nombre_usuario || userEmail || email,
      email: userEmail || email,
      role: inferRole(userEmail || email),
      token,
      ...user,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("idUsuario", usuario_id);
    localStorage.setItem("nombreUsuario", normalizedUser.nombre || "");
    localStorage.setItem("userData", JSON.stringify(normalizedUser));

    return normalizedUser;
  } catch (err) {
    const errMsg = err.response?.data?.message || err.message;
    console.error("Error al iniciar sesión:", errMsg);
    throw new Error(errMsg);
  }
};

const logout = async () => {
  const idUsuario = localStorage.getItem("idUsuario");
  localStorage.removeItem("token");
  localStorage.removeItem("idUsuario");
  localStorage.removeItem("nombreUsuario");
  localStorage.removeItem("userData");

  if (!idUsuario) {
    console.warn("No se encontró un usuario autenticado para cerrar sesión");
    return;
  }
  axios.post(`${API_URL}/logout`, { id: idUsuario })
    .then((response) => {
      console.log("Sesión cerrada correctamente", response.data);
    })
    .catch((error) => {
      console.error("Error al cerrar sesión", error);
    });
};

export default { login, logout };