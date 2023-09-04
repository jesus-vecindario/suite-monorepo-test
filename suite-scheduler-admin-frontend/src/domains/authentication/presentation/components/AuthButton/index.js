import React from 'react';
import PropTypes from 'prop-types';
import './AuthButton.scss';

const AuthButton = ({ children, variants, ...rest }) => {
	return (
		<div className={`button-shadow ${variants}`} {...rest}>
			{children}
		</div>
	);
};

AuthButton.propTypes = {
	children: PropTypes.node,
	variants: PropTypes.string,
};

export default AuthButton;
