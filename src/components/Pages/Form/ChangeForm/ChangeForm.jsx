import axios from "axios";
import UploadForm from "../Upload/Upload";
import React, { useCallback, useEffect, useState } from "react";
import useTelegram from "../../../../hooks/useTelegram";
import s from "./ChangeForm.module.css";
import Header from "../../../Header/Header";
import Button from "../../../Button/Button";

const ChangeForm = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [isSended, setSended] = useState(false);
  const [curUser, setCurUser] = useState("");

  const [car, setCar] = useState("");
  const [carNum, setCarNum] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carNote, setCarNote] = useState("");
  const [carImage, setCarImage] = useState("");
  const { tg } = useTelegram();

  useEffect(() => {
    setCurUser(tg.initDataUnsafe.user.id);
    tg.expand();
  }, []);

  const checkData = useEffect(() => {
    let patternCarNum = new RegExp(
      /^(([ABEKMHOPCTYX]\d{3}(?<!000)[ABEKMHOPCTYX]{2})(\d{2,3})$)/
    );
    let curYear = new Date().getFullYear();
    if (
      car.length >= 3 &&
      patternCarNum.test(carNum) &&
      carYear >= 1800 &&
      carYear <= curYear &&
      carImage
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [car, carNum, carYear, carNote, carImage]);

  const sendChangedData = () => {
    checkData;
    axios
      .post(`https://92.255.78.177/api/change`, {
        changedData: {
          curUser,
          car,
          carNum,
          carYear,
          carNote,
          carImage,
        },
      })
      .then((res) => {
        console.log(res);
      });
    setDisabled(true);
    setSended(true);
    setTimeout(() => {
      tg.close();
    }, 1500);
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
      <Header
        title={
          isSended ? "Спасибо, Ваши данные изменены" : "Форма изменения данных"
        }
      />
      <div className={isSended ? s.form_body : s.form_body + " " + s.active}>
        <input
          className={s.input}
          value={car}
          onChange={onChangeCar}
          type="text"
          placeholder={"Марка и модель авто*"}
        />
        <p className={s.input_label}>Только латинские буквы</p>
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
          Латинские буквы, формат A999AA99 или A999AA999
        </p>
        <input
          className={s.input}
          value={carNote}
          onChange={onChangeCarNote}
          type="text"
          placeholder={"Примечание к авто"}
        />
        <div className={s.form_footer}>
          <p>Поля со * обязательны к заполнению</p>
        </div>
        <div className={s.form_upload}>
          <UploadForm img={setCarImage} />
        </div>
        <Button
          disabled={isDisabled}
          onClick={sendChangedData}
          className={
            isDisabled ? s.btnChangeForm : s.btnChangeForm + " " + s.active
          }
          title={"Отправить данные"}
        />
      </div>
    </div>
  );
};

export default ChangeForm;
