import { urlBase } from '../../../../shared/infrastructure/api/apiHandler';

// CITY
export const urlGetCityList = `${urlBase}ciudades/lista-ciudades`;
export const urlGetNeighborhoodsByCity = (cityID) => `${urlBase}ciudades/${cityID}/barrios`;
export const urlGetLocation = (address) => `${urlBase}proyectos-ubicacion?address=${address}`;
export const urlGetSearchCities = (search_text) => `${urlBase}buscar-ciudades?search_text=${search_text}`;

// PROJECT
export const urlCreateProject = `${urlBase}proyectos/crear`;
