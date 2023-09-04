import React, { Fragment, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import { homeRoute } from './routes';
import { dashboardScheduleRoute } from '../../../domains/dashboard/infrastructure/routes';

export const PrivateRoute = ({ component: Component, layout: Layout, requireDirectorRole, ...rest }) => {
	const currentProject = useSelector(getCurrentProject);
	const user = localStorage.getItem('user');

	const adviserRedirect = useCallback(
		() => <Redirect to={dashboardScheduleRoute(currentProject.slug)} />,
		[currentProject],
	);
	const restRouteRender = useCallback(
		() => (
			<Route
				{...rest}
				render={(props) =>
					user ? (
						<Layout path={rest.path}>
							<Component {...props} />
						</Layout>
					) : (
						<Redirect to={{ pathname: '/', state: { from: props.location } }} />
					)
				}
			/>
		),
		[rest, user],
	);

	const renderRoute = useCallback(() => {
		// No esta logeado
		if (!user) return restRouteRender();

		// No requiere ser director para acceder a la ruta
		if (!requireDirectorRole) return restRouteRender();

		return adviserRedirect();
	}, [adviserRedirect, requireDirectorRole, restRouteRender, user]);

	return renderRoute();
};

PrivateRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
	location: PropTypes.object,
	layout: PropTypes.any,
	requireDirectorRole: PropTypes.bool,
};

PrivateRoute.defaultProps = {
	layout: Fragment,
	requireDirectorRole: false,
};

export const UnauthenticatedRoute = ({ component: Component, layout: Layout, ...rest }) => {
	const prevPath = typeof window !== 'undefined' && localStorage.getItem('prevPath');
	return (
		<Route
			{...rest}
			render={(props) =>
				typeof window !== 'undefined' && !localStorage.getItem('user') ? (
					<Layout>
						<Component {...props} />
					</Layout>
				) : (
					<Redirect to={prevPath || homeRoute} />
				)
			}
		/>
	);
};

UnauthenticatedRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
	layout: PropTypes.any,
};

UnauthenticatedRoute.defaultProps = {
	layout: Fragment,
};
