import React, {useEffect, useState} from 'react';
import {Input, notification, Select} from "antd";
const { TextArea } = Input;
import {PlusOutlined, InfoCircleTwoTone} from "@ant-design/icons";
import MainModal from "../../MainModal/MainModal";
import {useForm} from "../../../hooks/useForm";
import {usePartnersStore, useUsersStore} from "../../../services/store";
import {addPartner, deletePartner} from "../../../api/api-partners";
import {Link} from "react-router-dom";
import {validateCoordinates, validateLinks, validatePhoneNumbers} from "../../../utils/patterns";
import button from "../../Button/Button";
import {checkObject} from "../../../utils/checkObject";

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

  const partners = usePartnersStore((state) => state.partnersListAdmin);
  const partnersCategories = usePartnersStore((state) => state.partnersCategories);
  const userData = useUsersStore((state) => state.userData);

  const updatePartnersAdmin = usePartnersStore((state) => state.updatePartnersAdmin);
  const updatePartnersCategories = usePartnersStore((state) => state.updatePartnersCategories);

  useEffect(() => {
    updatePartnersAdmin()
    updatePartnersCategories()
  }, [updatePartnersAdmin, updatePartnersCategories])


  const [selectCategories, setSelectCategories] = useState([]);
  const [partnerData, setPartnerData] = useState({});

  useEffect(() => {
    console.log(partnerData)
  }, [partnerData]);


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


    if (!selectCategories.length) {
      return showNotification('error', 'Выбери категорию партнера!')
    }

    const formCategoriesIds = selectCategories.map(category => category.id);


    let submitForm = {
      categories: formCategoriesIds,
      title: values.title.trim(),
      description: values.description.trim(),
      links: values.links,
      phones: values.phones,
      address_text: values.address_text.trim(),
      address_coordinates: values.address_coordinates,
    }



    if (typeof values.links === 'string' && values.links !== '' && values.links !== '-') {

      const links = validateLinks(values.links.split(','))

      if (links.length) {
        submitForm.links = links;
        setValues((prevValues) => ({
          ...prevValues,
          links: links,
        }));
      } else {
        submitForm.links = '';
        setValues((prevValues) => ({
          ...prevValues,
          links: '',
        }));
        return showNotification('error', 'Укажите ссылки в корректном формате!')
      }
    }

    if (typeof values.phones === 'string' && values.phones !== '' && values.phones !== '-') {

      const phones = validatePhoneNumbers(values.phones.split(','))

      if (phones.length) {
        submitForm.phones = phones;
        setValues((prevValues) => ({
          ...prevValues,
          phones: phones,
        }));
      } else {
        submitForm.phones = '';
        setValues((prevValues) => ({
          ...prevValues,
          phones: '',
        }));
        return showNotification('error', 'Укажите телефоны в правильных форматах!', 'Добавьте код города, если номер городской')
      }
    }

    if (typeof values.address_coordinates === 'string' && values.address_coordinates !== '-') {

      const coordinates = validateCoordinates(values.address_coordinates.split(','))

      if (coordinates !== null) {
        submitForm.address_coordinates = coordinates;
        setValues((prevValues) => ({
          ...prevValues,
          address_coordinates: coordinates,
        }));
      } else {
        submitForm.address_coordinates = '';
        setValues((prevValues) => ({
          ...prevValues,
          address_coordinates: '',
        }));
        return showNotification('error', 'Укажите координаты в правильном формате!', 'Например: 56.149283,47.196224')
      }

    }

    if (values.links !== '' || values.phones !== '') {
      if (submitForm.categories.length) {
        await addPartner(userData.chat_id, submitForm, partnerData.id)
          .then((res) => {
            updatePartnersAdmin();
            handleModalClose();
            showNotification('success', res.data.message)
            setTimeout(() => {
              setValues({
                title: "",
                description: "",
                links: "",
                phones: "",
                address_text: "",
                address_coordinates: "",
              })
              submitForm = {
                categories: [],
                title: "",
                description: "",
                links: "",
                phones: "",
                address_text: "",
                address_coordinates: "",
              }
            }, 300)
          })
          .catch((err) => {
            showNotification('error', err.data.message)
          })
      } else {
        return showNotification('error', 'Выбери категорию партнера!')
      }
    } else {
      showNotification('error', 'Укажите ссылки или телефоны')
    }

  }

  const deletePartnerFunc = async () => {
    if (partnerData) {
      await deletePartner(userData.chat_id, partnerData.id)
        .then(res => {
          handleModalClose();
          updatePartnersAdmin();
          showNotification('success', res.data.message)
        })
        .catch((res) => {
          showNotification('error', res.data.message)
        })
    }
  }

  const handleSelectCategories = (value) => {
    /*partnersCategories
      .filter(item => data.categories.includes(item.value))
      .map(item => item.id) // Получаем массив id из отфильтрованных объектов*/

    setSelectCategories(partnersCategories.filter(item => value.includes(item.value)))
  }

  const showModalCreate = () => {
    updatePartnersCategories()
    setModalActive(true);
  }

  const showModalAbout = (selectPartnerId) => {
    updatePartnersCategories()

    if (selectPartnerId) {
      const data = partners.filter(partner => partner.id === selectPartnerId)[0];
      setPartnerData(data);
      setSelectCategories(data.categories);

      /*setFormCategoriesIds (
        partnersCategories
          .filter(item => data.categories.includes(item.value))
          .map(item => item.id) // Получаем массив id из отфильтрованных объектов
      );*/

      setValues({
        title: data.title,
        description: data.description,
        links: data.links,
        phones: data.phones,
        address_text: data.address_text,
        address_coordinates: data.address_coordinates,
      })
    }

    setModalActive(true);
  }

  const handleModalClose = () => {
    setModalActive(false);

    if (partnerData) {
      setPartnerData({})
      setTimeout(() => {
        setSelectCategories([])
        setValues({
          title: "",
          description: "",
          links: "",
          phones: "",
          address_text: "",
          address_coordinates: "",
        })
      }, 200)
    }
  };

  return (
    <>
      {contextHolder}
      <div className="page-admin-partners">
        <div className="container">
          <h1 className="page-admin-partners__title h1t">Все партнеры</h1>
          <div className="page-admin-partners__body">
            <div className="page-admin-partners__partners partners-block">
              <button onClick={showModalCreate} className="partners-block__partner-add"><PlusOutlined /></button>
              {partners.length ? (
                <div className="partners-block__list">
                  {partners.map(partner => {
                    return (
                      <div key={partner.id} className="partners-block__partner partner-card">
                        <div className="partner-card__body">
                          <h5 className="partner-card__title">{partner.title}</h5>
                          {/*{partner.links.length && (<div className="partner-card__links">
                            <span>Ссылки:</span>
                            <ul className="partner-card__links-list">
                              {partner.links.map((link, index) => (
                                <li key={index}><Link target="_blank" to={link}
                                                      className="partner-card__link">{link}</Link></li>
                              ))}
                            </ul>
                          </div>)}
                          {partner.phones.length && (<div className="partner-card__phones">
                            <span>Телефоны:</span>
                            <ul className="partner-card__phones-list">
                              {partner.phones.map((phone, index) => (
                                <li key={index}><Link to={`tel:${phone}`} className="partner-card__phone">{phone}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>)}*/}
                          {partner.description && <p className="partner-card__description">{partner.description}</p>}
                        </div>
                        <button onClick={() => showModalAbout(partner.id)} className="partner-card__about style-btn">
                          <span className="partner-card__about-text">Подробнее</span>
                          <span className="partner-card__about-icon"><InfoCircleTwoTone/></span>
                        </button>
                      </div>
                    )
                  })}
                </div>
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
            <form className="partners__modal-form">
              <div className="partners__modal-form-fields">
                <div className="partners__modal-select select-antd">
                  <Select
                    mode="multiple"
                    placeholder="Категории партнера"
                    onChange={handleSelectCategories}
                    options={partnersCategories}
                    value={selectCategories}
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
                  <TextArea
                    required={true}
                    autoSize={true}
                    className=""
                    name="description"
                    placeholder="Описание"
                    value={values.description ?? ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="partners__modal-input">
                  <Input
                    className=""
                    name="links"
                    placeholder="Ссылки"
                    value={values.links ?? ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="partners__modal-input">
                  <Input
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
                <button type="submit" onClick={savePartner} className="partners__modal-form-submit style-btn">
                  {checkObject(partnerData) ? 'Обновить данные' : 'Сохранить партнера'}
                </button>
                {checkObject(partnerData) && <button type="button" onClick={deletePartnerFunc} className="partners__modal-form-delete style-btn">Удалить партнера</button>}
              </div>
            </form>
          </div>
        </div>
      </MainModal>
    </>
  );
};

export default AdminPartnersAll;
