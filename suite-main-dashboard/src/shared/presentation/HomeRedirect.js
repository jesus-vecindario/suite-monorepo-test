import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCurrentProject, getFirstProjectUser } from '@vecindario/suite-dashboard-layout-lib';
import { boardRoute } from '../../domains/board/infrastructure/routing/routes';
import { LAST_SELECTED_SLUG } from '../application/constants/localStorageKeys';
import { checkCookieExistence } from '../application/helpers/common-functions';

const HomeRedirect = () => {
	const firstProject = useSelector(getFirstProjectUser);
	const currentProject = useSelector(getCurrentProject);

	const getCurrentProjectSlug = () =>
		checkCookieExistence(LAST_SELECTED_SLUG) || currentProject?.slug || firstProject?.slug;

	const getProjectRoute = () => {
		return boardRoute(getCurrentProjectSlug() || ':slug');
	};

	return <Redirect to={getProjectRoute()} />;
};

export default HomeRedirect;
