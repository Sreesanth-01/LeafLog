import React from 'react'

const Input = ({label, name, type="text", value, onChange, placeholder}) => {
  return (
    <div>
      <label>{label}</label>
      <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}></input>
    </div>
  )
}

export default Input;
