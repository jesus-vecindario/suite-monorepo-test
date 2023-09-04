import { welcomeAddTeam, welcomeCreateProject, welcomeModules } from '../../infrastructure/routing/routes';

export const STEPS_ONBOARDING = [
	{ step: '1', path: welcomeCreateProject },
	{ step: '2', path: welcomeModules },
	{ step: '3', path: welcomeAddTeam },
];

export const SPANISH_IN_NAVIGATOR = 'es-';
