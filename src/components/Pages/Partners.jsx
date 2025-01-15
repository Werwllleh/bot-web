import React, {useEffect, useRef, useState} from "react";
import {Input, Select} from "antd";
import {Link} from "react-router-dom";
import {CloseOutlined, InfoCircleTwoTone} from "@ant-design/icons";
import {usePartnersStore} from "../../services/store";
import button from "../Button/Button";
import MainModal from "../MainModal/MainModal";
import {checkObject} from "../../utils/checkObject";
import SiteIcon from "../icons/site-icon";
import PhoneIcon from "../icons/phone-icon";
import {getScrollbarWidth, withoutTwitching} from "../../utils/utils";
import {BrowserView, MobileView} from "react-device-detect";


const Partners = () => {

  const filters = useRef();

  const [isModalActive, setModalActive] = useState(false);
  const [isFiltersActive, setFiltersActive] = useState(false);
  const [partnersListHeight, setPartnersListHeight] = useState(0);

  const [partnersFiltered, setPartnersFiltered] = useState([]);


  const [partnerAboutData, setPartnerAboutData] = useState({});
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
    setPartnersFiltered(partners);
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

  const showModalAbout = (partnerId) => {

    const partnerData = partners.filter(partner => partner.id === partnerId)[0];
    setPartnerAboutData(partnerData);

    setModalActive(true);
  }

  const handleModalClose = () => {
    setModalActive(false);
    setTimeout(() => {
      setPartnerAboutData({});
    }, 300)
  };

  const hideFilters = () => {
    filters.current.style.maxHeight = "0";
    setPartnersListHeight(0)
    setFiltersActive(false);
  }

  const showFilters = () => {
    if (isFiltersActive) {
      hideFilters();
    } else {
      filters.current.style.maxHeight = `${filters.current.scrollHeight}px`;
      setPartnersListHeight(filters.current.scrollHeight)
      setFiltersActive(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const filtersBlock = document.querySelector(".page-partners__filters");
      const filtersOptionsList = document.querySelector(".rc-virtual-list");

      if (filtersBlock && !filtersBlock.contains(e.target) && !filtersOptionsList || filtersBlock && !filtersBlock.contains(e.target) && filtersOptionsList && !filtersOptionsList.contains(e.target)) {
        hideFilters();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      // Удаляем обработчик при размонтировании компонента
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  useEffect(() => {

    let filteredData = partners;

    // Фильтр по поисковому вводу (searchInput)
    if (searchInput) {
      filteredData = filteredData.filter(partner =>
        partner.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // Фильтр по категориям (searchCategories)
    if (searchCategories.length) {
      filteredData = filteredData.filter(partner =>
        partner.categories.some(category =>
          searchCategories.includes(category.value)
        )
      );
    }

    setPartnersFiltered(filteredData);
  }, [searchInput, searchCategories, partners]);

  return (
    <>
      <div className="page-partners">
        <div className="container">
          <h1 className="page-partners__title h1t">Партнеры клуба</h1>
          <div className="page-partners__body">
            <div className="page-partners__filters">
              <button onClick={showFilters}
                      className={`page-partners__filters-button ${isFiltersActive ? 'active' : ''}`}>{isFiltersActive ? 'Скрыть фильтр' : 'Показать фильтр'}</button>
              <div ref={filters} className={`page-partners__filters-params ${isFiltersActive ? 'show' : ''}`}>
                <div className="page-partners__filter input-antd">
                  <Input placeholder="Поиск по названию" value={searchInput} onChange={handleChangeSearchInput}/>
                  {searchInput !== '' &&
                    <button onClick={handleClearSearchInput} className="input-antd__clear"><CloseOutlined/></button>}
                </div>
                <div className="page-partners__filter select-antd">
                  <Select
                    mode="multiple"
                    placeholder="Выбери категории"
                    onChange={handleChange}
                    options={partnersCategories}
                    optionFilterProp="label"
                    maxTagCount="responsive"
                    showSearch={false}
                    onDropdownVisibleChange={(open) => {
                      if (open) {
                        withoutTwitching(open);
                      } else {
                        withoutTwitching(open);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="page-partners__partners partners-list partners-block">
              {partnersFiltered.length ? (
                <div className="partners-block__list">
                  {partnersFiltered.map(partner => {
                    return (
                      <div key={partner.id}
                           className={`partners-block__partner partner-card ${!partner.rejected ? '' : 'not-rec'}`}>
                        <div className="partner-card__body">
                          <h5 className="partner-card__title">{partner.title}</h5>
                          {partner.description && <p className="partner-card__description">{partner.description}</p>}
                        </div>
                        {!partner.rejected ? (
                          <button onClick={() => showModalAbout(partner.id)} className="partner-card__about style-btn">
                            <span className="partner-card__about-text">Подробнее</span>
                            <span className="partner-card__about-icon"><InfoCircleTwoTone/></span>
                          </button>
                        ) : <span className="partner-card__about-not-rec">Не советуем!</span>}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="partners-block__notfound">Партнеры не найдены</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <MainModal
        className="page-users-partners-modal"
        title={checkObject(partnerAboutData) ? partnerAboutData.title : 'О партнере'}
        isOpen={isModalActive}
        onClose={handleModalClose}
      >
        {checkObject(partnerAboutData) && (
          <div className="page-users-partners-modal__body">
            {partnerAboutData.address_coordinates !== '-' ? (<div className="page-users-partners-modal__address">
              <div className="page-users-partners-modal__address-text">{partnerAboutData.address_text}</div>
              <BrowserView>
                <Link target="_blank"
                      to={`https://yandex.ru/maps/?whatshere[point]=${partnerAboutData.address_coordinates.reverse()}&whatshere[zoom]=17`}
                      className="page-users-partners-modal__address-link style-btn">
                  Показать на карте
                </Link>
              </BrowserView>
              <MobileView>
                <Link target="_blank"
                      to={`yandexmaps://?whatshere[point]=${partnerAboutData.address_coordinates.reverse()}&whatshere[zoom]=17`}
                      className="page-users-partners-modal__address-link style-btn">
                  Показать на карте
                </Link>
              </MobileView>
            </div>) : null}
            <div className="page-users-partners-modal__contacts">
              {/*<h5 className="page-users-partners-modal__contacts-title">Контакты:</h5>*/}
              {partnerAboutData.phones !== '-' && partnerAboutData.phones.length ? partnerAboutData.phones.map(phone => {
                return <Link className="page-users-partners-modal__contacts-link" key={phone}
                             to={`tel:${phone}`}><PhoneIcon/></Link>
              }) : null}
              {partnerAboutData.links !== '-' && partnerAboutData.links.length ? partnerAboutData.links.map(link => {
                return <Link className="page-users-partners-modal__contacts-link" target="_blank" key={link}
                             to={link}><SiteIcon/></Link>
              }) : null}
            </div>
            {partnerAboutData.description &&
              <div className="page-users-partners-modal__description">{partnerAboutData.description}</div>}
          </div>
        )}
      </MainModal>
    </>
  );
};

export default Partners;
