import React from 'react';
import MainLogo from "./MainLogo";
import {route} from "../utils/consts";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__body">
        <div className="footer__logo">
          <Link to={route.CARS.url}><MainLogo/></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
