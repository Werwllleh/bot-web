import UploadForm from "./Upload/Upload";
import React, {useCallback, useEffect, useState} from "react";
import useTelegram from "../../../hooks/useTelegram";
import s from "./Form.module.css";
import Header from "../../Header/Header";

const Form = () => {
  return (
    <div>

    </div>
  );
};

/*const Form = () => {
    const [name, setName] = useState("");
    const [carBrand, setCarBrand] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carNum, setCarNum] = useState("");
    const [carYear, setCarYear] = useState("");
    const [carNote, setCarNote] = useState("");
    const [carImage, setCarImage] = useState("");
    const {tg} = useTelegram();



    const onSendData = useCallback(() => {
        const data = {
            name,
            carBrand,
            carModel,
            carNum,
            carYear,
            carNote,
            carImage,
        };
        tg.sendData(JSON.stringify(data));
    }, [name, carBrand, carModel, carNum, carYear, carNote, carImage]);

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData);
        return () => {
            tg.offEvent("mainButtonClicked", onSendData);
        };
    }, [onSendData]);

    useEffect(() => {
        tg.expand();
        tg.MainButton.show();
        tg.MainButton.isActive = false;
        tg.MainButton.color = "#686A6C";
        tg.MainButton.setParams({
            text: "Отправить данные",
        });
    }, [tg]);

    let patternCarNum = new RegExp(
        /^[АВЕКМНОРСТУХ]{1}[0-9]{3}[АВЕКМНОРСТУХ]{2}[0-9]{2,3}$/
    );
    let curYear = new Date().getFullYear();
    let styleGRZInput = s.input;

    useEffect(() => {
        if (
            name.length >= 3 &&
            carBrand !== '' &&
            carModel !== '' &&
            patternCarNum.test(carNum) &&
            carYear >= 1800 &&
            carYear <= curYear &&
            carImage
        ) {
            tg.MainButton.isActive = true;
            tg.MainButton.color = "#00a86b";
        } else {
            tg.MainButton.isActive = false;
            tg.MainButton.color = "#686A6C";
        }
    }, [name, carBrand, carModel, carNum, carYear, carImage]);

    const onChangeName = (e) => {
        setName(e.target.value);
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
            <Header title={"Регистрация"}/>
            <div className={s.form_body}>
                <input
                    className={s.input}
                    value={name}
                    onChange={onChangeName}
                    type="text"
                    placeholder={"Имя и фамилия*"}
                />
                <div className={s.select_body}>
                    <div className={s.select_field}>
                        <select onChange={carBrandChange} className={s.select} name="car_name"
                                id="car_name_select">
                            <option className={s.option} value="">Выбери марку</option>
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
                                <option className={s.option} value="">Выбери модель</option>
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
                <div className={s.form_upload}>
                    <UploadForm img={setCarImage}/>
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
};*/

export default Form;
