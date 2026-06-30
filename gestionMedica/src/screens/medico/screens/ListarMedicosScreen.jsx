import { useMemo, useState } from 'react'
import MainLayout from '../../../layouts/MainLayout'
import Table from '../../../components/Table'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Alert from '../../../components/Alert'
import PageHeader from '../../../components/PageHeader'
import Avatar from '../../../components/Avatar'
import DetalleMedicoModal from '../components/DetalleMedicoModal'
import FormMedicoModal from '../components/FormMedicoModal'
import ConfirmarEliminarModal from '../components/ConfirmarEliminarModal'
import { useMedicos } from '../hooks/useMedicos'
import { useAuth } from '../../../context/AuthContext'
import { C, T, ICONS } from '../../../theme'

function buildColumns({ isAdmin, onVer, onEditar, onEliminar }) {
  return [
    {
      key: 'doctor',
      label: 'Médico',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar name={`${row.nombre} ${row.apellidos || ''}`} size="sm" />
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
      key: 'contacto',
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
      key: 'especialidad',
      label: 'Especialidad',
      render: (v) => v || '—',
    },
    {
      key: 'estado',
      label: 'Estado',
      align: 'center',
      render: (_, row) => {
        const activo = row.activo === 1 || row.activo === true || row.activo === '1'
        return (
          <span style={{
            display: 'inline-block',
            backgroundColor: activo ? '#ECFDF5' : '#FEF2F2',
            color: activo ? C.medicalGreen : C.alertRed,
            borderRadius: '6px',
            padding: '2px 10px',
            fontSize: T.size.md,
            fontWeight: T.weight.bold,
            fontFamily: T.family,
          }}>
            {activo ? 'Activo' : 'Inactivo'}
          </span>
        )
      },
    },
    {
      key: 'acciones',
      label: 'Acciones',
      align: 'center',
      width: isAdmin ? '140px' : '80px',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <button title="Ver detalle" onClick={() => onVer(row)} style={{ background: '#EFF6FF', border: 'none', borderRadius: '7px', padding: '7px', cursor: 'pointer', color: C.medicalBlue, display: 'flex', alignItems: 'center' }}>
            <ICONS.eye size={15} />
          </button>
          {isAdmin && (
            <>
              <button title="Editar médico" onClick={() => onEditar(row)} style={{ background: '#ECFDF5', border: 'none', borderRadius: '7px', padding: '7px', cursor: 'pointer', color: C.medicalGreen, display: 'flex', alignItems: 'center' }}>
                <ICONS.edit size={15} />
              </button>
              <button title="Eliminar médico" onClick={() => onEliminar(row)} style={{ background: '#FEF2F2', border: 'none', borderRadius: '7px', padding: '7px', cursor: 'pointer', color: C.alertRed, display: 'flex', alignItems: 'center' }}>
                <ICONS.trash size={15} />
              </button>
            </>
          )}
        </div>
      ),
    },
  ]
}

export default function ListarMedicosScreen() {
  const { isAdmin } = useAuth()
  const { medicos, loading, error, cargar, crear, actualizar, eliminar } = useMedicos()

  const [busqueda, setBusqueda] = useState('')
  const [verMedico, setVerMedico] = useState(null)
  const [editMedico, setEditMedico] = useState(null)
  const [delMedico, setDelMedico] = useState(null)
  const [delLoading, setDelLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)

  const filtered = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return medicos
    return medicos.filter((m) => `${m.nombre} ${m.apellidos} ${m.cedula} ${m.email ?? ''} ${m.especialidad ?? ''}`.toLowerCase().includes(q))
  }, [medicos, busqueda])

  const showSuccess = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(null), 4000)
  }

  const handleSave = async (form) => {
    if (form.persona_id) {
      await actualizar(form.persona_id, form)
      showSuccess('Médico actualizado correctamente.')
    } else {
      await crear(form)
      showSuccess('Médico registrado correctamente.')
    }
  }

  const handleDelete = async () => {
    setDelLoading(true)
    try {
      await eliminar(delMedico.persona_id)
      setDelMedico(null)
      showSuccess('Médico desactivado del sistema.')
    } finally {
      setDelLoading(false)
    }
  }

  const columns = buildColumns({
    isAdmin,
    onVer: (row) => setVerMedico(row),
    onEditar: (row) => setEditMedico(row),
    onEliminar: (row) => setDelMedico(row),
  })

  return (
    <MainLayout pageTitle="Médicos">
      <PageHeader
        title="Médicos"
        subtitle="Gestión de médicos registrados en el sistema"
        actions={
          isAdmin && (
            <Button variant="primary" icon={<ICONS.plus size={16} />} onClick={() => setEditMedico({})}>
              Nuevo médico
            </Button>
          )
        }
      />

      {error && <Alert type="error" message={error} onClose={cargar} style={{ marginBottom: '16px' }} />}
      {successMsg && <Alert type="success" message={successMsg} onClose={() => setSuccessMsg(null)} style={{ marginBottom: '16px' }} />}

      <div style={{ margin: '20px 0 16px', maxWidth: '360px' }}>
        <Input
          placeholder="Buscar por nombre, cédula o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          icon={<ICONS.search size={16} />}
        />
      </div>

      <p style={{ margin: '0 0 12px', fontSize: T.size.md, color: C.grayMid, fontFamily: T.family }}>
        {filtered.length} médico{filtered.length !== 1 ? 's' : ''}
        {busqueda ? ` encontrado${filtered.length !== 1 ? 's' : ''}` : ' registrado' + (filtered.length !== 1 ? 's' : '')}
      </p>

      <Table
        columns={columns}
        rows={filtered}
        loading={loading}
        keyField="persona_id"
        emptyText={busqueda ? 'No se encontraron médicos con esa búsqueda.' : 'No hay médicos registrados en el sistema.'}
      />

      <DetalleMedicoModal
        medico={verMedico}
        isOpen={Boolean(verMedico)}
        onClose={() => setVerMedico(null)}
      />

      {isAdmin && (
        <>
          <FormMedicoModal
            medico={editMedico}
            isOpen={Boolean(editMedico)}
            onClose={() => setEditMedico(null)}
            onSave={handleSave}
          />

          <ConfirmarEliminarModal
            medico={delMedico}
            isOpen={Boolean(delMedico)}
            onClose={() => setDelMedico(null)}
            onConfirm={handleDelete}
            loading={delLoading}
          />
        </>
      )}
    </MainLayout>
  )
}
