import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import s from './Partners.module.css';

import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const Partners = () => {

	const [partners, setPartners] = useState([]);

	const { tg } = useTelegram();

	useEffect(() => { 
		tg.expand()
	}, [])

	useEffect(() => {

		axios.get(`https://script.google.com/macros/s/AKfycbx1zqpE9SS0MUTL-GdVqFKAxSQQqz65050GZmoNzmhSGQEDrwjN22iQukmiKoXglktVwQ/exec`)
		.then(res => {
			console.log(res.data.partners);
			setPartners(res.data.partners)
		})
		// .finally(() => setFetching(false))

	}, []);

	const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

	return (
		<div className={s.partners_body}>
			<h1 className={s.title}>Партнеры клуба</h1>
			<div className={s.content_body}>
				<Collapse accordion>
					<Panel header="This is panel header 1" key="1">
						<Carousel afterChange={onChange}>
							<div>
								<h3 style={contentStyle}>1</h3>
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
					<Panel header="This is panel header 2" key="2">
						<Carousel afterChange={onChange}>
							<div>
								<h3 style={contentStyle}>1</h3>
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
					<Panel header="This is panel header 3" key="3">
						<Carousel afterChange={onChange}>
							<div>
								<h3 style={contentStyle}>1</h3>
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