import React, {useEffect, useState} from "react";
import {Input, Select} from "antd";
import {CloseOutlined, InfoCircleTwoTone} from "@ant-design/icons";
import {usePartnersStore} from "../../services/store";
import button from "../Button/Button";


const Partners = () => {

  const [searchInput, setSearchInput] = useState("");
  const [searchCategories, setSearchCategories] = useState([]);

  const partners = usePartnersStore((state) => state.partnersListUsers);
  const partnersCategories = usePartnersStore((state) => state.partnersCategories);

  const updatePartnersUsers = usePartnersStore((state) => state.updatePartnersUsers);
  const updatePartnersCategories = usePartnersStore((state) => state.updatePartnersCategories);

  useEffect(() => {
    updatePartnersUsers();
    updatePartnersCategories();
  }, [updatePartnersUsers, updatePartnersCategories]);

  useEffect(() => {
    console.log(partners)
  }, [partners]);

  const handleChange = (value) => {
    setSearchCategories([...value])
  };

  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  }

  const handleClearSearchInput = () => {
    setSearchInput('');
  }

  useEffect(() => {
    console.log(searchInput)
    console.log(searchCategories)
  }, [searchInput, searchCategories]);

  return (
    <div className="page-partners">
      <div className="container">
        <h1 className="page-partners__title h1t">Партнеры клуба</h1>
        <div className="page-partners__body">
          <div className="page-partners__filters">
            <div className="page-partners__filter input-antd">
              <Input placeholder="Поиск по названию" value={searchInput} onChange={handleChangeSearchInput} />
              {searchInput !== '' && <button onClick={handleClearSearchInput} className="input-antd__clear"><CloseOutlined/></button>}
            </div>
            <div className="page-partners__filter select-antd">
              <Select
                mode="multiple"
                placeholder="Выбери категории"
                onChange={handleChange}
                options={partnersCategories}
                optionFilterProp="label"
                maxTagCount="responsive"
              />
            </div>
          </div>
          <div className="page-partners__partners partners-list partners-block">
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
  );
};

export default Partners;
