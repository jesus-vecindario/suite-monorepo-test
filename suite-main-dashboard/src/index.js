import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './shared/application/store';
import { history } from './shared/application/helpers/history';
import '@vecindario/vecindario-suite-components/dist/index.css';
import '@vecindario/suite-dashboard-layout-lib/dist/index.css';

import './shared/infrastructure/i18n/config';
import './index.scss';
import './shared/infrastructure/config/loader';
import ErrorBoundary from './shared/presentation/ErrorBoundary';

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router history={history}>
				<ErrorBoundary>{history && store && <App />}</ErrorBoundary>
			</Router>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
