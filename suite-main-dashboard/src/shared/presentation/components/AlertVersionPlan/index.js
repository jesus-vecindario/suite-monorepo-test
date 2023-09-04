import React from 'react';
import { Button, Icon, TextTag } from '@vecindario/vecindario-suite-components';
import PropTypes from 'prop-types';
import './AlertVersionPlan.scss';
import { useTranslation } from 'react-i18next';
import { LINK_GO_PREMIUM } from '../../../application/constants/premium';
import { ALERT_ICON } from '../../../application/constants/icons';
import { ALERT_VERSION_PLAN } from '../../../infrastructure/i18n/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/i18n/locales';

const AlertVersionPlan = ({ currentUser, countFreeOpportunities }) => {
	const { t } = useTranslation();
	const handleClick = () => {
		window.open(LINK_GO_PREMIUM, '_blank');
	};
	return (
		<div className="container-alert-plan">
			<div className="description">
				<Icon icon={ALERT_ICON} size="medium" aditionalClassName="icon" />
				<TextTag className="text" variant="-body-sm">
					{t(ALERT_VERSION_PLAN.TEX_TAG_1, { ns: DOMAIN_NAME })}
				</TextTag>
			</div>
			<Button size="small" variant="tertiary" className="action-button" onClick={handleClick}>
				{t(ALERT_VERSION_PLAN.BUTTON_1, { ns: DOMAIN_NAME })}
			</Button>
		</div>
	);
};

AlertVersionPlan.propTypes = {
	currentUser: PropTypes.string,
	countFreeOpportunities: PropTypes.number,
};

export default AlertVersionPlan;
