import React, {useState} from 'react';
import {Input, notification, Select} from "antd";
const { TextArea } = Input;
import {PlusOutlined} from "@ant-design/icons";
import MainModal from "../../MainModal/MainModal";
import {useForm} from "../../../hooks/useForm";
import {usePartnersStore, useUsersStore} from "../../../services/store";
import {addPartner} from "../../../api/api-partners";

const AdminPartnersAll = () => {

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

  const partnersCategories = usePartnersStore((state) => state.partnersCategories);
  const userData = useUsersStore((state) => state.userData);


  const [formCategories, setFormCategories] = useState([])

  const initialFormValues = {
    title: "",
    description: "",
    links: "",
    phones: "",
    address_text: "",
    address_coordinates: "",
  };

  const {values, handleChange, setValues} = useForm(initialFormValues);

  const savePartner = async (e) => {
    e.preventDefault();

    if (!formCategories.length) {
      return showNotification('error', 'Выбери категорию партнера!')
    }

    const submitForm = {
      categories: formCategories,
      title: values.title,
      description: values.description,
      links: values.links.split(','),
      phones: values.phones.split(','),
      address_text: values.address_text,
      address_coordinates: values.address_coordinates.split(','),
    }

    await addPartner(userData.chat_id, submitForm)
      .then(() => {
        showNotification('success', 'Партнер добавлен')
      })
      .catch(() => {
        showNotification('error', 'Ошибка при добавлении партнера!')
      })

    console.log(submitForm)
  }

  const handleSelectCategories = (value) => {
    console.log(value)
    setFormCategories([...value])
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
          <h1 className="page-admin-partners__title h1t">Все партнеры</h1>
          <div className="page-admin-partners__body">
            <div className="page-admin-partners__partners partners-block">
              <button onClick={showModal} className="partners-block__partner-add"><PlusOutlined /></button>
            </div>
          </div>
        </div>
      </div>
      <MainModal
        className="page-admin-partners__modal"
        title="Добавить партнера"
        isOpen={isModalActive}
        onClose={handleModalClose}
      >
        <div className="partners__modal">
          <div className="partners__modal-body">
            <form onSubmit={savePartner} className="partners__modal-form">
              <div className="partners__modal-form-fields">
                <div className="partners__modal-select select-antd">
                  <Select
                    mode="multiple"
                    placeholder="Категории партнера"
                    onChange={handleSelectCategories}
                    options={partnersCategories}
                    optionFilterProp="label"
                    maxTagCount="responsive"
                  />
                </div>
                <div className="partners__modal-input">
                  <Input
                    required={true}
                    className=""
                    name="title"
                    placeholder="Название партнера"
                    value={values.title ?? ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="partners__modal-input">
                  <Input
                    required={true}
                    className=""
                    name="description"
                    placeholder="Описание"
                    value={values.description ?? ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="partners__modal-input">
                  <Input
                    required={true}
                    className=""
                    name="links"
                    placeholder="Ссылки"
                    value={values.links ?? ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="partners__modal-input">
                  <Input
                    required={true}
                    className=""
                    name="phones"
                    placeholder="Телефоны"
                    value={values.phones ?? ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="partners__modal-input">
                  <TextArea
                    required={true}
                    autoSize={true}
                    className=""
                    name="address_text"
                    placeholder="Текст адреса"
                    value={values.address_text ?? ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="partners__modal-input">
                  <Input
                    required={true}
                    className=""
                    name="address_coordinates"
                    placeholder="Координаты адреса"
                    value={values.address_coordinates ?? ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="partners__modal-form-note">
                Множественные поля, такие как: ссылки, телефоны и координаты адреса указываются через запятую!
              </div>
              <div className="partners__modal-form-footer">
                <button className="partners__modal-form-submit style-btn">
                  Сохранить партнера
                </button>
              </div>
            </form>
          </div>
        </div>
      </MainModal>
    </>
  );
};

export default AdminPartnersAll;