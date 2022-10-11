import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';


const Form = () => {

	const [name, setName] = useState('');
	const [car, setCar] = useState('');
	const [carNum, setCarNum] = useState('');
	const [carNote, setCarNote] = useState('');

	const onChangeName = (e) => {
        setCountry(e.target.value)
	}

	const onChangeCar = (e) => {
			setStreet(e.target.value)
	}

	const onChangeCarNum = (e) => {
			setSubject(e.target.value)
	}
	
	const onChangeCarNote = (e) => {
        setSubject(e.target.value)
	}


	return (
		<div className={'form'}>
			<h1 className={'title'}>Регистрация</h1>
			<input className={'input'} value={name} onChange={onChangeName} type="text" placeholder={'Имя и фамилия*'}/>
			<input className={'input'} value={car} onChange={onChangeCar} type="text" placeholder={'Марка и модель авто*'} />
			<input className={'input'} value={carNum} onChange={onChangeCarNum} type="text" placeholder={'Номер вашего авто*'}/>
			<input className={'input'} value={carNote} onChange={onChangeCarNote} type="text" placeholder={'Примечание к авто'} />
			<div className={'form-footer'}>
				<p>Поля со * обязательны к заполнению</p>
			</div>
		</div>
	);
};

export default Form;