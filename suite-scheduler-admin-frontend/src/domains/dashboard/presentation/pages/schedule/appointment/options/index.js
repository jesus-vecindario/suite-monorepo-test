import React from 'react';
import PropTypes from 'prop-types';
import './Appointment.scss';
import { APPOINTMENT_OPTIONS, SCHEDULE_STATUS } from '../../../../../application/constants/schedules';

const AppointmentOptions = ({ setAppointmentSelected, statusSelected, updateAppointmentType }) => {
	const updateOption = (key) => {
		setAppointmentSelected(key);
		updateAppointmentType(key);
	};

	return statusSelected === SCHEDULE_STATUS.PENDING ? (
		<div className="type-appointment">
			{APPOINTMENT_OPTIONS.map((option) => (
				<p key={option.key} className="option" onClick={() => updateOption(option.key)}>
					{option.value}
				</p>
			))}
		</div>
	) : (
		<></>
	);
};

AppointmentOptions.propTypes = {
	setAppointmentSelected: PropTypes.func,
	statusSelected: PropTypes.string.isRequired,
	updateAppointmentType: PropTypes.func,
};

export default AppointmentOptions;
