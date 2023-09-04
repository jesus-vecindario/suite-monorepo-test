import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LazyImage, TextTag } from '@vecindario/vecindario-suite-components';
import { PARSED_PLURAL_ROLES } from '../../../application/constants/roles';
import { getArrayTeam } from '../../../../team/application/selector/team';
import { getFirstWord } from '../../../../../shared/application/helpers/common-functions';

import { USER_INVITATION_STATUS } from '../../../application/constants/invitationStatus';
import { adminTeamRoute } from '../../../../team/infrastructure/routing/routes';
import './TeamImages.scss';
import { NO_AVATAR_IMAGE } from '../../../application/constants/images';
import { TEAM_IMAGES } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const TeamImages = ({ role }) => {
	const { slug } = useParams();
	const team = useSelector(getArrayTeam);
	const { t } = useTranslation();

	const list = useMemo(
		() => team?.filter((user) => user.role === role && user.invitation_status === USER_INVITATION_STATUS.ACCEPTED),
		[team, role],
	);

	const userName = (user) => `${getFirstWord(user.name)} ${getFirstWord(user.lastname)}`;

	const MAX_IMAGES_TO_SHOW = 5;

	return (
		<div className="team-images-container">
			<TextTag tag="p" variant="-body-sm" fw="normal" font="DM-sans" className="role-name">
				{t(PARSED_PLURAL_ROLES[role], { ns: DOMAIN_NAME })}
			</TextTag>
			{list.length === 0 ? (
				<div className="images-wrapper">
					<div className="no-roles" />
					<TextTag tag="p" font="DM-sans" fw="normal" variant="-body-xs" className="show-more">
						<Link className="link" to={adminTeamRoute(slug)}>
							{t(TEAM_IMAGES.LINK_1, { ns: DOMAIN_NAME })}
						</Link>
					</TextTag>
				</div>
			) : (
				<div className="images-wrapper">
					{list.slice(0, MAX_IMAGES_TO_SHOW).map((user) => (
						<LazyImage key={user?.id} imageName={userName(user)} src={user?.avatar} defaultImage={NO_AVATAR_IMAGE} />
					))}
					{list.length > 5 && (
						<TextTag tag="p" font="DM-sans" fw="normal" variant="-body-xs" className="show-more">
							<Link className="link" to={adminTeamRoute(slug)}>
								{t(TEAM_IMAGES.LINK_2, { ns: DOMAIN_NAME })}
							</Link>
						</TextTag>
					)}
				</div>
			)}
		</div>
	);
};

TeamImages.propTypes = {
	role: PropTypes.string.isRequired,
};

export default TeamImages;
