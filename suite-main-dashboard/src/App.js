import React, { useEffect } from 'react';
import { setSideBarItems } from '@vecindario/suite-dashboard-layout-lib';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Router from './shared/presentation/Router';
import { SIDE_BAR_ITEMS } from './shared/application/constants/sideBard';

const App = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(setSideBarItems(SIDE_BAR_ITEMS(t)));
	}, [dispatch, t]);

	return <Router />;
};

export default App;
