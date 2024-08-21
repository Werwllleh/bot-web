import React from 'react';
import s from './LoaderCar.module.css';
import {API} from "../../utils/consts";

const LoaderCar = () => {
	return (
		<video loop autoPlay muted className={s.loader} controls={false} preload >
			<source src={API + `api/image/anims/loader-car.webm`} type="video/webm" />
			<source src={API + `api/image/anims/loader-car.mp4`} type="video/mp4" />
		</video>
	);
};

export default LoaderCar;
