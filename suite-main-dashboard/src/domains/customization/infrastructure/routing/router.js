import { AdminLayout, PrivateRoute } from '@vecindario/suite-dashboard-layout-lib';
import { themeConfig } from './routes';
import Customization from '../../presentation/pages';

const configRouter = {
	layout: AdminLayout,
	router: [
		{
			path: themeConfig(),
			page: Customization,
			routeComponent: PrivateRoute,
		},
	],
};

export default configRouter;
