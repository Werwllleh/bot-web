import React, {useEffect, useState} from "react";
import {Input, Select} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {usePartnersStore} from "../../services/store";


const Partners = () => {

  const [searchInput, setSearchInput] = useState("");
  const [searchCategories, setSearchCategories] = useState([]);

  const partnersCategories = usePartnersStore((state) => state.partnersCategories);

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
          <div className="page-partners__partners partners-list">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
