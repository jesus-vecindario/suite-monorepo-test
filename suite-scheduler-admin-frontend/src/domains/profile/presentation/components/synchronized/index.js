import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Helmet, TextTag } from '@vecindario/vecindario-suite-components';
import { getCurrentProject, getCurrentUser } from '@vecindario/suite-dashboard-layout-lib';
import { useHistory } from 'react-router-dom';

import GoogleLogin from '../../../../authentication/presentation/components/AuthButton/GoogleLogin';
import MicrosoftLogin from '../../../../authentication/presentation/components/AuthButton/MicrosoftLogin';
import { syncEmailLogo } from '../../../../../shared/application/helpers/myProfile';

import { socialLoginError } from '../../../../authentication/application/selectors/socialLogin';
import { getHasCalendar } from '../../../../../shared/application/selectors/myProfile';

import { ICON_ERROR_WARNING } from '../../../../../shared/application/constants/icons';
import { CHECK_THUMBS_UP_GREEN } from '../../../../../shared/application/constants/images';
import { DIRECTOR_ROLE, SUPER_ADMIN_ROLE } from '../../../../projectAvailability/application/constants/project';
import { homeRoute } from '../../../../../shared/infrastructure/routing/routes';
import AuthButton from '../../../../authentication/presentation/components/AuthButton';
import { emailProviders } from '../../../../authentication/application/constants/Login';
import './Synchronized.scss';

const Synchronized = () => {
	const history = useHistory();
	const syncError = useSelector(socialLoginError);
	const currentUser = useSelector(getCurrentUser);
	const currentProject = useSelector(getCurrentProject);
	const hasCalendar = useSelector(getHasCalendar);

	const adviserProvider = useMemo(
		() => currentUser?.provider || currentProject?.agreement?.provider || null,
		[currentProject, currentUser],
	);

	const googleSync = (text) => <GoogleLogin googleBtnText={text} isConnectCalendar={true} />;
	const microsoftSync = (text) => <MicrosoftLogin microsoftBtnText={text} isConnectCalendar={true} />;

	const calendarSync = () => (
		<>
			{adviserProvider === emailProviders.GOOGLE ? (
				<div className="synchronized-calendar">
					<p>Aún no tienes tu calendario de gmail sincronizado</p>
					<AuthButton variants="-button-sync-profile">{googleSync('Sincroniza el calendario')}</AuthButton>
				</div>
			) : (
				<div>
					<p>Aún no tienes tu calendario de outlook sincronizado</p>
					<AuthButton variants="-button-sync-profile">{microsoftSync('Sincroniza el calendario')}</AuthButton>
				</div>
			)}
		</>
	);

	const renderSynchronizations = () => {
		if (hasCalendar) {
			return (
				<div className="synchronized-info">
					<img className="success-icon" src={CHECK_THUMBS_UP_GREEN} />
					<h3 className="title-synchronized">
						¡Genial! <br /> Tu información ya está sincronizada
					</h3>
					<p className="description">
						Ahora si puedes vivir toda la experiencia del agendador, dirigente a cronología y observalo tu mismo
					</p>

					<div className="detail-wrapper">
						<p className="subtitle">Información de la sincronización</p>
						<div className="card-email">
							<img className="sync-img" src={syncEmailLogo(currentUser.provider)} alt="logo" />
							<p className="sync-detail">{currentUser.email}</p>
							<p className="sync-message"> Activa</p>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="buttons-sync">
				<i className={`${ICON_ERROR_WARNING} icon-alert`} />
				<h3 className="alert-title">No estas sincronizado</h3>
				<p className="alert-description">
					Sincroniza tu cuenta de google o miscrosoft para tener una agendador eficiente y rápido.
				</p>

				{adviserProvider ? (
					calendarSync()
				) : (
					<>
						{googleSync('Sincroniza con Google')}
						{microsoftSync('Sincroniza con Microsoft')}
					</>
				)}
				<div className="sync-error">{syncError}</div>
			</div>
		);
	};

	useEffect(() => {
		if (currentProject?.role === DIRECTOR_ROLE && !currentUser?.user_roles?.includes(SUPER_ADMIN_ROLE)) {
			history.push(homeRoute);
		}
	}, [history, currentProject, currentUser?.user_roles]);

	return (
		<>
			<Helmet title={'Vecindario Suite - Gestor de calendarios - Sincronización'} />
			<div className="synchronized-container">
				<div className="wrapper">
					<TextTag tag="h2" font="DM-sans" fw="bold" variant="-body" className="title">
						Sincronización
					</TextTag>
					<TextTag tag="p" font="DM-sans" fw="normal" variant="-body" className="description">
						Sincroniza tu cuenta de Google o Microsoft para tener un agendador eficiente y rápido.
					</TextTag>
					<div className="synchronized-wrapper">{renderSynchronizations()}</div>
				</div>
			</div>
		</>
	);
};

export default Synchronized;
