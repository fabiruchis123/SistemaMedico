// ─── Paleta de colores: Sistema de Gestión Médica ────────────────────────────
// USO: import { C, STATUS } from '../theme'
// En componentes: style={{ color: C.medicalBlue }}

export const C = {
  // ── Principales ─────────────────────────────────────────────────────────────
  medicalBlue:      '#2F80ED', // Encabezados, botones primarios, links activos
  medicalBlueLight: '#BEE3F8', // Fondos de cards info, badges secundarios
  medicalGreen:     '#27AE60', // Confirmaciones, estados positivos, éxito
  white:            '#FFFFFF', // Fondo de cards, inputs, modales
  grayLight:        '#F2F4F7', // Fondo de la app, filas de tabla alternas

  // ── Alertas / Estado ────────────────────────────────────────────────────────
  alertRed:         '#EB5757', // Errores, cancelaciones, eliminar
  alertOrange:      '#F2994A', // Pendiente, recordatorios
  alertYellow:      '#F2C94C', // Advertencias preventivas
  greenLight:       '#6FCF97', // Disponibilidad, indicadores suaves

  // ── Neutros ─────────────────────────────────────────────────────────────────
  navy:             '#1F4E79', // Sidebar / drawer, navbar, fondos oscuros
  grayDark:         '#333333', // Texto principal
  grayMid:          '#828282', // Texto secundario, placeholders, íconos
  grayBorder:       '#E2E8F0', // Bordes de inputs y divisores
  graySubtle:       '#4B5563', // Texto de apoyo medio

  // ── Derivados (uso interno) ──────────────────────────────────────────────────
  navyDivider:      'rgba(255,255,255,0.10)',
  navyHover:        'rgba(255,255,255,0.06)',
  navyActive:       'rgba(47,128,237,0.25)',
  blueRing:         'rgba(47,128,237,0.15)',
  redRing:          'rgba(235,87,87,0.12)',
}

// ── Semántica de estados de cita ─────────────────────────────────────────────
export const STATUS = {
  confirmed:  { label: 'Confirmada',  color: C.medicalGreen, bg: '#ECFDF5', dot: C.medicalGreen },
  pending:    { label: 'Pendiente',   color: C.alertOrange,  bg: '#FFF7ED', dot: C.alertOrange  },
  cancelled:  { label: 'Cancelada',  color: C.alertRed,     bg: '#FEF2F2', dot: C.alertRed     },
  available:  { label: 'Disponible', color: C.greenLight,   bg: '#F0FDF4', dot: C.greenLight   },
  inProgress: { label: 'En curso',   color: C.medicalBlue,  bg: '#EFF6FF', dot: C.medicalBlue  },
  completed:  { label: 'Completada', color: C.grayMid,      bg: '#F2F4F7', dot: C.grayMid      },
}