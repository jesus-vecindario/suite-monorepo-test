import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { ICON_ARROW_DOWN } from '../../../../../../shared/application/constants/icons';
import { formatDate } from '../../../../../../shared/application/helpers/date';

import './DayDetail.scss';

const DayDetail = ({ hourSelected, hourValidation }) => {
	const errorValidation = useMemo(() => {
		if (hourSelected) {
			return hourValidation >= hourSelected;
		}
		return false;
	}, [hourSelected, hourValidation]);

	return (
		<div className={`day-detail ${errorValidation ? 'error' : ''} ${hourSelected ? '' : 'rest-day'}`}>
			<div className={`hour`}>{hourSelected ? formatDate(hourSelected) : 'Descanso'}</div>
			<i className={`${ICON_ARROW_DOWN} icon`} />
		</div>
	);
};

DayDetail.propTypes = {
	hourSelected: PropTypes.number,
	hourValidation: PropTypes.number,
};

DayDetail.defaultProps = {
	hourValidation: 0,
};

export default DayDetail;
