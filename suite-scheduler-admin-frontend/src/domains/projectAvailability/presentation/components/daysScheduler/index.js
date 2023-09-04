import React from 'react';
import PropTypes from 'prop-types';

import DaySelector from './daySelector';
import { createNumberArray, isEmptyObject } from '../../../../../shared/application/helpers/common-functions';
import './DaysScheduler.scss';
import TableHeader from './tableHeader';

const DaysScheduler = ({ fieldName, errors, getValue, setValue, initialData, register }) => {
	const days = isEmptyObject(initialData) ? createNumberArray(1, 7) : Object.keys(initialData);

	return (
		<div className={`days-scheduler`}>
			<table cellPadding={0} cellSpacing={0} className="wrapper">
				<TableHeader />
				<tbody>
					{days.map((day) => (
						<DaySelector
							initialData={initialData[day] || {}}
							key={day}
							dayNumber={day.slice(-1)}
							errors={errors}
							fieldName={fieldName}
							register={register}
							setValue={setValue}
							getValue={getValue}
						/>
					))}
				</tbody>
			</table>
			<div className="error">{errors[fieldName]?.message}</div>
		</div>
	);
};

DaysScheduler.propTypes = {
	fieldName: PropTypes.string,
	errors: PropTypes.object,
	getValue: PropTypes.func,
	setValue: PropTypes.func,
	initialData: PropTypes.object,
	onUpdate: PropTypes.func,
	register: PropTypes.func,
};

DaysScheduler.defaultProps = {
	size: 'medium',
	initialData: {},
	title: '',
	register: {},
};

export default DaysScheduler;
