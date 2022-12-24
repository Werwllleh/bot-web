import React from "react";
import s from "./Button.module.css";

const Button = (props) => {
  return <button {...props} className={props.className}>{ props.title }</button>;
};

export default Button;
