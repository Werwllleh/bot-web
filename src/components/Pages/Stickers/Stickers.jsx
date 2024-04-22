import React, {useEffect, useState} from 'react';
import Header from "../../Header/Header";
import s from "../Stickers/Stickers.module.css";
import {getSellerStickersCount, stickersInfo, updateStickersData} from "../../../utils/stickersUtils";
import StickerItem from "./StickerItem";
import {Button, Drawer, Input, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useProductsCountStore, useUsersStore} from "../../../services/store";
import StickersValueInput from "./StickersValueInput";
import {getProductsData} from "../../../utils/productsUtils";


const Stickers = ({stickers}) => {

  const [open, setOpen] = useState(false);
  const [seller, setSeller] = useState(false);
  const [sellerProducts, setSellerProducts] = useState([]);

  const [defaultProducts, setDefaultProducts] = useState([]);

  const currentUser = useUsersStore((state) => state.currentUser);
  const productStore = useProductsCountStore((state) => state.productStore);

  const updateProductStore = useProductsCountStore((state) => state.updateProductStore);


  useEffect(() => {

    const checkSeller = getSellerStickersCount(productStore, currentUser.id);
    setSeller(checkSeller);

    if (checkSeller) {
      setSellerProducts(getSellerStickersCount(productStore, currentUser.id)?.products)
    }

  }, [currentUser, productStore]);




  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  const handleInputChange = (index, newValue) => {
    // Создаем копию объекта sellerProducts
    const updatedProductStore = [...productStore];
    const currentUserProduct = updatedProductStore.find(item => Number(item.chatId) === Number(currentUser.id));

    if (currentUserProduct) {
      // Обновляем значение продукта по индексу
      const productKeys = Object.keys(currentUserProduct.products);
      if (index >= 0 && index < productKeys.length) {
        const productKey = productKeys[index];
        currentUserProduct.products[productKey] = Number(newValue);
      } else {
        console.error('Индекс выходит за пределы диапазона свойств в products');
      }
    } else {
      console.error('Продукт не найден для текущего пользователя');
    }

    updateProductStore(updatedProductStore);

  };


  const sendUpdatedData = () => {
    setOpen(false);
    const data = Object.values(getSellerStickersCount(productStore, currentUser.id)?.products)

    if (seller && currentUser.id) {

      updateStickersData(currentUser.id, data)
        .then((response) => {
          // Обработка успешного ответа
        })
        .catch((error) => {
          // Обработка ошибки
        });
    }
  }

  const cancelChange = () => {
    setOpen(false);
    // updateProductStore(defaultProducts);
  }

  return (
    <>
      <div className={s.stickers__body}>
        <Header title={"Аттрибутика клуба"}/>
        <div className={s.stickers__grid}>
          {
            stickersInfo(stickers).map((sticker) => {
              return <StickerItem key={sticker.title} id={sticker.id} photo={sticker.photo} title={sticker.title}
                                  price={sticker.price}/>
            })
          }
        </div>
      </div>
      {
        seller ? (
          <>
            <Button className={s.stickers__admin_update} type="primary" icon={<EditOutlined/>} onClick={showDrawer}/>
            <Drawer
              title="Обновить кол-во наклеек"
              placement={'left'}
              width={400}
              closable={false}
              onClose={onClose}
              open={open}
              extra={
                <div className={'stickers__drawer-btns'}>
                  <Button onClick={cancelChange}>Отмена</Button>
                  <Button className={'stickers__drawer-btn-save'} type="primary" onClick={sendUpdatedData}>
                    Сохранить
                  </Button>
                </div>
              }
            >
              <div className={s.sticker__values}>
                {
                  Object.entries(sellerProducts).map((sticker, index) => {
                    return <StickersValueInput onInputChange={(index, newValue) => handleInputChange(index, newValue)} key={sticker[0]} sellerProducts={sellerProducts} index={index} value={sticker} />
                  })
                }
              </div>
            </Drawer>
          </>
        ) : null
      }
    </>
  );
};

export default Stickers;
