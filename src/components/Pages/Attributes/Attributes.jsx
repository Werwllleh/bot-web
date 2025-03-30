import React, {useEffect, useState} from 'react';
import {getAllAttributes} from "../../../api/api-attributes";
import Loader from "../../Loader/Loader";
import {attributeType} from "../../../utils/consts";
import AttributeItem from "../../AttributeItem";
import {Outlet, useLocation} from "react-router-dom";


const Attributes = () => {

  const [loading, setLoading] = useState(true);
  const [attributes, setAttributes] = useState([
    {
      type: attributeType.STICKER,
      category: 'Наклейки',
      data: []
    },
    {
      type: attributeType.FLAVORS,
      category: 'Ароматизаторы',
      data: []
    },
    {
      type: attributeType.NUMBER_FRAMES,
      category: 'Номерные рамки',
      data: []
    },
  ]);

  useEffect(() => {
    getAllAttributes().then((response) => {
      const status = response?.status;
      const {data} = response;

      if (status && status === 200) {
        setLoading(false); // Обновление состояния загрузки

        if (!!data.length) {
          // Обновляем данные для каждого типа атрибута
          const updatedAttributes = attributes.map((attribute) => {
            const filteredProducts = data.filter((product) =>
              product.type.toLowerCase() === attribute.type.toLowerCase()
            );

            return {
              ...attribute, // Сохраняем остальные поля
              data: filteredProducts, // Обновляем data для каждого типа
            };
          });

          setAttributes(updatedAttributes); // Обновляем все атрибуты
        }
      } else {
        setLoading(true); // Если статус не 200, установить состояние загрузки в true
      }
    });
  }, []);

  const location = useLocation();

  // Показываем только на родительском маршруте
  const isRootPath = location.pathname === "/attributes";

  return (
    <>
      {isRootPath && (
        <div className="page-attributes">
          <div className="container">
            <h1 className="page-attributes__title h1t">Клубная атрибутика</h1>
            <div className="page-attributes__body">
              <div className="page-attributes__products">
                {loading && <Loader/>}
                {!loading && !!attributes.length && attributes.map((attribute) => (
                  !!attribute.data.length && (
                    <section key={attribute.type} className="page-attributes__section">
                      <h3 className="page-attributes__section-title">{attribute.category}</h3>
                      <div className="page-attributes__section-products">
                        {attribute.data.map((product) => (
                          <div key={product.documentId} className="page-attributes__section-product">
                            <AttributeItem data={product}/>
                          </div>
                        ))}
                      </div>
                    </section>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>)}
      <Outlet/>
    </>
  );
};

export default Attributes;
