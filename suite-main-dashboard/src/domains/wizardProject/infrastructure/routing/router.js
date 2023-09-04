import { PrivateRoute } from '@vecindario/suite-dashboard-layout-lib';
import StepAddPeople from '../../presentation/components/StepAddPeople';
import StepModules from '../../presentation/components/StepModules';
import StepProject from '../../presentation/components/StepProject';
import Wizard from '../../presentation/layout/Wizard';
import { welcomeAddTeam, welcomeCreateProject, welcomeModules } from './routes';

const wizardProjectRouter = {
	layout: Wizard,
	router: [
		{
			path: welcomeCreateProject,
			page: StepProject,
			routeComponent: PrivateRoute,
			exact: true,
		},
		{
			path: welcomeModules(),
			page: StepModules,
			routeComponent: PrivateRoute,
			exact: true,
		},
		{
			path: welcomeAddTeam(),
			page: StepAddPeople,
			routeComponent: PrivateRoute,
			exact: true,
		},
	],
};

export default wizardProjectRouter;
