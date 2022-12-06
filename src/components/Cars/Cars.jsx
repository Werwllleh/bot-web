import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './Cars.module.css';
// import { Image } from 'antd';


const Cars = () => {

	const [images, setImages] = React.useState([]);
	const [loaded, setIsLoaded] = React.useState(false);

	const { tg } = useTelegram();

	useEffect(() => { 
		tg.expand()
	}, [])

	const fetchImages = async () => {
    await axios.get(`https://193.164.149.140/api/ourcars`)
      .then (res => {
        setImages([...images, ...res.data]);
        setIsLoaded(true);
      });
	};
	
	useEffect(() => {
			fetchImages();
	}, []);



	return (
		<div className={s.cars_body}>
			<h1 className={s.title}>Авто нашего клуба</h1>
			<div className={s.image_grid}>
				{images.map((photo) => {
					return (
						<div className={s.image_card}>
							<img
								key={Math.random() * (0 - 50) + 50}
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

{/* <Image
width={Math.random() * (400 - 200) + 200}
height={Math.random() * (400 - 200) + 200}
key={String(photo).length+7}
src={"https://193.164.149.140/api/image/" + photo}
alt={"car" + String(photo).length + 7}
/> */}