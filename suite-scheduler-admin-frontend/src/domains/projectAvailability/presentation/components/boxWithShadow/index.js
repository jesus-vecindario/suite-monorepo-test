import React from 'react';
import PropTypes from 'prop-types';

import './BoxWithShadow.scss';

const BoxWithShadow = ({ children, margin = 'O', boxClass, ...rest }) => {
	return (
		<div style={{ margin }} className={boxClass} {...rest}>
			{children}
		</div>
	);
};

BoxWithShadow.propTypes = {
	children: PropTypes.node,
	margin: PropTypes.string,
	boxClass: PropTypes.string,
};

BoxWithShadow.defaultProps = {
	boxClass: 'box-shadow',
};

export default BoxWithShadow;
