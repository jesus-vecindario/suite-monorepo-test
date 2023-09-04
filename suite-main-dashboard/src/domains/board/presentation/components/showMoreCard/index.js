import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextTag } from '@vecindario/vecindario-suite-components';

import { createSuiteCookie } from '../../../../../shared/application/helpers/common-functions';
import { LAST_SELECTED_SLUG } from '../../../../../shared/application/constants/cookiesKeys';
import './ShowMoreCard.scss';
import { SHOW_MORE_CARD } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const ShowMoreCard = ({ title, pushTo, className = '', children }) => {
	const { slug } = useParams();
	const { t } = useTranslation();

	const handleClick = () => {
		createSuiteCookie(LAST_SELECTED_SLUG, slug);
		window.location.href = pushTo;
	};

	return (
		<div className={`show-more-card-container ${className}`}>
			<div className="header">
				<TextTag variant="-body-sm" tag="h5" fw="bold" font="DM-sans" className="title">
					{title}
				</TextTag>
				{pushTo && (
					<TextTag variant="-body-sm" tag="p" fw="normal" font="Lato" className="redirect">
						<a onClick={handleClick}>
							{t(SHOW_MORE_CARD.TEXT_TAG, { ns: DOMAIN_NAME })} {'>'}
						</a>
					</TextTag>
				)}
			</div>
			<div className="body">{children}</div>
		</div>
	);
};

ShowMoreCard.propTypes = {
	title: PropTypes.string.isRequired,
	pushTo: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
};

export default ShowMoreCard;
