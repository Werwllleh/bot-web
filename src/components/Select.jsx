import React, {useEffect, useRef, useState} from 'react';
import {CloseOutlined} from "@ant-design/icons";

const Select = ({name, title, data, icon, onChange, value, required}) => {

  const selectRef = useRef(null);
  const [active, setActive] = useState(false);

  const showList = () => {
    setActive(!active)
  }

  const chooseValue = (e) => {
    const chosenValue = e.target.getAttribute('data-value');
    onChange(chosenValue); // Передаем выбранное значение
    setActive(false);
  };

  const clearSelect = () => {
    onChange(''); // Сбрасываем значение
  };

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
        <input className="select__input" type="text" name={name} onChange={() => onChange(value)} value={value} required={!!required}/>
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
