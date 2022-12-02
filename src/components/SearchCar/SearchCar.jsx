import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './SearchCar.module.css';


// import '../../App.css';


const SearchCar = () => {

	const [searcheble, setSearcheble] = useState('');
	const { tg } = useTelegram();

/* 	useEffect(() => {
		fetch('/searchcar')
			.then(response => response.json())
			.then(response => setSearcheble(response))
	}, []) */

	useEffect(() => {
		axios.get(`https://193.164.149.140/searchcar`, { data: 'K868OP21' })
			.then(res => {
				const carNumber = res.data;
				console.log(carNumber);
			})
		console.log(res);
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
				<img src="https://193.164.149.140/api/image/446012794.jpeg" alt="" />
			</div>
			<div className={s.textBody}>

			</div>
		</div>
	)
}

export default SearchCar;

