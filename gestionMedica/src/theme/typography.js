// ─── Tipografía: Sistema de Gestión Médica ────────────────────────────────────
// USO: import { T } from '../theme'
// En componentes: style={{ fontFamily: T.family, fontSize: T.size.sm }}

export const T = {
  family: "'Poppins', sans-serif",

  // ── Pesos ────────────────────────────────────────────────────────────────────
  weight: {
    regular:  400, // Texto de formularios, párrafos
    medium:   500, // Botones, etiquetas
    semibold: 600, // Subtítulos, labels de campo
    bold:     700, // Títulos principales, alertas importantes
  },

  // ── Escala de tamaños ────────────────────────────────────────────────────────
  size: {
    xs:   '11px', // Badges, metadatos mínimos
    sm:   '12px', // Texto auxiliar, timestamps, tooltips
    md:   '13px', // Labels, texto secundario, texto de tabla
    base: '14px', // Párrafos, inputs, botones
    lg:   '15px', // Subtítulos de card
    xl:   '17px', // Títulos de modal
    h3:   '18px', // Encabezados de sección
    h2:   '22px', // Títulos de página (PageHeader)
    h1:   '28px', // Títulos hero / login
  },

  // ── Line heights ─────────────────────────────────────────────────────────────
  leading: {
    tight:   1.2,
    normal:  1.5,
    relaxed: 1.7,
  },
}