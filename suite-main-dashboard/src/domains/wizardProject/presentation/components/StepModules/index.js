import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MODULE_OPTIONS_KEYS, getCurrentProject, getCurrentUser } from '@vecindario/suite-dashboard-layout-lib';
import { Button, Helmet, TextTag } from '@vecindario/vecindario-suite-components';
import './StepModules.scss';
import { useTranslation } from 'react-i18next';
import { history } from '../../../../../shared/application/helpers/history';
import { welcomeAddTeam } from '../../../infrastructure/routing/routes';
import Module from './Module';
import { getModules } from '../../../../modules/application/selectors/modules';
import { getModulesFetch } from '../../../../modules/application/slices/modules';
import { createSuiteCookie } from '../../../../../shared/application/helpers/common-functions';
import { CURRENT_STEP_WIZARD } from '../../../application/constants/localStorageKeys';
import { STEP_MODULES } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';
import { DOMAIN_NAME as SHARED_DOMAIN } from '../../../../../shared/infrastructure/i18n/locales';

const StepModules = () => {
	const { slug } = useParams();
	const dispatch = useDispatch();
	const currentProject = useSelector(getCurrentProject);
	const currentUser = useSelector(getCurrentUser);
	const modules = useSelector(getModules);
	const { t } = useTranslation();

	useEffect(() => {
		if (currentUser?.token) {
			dispatch(getModulesFetch());
		}
	}, [currentUser, dispatch]);

	const handleClick = () => {
		createSuiteCookie(CURRENT_STEP_WIZARD, 2);
		history.push(welcomeAddTeam(slug));
	};

	return (
		<>
			<Helmet title={t(STEP_MODULES.HELMET, { ns: DOMAIN_NAME })} />
			<section className="container-header-modules">
				<TextTag tag="h4" className="title">
					{t(STEP_MODULES.TEXT_TAG_1, { ns: DOMAIN_NAME })}
				</TextTag>
				<TextTag variant="-body-sm" className="subtitle">
					{t(STEP_MODULES.TEXT_TAG_2, { ns: DOMAIN_NAME })}
					{` `}
					<TextTag tag="u" variant="-body-sm">
						{currentProject?.title ? currentProject.title : t(STEP_MODULES.TEXT_TAG_3, { ns: DOMAIN_NAME })}
					</TextTag>
				</TextTag>
			</section>
			<div className="container-step-modules">
				{modules.map((module, index) => {
					return (
						<Module
							key={index}
							name={module.name}
							title={t(`${MODULE_OPTIONS_KEYS[module?.key?.toUpperCase()]?.PARSED_NAME}`, { ns: SHARED_DOMAIN })}
							description={t(`${MODULE_OPTIONS_KEYS[module?.key?.toUpperCase()]?.LONG_TEXT}`, { ns: SHARED_DOMAIN })}
							moduleId={module.id}
							slug={currentProject?.slug}
						/>
					);
				})}
			</div>
			<Button className="button-next" onClick={handleClick}>
				{t(STEP_MODULES.BUTTON, { ns: DOMAIN_NAME })}
			</Button>
		</>
	);
};

export default StepModules;
