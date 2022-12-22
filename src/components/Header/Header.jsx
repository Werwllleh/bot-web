import React from "react";
import s from "./Header.module.css";

const Header = ({ title }) => {
  return <h1 className={s.title}>{title}</h1>;
};

export default Header;
