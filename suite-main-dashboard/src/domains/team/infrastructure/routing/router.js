// import AdminLayout from '../../../../shared/presentation/layouts/AdminLayout';
import { AdminLayout, PrivateRoute } from '@vecindario/suite-dashboard-layout-lib';
import Team from '../../presentation/pages';
import { adminTeamRoute } from './routes';

const teamRouter = {
	layout: AdminLayout,
	router: [
		{
			path: adminTeamRoute(),
			page: Team,
			routeComponent: PrivateRoute,
			exact: true,
		},
	],
};

export default teamRouter;
