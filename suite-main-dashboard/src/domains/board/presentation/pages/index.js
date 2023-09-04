import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import { moduleLinks, moduleKeys } from '@vecindario/suite-library';
import { FooterSuite, Helmet } from '@vecindario/vecindario-suite-components';
import { useTranslation } from 'react-i18next';
import ShowMoreCard from '../components/showMoreCard';
import ChecklistCard from '../components/checklistCard';
import ProjectCard from '../components/projectCard';
import { checkCookieExistence } from '../../../../shared/application/helpers/common-functions';
import { getTeam } from '../../../team/application/slices/team';
import WrapperTeamImages from '../components/wrapperTeamImages';
import InventoryCards from '../components/inventoryCards';
import BusinessCard from '../components/businessCard';
import { getCheckListIsCompleted, isLoadingCompleted } from '../../application/selector/board';
import { PROD_ENV } from '../../../../shared/application/constants/env';
import { getCommercialOpportunitiesBySlug, getInventoryReportBySlug } from '../../application/slices/board';
import { LAST_SELECTED_SLUG } from '../../../../shared/application/constants/cookiesKeys';
import './Board.scss';
import { DOMAIN_NAME } from '../../infrastructure/locales';
import { BOARD } from '../../infrastructure/locales/translation_keys';

const Board = () => {
	const dispatch = useDispatch();
	const currentProject = useSelector(getCurrentProject);
	const slug = currentProject?.slug || checkCookieExistence(LAST_SELECTED_SLUG);
	const isCompleted = useSelector(getCheckListIsCompleted);
	const showLeftSide = useSelector(isLoadingCompleted);
	const { t } = useTranslation();

	useEffect(() => {
		if (slug) {
			dispatch(getTeam(slug));
			dispatch(getInventoryReportBySlug(slug));
			dispatch(getCommercialOpportunitiesBySlug(slug));
		}
	}, [dispatch, currentProject, slug]);

	return (
		<>
			<Helmet title={t(BOARD.HELMET_TITLE, { ns: DOMAIN_NAME })} />
			<div className="board-container">
				<div className="board-wrapper">
					{showLeftSide && (
						<div className={`left-side ${isCompleted ? 'checklist-completed' : ''}`}>
							{!isCompleted && <ChecklistCard className="pending-actions" />}
							<div className={!isCompleted ? 'suite-modules-info' : 'modules-info'}>
								<ShowMoreCard
									title={t(BOARD.SHOW_MORE_CARD_1_TITLE, { ns: DOMAIN_NAME })}
									className="inventory-card"
									pushTo={moduleLinks[moduleKeys.INVENTORY_KEY][PROD_ENV]}
								>
									<InventoryCards />
								</ShowMoreCard>
								<ShowMoreCard
									title={t(BOARD.SHOW_MORE_CARD_2_TITLE, { ns: DOMAIN_NAME })}
									className="business-card"
									pushTo={moduleLinks[moduleKeys.COMMERCIAL_OPPORTUNITIES_KEY][PROD_ENV]}
								>
									<BusinessCard />
								</ShowMoreCard>
							</div>
						</div>
					)}
					<div className="right-side">
						<ProjectCard className="project-card" />
						<ShowMoreCard title={t(BOARD.SHOW_MORE_CARD_3_TITLE, { ns: DOMAIN_NAME })} className="team-card">
							<WrapperTeamImages />
						</ShowMoreCard>
					</div>
				</div>
			</div>
			<FooterSuite />
		</>
	);
};

export default Board;
