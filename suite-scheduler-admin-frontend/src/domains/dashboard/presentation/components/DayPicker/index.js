import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import ReactDayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DayPicker.scss';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/es';
import { newAppointmentFields } from '../../../application/constants/appointment';

const DayPicker = ({ subscribe, control, errors, ...props }) => {
	const [selectedDay, setSelectedDay] = useState();

	const handleDayClick = (day, { selected }, hookFormField) => {
		if (selected) {
			setSelectedDay('');
			subscribe && subscribe('');
			hookFormField?.onChange('');
			return;
		}
		setSelectedDay(day);
		subscribe && subscribe(day, hookFormField);
	};

	return (
		<div className="day-picker-container">
			<Controller
				name={newAppointmentFields.DATE_DAY}
				control={control}
				render={({ field }) => (
					<ReactDayPicker
						onDayClick={(day, modifiers) => handleDayClick(day, modifiers, field)}
						selectedDays={selectedDay}
						localeUtils={MomentLocaleUtils}
						locale="es"
						{...props}
					/>
				)}
			/>
			<div className="footer">
				<p className="error">{errors[newAppointmentFields.DATE_DAY]?.message}</p>
			</div>
		</div>
	);
};

DayPicker.propTypes = {
	subscribe: PropTypes.func,
	control: PropTypes.object,
	errors: PropTypes.object,
};

export default DayPicker;
