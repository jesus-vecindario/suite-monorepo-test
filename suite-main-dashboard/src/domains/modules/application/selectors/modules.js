import { createSelector } from '@reduxjs/toolkit';
import { getCurrentUser } from '@vecindario/suite-dashboard-layout-lib';

export const modulesState = (state) => state.modules;

export const getActiveModules = createSelector(modulesState, (modules) => {
	return modules?.activeModules;
});

export const getModules = createSelector([modulesState, getCurrentUser], (modules, currentUser) => {
	const allModules = modules?.modules;
	//  TODO: ELIMINAR ESTO LUEGO DE FASE BETA DE COTIZADOR
	const filteredModules = allModules.filter((module) => {
		if (module.name === 'cotizador' && !currentUser?.user_roles.includes('admin')) {
			return false;
		}
		return true;
	});
	// TODO: END
	return filteredModules;
});
