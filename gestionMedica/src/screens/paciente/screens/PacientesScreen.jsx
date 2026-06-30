// src/screens/paciente/screens/PacientesScreen.jsx
// ─── Pantalla: Lista de Pacientes ─────────────────────────────────────────────
// - Admin  → puede ver, crear, editar y eliminar
// - Doctor → puede ver los pacientes asignados (solo lectura)

import { useState, useMemo } from 'react'
import MainLayout             from '../../../layouts/MainLayout'
import Table                  from '../../../components/Table'
import Button                 from '../../../components/Button'
import Input                  from '../../../components/Input'
import Alert                  from '../../../components/Alert'
import PageHeader             from '../../../components/PageHeader'
import Avatar                 from '../../../components/Avatar'
import DetallePacienteModal   from '../components/DetallePacienteModal'
import FormPacienteModal      from '../components/FormPacienteModal'
import ConfirmarEliminarModal from '../components/ConfirmarEliminarModal'
import { usePacientes }       from '../hooks/usePacientes'
import { useAuth }            from '../../../context/AuthContext'
import { C, T, ICONS }       from '../../../theme'

// ─── Columnas dinámicas según rol ────────────────────────────────────────────
function buildColumns({ isAdmin, onVer, onEditar, onEliminar }) {
  return [
    {
      key: 'nombre',
      label: 'Paciente',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar name={`${row.nombre} ${row.apellidos}`} size="sm" />
          <div>
            <p style={{ margin: 0, fontSize: T.size.base, fontWeight: T.weight.semibold, color: C.grayDark, fontFamily: T.family }}>
              {row.nombre} {row.apellidos}
            </p>
            <p style={{ margin: 0, fontSize: T.size.sm, color: C.grayMid, fontFamily: T.family }}>
              Cédula: {row.cedula}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'telefono',
      label: 'Contacto',
      render: (_, row) => (
        <div>
          <p style={{ margin: 0, fontSize: T.size.md, color: C.grayDark, fontFamily: T.family }}>
            {row.telefono ?? '—'}
          </p>
          <p style={{ margin: 0, fontSize: T.size.sm, color: C.grayMid, fontFamily: T.family }}>
            {row.email ?? '—'}
          </p>
        </div>
      ),
    },
    {
      key: 'fecha_nacimiento',
      label: 'Fecha nac.',
      render: (v) => v
        ? new Date(v).toLocaleDateString('es-CR')
        : '—',
    },
    {
      key: 'tipo_sangre',
      label: 'Tipo sangre',
      align: 'center',
      render: (v) => v
        ? (
          <span
            style={{
              display:         'inline-block',
              backgroundColor: '#FEF2F2',
              color:           C.alertRed,
              borderRadius:    '6px',
              padding:         '2px 10px',
              fontSize:        T.size.md,
              fontWeight:      T.weight.bold,
              fontFamily:      T.family,
            }}
          >
            {v}
          </span>
        )
        : <span style={{ color: C.grayMid, fontFamily: T.family }}>—</span>,
    },
    {
      key: 'acciones',
      label: 'Acciones',
      align: 'center',
      width: isAdmin ? '140px' : '80px',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          {/* Ver detalle — disponible para todos */}
          <button
            title="Ver detalle"
            onClick={() => onVer(row)}
            style={{
              background:   '#EFF6FF',
              border:       'none',
              borderRadius: '7px',
              padding:      '7px',
              cursor:       'pointer',
              color:        C.medicalBlue,
              display:      'flex',
              alignItems:   'center',
              transition:   'background 0.15s',
            }}
          >
            <ICONS.eye size={15} />
          </button>

          {/* Editar — solo admin */}
          {isAdmin && (
            <button
              title="Editar paciente"
              onClick={() => onEditar(row)}
              style={{
                background:   '#ECFDF5',
                border:       'none',
                borderRadius: '7px',
                padding:      '7px',
                cursor:       'pointer',
                color:        C.medicalGreen,
                display:      'flex',
                alignItems:   'center',
                transition:   'background 0.15s',
              }}
            >
              <ICONS.edit size={15} />
            </button>
          )}

          {/* Eliminar — solo admin */}
          {isAdmin && (
            <button
              title="Eliminar paciente"
              onClick={() => onEliminar(row)}
              style={{
                background:   '#FEF2F2',
                border:       'none',
                borderRadius: '7px',
                padding:      '7px',
                cursor:       'pointer',
                color:        C.alertRed,
                display:      'flex',
                alignItems:   'center',
                transition:   'background 0.15s',
              }}
            >
              <ICONS.trash size={15} />
            </button>
          )}
        </div>
      ),
    },
  ]
}

// ─── PacientesScreen ──────────────────────────────────────────────────────────
export default function PacientesScreen() {
  const { isAdmin, isDoctor } = useAuth()
  const { pacientes, loading, error, cargar, crear, actualizar, eliminar } = usePacientes()

  // ── Estados de UI ──────────────────────────────────────────────────────────
  const [busqueda, setBusqueda]         = useState('')
  const [verPaciente, setVerPaciente]   = useState(null)   // detalle
  const [editPaciente, setEditPaciente] = useState(null)   // form (null = cerrado, {} = nuevo, {...} = editar)
  const [delPaciente, setDelPaciente]   = useState(null)   // confirmar eliminar
  const [delLoading, setDelLoading]     = useState(false)
  const [successMsg, setSuccessMsg]     = useState(null)

  // ── Filtro por búsqueda ────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return pacientes
    return pacientes.filter(p =>
      `${p.nombre} ${p.apellidos} ${p.cedula} ${p.email ?? ''}`
        .toLowerCase()
        .includes(q)
    )
  }, [pacientes, busqueda])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSave = async (form) => {
    if (form.persona_id) {
      await actualizar(form.persona_id, form)
      showSuccess('Paciente actualizado correctamente.')
    } else {
      await crear(form)
      showSuccess('Paciente registrado correctamente.')
    }
  }

  const handleDelete = async () => {
    setDelLoading(true)
    try {
      await eliminar(delPaciente.persona_id)
      setDelPaciente(null)
      showSuccess('Paciente eliminado del sistema.')
    } finally {
      setDelLoading(false)
    }
  }

  const showSuccess = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(null), 4000)
  }

  const columns = buildColumns({
    isAdmin,
    onVer:     (row) => setVerPaciente(row),
    onEditar:  (row) => setEditPaciente(row),
    onEliminar:(row) => setDelPaciente(row),
  })

  return (
    <MainLayout pageTitle="Pacientes">
      <PageHeader
        title={isDoctor ? 'Mis pacientes' : 'Pacientes'}
        subtitle={
          isDoctor
            ? 'Pacientes asignados a tu consulta'
            : 'Gestión de pacientes registrados en el sistema'
        }
        actions={
          isAdmin && (
            <Button
              variant="primary"
              icon={<ICONS.plus size={16} />}
              onClick={() => setEditPaciente({})}
            >
              Nuevo paciente
            </Button>
          )
        }
      />

      {/* Alertas */}
      {error      && <Alert type="error"   message={error}      onClose={cargar}                      style={{ marginBottom: '16px' }} />}
      {successMsg && <Alert type="success" message={successMsg} onClose={() => setSuccessMsg(null)}   style={{ marginBottom: '16px' }} />}

      {/* Barra de búsqueda */}
      <div style={{ margin: '20px 0 16px', maxWidth: '360px' }}>
        <Input
          placeholder="Buscar por nombre, cédula o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          icon={<ICONS.search size={16} />}
        />
      </div>

      {/* Contador */}
      <p
        style={{
          margin:     '0 0 12px',
          fontSize:   T.size.md,
          color:      C.grayMid,
          fontFamily: T.family,
        }}
      >
        {filtered.length} paciente{filtered.length !== 1 ? 's' : ''}
        {busqueda ? ` encontrado${filtered.length !== 1 ? 's' : ''}` : ' registrado' + (filtered.length !== 1 ? 's' : '')}
      </p>

      {/* Tabla */}
      <Table
        columns={columns}
        rows={filtered}
        loading={loading}
        keyField="persona_id"
        emptyText={
          busqueda
            ? 'No se encontraron pacientes con esa búsqueda.'
            : isDoctor
            ? 'No tienes pacientes asignados aún.'
            : 'No hay pacientes registrados en el sistema.'
        }
      />

      {/* ── Modales ── */}
      <DetallePacienteModal
        paciente={verPaciente}
        isOpen={Boolean(verPaciente)}
        onClose={() => setVerPaciente(null)}
      />

      {isAdmin && (
        <>
          <FormPacienteModal
            paciente={editPaciente}
            isOpen={Boolean(editPaciente)}
            onClose={() => setEditPaciente(null)}
            onSave={handleSave}
          />

          <ConfirmarEliminarModal
            paciente={delPaciente}
            isOpen={Boolean(delPaciente)}
            onClose={() => setDelPaciente(null)}
            onConfirm={handleDelete}
            loading={delLoading}
          />
        </>
      )}
    </MainLayout>
  )
}
