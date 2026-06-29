// src/InicioSesionTest.jsx
import React, { useState, useEffect } from "react";
import sesion from "./connections/session";
import PacientesTest from "./PacientesTest";

function InicionSessionTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Verificar si ya hay una sesión activa al cargar la página
  useEffect(() => {
    const token = localStorage.getItem("token");
    const nombre = localStorage.getItem("nombreUsuario");
    if (token) {
      setIsLoggedIn(true);
      setUserName(nombre || "Usuario");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Llama a sesion.js (que se encarga de llamar al backend y guardar en localStorage)
      await sesion.login(email, password);
      
      const nombreSaved = localStorage.getItem("nombreUsuario");
      setUserName(nombreSaved || "Usuario");
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sesion.logout();
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  // Estilos rápidos en línea para visualización limpia
  const cardStyle = {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0 20px 0",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px"
  };

  if (isLoggedIn) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
          <h2>Clínica - Panel de Control</h2>
          <div>
            <span style={{ marginRight: "15px", fontWeight: "bold" }}>Bienvenido, {userName}</span>
            <button 
              onClick={handleLogout} 
              style={{ padding: "8px 15px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        <main style={{ marginTop: "20px" }}>
          {/* Componente para probar la carga de datos */}
          <PacientesTest />
        </main>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>
      {error && <div style={{ color: "red", backgroundColor: "#f8d7da", padding: "10px", borderRadius: "4px", marginBottom: "15px" }}>{error}</div>}
      
      <form onSubmit={handleLogin}>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          placeholder="ejemplo@clinica.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Iniciando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default InicionSessionTest;