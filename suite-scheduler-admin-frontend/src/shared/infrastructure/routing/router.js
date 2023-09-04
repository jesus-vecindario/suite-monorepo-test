import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AdminLayout, Error404 } from '@vecindario/suite-dashboard-layout-lib';
import { homeRoute } from './routes';
import adminRouter from '../../../domains/dashboard/infrastructure/admin.router';
import LinkAdviser from '../../../domains/linkAdviser/presentation/pages/linkAdviser';
import { adviserLinkAppointment, oldAdviserLinkAppointment } from '../../../domains/linkAdviser/infrastructure/routes';

const Router = () => {
	const routes = [adminRouter];
	return (
		<Switch>
			{routes.map((router) => {
				return router.router.map(({ path, page: Component, routeComponent: Route, exact = true, layout, ...rest }) => (
					<Route key={path} exact={exact} path={path} component={Component} layout={layout || router.layout} {...rest} />
				));
			})}

			<Route exact path={adviserLinkAppointment()}>
				{<LinkAdviser />}
			</Route>

			<Route exact path={oldAdviserLinkAppointment()}>
				{<LinkAdviser />}
			</Route>

			<Route path="*">
				<AdminLayout>
					<Error404 backRoute={homeRoute} />
				</AdminLayout>
			</Route>
		</Switch>
	);
};

export default Router;
