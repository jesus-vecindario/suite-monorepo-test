import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './ButtonLink.scss';

const ButtonLink = ({ children, route, onClickAction, variants }) => {
	return route.length !== 0 ? (
		<Link to={route} className={`btn-link ${variants}`}>
			{children}
		</Link>
	) : (
		<div className="text-link" onClick={onClickAction}>
			{children}
		</div>
	);
};

ButtonLink.propTypes = {
	children: PropTypes.node,
	route: PropTypes.string,
	onClickAction: PropTypes.func,
	variants: PropTypes.string,
};

ButtonLink.defaultProps = {
	route: '',
};

export default ButtonLink;
