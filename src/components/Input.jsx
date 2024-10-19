import React, {useEffect, useRef, useState} from 'react';
import {CloseOutlined} from "@ant-design/icons";

const Input = ({label, icon, placeholder, name, required}) => {

  const input = useRef();
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const clearInput = () => {
    setValue('');
    input.current.focus();
  }



  return (
    <div className="input-field">
      {label ? <label className="input-field__label">{label}</label> : ''}
      <div className="input-field__field">
        {icon && <span className="input-field__icon">{icon}</span>}
        <input required={!!required} ref={input} value={value} onChange={onChange} name={name} placeholder={placeholder}
               className={`input-field__input ${icon ? 'icon' : ''} ${value.length ? 'active' : ''}`}/>
        {value.length ? <span onClick={clearInput} className="input-field__clear"><CloseOutlined/></span> : ''}
      </div>
    </div>
  );
};

export default Input;
