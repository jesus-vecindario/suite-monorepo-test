import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LanguageCurrencySelector } from '@vecindario/vecindario-suite-components';
import PropTypes from 'prop-types';
import { WrapperToast, changeLanguageUser, getCurrentUser, getMyProfile } from '@vecindario/suite-dashboard-layout-lib';
import { history } from '../../../../shared/application/helpers/history';
import './CreateProjectLayout.scss';
import { lOGO_VECINDARIO_LIGHT } from '../../../../shared/application/constants/icons';
import { CREATE_PROJECT_LAYOUT } from '../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../infrastructure/locales';

const CreateProjectLayout = ({ children }) => {
	const currentUser = useSelector(getCurrentUser);
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();

	const currentLanguage = useMemo(() => currentUser?.language || i18n.language, [currentUser, i18n]);

	useEffect(() => dispatch(getMyProfile()), [dispatch]);
	useEffect(() => i18n.changeLanguage(currentLanguage), [i18n, currentLanguage]);

	const handleClick = () => {
		history.goBack();
	};

	const handleLanguageChange = (language) => {
		dispatch(changeLanguageUser({ language }));
	};

	return (
		<div className="container-wizard-create">
			<img src={lOGO_VECINDARIO_LIGHT} alt="" className="logo-header" />
			<div className="container-steps">
				<div className="card-step">
					<div className="container-language">
						<div className="selector-language">
							<LanguageCurrencySelector
								position="left"
								defaultLang={i18n.language}
								i18n={i18n}
								handleLanguageChange={handleLanguageChange}
							/>
						</div>
					</div>
					<div className="container-card-step">{children}</div>
				</div>
				<section className="button">
					<button className="btn" type="button" onClick={handleClick}>
						{t(CREATE_PROJECT_LAYOUT.BUTTON, { ns: DOMAIN_NAME })}
					</button>
				</section>
			</div>
			<WrapperToast />
		</div>
	);
};

CreateProjectLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default CreateProjectLayout;
