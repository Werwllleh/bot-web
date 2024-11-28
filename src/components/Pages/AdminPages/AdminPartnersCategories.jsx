import React, {useRef, useState} from 'react';
import MainModal from "../../MainModal/MainModal";
import {Input, notification} from "antd";
import {useForm} from "../../../hooks/useForm";
import {DeleteOutlined} from "@ant-design/icons";
import {addPartnerCategory, deletePartnerCategory} from "../../../api/api-partners";
import {usePartnersStore, useUsersStore} from "../../../services/store";

const AdminPartnersCategories = () => {

  const userData = useUsersStore((state) => state.userData);
  const partners = usePartnersStore((state) => state.partnersList);
  const partnersCategories = usePartnersStore((state) => state.partnersCategories);

  const updatePartnersCategories = usePartnersStore((state) => state.updatePartnersCategories);

  const partnerCategoryInput = useRef();
  const [isModalActive, setModalActive] = useState(false);

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

  const initialFormValues = {
    value: "",
  };

  const {values, handleChange, setValues} = useForm(initialFormValues);


  const addPartnerCategoryFunc = async (e) => {
    e.preventDefault();

    if (values.value) {
      await addPartnerCategory(userData.chat_id, {
        value: values.value,
      })
      showNotification('success', 'Категория добавлена');
      setValues({
        value: "",
      })
      updatePartnersCategories();
      handleModalClose();
    } else {
      showNotification('error', 'Заполнены не все поля');
    }
  }

  const deleteCategory = async (categoryId) => {
    await deletePartnerCategory(userData.chat_id, categoryId)
      .then(() => {
        showNotification('success', 'Категория удалена');
        updatePartnersCategories();
      })
      .catch(() => {
        showNotification('error', 'Ошибка удаления категории');
        updatePartnersCategories();
      })
  }

  const showModal = () => {
    setModalActive(true);
    if (partnerCategoryInput.current) {
      setTimeout(() => {
        partnerCategoryInput.current.focus()
      }, 100)

    }
  }

  const handleModalClose = () => {
    setModalActive(false);
    setValues({
      value: "",
    })
  };

  return (
    <>
      {contextHolder}
      <div className="page-admin-partners">
        <div className="container">
          <h1 className="page-admin-partners__title h1t">Категории партнеров</h1>
          <div className="page-admin-partners__body">
            <div className="page-admin-partners__categories categories-block">
              {partnersCategories.length > 0 ? (
                <div className="categories-block__tags">
                  {partnersCategories.map((tag) => (
                    <div key={tag.id} className="categories-block__tag" data-value={tag.value}>
                      <p className="categories-block__tag-label">{tag.label}</p>
                      <span onClick={() => deleteCategory(tag.id)} className="categories-block__tag-icon">
                        <DeleteOutlined/>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="categories-block__not-found">Добавьте категории партнеров</div>
              )}
              <button onClick={showModal} className="categories-block__button style-btn">
                Добавить категорию
              </button>
            </div>
          </div>
        </div>
      </div>
      <MainModal
        className="page-admin-partners__modal"
        title="Добавить категорию партнера"
        isOpen={isModalActive}
        onClose={handleModalClose}
      >
        <div className="partners__modal">
          <div className="partners__modal-body">
            <form onSubmit={addPartnerCategoryFunc} className="partners__modal-form">
              <div className="partners__modal-form-fields">
                <div className="partners__modal-input">
                  <Input
                    ref={partnerCategoryInput}
                    required={true}
                    className=""
                    name="value"
                    placeholder="Название категории"
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
          </div>
        </div>
      </MainModal>
    </>
  );
};

export default AdminPartnersCategories;
