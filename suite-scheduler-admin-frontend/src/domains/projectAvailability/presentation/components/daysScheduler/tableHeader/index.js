import React from 'react';

import './TableHeader.scss';

const TableHeader = () => {
	return (
		<thead>
			<tr className="day-scheduler-header-container">
				<td className="empty-row" />
				<td className="day-row">Día / Semana</td>
				<td className="start-row">Hora entrada</td>
				<td className="end-row">Hora salida</td>
				<td className="toggle-row">Día Activo / Descanso</td>
			</tr>
		</thead>
	);
};

export default React.memo(TableHeader);
