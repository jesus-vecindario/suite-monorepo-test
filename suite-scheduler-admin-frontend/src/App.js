import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProject, getCurrentUser, setSideBarItems } from '@vecindario/suite-dashboard-layout-lib';
import { ASESOR_ROLE, SUPER_ADMIN_ROLE } from './domains/projectAvailability/application/constants/project';
import Router from './shared/infrastructure/routing/router';
import { adviserRoutes, directorRoutes } from './shared/application/constants/sidebar';
import { getSynchronizeStatus } from './domains/profile/infrastructure/api';
import { setProfile } from './shared/application/slices/myProfile';
import '@vecindario/vecindario-suite-components/dist/index.css';
import '@vecindario/suite-dashboard-layout-lib/dist/index.css';
import { getHasCalendar } from './shared/application/selectors/myProfile';

const App = () => {
	const { slug } = useParams();
	const dispatch = useDispatch();
	const currentProject = useSelector(getCurrentProject);
	const currentUser = useSelector(getCurrentUser);
	const hasCalendar = useSelector(getHasCalendar);
	const projectSlug = currentProject?.slug || slug;

	const pathList = useMemo(() => {
		if (currentUser?.user_roles?.includes(SUPER_ADMIN_ROLE)) {
			return [...new Set([...adviserRoutes(projectSlug, hasCalendar), ...directorRoutes(projectSlug)])];
		}
		return currentProject?.role === ASESOR_ROLE ? adviserRoutes(projectSlug, hasCalendar) : directorRoutes(projectSlug);
	}, [currentUser?.user_roles, currentProject?.role, projectSlug, hasCalendar]);

	useEffect(() => {
		dispatch(setSideBarItems(pathList));
	}, [dispatch, pathList]);

	useEffect(() => {
		if (projectSlug) {
			getSynchronizeStatus(projectSlug).then((res) => {
				dispatch(setProfile(res));
			});
		}
	}, [dispatch, projectSlug]);

	return <Router />;
};

export default App;
