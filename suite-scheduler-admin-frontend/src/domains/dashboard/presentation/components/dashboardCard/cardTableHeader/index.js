import React from 'react';
import PropTypes from 'prop-types';

import { DIRECTOR_ROLE } from '../../../../../projectAvailability/application/constants/project';

import './CardTableHeader.scss';

const CardTableHeader = ({ isTeamPage, rol }) => {
	if (!isTeamPage)
		return (
			<tr className="card-header team-th">
				<th className="col-hour">Hora</th>
				<th className="col-name">Cliente</th>
				<th className="col-phone">Teléfono</th>
				<th className="col-type">Tipo de Cita</th>
				<th className="col-status">Estado</th>
				{/* <th className="col-projectAvailability">Proyecto</th> */}
				<th className="col-link">Link</th>
			</tr>
		);

	return (
		<tr className="card-header team-th">
			<th></th>
			<th>Nombre</th>
			<th>Email</th>
			<th>Teléfono</th>
			{rol !== DIRECTOR_ROLE && <th>Director designado</th>}
			<th></th>
		</tr>
	);
};

CardTableHeader.propTypes = {
	isTeamPage: PropTypes.bool,
	rol: PropTypes.string,
};

export default CardTableHeader;
