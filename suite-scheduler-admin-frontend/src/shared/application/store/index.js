import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

export default configureStore({
	reducer: rootReducer,
	middleware: [thunkMiddleware, logger],
});
