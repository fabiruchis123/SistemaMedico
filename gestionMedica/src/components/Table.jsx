/**
 * Table — Tabla de datos
 *
 * Props:
 *   columns : Array<{
 *     key      : string
 *     label    : string
 *     render?  : (value, row) => ReactNode  (renderizado custom)
 *     width?   : string
 *     align?   : 'left' | 'center' | 'right'
 *   }>
 *   rows       : Array<object>
 *   loading    : boolean
 *   emptyText  : string
 *   onRowClick : function(row)
 *   keyField   : string (campo único, default 'id')
 *
 * Uso:
 *   <Table
 *     columns={[
 *       { key: 'patientName', label: 'Paciente' },
 *       { key: 'date',        label: 'Fecha' },
 *       { key: 'status',      label: 'Estado', render: (v) => <Badge status={v} /> },
 *     ]}
 *     rows={appointments}
 *     onRowClick={(row) => navigate(`/citas/${row.id}`)}
 *   />
 */

const Skeleton = () => (
  <div
    style={{
      height:          '14px',
      backgroundColor: '#E2E8F0',
      borderRadius:    '4px',
      animation:       'pulse 1.5s ease-in-out infinite',
    }}
  />
)

export default function Table({
  columns    = [],
  rows       = [],
  loading    = false,
  emptyText  = 'No hay datos para mostrar.',
  onRowClick,
  keyField   = 'id',
}) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius:    '12px',
        boxShadow:       '0 1px 4px rgba(0,0,0,0.07)',
        overflow:        'hidden',
        fontFamily:      "'Poppins', sans-serif",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .table-row:hover {
          background-color: #F8FAFF !important;
        }
      `}</style>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          {/* Head */}
          <thead>
            <tr style={{ backgroundColor: '#F2F4F7' }}>
              {columns.map(col => (
                <th
                  key={col.key}
                  style={{
                    padding:    '12px 16px',
                    textAlign:  col.align ?? 'left',
                    fontSize:   '12px',
                    fontWeight: 600,
                    color:      '#828282',
                    whiteSpace: 'nowrap',
                    width:      col.width,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {/* Loading */}
            {loading && (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skel-${i}`}>
                  {columns.map(col => (
                    <td key={col.key} style={{ padding: '14px 16px', borderBottom: '1px solid #F2F4F7' }}>
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))
            )}

            {/* Sin datos */}
            {!loading && rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding:   '48px 16px',
                    textAlign: 'center',
                    color:     '#828282',
                    fontSize:  '14px',
                  }}
                >
                  <div>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#BEE3F8" strokeWidth="1.5" style={{ marginBottom: '8px' }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="3" y1="9"  x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9"  y2="9" />
                    </svg>
                    <p style={{ margin: 0, fontFamily: "'Poppins', sans-serif" }}>{emptyText}</p>
                  </div>
                </td>
              </tr>
            )}

            {/* Filas */}
            {!loading && rows.map((row, i) => (
              <tr
                key={row[keyField] ?? i}
                className="table-row"
                onClick={() => onRowClick?.(row)}
                style={{
                  borderBottom: '1px solid #F2F4F7',
                  cursor:       onRowClick ? 'pointer' : 'default',
                  transition:   'background-color 0.15s',
                }}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    style={{
                      padding:    '13px 16px',
                      fontSize:   '13px',
                      color:      '#4B5563',
                      textAlign:  col.align ?? 'left',
                      fontWeight: 400,
                    }}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
