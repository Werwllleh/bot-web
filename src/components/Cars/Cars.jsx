import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './Cars.module.css';


const Cars = () => {

	const [carPhotos, setCarPhotos] = useState('')

	const { tg } = useTelegram();

	useEffect(() => { 
		tg.expand()
	}, [])

	useEffect(() => {
		axios.get(`https://193.164.149.140/api/ourcars`)
			.then((res) => {
				let arrPhoto = [];
				setCarPhotos(arrPhoto.push(res.data))

				console.log(arrPhoto);
		})
	}, [carPhotos])



	return (
		<div className={s.cars_body}>
			<div className={s.cars_cards}>
				<div className={s.cars_card}>
					<img src={"https://193.164.149.140/api/image/" + carPhotos} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Cars;