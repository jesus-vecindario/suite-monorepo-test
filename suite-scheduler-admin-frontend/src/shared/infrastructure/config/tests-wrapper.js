import React from 'react';
import configureMockStore from 'redux-mock-store';
import { render as rtlRender } from '@testing-library/react';
import thunkMiddleware from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { initialStates } from '../../application/store/reducers';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

export const makeStore = (state = initialStates) => {
	return mockStore(state);
};

export const testHistory = createMemoryHistory();

const renderRouterRedux = (ui, store = makeStore(), route = '/', ...renderOptions) => {
	window.history.pushState({}, 'Test page', route);
	// eslint-disable-next-line react/prop-types
	const Wrapper = ({ children }) => (
		<Provider store={store}>
			<Router history={testHistory}>{children}</Router>
		</Provider>
	);
	return {
		...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
		store,
		history: testHistory,
	};
};

export default renderRouterRedux;
