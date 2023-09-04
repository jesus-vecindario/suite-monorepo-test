import { AdminLayout, PrivateRoute } from '@vecindario/suite-dashboard-layout-lib';
import CreateProjectLayout from '../../presentation/layout';
import CreateProject from '../../presentation/pages/CreateProject';
import Edit from '../../presentation/pages/Edit';
import { adminEditRoute, createProjectRoute } from './routes';

export const projectRouter = {
	layout: AdminLayout,
	router: [
		{
			path: adminEditRoute(),
			page: Edit,
			routeComponent: PrivateRoute,
			exact: true,
		},
		{
			path: createProjectRoute,
			page: CreateProject,
			routeComponent: PrivateRoute,
			exact: true,
			layout: CreateProjectLayout,
		},
	],
};

export default projectRouter;
