import axios from "axios";
import UploadForm from "../Upload/Upload";
import React, {useEffect, useMemo, useState} from "react";
import useTelegram from "../../../../hooks/useTelegram";
import s from "./ChangeForm.module.css";
import Header from "../../../Header/Header";
import {AUDI, BENTLEY, cars, LAMBORGHINI, SEAT, SKODA, VOLKSWAGEN, URL, SITE} from "../../../../utils/consts";
import Button from "../../../Button/Button";

const ChangeForm = () => {
    const [isDisabled, setDisabled] = useState(true);
    const [isSended, setSended] = useState(false);
    const [curUser, setCurUser] = useState("");

    const [carBrand, setCarBrand] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carNum, setCarNum] = useState("");
    const [carYear, setCarYear] = useState("");
    const [carNote, setCarNote] = useState("");
    const [carImage, setCarImage] = useState("");
    const {tg} = useTelegram();

    useEffect(() => {
        setCurUser(tg.initDataUnsafe.user.id);
        tg.expand();
    }, []);

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
    }, [carBrand, carModel, carNum, carYear, carNote, carImage]);

    const sendChangedData = () => {
        checkData;
        axios
            .post( SITE + `api/change`, {
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
            .then((res) => {
                console.log(res);
            });
        setDisabled(true);
        setSended(true);
        setTimeout(() => {
            tg.close();
        }, 1500);
    };

    const carBrandChange = (e) => {
        setCarBrand(e.target.value)
    }

    const carModelChange = (e) => {
        setCarModel(e.target.value)
    }

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
        <div className={s.form}>
            <Header
                title={
                    isSended ? "Спасибо, Ваши данные изменены" : "Форма изменения данных"
                }
            />
            <div className={isSended ? s.form_body : s.form_body + " " + s.active}>
                <div className={s.select_body}>
                    <div className={s.select_field}>
                        <select onChange={carBrandChange} className={s.select} name="car_name"
                                id="car_name_select">
                            <option className={s.option} value="">Выбери марку*</option>
                            {Object.keys(cars).map(carBrand => (
                                <option key={carBrand} className={s.option}
                                        value={carBrand}>{carBrand.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    {carBrand !== '' ? (
                        <div className={s.select_field}>
                            <select onChange={carModelChange} className={s.select} name="car_name"
                                    id="car_model_select">
                                <option className={s.option} value="">Выбери модель*</option>
                                {carBrand === VOLKSWAGEN ? (
                                    cars[VOLKSWAGEN].map(carModel => (
                                        <option key={carModel} className={s.option}
                                                value={carModel}>{carModel.toUpperCase()}</option>
                                    ))
                                ) : carBrand === SKODA ? (
                                    cars[SKODA].map(carModel => (
                                        <option key={carModel} className={s.option}
                                                value={carModel}>{carModel.toUpperCase()}</option>
                                    ))
                                ) : carBrand === AUDI ? (
                                    cars[AUDI].map(carModel => (
                                        <option key={carModel} className={s.option}
                                                value={carModel}>{carModel.toUpperCase()}</option>
                                    ))
                                ) : carBrand === SEAT ? (
                                    cars[SEAT].map(carModel => (
                                        <option key={carModel} className={s.option}
                                                value={carModel}>{carModel.toUpperCase()}</option>
                                    ))
                                ) : carBrand === BENTLEY ? (
                                    cars[BENTLEY].map(carModel => (
                                        <option key={carModel} className={s.option}
                                                value={carModel}>{carModel.toUpperCase()}</option>
                                    ))
                                ) : (
                                    cars[LAMBORGHINI].map(carModel => (
                                        <option key={carModel} className={s.option}
                                                value={carModel}>{carModel.toUpperCase()}</option>
                                    ))
                                )}
                            </select>
                        </div>
                    ) : null}
                </div>
                <input
                    className={s.input}
                    value={carYear}
                    onChange={onChangeCarYear}
                    type="number"
                    placeholder={"Год выпуска вашего авто*"}
                />
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
                    <UploadForm img={setCarImage}/>
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
