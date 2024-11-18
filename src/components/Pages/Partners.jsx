import React, {useEffect, useState} from "react";
import {Input, Select} from "antd";
import {CloseOutlined} from "@ant-design/icons";


const Partners = () => {

  const [searchInput, setSearchInput] = useState("");
  const [searchCategories, setSearchCategories] = useState([]);

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

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
                options={options}
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
