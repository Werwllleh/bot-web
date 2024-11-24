import React from 'react';
import {adminPages} from "../../../utils/consts";
import {Link} from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="page-admin-panel">
      <div className="container">
        <h1 className="page-admin-panel__title h1t">Админ панель</h1>
        <ul className="page-admin-panel__list">
          {adminPages.map((page, index) => {
            if (index !== 0) {
              return (
                <li key={index} className="page-admin-panel__item">
                  <Link className="page-admin-panel__link" to={page.url}>{page.title}</Link>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
