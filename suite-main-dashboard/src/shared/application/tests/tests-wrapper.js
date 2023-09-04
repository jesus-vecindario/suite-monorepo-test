/* eslint-disable react/prop-types */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import thunkMiddleware from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import configureMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import rootStore from '../store';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

export const wrapperInitialState = rootStore.getState();

export const makeStore = (state = wrapperInitialState) => {
	return mockStore(state);
};

export const testHistory = createMemoryHistory();

const renderRouterRedux = (ui, store = makeStore(), route = '/', ...renderOptions) => {
	window.history.pushState({}, 'Test page', route);
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
