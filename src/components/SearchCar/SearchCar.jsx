import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './SearchCar.module.css';


// import '../../App.css';


const SearchCar = () => {

	const [searcheble, setSearcheble] = useState('');

	const { tg } = useTelegram();

	useEffect(() => {
			axios({
				method: 'post',
				url: 'https://193.164.149.140/api/searchcar',
				headers: { 
					'Content-Type': 'application/json'
				},
				data: searcheble
			}).then(res => {
				const carNumber = res.data.searcheble;
				console.log(carNumber);
			})
	}, [searcheble])


	useEffect(() => { 
		tg.expand()
	}, [])

	const onSearcheble = async (e) => {
		setSearcheble(e.target.value.toUpperCase());
	}


	return (
		<div className={s.search_body}>
			<h1 className={s.title}>Поиск авто</h1>
			<input
				className={s.input}
				type="text"
				placeholder='Введи номер авто'
				value={searcheble}
				onChange={onSearcheble}
			/>
			<div className={s.image_body}>
				{/* {
					carNumber ? <img src={"https://193.164.149.140/api/image/"+ {carNumber}} alt="" />:"NETU"
				} */}
			</div>
			<div className={s.textBody}>

			</div>
		</div>
	)
}

export default SearchCar;

