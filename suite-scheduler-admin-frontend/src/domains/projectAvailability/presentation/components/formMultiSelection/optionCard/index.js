import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextTag } from '@vecindario/vecindario-suite-components';

import './OptionCard.scss';

const OptionCard = ({ option, selectOption, optionSelected }) => {
	const onSelect = (value) => selectOption(value);
	const isSelected = (selected = 'selected', noSelected = '') =>
		option.value === optionSelected ? selected : noSelected;

	return (
		<Button
			type="button"
			variant={`${isSelected('default', 'bordered')}`}
			className={`option-button ${isSelected()}`}
			onClick={() => onSelect(option.value)}
		>
			{!!option.icon && <i className={`${option.icon} icon ${isSelected()}`} />}
			<TextTag tag="p" fw="normal" variant="-body-sm" className={`text ${isSelected()}`}>
				{option.label}
			</TextTag>
		</Button>
	);
};

OptionCard.propTypes = {
	option: PropTypes.object,
	selectOption: PropTypes.func,
	optionSelected: PropTypes.string,
};

export default OptionCard;
