import React from 'react';
import PropTypes from 'prop-types';
import { TextTag, ToggleSwitch } from '@vecindario/vecindario-suite-components';
import './ConfigurationCard.scss';

const ConfigurationCard = ({ title = '', description = '', active = false, onChange = () => {} }) => {
	const handleChange = (e) => {
		onChange && onChange(e.target.checked);
	};

	return (
		<article className="configuration-card">
			<div>
				<TextTag tag="b" variant="-body" fw="bold">
					{title}
				</TextTag>
				<TextTag tag="p" variant="-body-sm">
					{description}
				</TextTag>
			</div>
			<ToggleSwitch id="active" value={active} onChange={handleChange} />
		</article>
	);
};

ConfigurationCard.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	active: PropTypes.bool,
	onChange: PropTypes.func,
};

export default ConfigurationCard;
