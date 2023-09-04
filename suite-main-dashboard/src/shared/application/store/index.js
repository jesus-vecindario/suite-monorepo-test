import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { NODE_ENV } from '../constants/env';

const middlewares = () => {
	const baseMiddlewares = [thunkMiddleware];
	if (NODE_ENV !== 'production') baseMiddlewares.push(logger);
	return baseMiddlewares;
};

export default configureStore({
	reducer: rootReducer,
	middleware: middlewares(),
});
