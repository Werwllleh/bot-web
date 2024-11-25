import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
	return (
		<div className="loader">
			<div className="loader__body">
				<div className="loader__text">
					<span>vag</span>
					<span>club21</span>
				</div>
				<div className="loader__icon">
					<LoadingOutlined />
				</div>
			</div>
		</div>
	)
}

export default Loader;

