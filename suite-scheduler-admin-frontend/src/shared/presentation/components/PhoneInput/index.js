import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { PhoneInput as Input } from '@vecindario/vecindario-suite-components';

const PhoneInput = ({ fieldName, control, error, initialValue, label, errorClassName }) => {
	return (
		<Controller
			name={fieldName}
			control={control}
			render={({ field: { onChange, value, name } }) => (
				<Input
					name={name}
					label={label}
					onChange={(item) => onChange(item.target.value)}
					error={error}
					defaultValue={initialValue}
					errorClassName={errorClassName}
					value={value}
					showErrorIcon={false}
				/>
			)}
			defaultValue={initialValue}
		/>
	);
};

PhoneInput.propTypes = {
	fieldName: PropTypes.string,
	control: PropTypes.object,
	error: PropTypes.string,
	initialValue: PropTypes.string,
	label: PropTypes.string,
	errorClassName: PropTypes.string,
};

PhoneInput.defaultProps = {
	error: '',
	label: '',
	initialValue: '',
	errorClassName: 'phone-error-message',
};

export default PhoneInput;
