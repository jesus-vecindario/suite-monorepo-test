import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { ICON_ARROW_DOWN } from '../../../../../../../shared/application/constants/icons';
import { SCHEDULE_STATUS, APPOINTMENT_OPTIONS } from '../../../../../application/constants/schedules';
import './Selected.scss';
import { errorToast } from '../../../../../../../shared/application/helpers/toast';

const AppointmentSelected = ({ optionSelected, appointmentTypeSelected }) => {
	const option =
		APPOINTMENT_OPTIONS.find((appointment) => appointment.key === optionSelected)?.value || APPOINTMENT_OPTIONS[0]?.value;
	const dispatch = useDispatch();

	const handleClick = () => {
		if (appointmentTypeSelected !== SCHEDULE_STATUS.PENDING) {
			dispatch(setMessageToast(errorToast('No se puede actualizar')));
		}
	};

	return (
		<div className="container-selected-appointment" onClick={handleClick}>
			<div className="selected-appointment">
				{option} <i className={`${ICON_ARROW_DOWN} icon`} />
			</div>
		</div>
	);
};

AppointmentSelected.propTypes = {
	optionSelected: PropTypes.string,
	appointmentTypeSelected: PropTypes.string,
};

export default AppointmentSelected;
