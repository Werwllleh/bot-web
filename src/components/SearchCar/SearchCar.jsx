import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './SearchCar.module.css';

import { LoadingOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.min.css';

const SearchCar = () => {

	const [searcheble, setSearcheble] = useState('');

	const [userFileds, setUserFields] = useState(null);

	const { tg } = useTelegram();

	const onSearcheble = (e) => {
		setSearcheble(e.target.value.toUpperCase());
	}

	useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios.post(`https://193.164.149.140/api/searchcar`, {searcheble})
				.then((res) => {
				if (res.data) {
					setUserFields(res.data) 
				}
    });
    }, 1200)
    return () => clearTimeout(delayDebounceFn)
  }, [searcheble])


	useEffect(() => { 
		tg.expand()
	}, [])

	return (
		<div className={s.search_body}>
			<h1 className={s.title}>Поиск авто</h1>
			<input
				maxLength={9}
				className={s.input}
				type="text"
				placeholder='Введи номер авто'
				value={searcheble}
				onChange={onSearcheble}
			/>
			{userFileds ? (
				<div className={s.result_body}>
					<div className={s.image_body}>
						<img src={"https://193.164.149.140/api/image/" + userFileds.carImage} alt="" />
					</div>
					<div className={s.textBody}>
						<ul className={s.list}>
							<li>Владелец: <span>{userFileds.userName}</span></li>
							<li>Авто: <span>{userFileds.carModel}</span></li>
							<li>Год выпуска: <span>{userFileds.carYear}</span></li>
							{userFileds.carNote ? <li>Примечание: <span>{userFileds.carNote}</span></li> : null}
						</ul>
					</div>
				</div>
			) : (
				<div className={s.notFound}>
					<LoadingOutlined style={{textAlign: 'center', fontSize: '16px', color: `var(--tg-theme-text-color) !important` }}/>
				</div>
			)}
		</div>
	)
}

export default SearchCar;

