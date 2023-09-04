import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import { dashboardScheduleRoute, toolsRoute } from '../../../domains/dashboard/infrastructure/routes';
import { ASESOR_ROLE } from '../../../domains/projectAvailability/application/constants/project';
import { homeRoute } from './routes';

const HomeRedirect = () => {
	const currentProject = useSelector(getCurrentProject);

	const redirect = useMemo(() => {
		if (currentProject) {
			return currentProject.role === ASESOR_ROLE
				? dashboardScheduleRoute(currentProject.slug)
				: toolsRoute(currentProject.slug);
		}
		return homeRoute;
	}, [currentProject]);

	return <Redirect to={redirect} />;
};

export default HomeRedirect;
