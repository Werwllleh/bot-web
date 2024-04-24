import axios from "axios";
import UploadForm from "../Upload/Upload";
import React, {useEffect, useMemo, useState} from "react";
import useTelegram from "../../../../hooks/useTelegram";
import s from "./ChangeForm.module.css";
import Header from "../../../Header/Header";
import {AUDI, BENTLEY, cars, LAMBORGHINI, SEAT, SKODA, VOLKSWAGEN, URL, SITE} from "../../../../utils/consts";
import Button from "../../../Button/Button";
import {useUsersStore} from "../../../../services/store";
import {Select, notification} from 'antd';

const ChangeForm = () => {

  const currentUser = useUsersStore((state) => state.currentUser);

  const [isDisabled, setDisabled] = useState(true);
  const [isSended, setSended] = useState(false);
  const [curUser, setCurUser] = useState("");

  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carNum, setCarNum] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carNote, setCarNote] = useState("");
  const [carImage, setCarImage] = useState("");
  const {tg} = useTelegram();

  useEffect(() => {
    setCurUser(currentUser.id);
    tg.expand();
  }, [currentUser]);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Данные изменены',
    });
  };


  let patternCarNum = new RegExp(
    /^[АВЕКМНОРСТУХ]{1}[0-9]{3}[АВЕКМНОРСТУХ]{2}[0-9]{2,3}$/
  );
  let curYear = new Date().getFullYear();
  let styleGRZInput = s.input;

  const checkData = useMemo(() => {
    if (
      curUser != null &&
      carBrand !== '' &&
      carModel !== '' &&
      patternCarNum.test(carNum) &&
      carYear >= 1800 &&
      carYear <= curYear &&
      carImage
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [curUser, carBrand, carModel, carNum, carYear, carNote, carImage]);

  const sendChangedData = () => {
    checkData;
    try {
      axios
        .post(SITE + `api/change`, {
          changedData: {
            curUser,
            carBrand,
            carModel,
            carNum,
            carYear,
            carNote,
            carImage,
          },
        })
      openNotificationWithIcon('success');
      setDisabled(true);
      setSended(true);
      setTimeout(() => {
        tg.close();
      }, 1300);
    } catch (e) {
      console.log(e)
    }
  };

  const handleBrandsChange = (value) => {
    setCarBrand(value)
  };
  const onSecondModelChange = (value) => {
    setCarModel(value.toUpperCase());
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

  if (patternCarNum.test(carNum)) {
    styleGRZInput = s.input;
  } else if (carNum === "") {
    styleGRZInput = s.input;
  } else {
    styleGRZInput = s.input + " " + s.error;
  }



  return (
    <>
      {contextHolder}
      <div className={s.form}>
        <Header title={"Форма изменения данных"}
        />
        <div className={s.form__body}>
          <div className={s.select_body}>
            <Select
              placeholder={"Марка авто"}
              onChange={handleBrandsChange}
              options={Object.keys(cars).map((brand) => ({
                label: brand,
                value: brand,
              }))}
            />
            {
              carBrand.length ? (
                <Select
                  placeholder={"Модель авто"}
                  onChange={onSecondModelChange}
                  options={cars[carBrand]?.map((model) => ({
                    label: model,
                    value: model,
                  }))}
                />
              ) : null
            }
          </div>
          <div className={s.input__field}>
            <input
              className={s.input}
              value={carYear}
              onChange={onChangeCarYear}
              type="number"
              placeholder={"Год выпуска вашего авто*"}
            />
          </div>
          <div className={s.input__field}>
            <input
              maxLength={9}
              className={styleGRZInput}
              value={carNum}
              onChange={onChangeCarNum}
              type="text"
              placeholder={"Номер вашего авто*"}
            />
            <p className={s.input_label}>
              <b>Русские буквы</b>, формат A999AA99 или A999AA999
            </p>
          </div>
          <div className={s.input__field}>
            <input
              className={s.input}
              value={carNote}
              onChange={onChangeCarNote}
              type="text"
              placeholder={"Примечание к авто"}
            />
          </div>
          <div className={s.form_footer}>
            <p>Поля со * обязательны к заполнению</p>
          </div>
          <div className={s.form_upload}>
            <UploadForm img={setCarImage}/>
          </div>
          <Button
            disabled={isDisabled}
            onClick={sendChangedData}
            className={
              // isDisabled ? s.btnChangeForm : s.btnChangeForm + " " + s.active
              s.btnChangeForm + " " + s.active
            }
            title={"Отправить данные"}
          />
        </div>
      </div>
    </>
  );
};

export default ChangeForm;
