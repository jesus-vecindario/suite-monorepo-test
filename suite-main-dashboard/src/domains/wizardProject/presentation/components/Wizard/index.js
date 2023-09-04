import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Stepper from '../Stepper';
import './WizardProject.scss';
import { boardRoute } from '../../../../board/infrastructure/routing/routes';
import { WIZARD } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const steps = [{ step: '1' }, { step: '2' }, { step: '3' }];

const Wizard = ({ children }) => {
	const [activePage, setactivePage] = useState(2);
	const pages = React.Children.toArray(children);
	const currentPage = pages[activePage];
	const { t } = useTranslation();

	const onPrevClick = () => {
		setactivePage((index) => index - 1);
	};
	return (
		<div className="container-wizard-project">
			<img
				src="https://fiducia-suite.s3.us-east-2.amazonaws.com/vecindario-logo-light.svg"
				alt=""
				className="logo-header"
			/>
			<div className="container-steps">
				<Stepper stepElements={steps} />
				<div className="card-step">{currentPage}</div>
				<section className="buttons">
					{activePage > 0 ? (
						<button type="button" onClick={onPrevClick}>
							{t(WIZARD.COME_BACK, { ns: DOMAIN_NAME })}
						</button>
					) : null}
					{activePage > 1 ? (
						<Link type="button" to={boardRoute()}>
							{t(WIZARD.LINK_OMIT, { ns: DOMAIN_NAME })}
						</Link>
					) : null}
				</section>
			</div>
		</div>
	);
};

Wizard.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Wizard;
