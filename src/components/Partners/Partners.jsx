import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './Partners.module.css';


import { Collapse } from 'antd';
const { Panel } = Collapse;

import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '100px',
	color: `var(--tg-theme-text-color) !important`,
  textAlign: 'center',
  background: '#364d79',
};


const Partners = () => {

	const [partners, setPartners] = useState([]);
	const [categories, setCategories] = useState(0);


	const { tg } = useTelegram();

	useEffect(() => { 
		tg.expand()
	}, [])

	useEffect(() => {

		axios.get(`https://script.google.com/macros/s/AKfycbx1zqpE9SS0MUTL-GdVqFKAxSQQqz65050GZmoNzmhSGQEDrwjN22iQukmiKoXglktVwQ/exec`)
		.then(res => {
			
			for (let i = 0; i < res.data.partners.length; i++) {
				setPartners(res.data.partners[i])
			console.log(partners);

			}


		})

	}, []);

	const onChange = (currentSlide) => {
    console.log(currentSlide);
	};

	
	return (
		<div className={s.partners_body}>
			<h1 className={s.title}>Партнеры клуба</h1>
			<div className={s.content_body}>

					<Collapse ghost accordion>
					<Panel header="This is panel header 1" key="1">
						<Carousel
							arrows
							afterChange={onChange}
						>
							<div className={s.slide_body}>
								<h3 className={s.partner_title}>Название партнера</h3>
								<div className={s.partner_text}>
									<p>Адрес: <span>Address1</span></p>
									<p>Контакты: <span>Tel 1</span></p>
								</div>
							</div>
							<div>
								<h3 style={contentStyle}>2</h3>
							</div>
							<div>
								<h3 style={contentStyle}>3</h3>
							</div>
							<div>
								<h3 style={contentStyle}>4</h3>
							</div>
						</Carousel>
					</Panel>
				</Collapse>

			</div>
		</div>
	)
}

export default Partners