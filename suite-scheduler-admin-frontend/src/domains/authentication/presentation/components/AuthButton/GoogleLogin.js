import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@vecindario/vecindario-suite-components';

import { getCurrentUser } from '@vecindario/suite-dashboard-layout-lib';
import {
	locationToParams,
	getCurrerntPath,
	getCreationRedirectActivator,
	createCookie,
	isNumber,
} from '../../../../../shared/application/helpers/common-functions';

import { history as historyHelper } from '../../../../../shared/application/helpers/history';
import { googleLogin, syncCalendar } from '../../../application/slice/socialLogin';
import { WIZARD_CREATION_STEPS } from '../../../../../shared/application/constants/utils';
import { ASESOR_ROLE } from '../../../../projectAvailability/application/constants/project';
import { emailProviders } from '../../../application/constants/Login';
import { GOOGLE_LOGO } from '../../../../../shared/application/constants/images';
import { socialLoginLoading } from '../../../application/selectors/socialLogin';
import { googleSyncUrl } from '../../../../../shared/application/helpers/syncEmail';
import { profileSyncRoute } from '../../../../profile/infrastructure/routes';

const GoogleLogin = ({ googleBtnText, isConnectCalendar, userRole }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(getCurrentUser);
	const loadingLogin = useSelector(socialLoginLoading);

	const history = useHistory();

	useEffect(() => {
		const { location } = historyHelper;
		const queryParams = locationToParams(location.search);
		const code = queryParams.get('code');
		const state = queryParams.get('state');

		if (code) {
			const stateGgl = localStorage.getItem('stateGgl');
			const [activator, redirectionURL] = getCreationRedirectActivator();
			if (stateGgl === state) {
				const parseData = {
					code,
					redirect_uri: getCurrerntPath(),
					is_calendar: userRole === ASESOR_ROLE || isConnectCalendar,
					activation_token: isNumber(activator) ? null : activator,
					provider: emailProviders.GOOGLE,
				};
				if (isConnectCalendar) {
					if (!isNumber(activator)) createCookie('current_step_creation', WIZARD_CREATION_STEPS.availability, 0.125);
					dispatch(syncCalendar(parseData));
					history.push(profileSyncRoute);
				} else {
					!loadingLogin && dispatch(googleLogin(parseData, redirectionURL));
				}
			}
		}
	}, [dispatch, history, isConnectCalendar, loadingLogin, userRole]);

	const handleGoogleLoginClick = () => {
		if (loadingLogin) return;
		const uuid = uuidv4();
		localStorage.setItem('stateGgl', uuid);
		const url = googleSyncUrl({ uuid, userRole, currentUser, isConnectCalendar, currentPath: getCurrerntPath() });
		window.location.replace(url);
	};

	return (
		<Button variant="bordered" className="sync-btn" onClick={handleGoogleLoginClick}>
			<img src={GOOGLE_LOGO} className="logo" />
			{loadingLogin ? 'Cargando...' : googleBtnText}
		</Button>
	);
};

GoogleLogin.propTypes = {
	googleBtnText: PropTypes.string,
	activationToken: PropTypes.string,
	isConnectCalendar: PropTypes.bool,
	userRole: PropTypes.string,
};

GoogleLogin.defaultProps = {
	isConnectCalendar: false,
};

export default GoogleLogin;
