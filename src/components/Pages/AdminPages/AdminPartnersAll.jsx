import React, {useEffect, useState} from 'react';
import {Input, notification, Select} from "antd";
const { TextArea } = Input;
import {PlusOutlined} from "@ant-design/icons";
import MainModal from "../../MainModal/MainModal";
import {useForm} from "../../../hooks/useForm";
import {usePartnersStore, useUsersStore} from "../../../services/store";
import {addPartner} from "../../../api/api-partners";
import {Link} from "react-router-dom";

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

  const partners = usePartnersStore((state) => state.partnersList);
  const partnersCategories = usePartnersStore((state) => state.partnersCategories);
  const userData = useUsersStore((state) => state.userData);

  const updatePartners = usePartnersStore((state) => state.updatePartners);
  const updatePartnersCategories = usePartnersStore((state) => state.updatePartnersCategories);

  useEffect(() => {
    updatePartners()
    updatePartnersCategories()
  }, [updatePartners, updatePartnersCategories])

  useEffect(() => {
    console.log(partners)
  }, [partners])

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

    const categoriesId = partnersCategories
      .filter(item => formCategories.includes(item.value)) // Оставляем только те объекты, value которых есть в arr2
      .map(item => item.id); // Получаем массив id из отфильтрованных объектов

    const submitForm = {
      categories: categoriesId,
      title: values.title,
      description: values.description,
      links: values.links.split(','),
      phones: values.phones.split(','),
      address_text: values.address_text,
      address_coordinates: values.address_coordinates.split(','),
    }

    await addPartner(userData.chat_id, submitForm)
      .then(() => {
        handleModalClose();
        updatePartners();
        showNotification('success', 'Партнер добавлен')
        setTimeout(() => {
          setFormCategories([])
          setValues({
            title: "",
            description: "",
            links: "",
            phones: "",
            address_text: "",
            address_coordinates: "",
          })
        }, 300)
      })
      .catch(() => {
        showNotification('error', 'Ошибка при добавлении партнера!')
      })

    console.log(submitForm)
  }

  const handleSelectCategories = (value) => {
    setFormCategories([...value])
  }

  const showModal = () => {
    updatePartnersCategories()
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
              {partners.length ? (
                <ul className="partners-block__list">
                  {partners.map(partner => {
                    return (
                      <div key={partner.id} className="partners-block__partner partner-card">
                        <div className="partner-card__body">
                          <h5 className="partner-card__title">{partner.title}</h5>
                          {partner.links.length && (<div className="partner-card__links">
                            <span>Ссылки:</span>
                            <ul className="partner-card__links-list">
                              {partner.links.map((link, index) => (
                                <li><Link key={index} target="_blank" to={link} className="partner-card__link" >{link}</Link></li>
                              ))}
                            </ul>
                          </div>)}
                          {partner.phones.length && (<div className="partner-card__phones">
                            <span>Телефоны:</span>
                            <ul className="partner-card__phones-list">
                              {partner.phones.map((link, index) => (
                                <li><Link key={index} to={`tel:${link}`} className="partner-card__phone">{link}</Link></li>
                              ))}
                            </ul>
                          </div>)}
                          {partner.description && <p className="partner-card__description">{partner.description}</p>}
                        </div>
                      </div>
                    )
                  })}
                </ul>
              ) : (
                <div className="partners-block__notfound">Партнеров еще нет</div>
              )}
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
                    value={formCategories}
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
