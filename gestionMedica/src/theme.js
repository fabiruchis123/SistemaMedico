// ─── Paleta de colores: Plataforma de Telemedicina y Citas Médicas ───────────

export const colors = {
  // Colores principales
  medicalBlue:      '#2F80ED', // Encabezados, botones principales, elementos destacados
  medicalBlueLight: '#BEE3F8', // Fondos, tarjetas informativas, áreas secundarias
  medicalGreen:     '#27AE60', // Confirmaciones, citas aprobadas, estados positivos
  white:            '#FFFFFF', // Fondo principal y espacios de trabajo
  grayLight:        '#F2F4F7', // Formularios, paneles, secciones de contenido

  // Colores de alerta / estado
  alertRed:         '#EB5757', // Errores, cancelaciones, advertencias críticas
  alertOrange:      '#F2994A', // Recordatorios y acciones pendientes
  alertYellow:      '#F2C94C', // Notificaciones importantes, alertas preventivas

  // Colores de apoyo
  navy:             '#1F4E79', // Menús laterales y barras de navegación
  grayMid:          '#828282', // Texto secundario y etiquetas
  grayDark:         '#333333', // Texto principal
  greenLight:       '#6FCF97', // Indicadores de disponibilidad de horarios
}

// ─── Tipografía: Poppins ──────────────────────────────────────────────────────

export const typography = {
  fontFamily: "'Poppins', sans-serif",
  weights: {
    regular:   400, // Formularios, instrucciones, texto secundario
    medium:    500, // Botones
    semibold:  600, // Subtítulos
    bold:      700, // Títulos principales, alertas importantes
  },
}

// ─── Estados de cita ──────────────────────────────────────────────────────────

export const appointmentStatus = {
  confirmed:  { label: 'Confirmada',  color: colors.medicalGreen, bg: '#ECFDF5' },
  pending:    { label: 'Pendiente',   color: colors.alertOrange,  bg: '#FFF7ED' },
  cancelled:  { label: 'Cancelada',  color: colors.alertRed,     bg: '#FEF2F2' },
  available:  { label: 'Disponible', color: colors.greenLight,   bg: '#F0FDF4' },
  inProgress: { label: 'En curso',   color: colors.medicalBlue,  bg: '#EFF6FF' },
}
