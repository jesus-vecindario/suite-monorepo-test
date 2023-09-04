import { MODULES_BY_ROLE } from '../constants/addPeople';

export const filterModulesByRole = (role, modules) =>
	modules?.filter((module) => MODULES_BY_ROLE[role]?.includes(module.name));

export default {};
