import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ROLES } from '../../../application/constants/roles';

import TeamImages from '../teamImages';
import { adminTeamRoute } from '../../../../team/infrastructure/routing/routes';
import './WrapperTeamImages.scss';
import { WRAPPER_TEAM_IMAGES } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const WrapperTeamImages = () => {
	const { slug } = useParams();
	const { t } = useTranslation();

	return (
		<div className="wrapper-team-images-container">
			<div className="wrapper">
				{Object.values(ROLES).map((role, index) => (
					<TeamImages key={index} role={role} />
				))}
			</div>
			<div className="footer">
				<Link className="suite-button bordered add-btn" to={adminTeamRoute(slug)}>
					{t(WRAPPER_TEAM_IMAGES.LINK, { ns: DOMAIN_NAME })}
				</Link>
			</div>
		</div>
	);
};

export default WrapperTeamImages;
