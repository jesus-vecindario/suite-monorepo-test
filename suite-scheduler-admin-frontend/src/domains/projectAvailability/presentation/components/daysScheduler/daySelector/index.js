import React from 'react';
import PropTypes from 'prop-types';
import { Icon, TextTag } from '@vecindario/vecindario-suite-components';

import Dropdown from '../../../../../../shared/presentation/components/Dropdown';
import DayOptions from '../dayOptions';
import DayDetail from '../dayDetail';
import ToggleButton from '../../ToogleButton';

import { getNameDayByNumber } from '../../../../../../shared/application/helpers/date';
import { HOUR_END, HOUR_START } from '../../../../application/constants/date';
import { SET_VALUE_OPTIONS } from '../../../../application/schemas/project';
import './DaySelector.scss';
import { ICON_WITH_CHART } from '../../../../../../shared/application/constants/icons';
import { ALARM_ICON } from '../../../../application/constants/icons';

const DaySelector = ({ fieldName, dayNumber, setValue, getValue, register }) => {
	const restDayField = `${fieldName}.d${dayNumber}.isRestDay`;
	const hourStartField = `${fieldName}.d${dayNumber}.hourStart`;
	const hourEndField = `${fieldName}.d${dayNumber}.hourEnd`;
	const DROPDOWN_PADDING = 10;

	const handleRestDay = (value) => {
		if (!value) {
			setValue(hourStartField, null, SET_VALUE_OPTIONS);
			setValue(hourEndField, null, SET_VALUE_OPTIONS);
		} else {
			setValue(hourStartField, HOUR_START, SET_VALUE_OPTIONS);
			setValue(hourEndField, HOUR_END, SET_VALUE_OPTIONS);
		}
		setValue(restDayField, !value, SET_VALUE_OPTIONS);
	};

	const updateHourStart = (hour) => {
		setValue(hourStartField, hour, SET_VALUE_OPTIONS);
	};

	const updateHourEnd = (hour) => {
		setValue(hourEndField, hour, SET_VALUE_OPTIONS);
	};

	const isRestDay = getValue(restDayField);

	return (
		<>
			<tr className={`day-option-row ${isRestDay ? 'rest-day' : ''}`}>
				<td className="empty-row">
					<input className="hide" {...register(restDayField)} />
					<input className="hide" {...register(hourStartField)} />
					<input className="hide" {...register(hourEndField)} />
					<div className="radius" />
				</td>

				<td className="name-row">
					<div className="wrapper">
						<img className="icon" src={ICON_WITH_CHART} />
						<h5 className="name">{getNameDayByNumber(dayNumber)}</h5>
					</div>
				</td>

				<td className="start-date">
					<div className="wrapper">
						<p className="separator">De</p>
						<div className="selector">
							<Dropdown
								isRestDay={isRestDay}
								content={<DayOptions updateHour={updateHourStart} actualHour={getValue(hourStartField)} />}
								padding={DROPDOWN_PADDING}
							>
								<DayDetail hourSelected={getValue(hourStartField)} />
							</Dropdown>
						</div>
					</div>
					{isRestDay ? (
						<div className="alert-rest-day">
							<Icon icon={ALARM_ICON} aditionalClassName="icon" />
							<TextTag variant="-body-xs" className="description">
								Para modificar el horario, activa el dia
							</TextTag>
						</div>
					) : null}
				</td>

				<td className="end-date">
					<div className="wrapper">
						<p className="separator">A</p>
						<div className="selector">
							<Dropdown
								isRestDay={isRestDay}
								content={
									<DayOptions
										isRestDay={isRestDay}
										isHourEnd={true}
										updateHour={updateHourEnd}
										actualHour={getValue(hourEndField)}
										hourValidation={getValue(hourStartField)}
									/>
								}
								padding={DROPDOWN_PADDING}
							>
								<DayDetail hourSelected={getValue(hourEndField)} hourValidation={getValue(hourStartField)} />
							</Dropdown>
						</div>
					</div>
				</td>

				<td className="toggle-row">
					<div className="day-active-section">
						<ToggleButton actionCallback={handleRestDay} externalControl={!isRestDay} />
						<p className={`text ${isRestDay ? 'rest-day' : ''}`}>{!isRestDay ? 'Día Activo' : 'Descanso'}</p>
					</div>
				</td>
			</tr>
		</>
	);
};

DaySelector.propTypes = {
	fieldName: PropTypes.string,
	dayNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	updateValues: PropTypes.func,
	initialData: PropTypes.object,
	setValue: PropTypes.func,
	getValue: PropTypes.func,
	register: PropTypes.func,
};

export default DaySelector;
