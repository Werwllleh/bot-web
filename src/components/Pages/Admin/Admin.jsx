import React from 'react';
import Header from "../../Header/Header";
import {Link} from "react-router-dom";
import {adminPages} from "../../../utils/consts";
import {Watermark} from "antd";

const Admin = () => {
  return (
    <div className="container">
      <div className="admin-page">
        <div className="admin-page__bg">
          <Watermark content="vagcheb"/>
        </div>
        <Header title={"Админ панель"}/>
        <div className="admin-page__body">
          <ul className="admin-page__links">
            {adminPages.map((page) => {
              return (
                <Link key={page.link} className="admin-page__link" to={page.link}>
                  <span className="admin-page__link-icon">{page.icon}</span>
                  <p className="admin-page__link-text">{page.title}</p>
                </Link>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
