import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Icon, TextTag } from '@vecindario/vecindario-suite-components';
import { MODULE_ICONS } from '../../../../application/constants/modules';
import './Module.scss';

const Module = ({ title, description, name = '' }) => {
	const icon = useMemo(() => {
		if (name) {
			return MODULE_ICONS[name];
		}
		return null;
	}, [name]);

	return (
		<div className="wapper-module">
			<div className="container-icon">
				<Icon size="large" icon={icon} aditionalClassName="icon" />
			</div>
			<div className="container-body">
				<TextTag variant="-body-sm" fw="bold" className="title">
					{title}
				</TextTag>
				<TextTag variant="-body-sm" className="description">
					{description}
				</TextTag>
			</div>
		</div>
	);
};

Module.propTypes = {
	name: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
};

export default Module;
