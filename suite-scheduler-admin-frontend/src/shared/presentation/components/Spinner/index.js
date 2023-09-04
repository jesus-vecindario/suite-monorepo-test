import React from 'react';
import './Spinner.scss';

const Spinner = (props) => {
	return (
		<div className="container-spinner">
			<i className="ri-loader-5-line loading-spinner" {...props} />
		</div>
	);
};

export default Spinner;
