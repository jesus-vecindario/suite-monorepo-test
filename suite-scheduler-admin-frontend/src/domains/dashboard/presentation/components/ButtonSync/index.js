import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHasCalendar } from '../../../../../shared/application/selectors/myProfile';
import ButtonLink from '../../../../../shared/presentation/components/ButtonLink';
import { profileSyncRoute } from '../../../../profile/infrastructure/routes';
import { ICON_NOTIFICATION } from '../../../../../shared/application/constants/icons';
import { getSynchronizeStatus } from '../../../../profile/infrastructure/api';
import { setProfile } from '../../../../../shared/application/slices/myProfile';

const ButtonSync = () => {
	const dispatch = useDispatch();
	const hasCalendar = useSelector(getHasCalendar);

	useEffect(() => {
		getSynchronizeStatus().then((res) => {
			dispatch(setProfile(res));
		});
	}, [dispatch]);

	return hasCalendar ? (
		<></>
	) : (
		<ButtonLink route={profileSyncRoute} variants={`-button-sync-dashboard`}>
			<i className={`${ICON_NOTIFICATION} icon`}></i>
			Sincroniza tu cuenta
		</ButtonLink>
	);
};

export default ButtonSync;
