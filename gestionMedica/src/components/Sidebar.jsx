/**
 * Sidebar — Barra de navegación lateral
 *
 * Props:
 *   items       : Array<{ id, label, icon: ReactNode, badge?: number }>
 *   activeId    : string
 *   onSelect    : function(id)
 *   user        : { name, role, avatarSrc }
 *   appName     : string
 *   onLogout    : function
 *   collapsed   : boolean
 *
 * Uso:
 *   <Sidebar
 *     items={navItems}
 *     activeId="appointments"
 *     onSelect={setActive}
 *     user={{ name: 'Dra. García', role: 'Médico General' }}
 *     appName="MediGestión"
 *   />
 */

import Avatar from './Avatar'

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

export default function Sidebar({
  items     = [],
  activeId,
  onSelect,
  user      = {},
  appName   = 'Sistema Médico',
  onLogout,
  collapsed = false,
}) {
  const w = collapsed ? '72px' : '240px'

  return (
    <aside
      style={{
        width:           w,
        minWidth:        w,
        maxWidth:        w,
        height:          '100vh',
        backgroundColor: '#1F4E79',
        display:         'flex',
        flexDirection:   'column',
        fontFamily:      "'Poppins', sans-serif",
        transition:      'width 0.25s ease',
        overflow:        'hidden',
        position:        'sticky',
        top:             0,
        zIndex:          100,
      }}
    >
      {/* Logo / nombre app */}
      <div
        style={{
          padding:      collapsed ? '24px 0' : '24px 20px',
          display:      'flex',
          alignItems:   'center',
          gap:          '10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            width:           '34px',
            height:          '34px',
            borderRadius:    '8px',
            backgroundColor: '#2F80ED',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            flexShrink:      0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        {!collapsed && (
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap' }}>
            {appName}
          </span>
        )}
      </div>

      {/* Navegación */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        {items.map(item => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              onClick={() => onSelect?.(item.id)}
              title={collapsed ? item.label : undefined}
              style={{
                display:         'flex',
                alignItems:      'center',
                gap:             '12px',
                padding:         collapsed ? '10px 0' : '10px 14px',
                justifyContent:  collapsed ? 'center' : 'flex-start',
                borderRadius:    '8px',
                border:          'none',
                cursor:          'pointer',
                backgroundColor: isActive ? 'rgba(47, 128, 237, 0.25)' : 'transparent',
                color:           isActive ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
                fontFamily:      "'Poppins', sans-serif",
                fontSize:        '13px',
                fontWeight:      isActive ? 600 : 400,
                transition:      'all 0.15s ease',
                borderLeft:      isActive ? '3px solid #2F80ED' : '3px solid transparent',
                position:        'relative',
                width:           '100%',
              }}
            >
              <span style={{ flexShrink: 0, display: 'flex' }}>{item.icon}</span>

              {!collapsed && (
                <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.label}
                </span>
              )}

              {/* Badge de notificación */}
              {item.badge > 0 && (
                <span
                  style={{
                    minWidth:        '18px',
                    height:          '18px',
                    borderRadius:    '999px',
                    backgroundColor: '#EB5757',
                    color:           '#FFFFFF',
                    fontSize:        '10px',
                    fontWeight:      700,
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    padding:         '0 4px',
                    position:        collapsed ? 'absolute' : 'static',
                    top:             collapsed ? '6px' : undefined,
                    right:           collapsed ? '6px' : undefined,
                  }}
                >
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Usuario + logout */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        {user.name && (
          <div
            style={{
              display:        'flex',
              alignItems:     'center',
              gap:            '10px',
              padding:        '10px',
              borderRadius:   '8px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              marginBottom:   '6px',
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}
          >
            <Avatar name={user.name} src={user.avatarSrc} size="sm" />
            {!collapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name}
                </p>
                {user.role && (
                  <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>
                    {user.role}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {onLogout && (
          <button
            onClick={onLogout}
            title={collapsed ? 'Cerrar sesión' : undefined}
            style={{
              display:         'flex',
              alignItems:      'center',
              gap:             '10px',
              padding:         collapsed ? '10px 0' : '10px 14px',
              justifyContent:  collapsed ? 'center' : 'flex-start',
              width:           '100%',
              border:          'none',
              borderRadius:    '8px',
              backgroundColor: 'transparent',
              color:           'rgba(255,255,255,0.5)',
              fontFamily:      "'Poppins', sans-serif",
              fontSize:        '13px',
              cursor:          'pointer',
              transition:      'all 0.15s',
            }}
          >
            <LogoutIcon />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        )}
      </div>
    </aside>
  )
}
