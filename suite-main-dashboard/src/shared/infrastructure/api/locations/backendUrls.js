import { urlBase } from '../apiHandler';

export const urlGetCityList = `${urlBase}ciudades/lista-ciudades`;
export const urlGetNeighborhoodsByCity = (cityID) => `${urlBase}ciudades/${cityID}/barrios`;
export const urlGetLocation = (address) => `${urlBase}proyectos-ubicacion?address=${address}`;
