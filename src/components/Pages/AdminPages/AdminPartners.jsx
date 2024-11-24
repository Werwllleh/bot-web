import React from 'react';
import {useUsersStore} from "../../../services/store";
import {addPartnerCategory} from "../../../api/api-partners";

const AdminPartners = () => {

  const userData = useUsersStore((state) => state.userData);

  const addPartnerCategoryFunc = async () => {
    console.log('Добавляем категорию');
    await addPartnerCategory(userData.chat_id, {
      label: 'cat2',
      value: 'cat2'
    })
  }

  return (
    <div className="page-admin-partners">
      <div className="container">
        <h1 className="page-admin-partners__title h1t">Управление партнерами</h1>
        <div className="page-admin-partners__body">
          <div className="page-admin-partners__categories categories-block">
            <div className="categories-block__items"></div>
            <button onClick={addPartnerCategoryFunc} className="categories-block__button style-btn">Добавить категорию</button>
          </div>
          <div className="page-admin-partners__partners partners-block"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminPartners;
