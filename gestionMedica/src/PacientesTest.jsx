// src/PacientesTest.jsx
import React, { useState, useEffect } from "react";
import { pacientesAPI } from "./connections/api";

function PacientesTest() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarPacientes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await pacientesAPI.getAll();
      
      // EXPLICACIÓN: Como la API responde con { status: 'success', data: [...] }
      // debemos guardar en el estado únicamente el arreglo que está dentro de response.data
      const listado = response?.data || [];
      
      setPacientes(listado);
    } catch (err) {
      setError(err.message || "Error al obtener los pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  const tableHeaderStyle = {
    backgroundColor: "#f4f4f4",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #ddd"
  };

  const tableCellStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd"
  };

  return (
    <div style={{ marginTop: "30px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Listado de Pacientes (Prueba desde BD)</h3>
        <button 
          onClick={cargarPacientes} 
          style={{ padding: "6px 12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Recargar Datos
        </button>
      </div>

      {loading && <p style={{ color: "#666" }}>Cargando datos de pacientes desde el servidor...</p>}
      
      {error && (
        <div style={{ color: "red", backgroundColor: "#f8d7da", padding: "12px", borderRadius: "4px", margin: "15px 0" }}>
          <strong>Error de conexión:</strong> {error}
        </div>
      )}

      {!loading && !error && pacientes.length === 0 && (
        <p>No se encontraron pacientes registrados en la base de datos.</p>
      )}

      {!loading && !error && pacientes.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>ID Persona</th>
              <th style={tableHeaderStyle}>Nombre Completo</th>
              <th style={tableHeaderStyle}>Cédula</th>
              <th style={tableHeaderStyle}>Tipo de Sangre</th>
              <th style={tableHeaderStyle}>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente, idx) => (
              <tr key={paciente.persona_id || idx}>
                <td style={tableCellStyle}>{paciente.persona_id}</td>
                {/* Mostramos el Nombre y Apellidos devueltos por el JOIN del backend */}
                <td style={tableCellStyle}>
                  {paciente.nombre} {paciente.apellidos}
                </td>
                <td style={tableCellStyle}>{paciente.cedula}</td>
                <td style={tableCellStyle}>
                  <span style={{ backgroundColor: "#e2f0d9", color: "#385723", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                    {paciente.tipo_sangre || "N/A"}
                  </span>
                </td>
                <td style={tableCellStyle}>{paciente.observaciones || "Sin observaciones"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PacientesTest;