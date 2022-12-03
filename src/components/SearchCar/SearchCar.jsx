import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './SearchCar.module.css';

const SearchCar = () => {

	const [searcheble, setSearcheble] = useState('');

	const { tg } = useTelegram();

	const onSearcheble = (e) => {
		setSearcheble(e.target.value.toUpperCase());
	}

	useEffect(() => {
		axios.post(`https://193.164.149.140/api/searchcar`, {searcheble})
			.then((response) => {
      console.log(response);
    });
  }, [searcheble]);


	useEffect(() => { 
		tg.expand()
	}, [])

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

