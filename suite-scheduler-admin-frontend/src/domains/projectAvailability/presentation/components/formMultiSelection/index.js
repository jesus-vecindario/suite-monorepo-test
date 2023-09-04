import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextTag } from '@vecindario/vecindario-suite-components';

import { SET_VALUE_OPTIONS, setManualError } from '../../../application/schemas/project';
import { EMPTY_OPTION } from '../../../../../shared/application/constants/messages/error-messages';
import './FormMultiSelection.scss';

const FormMultiSelection = ({
	labelText,
	children,
	setValue,
	fieldName,
	errors,
	initialData,
	setError,
	clearErrors,
	register,
}) => {
	const [optionSelected, setOptionSelected] = useState(initialData);

	const selectOption = (option) => {
		if (option === optionSelected) {
			setOptionSelected('');
			setValue(fieldName, '', SET_VALUE_OPTIONS);
			setError(fieldName, setManualError(EMPTY_OPTION));
		} else {
			setOptionSelected(option);
			setValue(fieldName, option, SET_VALUE_OPTIONS);
			clearErrors(fieldName);
		}
	};

	useEffect(() => {
		setOptionSelected(initialData);
	}, [errors, initialData]);

	return (
		<>
			<input className="hide" {...register(fieldName)} />
			<div className="multi-selection">
				<TextTag tag="h4" fw="normal" variant="-body" className="title">
					{labelText}
				</TextTag>
				<div className="options-wrapper">
					{React.Children.map(children, (child) => {
						return React.cloneElement(child, { selectOption, optionSelected });
					})}
				</div>
				<div className="error">{errors[fieldName]?.message}</div>
			</div>
		</>
	);
};

FormMultiSelection.propTypes = {
	labelText: PropTypes.string,
	children: PropTypes.node,
	setValue: PropTypes.func,
	fieldName: PropTypes.string,
	errors: PropTypes.object,
	initialData: PropTypes.string,
	setError: PropTypes.func,
	clearErrors: PropTypes.func,
	register: PropTypes.func,
};

export default FormMultiSelection;
