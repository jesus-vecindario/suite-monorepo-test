import React from 'react';
import PropTypes from 'prop-types';
import './LoadingPage.scss';

const LoadingPage = ({ onPage }) => {
	return (
		<div className={`${onPage ? 'overlay-loaging' : 'loading-component-ctn'}`}>
			<div className="loading-ctn">
				<i className="fal fa-spinner-third fa-spin " />
				{onPage && <p>Cargando...</p>}
			</div>
		</div>
	);
};

LoadingPage.propTypes = {
	onPage: PropTypes.bool,
};

LoadingPage.defaultProps = {
	onPage: true,
};

export default LoadingPage;
