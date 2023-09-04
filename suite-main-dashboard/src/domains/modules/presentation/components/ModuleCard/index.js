import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './ModuleCard.scss';
import { useSelector, useDispatch } from 'react-redux';
import { ToggleSwitch, Icon } from '@vecindario/vecindario-suite-components';
import { moduleLinks } from '@vecindario/suite-library';
import { PROD_ENV } from '../../../../../shared/application/constants/env';
import { getActiveModules } from '../../../application/selectors/modules';
import { toggleActiveModule } from '../../../application/slices/modules';

const ModuleCard = ({ moduleId, iconModule, title, description, slug, disabled, moduleKey }) => {
	const dispatch = useDispatch();
	const activeModulesQuery = useSelector(getActiveModules);

	const activeModule = useMemo(() => {
		const even = (module) => module.suite_module_id === moduleId;
		return activeModulesQuery.some(even);
	}, [activeModulesQuery, moduleId]);

	const handleToggle = () => {
		dispatch(toggleActiveModule({ slug, moduleId }));
	};

	return (
		<div className="container-module-card">
			<section className="header-card">
				<div className="container-icon">
					{activeModule ? (
						<a href={moduleLinks[moduleKey][PROD_ENV]} target="_blank" rel="noreferrer">
							<Icon icon={iconModule} size="medium" aditionalClassName="icon-module" />
						</a>
					) : (
						<Icon icon={iconModule} size="medium" aditionalClassName="icon-module" />
					)}
				</div>
				<h5 className="title">
					{activeModule ? (
						<a href={moduleLinks[moduleKey][PROD_ENV]} target="_blank" rel="noreferrer">
							{title}
						</a>
					) : (
						title
					)}
				</h5>
			</section>
			<section className="body-card">
				<p className="description">{description}</p>
			</section>
			<section className="footer-card">
				{!disabled && <ToggleSwitch.Label disabled={disabled} id={moduleId} value={activeModule} onChange={handleToggle} />}
			</section>
		</div>
	);
};

ModuleCard.propTypes = {
	moduleId: PropTypes.string.isRequired,
	iconModule: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	slug: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	moduleKey: PropTypes.string,
};

ModuleCard.defaultProps = {
	disabled: true,
	showMore: false,
	handlerShowMore: () => {},
};

export default ModuleCard;
