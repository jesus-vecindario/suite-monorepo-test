import React from 'react';
import { useDispatch } from 'react-redux';
import { getProjectsByUser, setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { Helmet } from '@vecindario/vecindario-suite-components';
import { useTranslation } from 'react-i18next';
import {
	LAST_SELECTED_SLUG,
	TITLE_LAST_PROJECT_CREATED,
} from '../../../../../shared/application/constants/localStorageKeys';
import { createSuiteCookie } from '../../../../../shared/application/helpers/common-functions';
import { history } from '../../../../../shared/application/helpers/history';
import FormProject from '../../../../../shared/presentation/components/forms/project';
import { CURRENT_STEP_WIZARD } from '../../../application/constants/localStorageKeys';
import { welcomeModules } from '../../../infrastructure/routing/routes';
import { STEP_PROJECT } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const StepProject = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const handleOnSuccess = async (data) => {
		dispatch(
			setMessageToast({
				type: 'success',
				message: t(STEP_PROJECT.MESSAGE_SUCCESS, { ns: DOMAIN_NAME }),
			}),
		);
		createSuiteCookie(LAST_SELECTED_SLUG, data.slug);
		await dispatch(getProjectsByUser());
		createSuiteCookie(CURRENT_STEP_WIZARD, 1);
		createSuiteCookie(TITLE_LAST_PROJECT_CREATED, data.title);
		history.push(welcomeModules(data.slug));
	};

	const handleOnFailure = () => {
		dispatch(
			setMessageToast({
				type: 'error',
				message: t(STEP_PROJECT.MESSAGE_ERROR, { ns: DOMAIN_NAME }),
			}),
		);
	};
	return (
		<>
			<Helmet title={t(STEP_PROJECT.HELMET, { ns: DOMAIN_NAME })} />
			<FormProject
				title={t(STEP_PROJECT.FORM_PROJECT_TITLE, { ns: DOMAIN_NAME })}
				subtitle={t(STEP_PROJECT.FORM_PROJECT_SUBTITLE, { ns: DOMAIN_NAME })}
				onSucessSubmit={handleOnSuccess}
				handleOnFailure={handleOnFailure}
			/>
		</>
	);
};

export default StepProject;
