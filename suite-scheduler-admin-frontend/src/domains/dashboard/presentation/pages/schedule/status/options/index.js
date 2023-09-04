import React from 'react';
import PropTypes from 'prop-types';
import { SCHEDULE_STATUS, APPOINTMENT_STATES } from '../../../../../application/constants/schedules';
import './Status.scss';

const StatusOptions = ({ statusSelected, appointmentDate, handleSetStatus }) => {
	const showAppointmentOption = (option) => {
		if (option.key === statusSelected) return false;
		return !option.withValidation || option.validation(appointmentDate);
	};

	return statusSelected === SCHEDULE_STATUS.PENDING ? (
		<div className="type-status">
			{APPOINTMENT_STATES.filter((option) => showAppointmentOption(option)).map((option) => (
				<p key={option.key} className={`option ${option.color}`} onClick={() => handleSetStatus(option.key)}>
					{option.value}
				</p>
			))}
		</div>
	) : (
		<></>
	);
};

StatusOptions.propTypes = {
	statusSelected: PropTypes.string.isRequired,
	appointmentDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
	handleSetStatus: PropTypes.func,
};

export default StatusOptions;
