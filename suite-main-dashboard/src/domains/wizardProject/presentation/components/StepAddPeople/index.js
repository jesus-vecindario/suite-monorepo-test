import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrentProject, getCurrentUser, getModulesByProjectFetch } from '@vecindario/suite-dashboard-layout-lib';
import { Helmet, TextTag } from '@vecindario/vecindario-suite-components';
import { useTranslation } from 'react-i18next';
import { addPeopleFields } from '../../../../team/application/constants/addPeople';
import { postTeam } from '../../../../team/application/slices/team';
import {
	checkCookieExistence,
	createSuiteCookie,
	removeValueFromLocalStorage,
} from '../../../../../shared/application/helpers/common-functions';
import './StepAddPeople.scss';
import { boardRoute } from '../../../../board/infrastructure/routing/routes';
import { LAST_SELECTED_SLUG } from '../../../../../shared/application/constants/cookiesKeys';
import { CURRENT_LANGUAGE_USER, CURRENT_STEP_WIZARD } from '../../../application/constants/localStorageKeys';
import FormAddPeople from '../../../../../shared/presentation/components/forms/FormAddPeople';
import { TITLE_LAST_PROJECT_CREATED } from '../../../../../shared/application/constants/localStorageKeys';
import { STEP_ADD_PEOPLE } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const StepAddPeople = () => {
	const { slug: slugParam } = useParams();
	const dispatch = useDispatch();
	const currentUser = useSelector(getCurrentUser);
	const currentProject = useSelector(getCurrentProject);
	const slug = slugParam || currentProject?.slug || checkCookieExistence(LAST_SELECTED_SLUG);
	const { t } = useTranslation();

	useEffect(() => {
		if (currentUser?.token) {
			dispatch(getModulesByProjectFetch(slug));
		}
	}, [currentUser?.token, dispatch, slug]);

	const handleAddPeople = (values) => {
		const payload = { ...values, [addPeopleFields.MODULES]: values[addPeopleFields.MODULES].filter((item) => item) };
		dispatch(postTeam({ slug, path: boardRoute(slug), payload }));
		createSuiteCookie(CURRENT_STEP_WIZARD, 0);
		removeValueFromLocalStorage(CURRENT_LANGUAGE_USER);
	};

	return (
		<>
			<Helmet title={t(STEP_ADD_PEOPLE.HELMET, { ns: DOMAIN_NAME })} />
			<section className="container-header-team">
				<TextTag tag="h4" className="title">
					{t(STEP_ADD_PEOPLE.TEXT_TAG_1, { ns: DOMAIN_NAME })}
					<br />
					{currentProject?.title || checkCookieExistence(TITLE_LAST_PROJECT_CREATED)}
				</TextTag>
				<TextTag variant="-body-sm" className="subtitle">
					{t(STEP_ADD_PEOPLE.TEXT_TAG_2, { ns: DOMAIN_NAME })}
				</TextTag>
			</section>

			<FormAddPeople handleAddPeople={handleAddPeople} isOnBoarding={true} />
		</>
	);
};

export default StepAddPeople;
