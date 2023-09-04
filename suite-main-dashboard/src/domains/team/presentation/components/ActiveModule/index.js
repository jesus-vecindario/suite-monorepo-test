import React from 'react';
import PropTypes from 'prop-types';
import './ActiveModule.scss';

const ActiveModule = ({ text }) => {
	return (
		<div className="active-module">
			<p className="name-module -initial">{text}</p>
		</div>
	);
};

ActiveModule.propTypes = {
	text: PropTypes.string,
};

export default ActiveModule;
