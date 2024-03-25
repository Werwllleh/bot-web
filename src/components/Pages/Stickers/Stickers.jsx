import React, {useEffect} from 'react';
import Header from "../../Header/Header";
import {Image} from "antd";
import s from "../Stickers/Stickers.module.css";
import {SITE} from "../../../utils/consts";
import {stickersInfo} from "../../../utils/stickersUtils";
import {useUsersStore} from "../../../services/store";


const StickerItem = ({photo, title, price}) => {

  const userCart = useUsersStore((state) => state.cart);

  const updateUserCart = useUsersStore((state) => state.updateCart);

  const addToCart = (item, price) => {
    // Находим индекс товара в корзине (если он есть)
    const index = userCart.findIndex(el => el.title === item);

    if (index !== -1) {
      // Если товар уже есть в корзине, увеличиваем его количество на 1
      const updatedCart = [...userCart];
      updatedCart[index].count += 1;
      updateUserCart(updatedCart);
    } else {
      // Если товара нет в корзине, добавляем его с начальным количеством 1
      updateUserCart([...userCart, {title: item, price: price, count: 1}]);
    }
  };

  useEffect(() => {
    console.log(userCart)

  }, [userCart]);


  return (
    <div className={s.sticker}>
      <div className={"sticker__photo"}>
        <Image
          preview={{
            mask: false,
            // src: `${SITE}api/image/stickers/${photo}`,
            imageRender: () => (
              <div className={s.sticker__preview}>
                <img src={`${SITE}api/image/stickers/${photo}`} alt=""/>
              </div>
            ),
            toolbarRender: () => null,
          }}
          src={`${SITE}api/image/stickers/${photo}`}
          alt={title}
        />
      </div>
      <div className={s.sticker__info}>
        <h2 className={s.sticker__title}>{title}</h2>
        <span className={s.sticker__price}>{price}&nbsp;₽</span>
        <button onClick={() => addToCart(title, price)} className={s.sticker__button_cart}>В корзину</button>
      </div>
    </div>
  )
}

const Stickers = ({stickers}) => {

  return (
    <div className={s.stickers__body}>
      <Header title={"Аттрибутика клуба"}/>
      <div className={s.stickers__grid}>
        {
          stickersInfo(stickers).map((sticker) => {
            return <StickerItem key={sticker.title} photo={sticker.photo} title={sticker.title} price={sticker.price}/>
          })
        }
      </div>
    </div>
  );
};

export default Stickers;