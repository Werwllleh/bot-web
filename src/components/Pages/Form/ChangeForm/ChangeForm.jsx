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
      /^[ABEKMHOPCTYX]{1}[0-9]{3}[ABEKMHOPCTYX]{2}[0-9]{2,3}$/
    );
    let patternCarModel = new RegExp(/^[A-Za-z]/);
    let curYear = new Date().getFullYear();
    if (
      curUser != null &&
      car.length >= 3 &&
      patternCarModel.test(car) &&
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
          isSended ? "??????????????, ???????? ???????????? ????????????????" : "?????????? ?????????????????? ????????????"
        }
      />
      <div className={isSended ? s.form_body : s.form_body + " " + s.active}>
        <input
          className={s.input}
          value={car}
          onChange={onChangeCar}
          type="text"
          placeholder={"?????????? ?? ???????????? ????????*"}
        />
        <p className={s.input_label}>
          <b>???????????? ?????????????????? ??????????</b>
        </p>
        <input
          className={s.input}
          value={carYear}
          onChange={onChangeCarYear}
          type="number"
          placeholder={"?????? ?????????????? ???????????? ????????*"}
        />
        <input
          maxLength={9}
          className={s.input}
          value={carNum}
          onChange={onChangeCarNum}
          type="text"
          placeholder={"?????????? ???????????? ????????*"}
        />
        <p className={s.input_label}>
          <b>?????????????????? ??????????</b>, ???????????? A999AA99 ?????? A999AA999
        </p>
        <input
          className={s.input}
          value={carNote}
          onChange={onChangeCarNote}
          type="text"
          placeholder={"???????????????????? ?? ????????"}
        />
        <div className={s.form_footer}>
          <p>???????? ???? * ?????????????????????? ?? ????????????????????</p>
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
          title={"?????????????????? ????????????"}
        />
      </div>
    </div>
  );
};

export default ChangeForm;
