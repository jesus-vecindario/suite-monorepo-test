import React from 'react';
import PropTypes from 'prop-types';

import { createNumberArray } from '../../../../../../shared/application/helpers/common-functions';
import { getHourFormatByNumber } from '../../../../../../shared/application/helpers/date';
import { HOUR_END, HOUR_START } from '../../../../application/constants/date';

import './DayOptions.scss';

const DayOptions = ({ changeShowPopover, updateHour, hourValidation, actualHour }) => {
	const hours = createNumberArray(HOUR_START, HOUR_END);

	function submitHour(hour) {
		updateHour(hour);
		changeShowPopover();
	}

	return (
		<div className="day-options">
			<div className="hours-wrapper">
				{hours
					.filter((hour) => hour > hourValidation)
					.map((hour) => (
						<div key={hour} className={`hour ${hour === actualHour ? 'is-select' : ''}`} onClick={() => submitHour(hour)}>
							<span>{getHourFormatByNumber(hour, true)}</span>
						</div>
					))}
			</div>
		</div>
	);
};

DayOptions.propTypes = {
	changeShowPopover: PropTypes.func,
	updateHour: PropTypes.func,
	hourValidation: PropTypes.number,
	actualHour: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
	isHourEnd: PropTypes.bool,
	setRestDay: PropTypes.func,
};

DayOptions.defaultProps = {
	hourValidation: 0,
};

export default DayOptions;
