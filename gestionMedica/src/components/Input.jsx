/**
 * Input — Campo de texto
 *
 * Props:
 *   label       : string
 *   placeholder : string
 *   value       : string
 *   onChange    : function
 *   type        : 'text' | 'email' | 'password' | 'date' | 'time' | 'number'
 *   error       : string  (mensaje de error)
 *   helper      : string  (texto de ayuda)
 *   icon        : ReactNode (ícono izquierdo)
 *   disabled    : boolean
 *   required    : boolean
 *
 * Uso:
 *   <Input label="Nombre del paciente" placeholder="Ej: Juan Pérez" value={name} onChange={e => setName(e.target.value)} />
 *   <Input label="Fecha" type="date" error="Este campo es requerido" />
 */

import { useState } from 'react'

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type       = 'text',
  error,
  helper,
  icon,
  disabled   = false,
  required   = false,
  name,
  id,
}) {
  const [focused, setFocused] = useState(false)
  const inputId = id ?? name ?? label?.toLowerCase().replace(/\s+/g, '-')

  const borderColor = error
    ? '#EB5757'
    : focused
    ? '#2F80ED'
    : '#E2E8F0'

  const boxShadow = focused && !error
    ? '0 0 0 3px rgba(47, 128, 237, 0.15)'
    : error
    ? '0 0 0 3px rgba(235, 87, 87, 0.12)'
    : 'none'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize:   '13px',
            fontWeight: 600,
            color:      '#333333',
          }}
        >
          {label}
          {required && <span style={{ color: '#EB5757', marginLeft: '3px' }}>*</span>}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <span
            style={{
              position:    'absolute',
              left:        '12px',
              color:       focused ? '#2F80ED' : '#828282',
              display:     'flex',
              alignItems:  'center',
              pointerEvents: 'none',
              transition:  'color 0.2s',
            }}
          >
            {icon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width:           '100%',
            fontFamily:      "'Poppins', sans-serif",
            fontSize:        '14px',
            fontWeight:      400,
            color:           '#333333',
            backgroundColor: disabled ? '#F2F4F7' : '#FFFFFF',
            border:          `1.5px solid ${borderColor}`,
            borderRadius:    '8px',
            padding:         icon ? '10px 14px 10px 40px' : '10px 14px',
            outline:         'none',
            boxShadow,
            transition:      'border-color 0.2s, box-shadow 0.2s',
            cursor:          disabled ? 'not-allowed' : 'text',
            boxSizing:       'border-box',
          }}
        />
      </div>

      {error && (
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#EB5757', margin: 0 }}>
          {error}
        </p>
      )}
      {helper && !error && (
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#828282', margin: 0 }}>
          {helper}
        </p>
      )}
    </div>
  )
}
