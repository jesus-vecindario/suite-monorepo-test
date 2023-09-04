import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import CardTableHeader from './cardTableHeader';
import CardTableBody from './cardTableBody';

import { ICON_CALENDAR } from '../../../../../shared/application/constants/icons';
import { getFullDateWithDay } from '../../../../../shared/application/helpers/date';
import './DashboardCard.scss';

const DashboardCard = ({
	isTeamPage = false,
	rol,
	id,
	users,
	containerClassName = '',
	date = null,
	schedules = null,
	isScrollFocusCard,
}) => {
	const setDate = () => (!isTeamPage && date ? getFullDateWithDay(date) : 'Date');

	const sortedSchedules = useMemo(() => {
		if (schedules) {
			return [...schedules]?.sort((a, b) => {
				if (a.appointment_date > b.appointment_date) {
					return 1;
				}
				if (a.appointment_date < b.appointment_date) {
					return -1;
				}

				return 0;
			});
		}
		return null;
	}, [schedules]);

	return (
		<div className="card-schedule">
			<i className={`${ICON_CALENDAR} icon ${isTeamPage ? 'isHidden' : ''}`} />
			<h3
				className={`date ${isTeamPage ? 'hidden' : ''}`}
				id={`${isScrollFocusCard ? 'dashboard-appointment-today' : ''}`}
			>
				{setDate()}
			</h3>
			<div className={`container-card ${containerClassName} ${!users?.length ? 'message-error' : ''}`}>
				{!users?.length && isTeamPage === true ? (
					<p className="empty-list">No hay {`${rol}es`} registrados</p>
				) : (
					<table className="card-table">
						<thead>
							<CardTableHeader isTeamPage={isTeamPage} rol={rol} />
						</thead>
						<tbody>
							{isTeamPage
								? users?.map((user, index) => (
										<CardTableBody
											key={user.id}
											rol={rol}
											isTeamPage={isTeamPage}
											user={user}
											isLast={index + 1 === users.length}
										/>
								  ))
								: sortedSchedules?.map((schedule, index) => (
										<CardTableBody key={`${date}-${index}`} schedule={schedule} index={index} />
								  ))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

DashboardCard.propTypes = {
	isTeamPage: PropTypes.bool,
	rol: PropTypes.string,
	id: PropTypes.number,
	users: PropTypes.array,
	containerClassName: PropTypes.string,
	date: PropTypes.string,
	schedules: PropTypes.array,
	isScrollFocusCard: PropTypes.bool,
};

export default DashboardCard;
