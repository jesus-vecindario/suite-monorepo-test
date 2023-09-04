import React from 'react';
import PropTypes from 'prop-types';

import AppointmentRow from './appointmentRow';

import './CardTableBody.scss';

const CardTableBody = ({ schedule, index }) => {
	return <AppointmentRow schedule={schedule} index={index} />;
};

CardTableBody.propTypes = {
	schedule: PropTypes.object,
	index: PropTypes.number,
};

export default CardTableBody;
