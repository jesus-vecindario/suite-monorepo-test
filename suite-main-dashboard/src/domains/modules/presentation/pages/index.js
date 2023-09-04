import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Modules.scss';
import { MODULE_OPTIONS_KEYS, getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import { FooterSuite, Helmet } from '@vecindario/vecindario-suite-components';
import { useTranslation } from 'react-i18next';
import ModuleCard from '../components/ModuleCard';
import { getActiveModules as getActiveModulesAction, getModulesFetch } from '../../application/slices/modules';
import { getModules } from '../../application/selectors/modules';
import { MODULES_TO_DISABLED_CARD } from '../../application/constants/modules';
import { DOMAIN_NAME as SHARED_DOMAIN } from '../../../../shared/infrastructure/i18n/locales';
import { MODULES } from '../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../infrastructure/locales';

const Modules = () => {
	const dispatch = useDispatch();
	const currentProject = useSelector(getCurrentProject);
	const modules = useSelector(getModules);
	const { t } = useTranslation();

	useEffect(() => {
		if (currentProject?.slug) {
			dispatch(getModulesFetch());
			dispatch(getActiveModulesAction(currentProject?.slug));
		}
	}, [dispatch, currentProject?.slug]);

	const isDisabledCard = (module_name) => MODULES_TO_DISABLED_CARD.includes(module_name);

	return (
		<>
			<Helmet title={t(MODULES.HELMET, { ns: DOMAIN_NAME })} />
			<div className="container-option-modules">
				<section className="section-header">
					<h2 className="title">
						{t(MODULES.TITLE, { ns: DOMAIN_NAME })} {currentProject?.title}
					</h2>
					<p className="description">{t(MODULES.DESCRIPTION, { ns: DOMAIN_NAME })}</p>
				</section>
				<section className="section-body">
					{modules.map(({ icon, id, name, key }, index) => {
						return (
							<ModuleCard
								key={`info-module-${index}`}
								iconModule={icon}
								title={t(`${MODULE_OPTIONS_KEYS[key?.toUpperCase()]?.PARSED_NAME}`, { ns: SHARED_DOMAIN })}
								description={t(`${MODULE_OPTIONS_KEYS[key?.toUpperCase()]?.LONG_TEXT}`, { ns: SHARED_DOMAIN })}
								moduleId={id}
								disabled={isDisabledCard(name)}
								slug={currentProject?.slug}
								moduleKey={key}
							/>
						);
					})}
				</section>
				<FooterSuite />
			</div>
		</>
	);
};

export default Modules;
