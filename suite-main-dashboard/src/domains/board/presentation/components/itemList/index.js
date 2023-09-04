import React from 'react';
import PropTypes from 'prop-types';

import { CHECK_ITEM } from '../../../application/constants/icons';

import './ItemList.scss';

const ItemList = ({ isComplete = false, textComponent }) => {
	return (
		<div className={`item-list-container ${isComplete ? 'text-decoration' : ''}`}>
			<div className={`circle ${isComplete ? 'item-checked' : ''}`}>
				{isComplete && <i className={`icon ${CHECK_ITEM}`} />}
			</div>
			{textComponent}
		</div>
	);
};

ItemList.propTypes = {
	isComplete: PropTypes.bool,
	textComponent: PropTypes.node,
};

export default ItemList;
