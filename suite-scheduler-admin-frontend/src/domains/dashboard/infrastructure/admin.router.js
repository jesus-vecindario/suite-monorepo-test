import { AdminLayout, PrivateRoute } from '@vecindario/suite-dashboard-layout-lib';
import Schedule from '../presentation/pages/schedule';
import { configurationRoute, dashboardScheduleRoute, profileAvailabilityRoute, toolsRoute } from './routes';
import { profileSyncRoute } from '../../profile/infrastructure/routes';
import Synchronized from '../../profile/presentation/components/synchronized';
import TimeAvailability from '../../profile/presentation/components/timeAvailability';
import Availability from '../../projectAvailability/presentation/pages/availability';
import { homeRoute } from '../../../shared/application/constants/routes';
import HomeRedirect from '../../../shared/infrastructure/routing/homeRedirect';
import ToolsPage from '../../tools/presentation/pages/ToolsPage';

const adminRouter = {
	layout: AdminLayout,
	router: [
		{
			path: dashboardScheduleRoute(),
			page: Schedule,
			routeComponent: PrivateRoute,
		},
		{
			path: homeRoute,
			page: HomeRedirect,
			routeComponent: PrivateRoute,
		},
		{
			path: profileAvailabilityRoute(),
			page: TimeAvailability,
			routeComponent: PrivateRoute,
		},
		{
			path: profileSyncRoute,
			page: Synchronized,
			routeComponent: PrivateRoute,
		},
		{
			path: toolsRoute(),
			page: ToolsPage,
			routeComponent: PrivateRoute,
		},
		{
			path: configurationRoute(),
			page: Availability,
			routeComponent: PrivateRoute,
		},
	],
};

export default adminRouter;
