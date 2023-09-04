import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { WrapperToast } from '@vecindario/suite-dashboard-layout-lib';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageCurrencySelector } from '@vecindario/vecindario-suite-components';
import Stepper from '../../components/Stepper';
import './WizardProject.scss';
import { boardRoute } from '../../../../board/infrastructure/routing/routes';
import { SPANISH_IN_NAVIGATOR, STEPS_ONBOARDING } from '../../../application/constants/wizard';
import { lOGO_VECINDARIO_LIGHT } from '../../../../../shared/application/constants/icons';
import {
	LOCALES,
	checkCookieExistence,
	getValueFromLocalStorage,
	setValueToLocalStorage,
} from '../../../../../shared/application/helpers/common-functions';
import { CURRENT_LANGUAGE_USER, CURRENT_STEP_WIZARD } from '../../../application/constants/localStorageKeys';
import { WIZARD } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const Wizard = ({ children }) => {
	const currentStep = checkCookieExistence(CURRENT_STEP_WIZARD);
	const { t, i18n } = useTranslation();

	useEffect(() => {
		const languageNavigator = navigator.language.includes(SPANISH_IN_NAVIGATOR) ? LOCALES.ES_GLOBAL : LOCALES.EN_GLOBAL;
		const currentLanguage = getValueFromLocalStorage(CURRENT_LANGUAGE_USER) || languageNavigator;
		i18n.changeLanguage(currentLanguage);
		setValueToLocalStorage(CURRENT_LANGUAGE_USER, currentLanguage);
	}, [i18n]);

	const handleLanguageChange = (language) => {
		setValueToLocalStorage(CURRENT_LANGUAGE_USER, language);
	};

	return (
		<div className="container-wizard-project">
			<img src={lOGO_VECINDARIO_LIGHT} alt="" className="logo-header" />
			<div className="container-steps">
				<Stepper stepElements={STEPS_ONBOARDING} currentStep={currentStep} />
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
				<section className="buttons">
					{currentStep > 1 ? (
						<Link className="btn" to={boardRoute()}>
							{t(WIZARD.LINK_OMIT, { ns: DOMAIN_NAME })}
						</Link>
					) : null}
				</section>
			</div>
			<WrapperToast />
		</div>
	);
};

Wizard.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Wizard;
