import {useProductsCountStore, useUsersStore} from "../../../services/store";
import React from "react";
import s from "./Stickers.module.css";
import {Image} from "antd";
import {SITE} from "../../../utils/consts";
import Counter from "../../Counter/Counter";



const StickerItem = ({id, photo, title, price}) => {

  const userCart = useUsersStore((state) => state.cart);
  const updateUserCart = useUsersStore((state) => state.updateCart);

  const index = userCart.findIndex(el => el.title === title);
  const item = userCart.find(el => el.title === title);

  const productStore = useProductsCountStore((state) => state.productStore);
  const selectedPlace = useUsersStore((state) => state.selectedPlace);
  const updateAvailable = useUsersStore((state) => state.updateAvailableProducts);

  const addToCart = (id, title, price, photo) => {
    // Находим индекс товара в корзине (если он есть)
    if (index !== -1) {
      // Если товар уже есть в корзине, увеличиваем его количество на 1
      const updatedCart = [...userCart];
      updatedCart[index].count += 1;
      updateUserCart(updatedCart);
    } else {
      // Если товара нет в корзине, добавляем его с начальным количеством 1
      updateUserCart([...userCart, {id: id, photo: photo, title: title, price: price, count: 1}]);
    }

  };


  return (
    <div className={s.sticker}>
      <div className={"sticker__photo"}>
        <Image
          preview={{
            mask: false,
            // src: `${SITE}api/image/stickers/${photo}`,
            imageRender: () => (
              <div className="sticker__preview">
                <img src={`${SITE}api/image/stickers/${photo}`} alt={title}/>
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
        <div className={`${s.sticker__footer} ${item ? s.sticker__footer_add : ''}` }>
          {!item ? (
            <button onClick={() => addToCart(id, title, price, photo)} className={s.sticker__button_cart}>
              <span>В корзину</span>
            </button>
          ) : <div className={s.sticker__counter}><Counter product={title}/></div> }
        </div>
      </div>
    </div>
  )
}

export default StickerItem;
