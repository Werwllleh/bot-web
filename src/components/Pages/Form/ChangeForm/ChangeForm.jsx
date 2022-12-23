import axios from "axios";
import UploadForm from "../Upload/Upload";
import React, { useCallback, useEffect, useState } from "react";
import useTelegram from "../../../../hooks/useTelegram";
import s from "./ChangeForm.module.css";
import Header from "../../../Header/Header";

const ChangeForm = () => {
  const [car, setCar] = useState("");
  const [carNum, setCarNum] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carNote, setCarNote] = useState("");
  const [carImage, setCarImage] = useState("");
  const { tg } = useTelegram();

  console.log(tg);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios
        .post(`https://92.255.78.177/api/change`, {
          car,
          carYear,
          carNum,
          carNote,
        })
        .then((res) => {
          console.log(res);
        });
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  });

  /* useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setLoading(true);
      axios
        .post(`https://92.255.78.177/api/change`, { searcheble })
        .then((res) => {
          if (res.data != "Не найдено") {
            setUserFields(res.data);
            setLoading(false);
          }
        });
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searcheble]); */

  useEffect(() => {
    tg.expand();
  }, []);

  /*   useEffect(() => {
    let curYear = new Date().getFullYear();
    if (
      car.length >= 3 &&
      /^[ABEKMHOPCTYX]\d{3}(?<!000)[ABEKMHOPCTYX]{2}\d{2,3}$/.test(carNum) &&
      carYear >= 1800 &&
      carYear <= curYear
    ) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [car, carNum, carYear]); */

  const onChangeCar = (e) => {
    setCar(e.target.value);
  };

  const onChangeCarNum = (e) => {
    setCarNum(e.target.value.toUpperCase());
  };

  const onChangeCarYear = (e) => {
    setCarYear(e.target.value);
  };

  const onChangeCarNote = (e) => {
    setCarNote(e.target.value);
  };

  return (
    <div className={s.form}>
      <Header title={"Форма изменения данных"} />
      <div className={s.form_body}>
        <input
          className={s.input}
          value={car}
          onChange={onChangeCar}
          type="text"
          placeholder={"Марка и модель авто*"}
        />
        <p className={s.input_label}>Желательно использовать латинские буквы</p>
        <input
          className={s.input}
          value={carYear}
          onChange={onChangeCarYear}
          type="number"
          placeholder={"Год выпуска вашего авто*"}
        />
        <input
          className={s.input}
          value={carNum}
          onChange={onChangeCarNum}
          type="text"
          placeholder={"Номер вашего авто*"}
        />
        <p className={s.input_label}>
          Латинские буквы, формат A999AA99 или A999AA999
        </p>
        <input
          className={s.input}
          value={carNote}
          onChange={onChangeCarNote}
          type="text"
          placeholder={"Примечание к авто"}
        />
        <div className={s.form_upload}>
          <UploadForm img={setCarImage} />
        </div>
        <div className={s.form_footer}>
          <p>Поля со * обязательны к заполнению</p>
        </div>
      </div>
    </div>
  );
};

export default ChangeForm;
