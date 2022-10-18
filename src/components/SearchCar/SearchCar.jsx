import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './SearchCar.css';


const SearchCar = () => {

	const [searcheble, setSearcheble] = useState('');
	const { tg } = useTelegram();


	useEffect(() => {
		tg.expand()
	}, [])

	const onSearcheble = (e) => {
		setSearcheble(e.target.value)
	}

	return (
		<div className={'searchCar'}>
			<h1 className={'title'}>Поиск авто</h1>
			<input className={'input'} value={searcheble} onChange={onSearcheble} type="text" placeholder={'Введите номер автомобиля'}/>
		</div>
	)
}

export default SearchCar