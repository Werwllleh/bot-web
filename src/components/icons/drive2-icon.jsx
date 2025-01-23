import React from 'react';
import {Link} from "react-router-dom";
import {API_BASE} from "../../utils/consts";

const Drive2Icon = ({url}) => {
  return (
    <Link to={url} target="_blank" className="drive2-icon">
      <img className="drive2-icon__image" src={`${API_BASE}/bot/icons/drive2-logo.webp`} alt="Drive 2"/>
    </Link>
  );
};

export default Drive2Icon;
