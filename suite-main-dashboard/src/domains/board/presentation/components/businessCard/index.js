import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TextTag } from '@vecindario/vecindario-suite-components';
import { moduleLinks, moduleKeys } from '@vecindario/suite-library';
import { PROD_ENV } from '../../../../../shared/application/constants/env';
import { getCommercialOpportunities } from '../../../application/selector/board';
import {
	COMMERCIAL_OPPORTUNITIES_COLORS,
	PARSE_COMMERCIAL_OPPORTUNITIES,
} from '../../../application/constants/commercialOpportunities';
import './BusinessCard.scss';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const Card = ({ title, value, color }) => {
	const { slug } = useParams();

	return (
		<a
			className={`card-container ${color}`}
			href={`${moduleLinks[moduleKeys.COMMERCIAL_OPPORTUNITIES_KEY][PROD_ENV]}proyecto/${slug}/tablero`}
		>
			<TextTag className="title" font="DM-sans" tag="h1" fw="bold" variant="-body">
				{value}
			</TextTag>
			<TextTag className="value" font="DM-sans" tag="p" fw="medium" variant="-body-sm">
				{title}
			</TextTag>
		</a>
	);
};

Card.propTypes = {
	title: PropTypes.string,
	value: PropTypes.number,
	color: PropTypes.string,
};

const BusinessCard = () => {
	const commercialOpportunities = useSelector(getCommercialOpportunities);
	const { t } = useTranslation();
	return (
		<div className="business-card-container">
			{commercialOpportunities &&
				Object.keys(commercialOpportunities).map((opportunity, index) => (
					<Card
						key={index}
						title={t(PARSE_COMMERCIAL_OPPORTUNITIES[opportunity], { ns: DOMAIN_NAME })}
						color={COMMERCIAL_OPPORTUNITIES_COLORS[opportunity]}
						value={commercialOpportunities[opportunity]}
					/>
				))}
		</div>
	);
};

export default BusinessCard;
