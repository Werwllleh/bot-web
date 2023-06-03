import axios from "axios";
import React, {useEffect, useState} from "react";
import useTelegram from "../../../hooks/useTelegram";
import s from "./SearchCar.module.css";
import {Image} from "antd";
import Loader from "../../Loader/Loader";
import {SITE} from "../../../utils/consts";

const SearchCar = () => {
    const [searcheble, setSearcheble] = useState("");

    const [userFileds, setUserFields] = useState(null);

    const [loading, setLoading] = useState(false);

    const {tg} = useTelegram();

    let patternCarNum = new RegExp(
        /^[АВЕКМНОРСТУХ]{1}[0-9]{3}[АВЕКМНОРСТУХ]{2}[0-9]{2,3}$/
    );
    let styleGRZInput = s.input;

    const onSearcheble = (e) => {
        setSearcheble(e.target.value.toUpperCase());
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoading(true);
            axios
                .post(SITE + `api/searchcar`, {searcheble})
                .then((res) => {
                    console.log(res.data)
                    if (res.data != "Не найдено") {
                        setUserFields(res.data);
                        setLoading(false);
                    }
                });
        }, 1200);
        return () => clearTimeout(delayDebounceFn);
    }, [searcheble]);

    useEffect(() => {
        tg.expand();
    }, []);

    if (patternCarNum.test(searcheble)) {
        styleGRZInput = s.input;
    } else if (searcheble === "") {
        styleGRZInput = s.input;
    } else {
        styleGRZInput = s.input + " " + s.error;
    }

    return (
        <div className={s.search_body}>
            <h1 className={s.title}>Поиск авто</h1>
            <input
                maxLength={9}
                className={styleGRZInput}
                type="text"
                placeholder="Введи номер авто"
                value={searcheble}
                onChange={onSearcheble}
            />
            {userFileds ? (
                <div className={s.result_body}>
                    <div className={s.image_body}>
                        <Image
                            preview={{
                                src: SITE + `api/image/` + userFileds.carImage,
                            }}
                            width={300}
                            src={
                                SITE + `api/image/small/` +
                                userFileds.carImage +
                                "_" +
                                "small.jpeg"
                            }
                            alt=""
                        />
                    </div>
                    <div className={s.textBody}>
                        <ul className={s.list}>
                            <li>
                                Владелец: <span>{userFileds.userName}</span>
                            </li>
                            <li>
                                Авто: <span>{userFileds.carbrand} {userFileds.carModel}</span>
                            </li>
                            <li>
                                Год выпуска: <span>{userFileds.carYear}</span>
                            </li>
                            {userFileds.carNote ? (
                                <li>
                                    Примечание: <span>{userFileds.carNote}</span>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                </div>
            ) : userFileds == "" ? (
                <div className={s.notFoundImg + " " + s.empty}>
                    <img src={SITE + "api/icons/404.png"} alt="Not found"/>
                    <p>Авто не найдено</p>
                </div>
            ) : (
                <div className={s.notFound}>
                    {loading ? (
                        <Loader/>
                    ) : (
                        <div className={s.notFoundImg}>
                            <img
                                src={SITE + "api/icons/404.png"}
                                alt="Not found"
                            />
                            <p>Авто не найдено</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchCar;
