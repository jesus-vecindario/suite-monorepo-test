import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import PropTypes from 'prop-types';

import { SCHEDULES_DATA } from '../../../application/constants/schedules';
import { getAppointmentStats } from '../../../../appointment/infrastructure/api';
import useAutoIncrementNumber, { AMOUNT_STEPS } from '../../../../../shared/application/hooks/useAutoIncrementNumber';
import SchedulerStat from './schedulerStat';
import './AssessorSchedulerStats.scss';

const defaultStat = { amount: 0, percentage: 0 };

const AssessorSchedulerStats = ({ callRequest }) => {
	const [stats, setStats] = useState({});
	const currentProject = useSelector(getCurrentProject);
	const { total_amount } = stats;
	const totalAutoIncrement = useAutoIncrementNumber(total_amount || 0, 0, total_amount / AMOUNT_STEPS, 0);

	useEffect(() => {
		let cancelled = false;
		if (callRequest) {
			getAppointmentStats(currentProject.slug)
				.then((resp) => {
					if (!cancelled) setStats(resp);
				})
				.catch(() => {}); // ERROR DISCARDED
		}
		return () => {
			cancelled = true;
		};
	}, [callRequest, currentProject]);

	return (
		<div className="scheduler-stats-container">
			<h4 className="title">Estadísticas</h4>
			<div className="total-schedules-container">
				<h2 className="amount">{totalAutoIncrement}</h2>
				<p className="text-title">Agendamientos</p>
			</div>
			<div className="margin-top-7">
				{SCHEDULES_DATA.map((stat) => (
					<SchedulerStat key={stat.key} metadata={stat} data={stats[`${stat.key}_stats`] || defaultStat} />
				))}
			</div>
		</div>
	);
};

AssessorSchedulerStats.propTypes = {
	callRequest: PropTypes.bool.isRequired,
};

export default AssessorSchedulerStats;
