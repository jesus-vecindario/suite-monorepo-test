import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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
import { history } from '../../../../../shared/application/helpers/history';
import { microsoftLogin, syncCalendar } from '../../../application/slice/socialLogin';
import { WIZARD_CREATION_STEPS } from '../../../../../shared/application/constants/utils';
import { emailProviders } from '../../../application/constants/Login';
import { MICROSOFT_LOGO } from '../../../../../shared/application/constants/images';
import { socialLoginLoading } from '../../../application/selectors/socialLogin';
import { microsoftSyncUrl } from '../../../../../shared/application/helpers/syncEmail';
import { profileSyncRoute } from '../../../../profile/infrastructure/routes';

const MicrosoftLogin = ({ microsoftBtnText, isConnectCalendar, userRole }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(getCurrentUser);
	const loadingLogin = useSelector(socialLoginLoading);

	useEffect(() => {
		const { location } = history;
		const queryParams = locationToParams(location.search);
		const code = queryParams.get('code');
		const state = queryParams.get('state');
		if (code && state) {
			const stateMS = localStorage.getItem('stateMS');
			const [activator, redirectionURL] = getCreationRedirectActivator();
			if (stateMS === state) {
				const parseData = {
					code,
					redirect_uri: getCurrerntPath(),
					activation_token: isNumber(activator) ? null : activator,
					provider: emailProviders.MICROSOFT,
				};
				if (isConnectCalendar) {
					if (!isNumber(activator)) createCookie('current_step_creation', WIZARD_CREATION_STEPS.availability, 0.125);
					dispatch(syncCalendar(parseData));
					history.push(profileSyncRoute);
				} else {
					!loadingLogin && dispatch(microsoftLogin(parseData, redirectionURL));
				}
			}
		}
	}, [dispatch, isConnectCalendar, loadingLogin]);

	const handleMSLoginClick = () => {
		if (loadingLogin) return;
		const uuid = uuidv4();
		localStorage.setItem('stateMS', uuid);
		const url = microsoftSyncUrl({ uuid, userRole, currentUser, currentPath: getCurrerntPath(), isConnectCalendar });
		window.location.replace(url);
	};

	return (
		<Button variant="bordered" className="sync-btn" onClick={handleMSLoginClick}>
			<img src={MICROSOFT_LOGO} className="logo" />
			{loadingLogin ? 'Cargando...' : microsoftBtnText}
		</Button>
	);
};

MicrosoftLogin.propTypes = {
	activationToken: PropTypes.string,
	microsoftBtnText: PropTypes.string.isRequired,
	isConnectCalendar: PropTypes.bool,
	userRole: PropTypes.string,
};

MicrosoftLogin.defaultProps = {
	isConnectCalendar: false,
};

export default MicrosoftLogin;
