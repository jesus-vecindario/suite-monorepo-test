import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from '../../../../../shared/application/helpers/common-functions';
import './ToogleButton.scss';

const ToggleButton = ({ externalControl, actionCallback, display, classModifier }) => {
	const [_checked, setChecked] = useState(() => externalControl || false);
	const [locked, lockAction] = useState(false);
	const debounceRef = useRef();
	const controlledHandler = useCallback(() => {
		if (locked) return;
		if (actionCallback && typeof actionCallback === 'function') {
			lockAction(true);
			debounce(
				debounceRef,
				() => {
					actionCallback(!_checked);
					lockAction(false);
				},
				350,
			);
		}
		setChecked((prev) => !prev);
	}, [_checked, actionCallback, locked]);

	useEffect(() => {
		if (externalControl === true || externalControl === false) setChecked(externalControl);
	}, [externalControl]);

	const renderDisplay = useCallback(() => {
		if (!display) return null;
		const { active, inactive } = display;
		if (_checked) {
			return active;
		}
		return inactive;
	}, [display, _checked]);

	return (
		<div
			onClick={controlledHandler}
			className={`toggle__container ${_checked ? '-active' : ''} ${classModifier.container}`}
		>
			<div
				className={`toggle__circle ${_checked ? 'toggle__circle--active' : 'toggle__circle--inactive'} ${
					classModifier.circle
				}`}
			>
				{renderDisplay()}
			</div>
		</div>
	);
};

ToggleButton.propTypes = {
	externalControl: PropTypes.bool,
	actionCallback: PropTypes.func.isRequired,
	display: PropTypes.shape({
		active: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
		inactive: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
	}),
	classModifier: PropTypes.shape({
		container: PropTypes.string.isRequired,
		circle: PropTypes.string,
	}),
};

ToggleButton.defaultProps = {
	classModifier: {
		container: '',
		circle: '',
	},
};

export default ToggleButton;
