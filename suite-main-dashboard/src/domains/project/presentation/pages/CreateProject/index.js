import { Helmet } from '@vecindario/vecindario-suite-components';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getProjectsByUser, setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { useTranslation } from 'react-i18next';
import FormProject from '../../../../../shared/presentation/components/forms/project';
import { history } from '../../../../../shared/application/helpers/history';
import { createSuiteCookie } from '../../../../../shared/application/helpers/common-functions';
import { LAST_SELECTED_SLUG } from '../../../../../shared/application/constants/localStorageKeys';
import { boardRoute } from '../../../../board/infrastructure/routing/routes';
import { DOMAIN_NAME } from '../../../infrastructure/locales';
import { CREATE_PROJECT } from '../../../infrastructure/locales/translation_keys';

const CreateProject = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const handleOnSuccess = async (data) => {
		dispatch(
			setMessageToast({
				type: 'success',
				message: t(CREATE_PROJECT.MESSAGE_SUCCESS, { ns: DOMAIN_NAME }),
			}),
		);
		createSuiteCookie(LAST_SELECTED_SLUG, data.slug);
		await dispatch(getProjectsByUser());
		history.push(boardRoute(data.slug));
	};

	const handleOnFailure = () => {
		dispatch(
			setMessageToast({
				type: 'error',
				message: t(CREATE_PROJECT.MESSAGE_ERROR, { ns: DOMAIN_NAME }),
			}),
		);
	};
	return (
		<>
			<Helmet title={t(CREATE_PROJECT.HELMET_TITLE, { ns: DOMAIN_NAME })} />
			<FormProject
				title={t(CREATE_PROJECT.FORM_PROJECT_TITLE, { ns: DOMAIN_NAME })}
				subtitle={t(CREATE_PROJECT.FORM_PROJECT_SUBTITLE, { ns: DOMAIN_NAME })}
				onSucessSubmit={handleOnSuccess}
				handleOnFailure={handleOnFailure}
			/>
		</>
	);
};

export default CreateProject;
