import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { newAppointmentFields } from '../../../../../dashboard/application/constants/appointment';
import { dateToProjectDay } from '../../../../../../shared/application/helpers/common-functions';
import { getBusyTimeOnDay } from '../../../../../../shared/application/selectors/appointment';
import {
	getAvailabilityOnDay,
	getSchedulingTime,
} from '../../../../../projectAvailability/application/selectors/project';
import { setFormData } from '../../../../../../shared/application/slices/appointment';
import './HourSelector.scss';

const validateMinHour = (hourStart, selectedDate) => {
	if (selectedDate === moment(new Date()).format('YYYY-MM-DD')) {
		const currentHour = new Date().getHours();
		return currentHour + 1 < hourStart ? hourStart : currentHour + 1;
	}
	return hourStart;
};

const renderHours = (
	{ hourStart, hourEnd, minuteStart = 0, minuteEnd = 0 },
	selectedDate,
	schedulingTime,
	busyHours,
) => {
	const endHourMoment = moment(selectedDate).set({ hour: hourEnd, minute: minuteEnd });
	const startHourMoment = moment(selectedDate).set({ hour: hourStart, minute: minuteStart });
	let result = [];

	while (startHourMoment < endHourMoment) {
		result.push(startHourMoment.format('hh:mm A'));
		startHourMoment.add(schedulingTime, 'minutes');
	}
	if (busyHours?.length) {
		result = result.filter((hour) => !busyHours.includes(hour));
	}

	return [...new Set(result)];
};

const parseBusyHours = (busyTimeOnDay, selectedDate, schedulingTime) => {
	let busyHours = [];
	const parseBusyTimeOnDay = busyTimeOnDay?.map((busy) => busy.busyTime);
	parseBusyTimeOnDay?.forEach((time) => {
		time?.forEach((hours) => {
			const timeObj = {
				hourStart: moment(hours.start).hour(),
				minuteStart: moment(hours.start).minute(),
				hourEnd: moment(hours.end).hour(),
				minuteEnd: moment(hours.end).minute(),
			};
			const busyTime = renderHours(timeObj, selectedDate, schedulingTime);
			busyHours = busyHours.concat(busyTime);
		});
	});
	return [...new Set(busyHours)];
};

const setAvailabilityOnDay = (availabilityOnDay, busyTimeOnDay, selectedDate) => {
	const adviserHourStart = moment(busyTimeOnDay?.[0]?.user_availability?.startHour).hour();
	const adviserHourEnd = moment(busyTimeOnDay?.[0]?.user_availability?.endHour).hour();
	return {
		isRestDay: availabilityOnDay?.isRestDay,
		hourStart: validateMinHour(
			adviserHourStart <= availabilityOnDay.hourStart ? availabilityOnDay.hourStart : adviserHourStart,
			selectedDate,
		),
		hourEnd: adviserHourEnd >= availabilityOnDay.hourEnd ? availabilityOnDay.hourEnd : adviserHourEnd,
	};
};

const HourSelector = ({ control, errors }) => {
	const dispatch = useDispatch();
	const selectedHour = useSelector((state) => state?.appointment?.[newAppointmentFields.DATE_HOUR]);
	const selectedDate = useSelector((state) => state?.appointment?.[newAppointmentFields.DATE_DAY]);

	const schedulingTime = useSelector(getSchedulingTime());
	const parsedTime = dateToProjectDay(selectedDate);
	let availabilityOnDay = useSelector(getAvailabilityOnDay(parsedTime));

	const busyTimeOnDay = useSelector(getBusyTimeOnDay);

	const handleClick = (hour, hookFormField) => {
		dispatch(setFormData({ [newAppointmentFields.DATE_HOUR]: hour }));
		hookFormField?.onChange(hour);
	};

	if (!availabilityOnDay) return null;
	availabilityOnDay = setAvailabilityOnDay(availabilityOnDay, busyTimeOnDay, selectedDate);
	const busyHours = parseBusyHours(busyTimeOnDay, selectedDate, schedulingTime);
	const result = renderHours(availabilityOnDay, selectedDate, schedulingTime, busyHours);

	return (
		<div className="hour-selector-container">
			<Controller
				name={newAppointmentFields.DATE_HOUR}
				control={control}
				render={({ field }) => (
					<>
						<p className="title">Tus horas disponibles el {moment(selectedDate).format('DD [de] MMMM')}</p>
						<div className="hours-container">
							{result.map((hour) => (
								<div
									key={hour}
									className={`hour-box ${hour === selectedHour ? '-active' : ''}`}
									onClick={() => handleClick(hour, field)}
								>
									<div className="hour">{hour}</div>
								</div>
							))}
						</div>
					</>
				)}
			/>
			<div className="input-container">
				<div className="footer">
					<p className="error">{errors[newAppointmentFields.DATE_HOUR]?.message}</p>
				</div>
			</div>
		</div>
	);
};

HourSelector.propTypes = {
	control: PropTypes.object,
	errors: PropTypes.object,
};

export default HourSelector;
