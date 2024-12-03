import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
	return (
		<div className="loader">
			<div className="loader__body">
				<div className="loader__text">
					<p>
						<span>v</span>
						<span>a</span>
						<span>g</span>
					</p>
					<p>
						<span>c</span>
						<span>l</span>
						<span>u</span>
						<span>b</span>
						<span>2</span>
						<span>1</span>
					</p>
				</div>
				<div className="loader__icon">
					<LoadingOutlined />
				</div>
			</div>
		</div>
	)
}

export default Loader;

