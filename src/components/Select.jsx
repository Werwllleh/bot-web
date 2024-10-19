import React, {useEffect, useRef, useState} from 'react';
import {CloseOutlined} from "@ant-design/icons";

const Select = ({name, title, data, icon, onChange}) => {

  const selectRef = useRef(null);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');

  const showList = () => {
    setActive(!active)
  }

  const chooseValue = (e) => {
    const chosenValue = e.target.getAttribute('data-value');
    setValue(chosenValue)
    setActive(false)

    if (onChange) {
      onChange(chosenValue);
    }
  }

  const clearSelect = () => {
    setValue('');
    if (onChange) {
      onChange('');
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`select ${active ? 'shown' : ''}`}>
      <div className="select__body">
        <input className="select__input" type="hidden" name={name} value={value}/>
        <div className={`select__header ${icon ? 'icon' : ''} ${value.length ? 'chosen' : ''}`}>
          {icon && <div className="select__icon">{icon}</div>}
          <div onClick={showList} className="select__title">{value.length ? value : title}</div>
          {value.length ? <span onClick={clearSelect} className="select__clear"><CloseOutlined/></span> : ''}
        </div>
        <div className="select__content">
          <ul className="select__list">
            {data.length && data.map(item => {
              return (
                <li onClick={chooseValue} key={item} data-value={item} className="select__list-item">{item}</li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
