import { AdminLayout, PrivateRoute } from '@vecindario/suite-dashboard-layout-lib';
import Board from '../../presentation/pages';
import { boardRoute } from './routes';

const boardRouter = {
	layout: AdminLayout,
	router: [
		{
			path: boardRoute(),
			page: Board,
			routeComponent: PrivateRoute,
		},
	],
};

export default boardRouter;
