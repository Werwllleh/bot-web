import React, {useEffect, useRef, useState} from 'react';
import {CloseOutlined} from "@ant-design/icons";
import {getCarInfo} from "../api/api-cars";

const Input = ({label, icon, placeholder, name, type, required, pattern, helpMsg, data}) => {

  const input = useRef();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(null);

  useEffect(() => {
    if (value === '') {
      setError(false)
    }
  }, [value, error]);

  const onChange = (e) => {
    setValue(e.target.value)
    if (data) {
      data(e.target.value)
    }
  }

  const onFocus = (e) => {
    setFocused(true)
  }

  const onBlur = (e) => {
    setFocused(false)
  }


  const clearInput = () => {
    setValue('');
    setError(false);
    setErrorText(null);
    if (data) { data('')}
    input.current.focus();
  }

  const validateField = () => {
    if (pattern) {
      if (name.includes('car_number')) {
        if (pattern.test(value.toUpperCase()) && !value.includes('000')) {
          setError(false)
        } else {
          setError(true)
        }
      }
      if (name.includes('name')) {
        if (pattern.test(value)) {
          setError(false)
        } else {
          setError(true)
        }
      }
    }
    if (name.includes('car_year')) {
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
          inputMode={name.includes('car_year') ? "numeric" : "text"}
          type={type !== '' ? type : 'text'}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          className={`input-field__input ${value.length && error ? 'error' : ''} ${icon ? 'icon' : ''} ${value.length && !error ? 'active' : ''}`}
        />
        {value.length ? <span onClick={clearInput} className="input-field__clear"><CloseOutlined/></span> : ''}
      </div>
      {helpMsg && <span className={`input-field__help ${(focused || error) && 'show'}`}>{helpMsg}</span>}
      {errorText && <div className="input-field__error-message">{errorText}</div>}
    </div>
  );
};

export default Input;
