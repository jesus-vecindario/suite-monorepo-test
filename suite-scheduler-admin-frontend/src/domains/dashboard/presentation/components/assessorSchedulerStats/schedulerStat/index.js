import React from 'react';
import PropTypes from 'prop-types';

import './SchedulerStat.scss';
import useAutoIncrementNumber, {
	AMOUNT_STEPS,
} from '../../../../../../shared/application/hooks/useAutoIncrementNumber';

const SchedulerStat = ({ metadata, data }) => {
	const percentageAutoIncrement = useAutoIncrementNumber(data.percentage, 0, data.percentage / AMOUNT_STEPS, 0);
	const amountAutoIncrement = useAutoIncrementNumber(data.amount, 0, data.amount / AMOUNT_STEPS);
	return (
		<div className="stat-container margin-y-5">
			<div className={`card ${metadata.color}`}>
				<i className={metadata.icon} />
			</div>
			<div className="data-container" style={{ color: metadata.color }}>
				<p className="values">
					{amountAutoIncrement}
					<span className="percentage">({percentageAutoIncrement}%)</span>
				</p>
				<p className="title">{metadata.title}</p>
			</div>
		</div>
	);
};

SchedulerStat.propTypes = {
	metadata: PropTypes.shape({
		color: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
	}),
	data: PropTypes.shape({ amount: PropTypes.number.isRequired, percentage: PropTypes.number.isRequired }),
};

export default SchedulerStat;
