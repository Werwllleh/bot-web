import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './Cars.module.css';

import { ImageList, ImageListItem } from '@mui/material';


const Cars = () => {

	const [images, setImages] = useState([]);
	const [fetching, setFetching] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);


	const { tg } = useTelegram();

	useEffect(() => { 
		tg.expand()
	}, [])

	useEffect(() => {
		if (fetching) {
		axios.get(`https://193.164.149.140/api/ourcars?page=${currentPage}`)
		.then(res => {
			console.log(res);
			setImages([...images, ...res.data.files]);
			setCurrentPage(prevState => prevState + 1);
			setTotalCount(res.data.pageCount);
		})
		.finally(() => setFetching(false))
		}
	}, [fetching]);

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler, true)
		return function () {
			document.removeEventListener('scroll', scrollHandler, true)
		}
	}, [totalCount])

	const scrollHandler = (e) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && currentPage < totalCount) {
			setFetching(true)
		}
	}

	
	return (
		<div className={s.cars_body}>
			<h1 className={s.title}>Автомобили нашего клуба</h1>
			<div className={s.image_grid}>
				<ImageList sx={{ width: 500 }} cols={3}>
					{images.map((photo) => (
						<ImageListItem key={photo}>
							<img
								src={"https://193.164.149.140/api/image/" + photo}
								alt=""
								loading="lazy"
							/>
						</ImageListItem>
					))}
				</ImageList>
			</div>
		</div>
	);
};

export default Cars;

{/* <div className={s.image_card} key={photo}>
							<img
								src={"https://193.164.149.140/api/image/" + photo}
								alt=""
								/>
						</div> */}