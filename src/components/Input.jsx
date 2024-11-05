import React, {useEffect, useRef, useState} from 'react';
import {CloseOutlined} from "@ant-design/icons";

const Input = ({label, icon, placeholder, name, type, required, pattern}) => {

  const input = useRef();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (value === '') {
      setError(false)
    }
  }, [value, error]);

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const clearInput = () => {
    setValue('');
    setError(false);
    input.current.focus();
  }

  const validateField = () => {
    if (pattern) {
      if (name.includes('car-number')) {
        if (pattern.test(value.toUpperCase())) {
          setError(false)
        } else {
          setError(true)
        }
      }
    }
    if (name.includes('name')) {
      if (value.length > 1) {
        setError(false)
      } else {
        setError(true)
      }
    }
    if (name.includes('car-year')) {
      const currentYear = new Date().getFullYear();
      if (Number(value) >= 1800 && Number(value) <= currentYear) {
        setError(false)
      } else {
        setError(true)
      }
    }
  }

  useEffect(() => {
    validateField();
  }, [value]);


  return (
    <div className="input-field">
      {label ? <label className="input-field__label">{label}</label> : ''}
      <div className="input-field__field">
        {icon && <span className="input-field__icon">{icon}</span>}
        <input
          required={!!required}
          ref={input}
          inputMode={name.includes('car-year') ? "numeric" : "text"}
          type={type !== '' ? type : 'text'}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          className={`input-field__input ${value.length && error ? 'error' : ''} ${icon ? 'icon' : ''} ${value.length && !error ? 'active' : ''}`}
        />
        {value.length ? <span onClick={clearInput} className="input-field__clear"><CloseOutlined/></span> : ''}
      </div>
    </div>
  );
};

export default Input;
