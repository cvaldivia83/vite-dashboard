import { InputProps } from "../../types/input";
import React from 'react';

const Input = ({ id, placeholder, classname, label, type, value, onChange, error, onBlur, ref }: InputProps) => {
  

  return (
    <div className="input-container">
      <label className={`input-label ${placeholder.length > 0 ? 'visually-hidden' : ''}`}htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder}
        className={`input ${classname}`}
        type={type}
        id={id}
        name={id}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref} 
      />
      { error && <small className="input-error">{error}</small>}
    </div>
  )
}

export default Input;