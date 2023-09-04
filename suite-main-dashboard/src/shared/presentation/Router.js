import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AdminLayout, Error404, HomeRedirect } from '@vecindario/suite-dashboard-layout-lib';
import { DOMAINS } from '../application/constants/domains';
import { importDynamic } from '../application/helpers/common-functions';

import { homeRoute } from '../infrastructure/routing/routes';
import { boardRoute } from '../../domains/board/infrastructure/routing/routes';

const importRouter = DOMAINS.map((domain) => import(`../../domains/${domain}/infrastructure/routing/router`));
const routerDomain = await importDynamic(importRouter);
const routes = routerDomain.map((route) => route.default);

const Router = () => {
	const defaultLayout = ({ children }) => <>{children}</>;
	return (
		<Switch>
			<Route exact path={homeRoute}>
				<HomeRedirect pathRoute={boardRoute} />
			</Route>
			{routes.map((router) => {
				return router.router.map(({ path, page: Component, routeComponent: Route, exact = true, layout, ...rest }) => (
					<Route
						key={path}
						exact={exact}
						path={path}
						component={Component}
						layout={layout || router.layout || defaultLayout}
						{...rest}
					/>
				));
			})}
			<Route path="*">
				<AdminLayout>
					<Error404 backRoute={homeRoute} />
				</AdminLayout>
			</Route>
		</Switch>
	);
};

export default Router;
