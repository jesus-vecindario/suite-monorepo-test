import { AdminLayout, PrivateRoute } from '@vecindario/suite-dashboard-layout-lib';
import { trackingRoute } from './routes';
import TrackingPage from '../../presentation/pages/TrackingPage';

const configurationRouter = {
	layout: AdminLayout,
	router: [
		{
			path: trackingRoute(),
			page: TrackingPage,
			routeComponent: PrivateRoute,
			exact: true,
		},
	],
};

export default configurationRouter;
