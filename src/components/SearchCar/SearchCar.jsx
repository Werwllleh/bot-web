import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './SearchCar.css';
import '../../App.css';


const SearchCar = () => {

	const [searcheble, setSearcheble] = useState('');
	const { tg } = useTelegram();

	useEffect(() => {
		tg.expand()
	}, [])

	const onSearcheble = (e) => {
		setSearcheble(e.target.value.toUpperCase())
	}

	return (
		<div className={'searchCar'}>
			<h1 className={'title'}>Поиск авто</h1>
			<input className={'input-search'} value={searcheble} onChange={onSearcheble} type="text" placeholder={'Введите номер автомобиля'} />
			<div className={'foundBody'}>
				<div className={'foundCarImg'}>
					<img src="https://193.164.149.140/api/image/446012794.jpeg" alt="" />
				</div>
				<div className={'list'}>
					<div className={'list-right'}>
						<div className={'list-item'}>Авто:</div>
						<div className={'list-item'}>Владелец:</div>
						<div className={'list-item'}>Год авто:</div>
						<div className={'list-item'}>Примечания:</div>
					</div>
					<div className={'list-left'}>
						<div className={'list-item list-item-r'}>Какое-то</div>
						<div className={'list-item list-item-r'}>Кто-то</div>
						<div className={'list-item list-item-r'}>Когда-то</div>
						<div className={'list-item list-item-r'}>Какие-то</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchCar;