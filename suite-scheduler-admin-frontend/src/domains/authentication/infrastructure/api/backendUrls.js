import { urlBase } from '../../../../shared/infrastructure/api/backendUrls';

export const urlLogin = `${urlBase}iniciar-sesion/correo-y-contrasena`;
export const urlRegister = `${urlBase}crea-tu-cuenta/con-correo/registro`;
export const urlRecoveryEmail = `${urlBase}recuperar-contrasena`;
export const urlResetPassword = `${urlBase}cambiar-contrasena`;
export const urlAcceptInvitation = `${urlBase}aceptar-invitacion`;

// AUTH
export const urlLoginGoogle = `${urlBase}iniciar-sesion/google`;
export const urlLoginMicrosoft = `${urlBase}iniciar-sesion/microsoft`;
