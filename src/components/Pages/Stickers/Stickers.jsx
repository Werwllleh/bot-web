import React, {useEffect, useState} from 'react';
import Header from "../../Header/Header";
import s from "../Stickers/Stickers.module.css";
import {stickersInfo, updateStickersData} from "../../../utils/stickersUtils";
import StickerItem from "./StickerItem";
import {Button, Drawer, Input, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useProductsCountStore, useUsersStore} from "../../../services/store";
import StickersValueInputs from "./StickersValueInput";
import {stickersTitles} from "../../../utils/consts";
import StickersValueInput from "./StickersValueInput";


const Stickers = ({stickers}) => {

  const [open, setOpen] = useState(false);
  const [seller, setSeller] = useState(false);
  const [sellerProducts, setSellerProducts] = useState([]);

  const currentUser = useUsersStore((state) => state.currentUser);
  const productStore = useProductsCountStore((state) => state.productStore);

  useEffect(() => {

    const checkSeller = productStore.some(item => Number(item.chatId) === currentUser.id);
    setSeller(checkSeller);

    if (checkSeller) {
      setSellerProducts(productStore.filter(item => Number(item.chatId) === currentUser.id)[0].products)
    }

  }, [currentUser, productStore]);


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const sendUpdatedData = () => {
    console.log(sellerProducts)
    updateStickersData(sellerProducts)
      .then(response => response.json())
      .then(data => console.log(data));
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
                  <Button onClick={onClose}>Отмена</Button>
                  <Button className={'stickers__drawer-btn-save'} type="primary" onClick={sendUpdatedData}>
                    Сохранить
                  </Button>
                </div>
              }
            >
              <div className={s.sticker__values}>
                {
                  Object.entries(sellerProducts).map((sticker) => {
                    return <StickersValueInput key={sticker[0]} value={sticker}/>
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
