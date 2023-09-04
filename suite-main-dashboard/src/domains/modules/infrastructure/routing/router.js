import { AdminLayout, PrivateRoute } from '@vecindario/suite-dashboard-layout-lib';
import Modules from '../../presentation/pages';
import { adminModulesRoute } from './routes';

const modulesRouter = {
	layout: AdminLayout,
	router: [
		{
			path: adminModulesRoute(),
			page: Modules,
			routeComponent: PrivateRoute,
			exact: true,
		},
	],
};

export default modulesRouter;
