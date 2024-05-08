import React from 'react';

const MenuBurgerButton = ({onClick, active}) => {


  return (
    <div onClick={onClick} className={`menu-burger-button ${active ? 'open' : ''}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default MenuBurgerButton;