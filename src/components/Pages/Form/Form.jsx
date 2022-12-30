import UploadForm from "./Upload/Upload";
import React, { useCallback, useEffect, useState } from "react";
import useTelegram from "../../../hooks/useTelegram";
import s from "./Form.module.css";
import Header from "../../Header/Header";

const Form = () => {
  const [name, setName] = useState("");
  const [car, setCar] = useState("");
  const [carNum, setCarNum] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carNote, setCarNote] = useState("");
  const [carImage, setCarImage] = useState("");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      name,
      car,
      carNum,
      carYear,
      carNote,
      carImage,
    };
    tg.sendData(JSON.stringify(data));
  }, [name, car, carNum, carYear, carNote, carImage]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.expand();
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, []);

  useEffect(() => {
    let patternCarNum = new RegExp(
      /^[ABEKMHOPCTYX]{1}[0-9]{3}[ABEKMHOPCTYX]{2}[0-9]{2,3}$/
    );
    let patternCarModel = new RegExp(/^[A-Za-z]/);
    let curYear = new Date().getFullYear();
    if (
      name.length >= 3 &&
      patternCarModel.test(car) &&
      patternCarNum.test(carNum) &&
      carYear >= 1800 &&
      carYear <= curYear &&
      carImage
    ) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [name, car, carNum, carYear, carImage]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

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
      <Header title={"Регистрация"} />
      <div className={s.form_body}>
        <input
          className={s.input}
          value={name}
          onChange={onChangeName}
          type="text"
          placeholder={"Имя и фамилия*"}
        />
        <input
          className={s.input}
          value={car}
          onChange={onChangeCar}
          type="text"
          placeholder={"Марка и модель авто*"}
        />
        <p className={s.input_label}>
          Только <b>латинские</b> буквы
        </p>
        <input
          className={s.input}
          value={carYear}
          onChange={onChangeCarYear}
          type="number"
          placeholder={"Год выпуска вашего авто*"}
        />
        <input
          maxLength={9}
          className={s.input}
          value={carNum}
          onChange={onChangeCarNum}
          type="text"
          placeholder={"Номер вашего авто*"}
        />
        <p className={s.input_label}>
          <b>Латинские буквы</b>, формат A999AA99 или A999AA999
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
          <p>
            Имя и фамилия вводятся без дальнейшей возможности редактирования
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
