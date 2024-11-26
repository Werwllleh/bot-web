import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {notification} from "antd";
import {useUsersStore} from "../../../services/store";
import {addPartnerCategory} from "../../../api/api-partners";
import MainModal from "../../MainModal/MainModal";
import {useForm} from "../../../hooks/useForm";
import {Input} from 'antd';


const AdminPartners = () => {

  const [isModalActive, setModalActive] = useState(false);
  const userData = useUsersStore((state) => state.userData);

  const [api, contextHolder] = notification.useNotification();
  const showNotification = (type, message, description) => {
    if (type === 'success') {
      api[type]({
        message: message,
        description: description
      });
    }
    if (type === 'error') {
      api[type]({
        message: message,
        description: description
      });
    }
  };

  const {pathname} = useLocation();


  const initialFormValues = {
    label: "",
    value: ""
  };

  const {values, handleChange, setValues} = useForm(initialFormValues);


  const addPartnerCategoryFunc = async (e) => {
    e.preventDefault();

    if (values.label && values.value) {
      await addPartnerCategory(userData.chat_id, {
        label: values.label,
        value: values.value
      })
      showNotification('success', 'Категория добавлена');
      setValues({
        label: "",
        value: ""
      })
      handleModalClose()
    } else {
      showNotification('error', 'Заполнены не все поля');
    }
  }

  const showModal = () => {
    setModalActive(true);
  }

  const handleModalClose = () => {
    setModalActive(false);
  };


  return (
    <>
      {contextHolder}
      <div className="page-admin-partners">
        <div className="container">
          <h1 className="page-admin-partners__title h1t">Управление партнерами</h1>
          <div className="page-admin-partners__body">
            {pathname.includes('/partners/categories') && (
              <div className="page-admin-partners__categories categories-block">
                <div className="categories-block__items"></div>
                <button onClick={showModal} className="categories-block__button style-btn">
                  Добавить категорию
                </button>
              </div>
            )}
            {pathname.includes('/partners/all') && (
              <div className="page-admin-partners__partners partners-block"></div>
            )}
          </div>
        </div>
      </div>
      <MainModal
        className="page-admin-partners__modal"
        title={pathname.includes('/partners/categories') ? 'Добавить категорию партнера' : 'Добавить партнера'}
        isOpen={isModalActive}
        onClose={handleModalClose}
      >
        <div className="partners__modal">
          <div className="partners__modal-body">
            {pathname.includes('/partners/categories') ? (
              <form onSubmit={addPartnerCategoryFunc} className="partners__modal-form">
                <div className="partners__modal-form-fields">
                  <div className="partners__modal-input">
                    <Input
                      required={true}
                      className=""
                      name="label"
                      placeholder="Название категории"
                      value={values.label ?? ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="partners__modal-input">
                    <Input
                      required={true}
                      className=""
                      name="value"
                      placeholder="Значение категории"
                      value={values.value ?? ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="partners__modal-form-footer">
                  <button className="partners__modal-form-submit style-btn">
                    Сохранить категорию
                  </button>
                </div>
              </form>
            ) : (
              <div className="partners__modal-body">

              </div>
            )}
          </div>
        </div>
      </MainModal>
    </>
  );
};

export default AdminPartners;
