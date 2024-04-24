import React, {useEffect, useState} from 'react';
import Header from "../../Header/Header";
import s from "../Stickers/Stickers.module.css";
import {getSellerStickersCount, stickersInfo, updateStickersData} from "../../../utils/stickersUtils";
import StickerItem from "./StickerItem";
import {Button, Drawer, notification} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useProductsCountStore, useUsersStore} from "../../../services/store";
import StickersValueInput from "./StickersValueInput";
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import useTelegram from "../../../hooks/useTelegram";


const Stickers = ({stickers}) => {

  const {tg} = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  const [open, setOpen] = useState(false);
  const [seller, setSeller] = useState(false);
  const [updatedProductStoreState, setUpdatedProductStoreState] = useState([]);


  const currentUser = useUsersStore((state) => state.currentUser);
  const productStore = useProductsCountStore((state) => state.productStore);

  const updateProductStore = useProductsCountStore((state) => state.updateProductStore);


  notification.config({
    duration: 1,
    rtl: true,
  });
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    if (type === 'success') {
      api[type]({
        message: 'Успешно обновлено',
        // description:
        //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
    }
    if (type === 'error') {
      api[type]({
        message: 'Произошла ошибка',
        description:
          'Попробуйте еще раз',
      });
    }
    if (type === 'warning') {
      api[type]({
        message: 'Без изменений',
        // description:
        //   'Попробуйте еще раз',
      });
    }
  };

  useEffect(() => {
    if (currentUser.length) {

    }
    const checkSeller = productStore.some(item => Number(item.chatId) === currentUser.id);
    setSeller(checkSeller);

  }, [currentUser, productStore]);

  useEffect(() => {
    if (seller) {
      const cloneProductStore = cloneDeep(productStore);
      setUpdatedProductStoreState(cloneProductStore)
    }

  }, [seller]);



  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleInputChange = (index, newValue) => {
    const currentUserProduct = updatedProductStoreState.find(item => Number(item.chatId) === Number(currentUser.id));

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

  };

  const sendUpdatedData = () => {
    setOpen(false);
    const data = Object.values(getSellerStickersCount(updatedProductStoreState, currentUser.id)?.products)

    if (seller && currentUser.id) {
      if (isEqual(data, Object.values(getSellerStickersCount(productStore, currentUser.id)?.products))) {
        openNotificationWithIcon('warning')
      } else {
        try {
          updateStickersData(currentUser.id, data)
            .then((res) => {
              if (res.status === 200) {
                updateProductStore(updatedProductStoreState)
                openNotificationWithIcon('success')
              }
            })
        } catch (e) {
          updateProductStore(productStore)
          openNotificationWithIcon('error')
        }
      }
    }
  }

  const cancelChange = () => {
    setOpen(false);
  }

  return (
    <>
      {contextHolder}
      <div className={s.stickers__body}>
        <Header title={"Атрибутика клуба"}/>
        <div className={s.stickers__grid}>
          {
            stickersInfo(stickers).map((sticker) => {
              return <StickerItem key={sticker.title} id={sticker.id} photo={sticker.photo} title={sticker.title}
                                  price={sticker.price} ozon={sticker.ozon}/>
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
              width={350}
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
                  Object.entries(getSellerStickersCount(productStore, currentUser.id)?.products).map((sticker, index) => {
                    return <StickersValueInput onInputChange={(index, newValue) => handleInputChange(index, newValue)} key={sticker[0]} index={index} value={sticker} />
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
