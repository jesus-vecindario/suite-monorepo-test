import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dateTypes, newAppointmentFields } from '../../../../../dashboard/application/constants/appointment';
import { setFormData } from '../../../../../../shared/application/slices/appointment';
import { getHasCalendar } from '../../../../../../shared/application/selectors/myProfile';
import { ICON_ERROR_WARNING } from '../../../../../../shared/application/constants/icons';
import { profileSyncRoute } from '../../../../../profile/infrastructure/routes';
import { getSchedulerPermissions } from '../../../../../../shared/application/selectors/core';
import './DateType.scss';

const DateType = ({ appointmentType, control, errors, setValue }) => {
	const dispatch = useDispatch();
	const dateType = useSelector((state) => state?.appointment?.[newAppointmentFields.DATE_TYPE]) || appointmentType;
	const hasCalendar = useSelector(getHasCalendar);
	const permissions = useSelector(getSchedulerPermissions);

	const showWarning = !hasCalendar && dateType === dateTypes.DIGITAL_TYPE;

	const handleSelectDay = (type, hookFormField) => {
		dispatch(setFormData({ [newAppointmentFields.DATE_TYPE]: type }));
		hookFormField?.onChange(type);
	};

	useEffect(() => {
		if (permissions?.appointment_type.length === 1) {
			dispatch(setFormData({ [newAppointmentFields.DATE_TYPE]: permissions?.appointment_type[0] }));
			setValue(newAppointmentFields.DATE_TYPE, permissions?.appointment_type[0], { shouldTouch: true, shouldDirty: true });
		}
	}, [permissions, dispatch, setValue]);

	const hiddeOption = (type) => (!permissions?.appointment_type.some((permission) => permission === type) ? 'hide' : '');

	return (
		<>
			<Controller
				name={newAppointmentFields.DATE_TYPE}
				control={control}
				render={({ field }) => (
					<div className="date-type-container">
						<span className="label">Tipo de cita</span>
						<div
							className={`type ${dateType === dateTypes.PHYSICAL_TYPE ? '-active' : ''} ${hiddeOption(
								dateTypes.PHYSICAL_TYPE,
							)}`}
							onClick={() => handleSelectDay(dateTypes.PHYSICAL_TYPE, field)}
						>
							Fisica
						</div>
						<div
							className={`type ${dateType === dateTypes.DIGITAL_TYPE ? '-active' : ''} ${hiddeOption(dateTypes.DIGITAL_TYPE)}`}
							onClick={() => handleSelectDay(dateTypes.DIGITAL_TYPE, field)}
						>
							Digital
						</div>
					</div>
				)}
			/>
			<div className="date-type-error">
				<p className="error">{errors[newAppointmentFields.DATE_TYPE]?.message}</p>
			</div>
			{showWarning && (
				<div className="date-type-warning">
					<i className={`${ICON_ERROR_WARNING} warning-icon`}></i>
					<p className="text-warning">
						En este momento no estás sincronizado, recuerda
						<br />
						que para generar un link de agendamiento debes <br />
						<Link to={profileSyncRoute} className="link-sync">
							<b> sincronizarte y así vivir la experiencia.</b>
						</Link>
					</p>
				</div>
			)}
		</>
	);
};

DateType.propTypes = {
	appointmentType: PropTypes.string,
	control: PropTypes.object,
	errors: PropTypes.object,
	setValue: PropTypes.func,
};

DateType.defaultProps = {
	appointmentType: '',
};

export default DateType;
