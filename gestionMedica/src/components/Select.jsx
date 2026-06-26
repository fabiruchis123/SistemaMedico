/**
 * Select — Dropdown de selección
 *
 * Props:
 *   label       : string
 *   options     : Array<{ value: string, label: string }>
 *   value       : string
 *   onChange    : function
 *   placeholder : string
 *   error       : string
 *   helper      : string
 *   disabled    : boolean
 *   required    : boolean
 *
 * Uso:
 *   <Select
 *     label="Especialidad"
 *     options={[{ value: 'cardio', label: 'Cardiología' }]}
 *     value={specialty}
 *     onChange={e => setSpecialty(e.target.value)}
 *   />
 */

import { useState } from 'react'

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export default function Select({
  label,
  options      = [],
  value,
  onChange,
  placeholder  = 'Seleccionar...',
  error,
  helper,
  disabled     = false,
  required     = false,
  name,
  id,
}) {
  const [focused, setFocused] = useState(false)
  const selectId = id ?? name ?? label?.toLowerCase().replace(/\s+/g, '-')

  const borderColor = error ? '#EB5757' : focused ? '#2F80ED' : '#E2E8F0'
  const boxShadow   = focused && !error
    ? '0 0 0 3px rgba(47, 128, 237, 0.15)'
    : error
    ? '0 0 0 3px rgba(235, 87, 87, 0.12)'
    : 'none'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600, color: '#333333' }}
        >
          {label}
          {required && <span style={{ color: '#EB5757', marginLeft: '3px' }}>*</span>}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width:           '100%',
            fontFamily:      "'Poppins', sans-serif",
            fontSize:        '14px',
            fontWeight:      400,
            color:           value ? '#333333' : '#828282',
            backgroundColor: disabled ? '#F2F4F7' : '#FFFFFF',
            border:          `1.5px solid ${borderColor}`,
            borderRadius:    '8px',
            padding:         '10px 40px 10px 14px',
            outline:         'none',
            boxShadow,
            transition:      'border-color 0.2s, box-shadow 0.2s',
            cursor:          disabled ? 'not-allowed' : 'pointer',
            appearance:      'none',
            boxSizing:       'border-box',
          }}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span
          style={{
            position:      'absolute',
            right:         '12px',
            top:           '50%',
            transform:     'translateY(-50%)',
            color:         focused ? '#2F80ED' : '#828282',
            pointerEvents: 'none',
            display:       'flex',
            alignItems:    'center',
          }}
        >
          <ChevronIcon />
        </span>
      </div>

      {error  && <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#EB5757', margin: 0 }}>{error}</p>}
      {helper && !error && <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#828282', margin: 0 }}>{helper}</p>}
    </div>
  )
}
