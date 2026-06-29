// sesion.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Ajustado al puerto 5000

const login = async (correo, contrasena) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email: correo,
      password: contrasena,
    });

    console.log("=== ESTRUCTURA RECIBIDA DE LA API ===", res.data);

    // CAMBIAR ESTA LÍNEA (agregando .data al final):
    const { token, user } = res.data.data; 
    
    if (!user) {
      throw new Error("No se recibió información de usuario");
    }
    
    // El backend usa 'usuario_id' y 'nombre_usuario' según la base de datos
    const { usuario_id, nombre_usuario } = user;

    if (!usuario_id) {
      throw new Error("No se recibió el ID del usuario");
    }
    if (!token) {
      throw new Error("No se recibió un token de autenticación");
    }

    // Almacenamiento en el navegador
    localStorage.setItem("token", token);
    localStorage.setItem("idUsuario", usuario_id);
    localStorage.setItem("nombreUsuario", nombre_usuario || "");
    localStorage.setItem("userData", JSON.stringify({ 
      username: correo, 
      nombre: nombre_usuario || correo 
    }));

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

  // Opcional: Ajustar endpoint de logout local si se requiere
  axios.post(`${API_URL}/logout`, { id: idUsuario })
    .then((response) => {
      console.log("Sesión cerrada correctamente", response.data);
    })
    .catch((error) => {
      console.error("Error al cerrar sesión", error);
    });
};

export default { login, logout };