import React from 'react';
import { useDispatch } from 'react-redux';
import { setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import PropTypes from 'prop-types';
import { ICON_ARROW_DOWN } from '../../../../../../../shared/application/constants/icons';
import { SCHEDULE_STATUS, APPOINTMENT_STATES } from '../../../../../application/constants/schedules';
import { warningToast } from '../../../../../../../shared/application/helpers/toast';
import './Selected.scss';

const StatusSelected = ({ optionSelected }) => {
	const option = APPOINTMENT_STATES.find((appointment) => appointment.key === optionSelected);

	const dispatch = useDispatch();

	const handleClick = () => {
		if (optionSelected !== SCHEDULE_STATUS.PENDING) {
			dispatch(setMessageToast(warningToast('No se puede actualizar')));
		}
	};

	return (
		<div className="container-selected-status" onClick={handleClick}>
			<div className={`selected-status ${option.color}`}>
				{option.value} <i className={`${ICON_ARROW_DOWN} icon`} />
			</div>
		</div>
	);
};

StatusSelected.propTypes = {
	optionSelected: PropTypes.string,
};

export default StatusSelected;
