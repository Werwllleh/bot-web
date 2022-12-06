import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './Cars.module.css';


const Cars = () => {

	const [images, setImages] = useState([]);
	const [countImg, setCountImg] = useState(12);
	const [fetching, setFetching] = useState(true);


	const { tg } = useTelegram();

	useEffect(() => { 
		tg.expand()
	}, [])

	const fetchImages = async () => {
		if (fetching) {
			await axios.get(`https://193.164.149.140/api/ourcars`)
			.then(res => {
				let totalCount = res.data.length;
				console.log(totalCount);
        setImages([...images,...res.data]); 
			})
			.finally(() => setFetching(false))
		}
	};

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	const scrollHandler = (e) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
			setFetching(true)
		}
	}
	
	useEffect(() => {
			fetchImages();
	}, [fetching]);


	return (
		<div className={s.cars_body}>
			<h1 className={s.title}>Автомобили нашего клуба</h1>
			<div className={s.image_grid}>
				{images.map((photo) => {
					return (
						<div className={s.image_card}>
							<img
								key={Math.random()}
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