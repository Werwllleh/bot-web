import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {usePartnersStore, useUsersStore} from "../../../services/store";
import {route} from "../../../utils/consts";


const AdminPartners = () => {


  const [partnersPages, setPartnersPages] = useState(
    [{
      url: '/categories',
      title: 'Категории партнеров'
    },
      {
        url: '/all',
        title: 'Партнеры клуба'
      }
    ]);


  return (
    <>
      <div className="page-admin-partners">
        <div className="container">
          <h1 className="page-admin-partners__title h1t">Управление партнерами</h1>
          <div className="page-admin-partners__body">
            <ul className="page-admin-panel__list page-admin-partners__list">
              {partnersPages.map((page, index) => {
                return (
                  <li key={index} className="page-admin-panel__item">
                    <Link className="page-admin-panel__link"
                          to={route.ADMIN_PARTNERS.url + page.url}>{page.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPartners;
