// src/layouts/MainLayout.jsx
// ─── Layout principal: Topbar con hamburguesa + Drawer lateral ────────────────
//
// Uso:
//   <MainLayout>
//     <PantallaCitas />
//   </MainLayout>
//
// El drawer se muestra como overlay en mobile y sidebar fijo en desktop.

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { C, T, ICONS } from '../theme'
import { useAuth } from '../context/AuthContext'
import Avatar from '../components/Avatar'

// ─── Items de navegación por rol ─────────────────────────────────────────────
const NAV_ITEMS = {
  admin: [
    { id: 'home',      label: 'Inicio',     icon: <ICONS.home />,        path: '/home' },
    { id: 'medicos',   label: 'Médicos',    icon: <ICONS.stethoscope />, path: '/medicos' },
    { id: 'pacientes', label: 'Pacientes',  icon: <ICONS.users />,       path: '/pacientes' },
    { id: 'citas',     label: 'Citas',      icon: <ICONS.calendar />,    path: '/citas' },
    { id: 'settings',  label: 'Ajustes',   icon: <ICONS.settings />,    path: '/ajustes' },
  ],
  doctor: [
    { id: 'home',      label: 'Inicio',     icon: <ICONS.home />,        path: '/home' },
    { id: 'pacientes', label: 'Pacientes',  icon: <ICONS.users />,       path: '/pacientes' },
    { id: 'citas',     label: 'Citas',      icon: <ICONS.calendar />,    path: '/citas' },
  ],
  secretario: [
    { id: 'home',    label: 'Inicio',  icon: <ICONS.home />,     path: '/home' },
    { id: 'citas',   label: 'Citas',   icon: <ICONS.calendar />, path: '/citas' },
    { id: 'medicos', label: 'Médicos', icon: <ICONS.stethoscope />, path: '/medicos' },
  ],
}

// ─── Sidebar / Drawer ─────────────────────────────────────────────────────────
function Drawer({ open, onClose, items, activeId, onSelect, user, onLogout }) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          200,
            backgroundColor: 'rgba(31,78,121,0.35)',
            backdropFilter:  'blur(2px)',
          }}
        />
      )}

      {/* Panel */}
      <aside
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          height:          '100vh',
          width:           '260px',
          zIndex:          201,
          backgroundColor: C.navy,
          display:         'flex',
          flexDirection:   'column',
          fontFamily:      T.family,
          transform:       open ? 'translateX(0)' : 'translateX(-100%)',
          transition:      'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          boxShadow:       open ? '4px 0 24px rgba(0,0,0,0.18)' : 'none',
        }}
      >
        {/* Header del drawer */}
        <div
          style={{
            padding:      '20px 20px 18px',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${C.navyDivider}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width:           '34px',
                height:          '34px',
                borderRadius:    '8px',
                backgroundColor: C.medicalBlue,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                flexShrink:      0,
              }}
            >
              <ICONS.heartPulse color={C.white} size={18} />
            </div>
            <span
              style={{
                fontSize:   T.size.lg,
                fontWeight: T.weight.bold,
                color:      C.white,
              }}
            >
              MediGestión
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            style={{
              background:   'none',
              border:       'none',
              cursor:       'pointer',
              color:        'rgba(255,255,255,0.6)',
              display:      'flex',
              alignItems:   'center',
              padding:      '4px',
              borderRadius: '6px',
            }}
          >
            <ICONS.close />
          </button>
        </div>

        {/* Navegación */}
        <nav
          style={{
            flex:      1,
            padding:   '12px 10px',
            display:   'flex',
            flexDirection: 'column',
            gap:       '2px',
            overflowY: 'auto',
          }}
        >
          {items.map(item => {
            const isActive = item.id === activeId
            return (
              <button
                key={item.id}
                onClick={() => { onSelect(item.id, item.path); onClose() }}
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  gap:             '12px',
                  padding:         '11px 14px',
                  borderRadius:    '8px',
                  border:          'none',
                  cursor:          'pointer',
                  backgroundColor: isActive ? C.navyActive : 'transparent',
                  color:           isActive ? C.white : 'rgba(255,255,255,0.65)',
                  fontFamily:      T.family,
                  fontSize:        T.size.base,
                  fontWeight:      isActive ? T.weight.semibold : T.weight.regular,
                  transition:      'all 0.15s ease',
                  borderLeft:      isActive ? `3px solid ${C.medicalBlue}` : '3px solid transparent',
                  width:           '100%',
                  textAlign:       'left',
                }}
              >
                <span style={{ flexShrink: 0, display: 'flex' }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge > 0 && (
                  <span
                    style={{
                      minWidth:        '20px',
                      height:          '20px',
                      borderRadius:    '999px',
                      backgroundColor: C.alertRed,
                      color:           C.white,
                      fontSize:        T.size.xs,
                      fontWeight:      T.weight.bold,
                      display:         'flex',
                      alignItems:      'center',
                      justifyContent:  'center',
                      padding:         '0 5px',
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
        <div
          style={{
            padding:   '12px 10px',
            borderTop: `1px solid ${C.navyDivider}`,
          }}
        >
          {user && (
            <div
              style={{
                display:         'flex',
                alignItems:      'center',
                gap:             '10px',
                padding:         '10px',
                borderRadius:    '8px',
                backgroundColor: C.navyHover,
                marginBottom:    '6px',
              }}
            >
              <Avatar name={user.nombre ?? user.name} size="sm" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin:        0,
                    fontSize:      T.size.sm,
                    fontWeight:    T.weight.semibold,
                    color:         C.white,
                    overflow:      'hidden',
                    textOverflow:  'ellipsis',
                    whiteSpace:    'nowrap',
                  }}
                >
                  {user.nombre ?? user.name}
                </p>
                <p
                  style={{
                    margin:   0,
                    fontSize: T.size.xs,
                    color:    'rgba(255,255,255,0.55)',
                  }}
                >
                  {user.role === 'admin' ? 'Administrador' : user.role === 'doctor' ? 'Médico' : 'Secretario'}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={onLogout}
            style={{
              display:         'flex',
              alignItems:      'center',
              gap:             '10px',
              padding:         '10px 14px',
              width:           '100%',
              border:          'none',
              borderRadius:    '8px',
              backgroundColor: 'transparent',
              color:           'rgba(255,255,255,0.5)',
              fontFamily:      T.family,
              fontSize:        T.size.base,
              cursor:          'pointer',
              transition:      'all 0.15s',
              textAlign:       'left',
            }}
          >
            <ICONS.logout />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ onMenuOpen, pageTitle }) {
  return (
    <header
      style={{
        height:          '60px',
        backgroundColor: C.white,
        borderBottom:    `1px solid ${C.grayBorder}`,
        display:         'flex',
        alignItems:      'center',
        padding:         '0 24px',
        gap:             '16px',
        position:        'sticky',
        top:             0,
        zIndex:          100,
        fontFamily:      T.family,
      }}
    >
      {/* Hamburguesa */}
      <button
        onClick={onMenuOpen}
        aria-label="Abrir menú"
        style={{
          background:   'none',
          border:       'none',
          cursor:       'pointer',
          color:        C.grayDark,
          display:      'flex',
          alignItems:   'center',
          padding:      '6px',
          borderRadius: '8px',
          flexShrink:   0,
          transition:   'background 0.15s',
        }}
      >
        <ICONS.menu />
      </button>

      <h1
        style={{
          margin:     0,
          fontSize:   T.size.lg,
          fontWeight: T.weight.semibold,
          color:      C.grayDark,
          flex:       1,
        }}
      >
        {pageTitle}
      </h1>
    </header>
  )
}

// ─── MainLayout ───────────────────────────────────────────────────────────────
export default function MainLayout({ children, pageTitle = '' }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user, role, logout }      = useAuth()
  const navigate                    = useNavigate()
  const location                    = useLocation()

  const items    = NAV_ITEMS[role] ?? NAV_ITEMS.secretario
  const activeId = items.find(i => location.pathname.startsWith(i.path))?.id ?? ''

  const handleSelect = (_id, path) => navigate(path)
  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: C.grayLight }}>
      <Topbar onMenuOpen={() => setDrawerOpen(true)} pageTitle={pageTitle} />

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={items}
        activeId={activeId}
        onSelect={handleSelect}
        user={user}
        onLogout={handleLogout}
      />

      <main style={{ flex: 1, padding: '24px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}
