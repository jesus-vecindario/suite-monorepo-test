import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TextTag } from '@vecindario/vecindario-suite-components';
import { moduleLinks, moduleKeys } from '@vecindario/suite-library';
import { getModulesByProject } from '@vecindario/suite-dashboard-layout-lib';
import { PROD_ENV } from '../../../../../shared/application/constants/env';
import { BUILDING_ICON, DOOR_ICON } from '../../../application/constants/icons';
import './InventoryCards.scss';
import { getCheckListIsCompleted, getInventoryReport } from '../../../application/selector/board';
import { INVENTORY_CARDS } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const Card = ({ icon, title, value }) => {
	const { slug } = useParams();
	const modulesByProject = useSelector(getModulesByProject);
	const inventoryKey = modulesByProject.find((item) => item.key === moduleKeys.INVENTORY_KEY);

	const cardContent = (
		<>
			<div className="wrapper-icon">
				<i className={`${icon} icon`} />
			</div>
			<div className="card-info">
				<TextTag className="title" tag="p" variant="-body-sm" fw="medium" font="DM-sans">
					{title}
				</TextTag>
				<TextTag className="value" tag="h3" variant="-body" font="DM-sans" fw="medium">
					{value}
				</TextTag>
			</div>
		</>
	);

	return inventoryKey ? (
		<a className="card-container" href={`${moduleLinks[moduleKeys.INVENTORY_KEY][PROD_ENV]}proyectos/${slug}/torres`}>
			{cardContent}
		</a>
	) : (
		<div className="card-container">{cardContent}</div>
	);
};

Card.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
};

const InventoryCards = () => {
	const inventoryReport = useSelector(getInventoryReport);
	const isCompleted = useSelector(getCheckListIsCompleted);
	const { t } = useTranslation();

	return (
		<div className={`inventory-cards-container ${!isCompleted ? 'row' : 'col'}`}>
			<Card
				icon={BUILDING_ICON}
				title={t(INVENTORY_CARDS.CARD_1_TITLE, { ns: DOMAIN_NAME })}
				value={inventoryReport?.towers || 0}
			/>
			<Card
				icon={DOOR_ICON}
				title={t(INVENTORY_CARDS.CARD_2_TITLE, { ns: DOMAIN_NAME })}
				value={inventoryReport?.properties || 0}
			/>
		</div>
	);
};

export default InventoryCards;
