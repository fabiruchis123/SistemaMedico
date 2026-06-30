// src/theme/icon.js
// ─── Íconos del sistema — powered by lucide-react ────────────────────────────
//
// INSTALACIÓN (una sola vez):
//   npm install lucide-react
//
// USO en componentes:
//   import { ICONS } from '../theme'
//   <ICONS.home />
//   <ICONS.home size={20} color="#2F80ED" />
//   <ICONS.home size={20} style={{ marginRight: 8 }} />
//
// Todos los íconos aceptan las mismas props de lucide:
//   size        (número, default 18)
//   color       (string, hereda currentColor del padre)
//   strokeWidth (número, default 2)
//   style       (objeto CSS)
//   className   (string)

import {
  // ── Navegación
  Home, Menu, X, ChevronLeft, ChevronDown, ChevronRight,

  // ── Módulos
  CalendarDays, Users, User, Stethoscope, ClipboardList, Settings,

  // ── Acciones
  Eye, Pencil, Trash2, Plus, Search, Filter, LogOut, RefreshCw, Download, Upload,

  // ── Estado / Feedback
  CheckCircle2, AlertCircle, XCircle, AlertTriangle, Info,

  // ── Médico / Clínica
  Clock, Phone, Mail, HeartPulse, Syringe, Activity, FileText, Lock, Unlock,
} from 'lucide-react'

// ─── Defaults del sistema ─────────────────────────────────────────────────────
const D = { size: 18, strokeWidth: 2 }

// Helper: envuelve un componente lucide con los defaults del sistema
const wrap = (Icon) => (props = {}) => (
  <Icon
    size={props.size ?? D.size}
    strokeWidth={props.strokeWidth ?? D.strokeWidth}
    color={props.color}
    style={props.style}
    className={props.className}
    aria-hidden="true"
  />
)

export const ICONS = {
  // ── Navegación
  home:         wrap(Home),
  menu:         wrap(Menu),
  close:        wrap(X),
  back:         wrap(ChevronLeft),
  chevronDown:  wrap(ChevronDown),
  chevronRight: wrap(ChevronRight),

  // ── Módulos
  calendar:     wrap(CalendarDays),
  users:        wrap(Users),
  user:         wrap(User),
  stethoscope:  wrap(Stethoscope),
  clipboard:    wrap(ClipboardList),
  settings:     wrap(Settings),

  // ── Acciones
  eye:          wrap(Eye),
  edit:         wrap(Pencil),
  trash:        wrap(Trash2),
  plus:         wrap(Plus),
  search:       wrap(Search),
  filter:       wrap(Filter),
  logout:       wrap(LogOut),
  refresh:      wrap(RefreshCw),
  download:     wrap(Download),
  upload:       wrap(Upload),

  // ── Estado / Feedback
  checkCircle:  wrap(CheckCircle2),
  alertCircle:  wrap(AlertCircle),
  xCircle:      wrap(XCircle),
  triangle:     wrap(AlertTriangle),
  info:         wrap(Info),

  // ── Médico / Clínica
  clock:        wrap(Clock),
  phone:        wrap(Phone),
  mail:         wrap(Mail),
  heartPulse:   wrap(HeartPulse),
  syringe:      wrap(Syringe),
  activity:     wrap(Activity),
  fileText:     wrap(FileText),
  lock:         wrap(Lock),
  unlock:       wrap(Unlock),
}