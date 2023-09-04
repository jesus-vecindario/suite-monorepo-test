import { Helmet } from '@vecindario/vecindario-suite-components';
import { getCurrentProject, getCurrentUser } from '@vecindario/suite-dashboard-layout-lib';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import EditTimeAvailability from '../editTimeAvailability';
import { selectLoading } from '../../../../../shared/application/selectors/myProfile';

import { getMyAvailability } from '../../../../../shared/application/slices/myProfile';
import { DIRECTOR_ROLE, SUPER_ADMIN_ROLE } from '../../../../projectAvailability/application/constants/project';
import { homeRoute } from '../../../../../shared/infrastructure/routing/routes';
import './TimeAvailability.scss';

const TimeAvailability = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { slug } = useParams();
	const currentProject = useSelector(getCurrentProject);
	const currentUser = useSelector(getCurrentUser);
	const loading = useSelector(selectLoading);

	useEffect(() => {
		if (currentProject?.role === DIRECTOR_ROLE && !currentUser?.user_roles?.includes(SUPER_ADMIN_ROLE))
			history.push(homeRoute);
		if (slug) dispatch(getMyAvailability(slug));
	}, [dispatch, currentProject, history, slug, currentUser?.user_roles]);

	return (
		<>
			<Helmet title={'Vecindario Suite - Gestor de calendarios - Mi disponibilidad'} />
			<div className="profile-time-availability">{!loading && <EditTimeAvailability />}</div>
		</>
	);
};

export default TimeAvailability;
