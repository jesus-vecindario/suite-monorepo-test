import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import { TextTag } from '@vecindario/vecindario-suite-components';

import { useTranslation } from 'react-i18next';
import { getPrincipalDirector } from '../../../../team/application/selector/team';
import './ProjectCard.scss';
import { getFirstWord } from '../../../../../shared/application/helpers/common-functions';
import { DOMAIN_NAME } from '../../../infrastructure/locales';
import { PROJECT_CARD } from '../../../infrastructure/locales/translation_keys';

const ProjectCard = ({ className = '' }) => {
	const currentProject = useSelector(getCurrentProject);
	const principalDirector = useSelector(getPrincipalDirector);
	const { t } = useTranslation();

	return (
		<div className={`project-card-container ${className}`}>
			<div className="header">
				<TextTag tag="p" variant="-body-xs" font="DM-sans" className="title">
					{t(PROJECT_CARD.HEADER_TEXT_TAG, { ns: DOMAIN_NAME })}
				</TextTag>
				<TextTag tag="h5" variant="-body" fw="bold" className="project-title">
					{currentProject?.title}
				</TextTag>
			</div>
			<div className="footer">
				<div className="director-info">
					<TextTag className="rol-title" tag="p" variant="-body-xs" font="DM-sans" fw="normal">
						{t(PROJECT_CARD.FOOTER_TEXT_TAG, { ns: DOMAIN_NAME })}
					</TextTag>
					<TextTag className="director-name" tag="p" variant="-body-sm" font="DM-sans">
						{getFirstWord(principalDirector?.name)} {getFirstWord(principalDirector?.lastname)}
					</TextTag>
				</div>
				<img className="project-logo" alt={t(PROJECT_CARD.FOOTER_IMG, { ns: DOMAIN_NAME })} src={currentProject?.logo} />
			</div>
		</div>
	);
};

ProjectCard.propTypes = {
	className: PropTypes.string,
};

export default ProjectCard;
