import React, { useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import { moduleLinks, moduleKeys } from '@vecindario/suite-library';
import { useSelector } from 'react-redux';

import { TextTag, ProgressBar } from '@vecindario/vecindario-suite-components';
import { useTranslation } from 'react-i18next';
import ItemList from '../itemList';
import { getArrayTeam } from '../../../../team/application/selector/team';
import { adminTeamRoute } from '../../../../team/infrastructure/routing/routes';
import { getInventoryReport } from '../../../application/selector/board';
import { PROD_ENV } from '../../../../../shared/application/constants/env';
import { createSuiteCookie } from '../../../../../shared/application/helpers/common-functions';
import { LAST_SELECTED_SLUG } from '../../../../../shared/application/constants/cookiesKeys';
import './ChecklistCard.scss';
import { DOMAIN_NAME } from '../../../infrastructure/locales';
import { BOARD, CHECK_LIST_CARD } from '../../../infrastructure/locales/translation_keys';

const CREATE_PROJECT_CHECK = (t) => ({
	isComplete: true,
	textComponent: (
		<TextTag font="Lato" variant="-body" fw="normal" className="item-text">
			{t(CHECK_LIST_CARD.NEW_PROJECT, { ns: DOMAIN_NAME })}
		</TextTag>
	),
});

const ChecklistCard = ({ className = '' }) => {
	const { slug } = useParams();
	const currentProject = useSelector(getCurrentProject);
	const inventoryReport = useSelector(getInventoryReport);
	const team = useSelector(getArrayTeam);
	const { t } = useTranslation();

	const handleClick = useCallback(() => {
		createSuiteCookie(LAST_SELECTED_SLUG, slug);
		window.location.href = moduleLinks[moduleKeys.INVENTORY_KEY][PROD_ENV];
	}, [slug]);

	const teamCheck = useMemo(() => {
		return {
			isComplete: team.length > 1,
			textComponent: (
				<TextTag font="Lato" variant="-body" fw="normal" className="item-text">
					<Link className="link" to={adminTeamRoute(slug)}>
						{t(CHECK_LIST_CARD.ADD_USER, { ns: DOMAIN_NAME })}
					</Link>{' '}
					{t(CHECK_LIST_CARD.TEAM, { ns: DOMAIN_NAME })}
				</TextTag>
			),
		};
	}, [team, slug, t]);

	const addInventoryCheck = useMemo(() => {
		return {
			isComplete: !!inventoryReport.towers,
			textComponent: (
				<TextTag font="Lato" variant="-body" fw="normal" className="item-text">
					<span className="link" onClick={handleClick}>
						{t(CHECK_LIST_CARD.ADD_INVENTORY, { ns: DOMAIN_NAME })}
					</span>{' '}
					{t(CHECK_LIST_CARD.LABEL, { ns: DOMAIN_NAME })} {currentProject?.title}
				</TextTag>
			),
		};
	}, [currentProject?.title, handleClick, inventoryReport.towers, t]);

	const items = useMemo(
		() => [CREATE_PROJECT_CHECK(t), teamCheck, addInventoryCheck],
		[teamCheck, addInventoryCheck, t],
	);
	const stepsCompleted = useMemo(() => items.filter((item) => item.isComplete).length, [items]);
	const progress = useMemo(() => Math.round(100 * stepsCompleted) / items.length, [stepsCompleted, items]);

	return (
		<div className={`checklist-card-container ${className}`}>
			<div className="header">
				<TextTag tag="h5">{t(`${BOARD.TITLE_FINISH}`, { ns: DOMAIN_NAME })}</TextTag>
				<div className="progress-with-label">
					<ProgressBar progress={progress} className="progress-bar-container" classNameFill="progress-bar-fill" />
					<TextTag tag="p" variant="-body-xs" fw="bold" className="steps-completed">
						{stepsCompleted} / {items?.length}
					</TextTag>
				</div>
			</div>
			<div className="body">
				{items.map((item, index) => (
					<ItemList key={index} isComplete={item.isComplete} textComponent={item.textComponent} />
				))}
			</div>
		</div>
	);
};

ChecklistCard.propTypes = {
	className: PropTypes.string,
};

export default ChecklistCard;
