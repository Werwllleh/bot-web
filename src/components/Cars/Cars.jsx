import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './Cars.module.css';


const Cars = () => {

	const [images, setImages] = useState([]);
	const [fetching, setFetching] = useState(true);
	const [totalCount, setTotalCount] = useState(1)


	const { tg } = useTelegram();

	useEffect(() => { 
		tg.expand()
	}, [])

	useEffect(() => {
	if (fetching) {
		axios.get(`https://193.164.149.140/api/ourcars`)
		.then(res => {
			console.log(res);
			setTotalCount(res.data.pageCount)
			setImages([...images, ...res.data.files]); 
		})
		.finally(() => setFetching(false))
		}
	}, [fetching]);

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [totalCount])

	const scrollHandler = (e) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
			setFetching(true)
		}
	}
	



	return (
		<div className={s.cars_body}>
			<h1 className={s.title}>Автомобили нашего клуба</h1>
			<div className={s.image_grid}>
				{images.map((photo) => {
					return (
						<div className={s.image_card} key={photo}>
							<img
								src={"https://193.164.149.140/api/image/" + photo}
								alt=""
								/>
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default Cars;