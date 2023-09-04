import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './PeopleContainer.scss';
import { TextTag } from '@vecindario/vecindario-suite-components';
import { useTranslation } from 'react-i18next';
import RowPerson from '../RowPerson/index';

import { PEOPLE_CONTAINER } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';
import { I18N_ROLE_KEY } from '../../../application/constants/addPeople';

const PeopleContainer = ({ rol, description, people, title = '', listTeamRole, openPremiumModal }) => {
	const { t } = useTranslation();
	const roleI18n = useMemo(() => t(I18N_ROLE_KEY[rol], { ns: DOMAIN_NAME, rol }), [t, rol]);

	return (
		<div className="container-people-team">
			<TextTag fw="bold" className="title">
				{title || t(PEOPLE_CONTAINER.TEX_TAG_1, { ns: DOMAIN_NAME, rol: roleI18n })}
			</TextTag>
			<TextTag className="description" variant="-body">
				{description}
			</TextTag>
			<div className="contianer-rows">
				{people.length <= 0 && (
					<div className="empty-row">
						<TextTag fw="bold" variant="-body">
							{t(PEOPLE_CONTAINER.TEX_TAG_2, { ns: DOMAIN_NAME })}
						</TextTag>
					</div>
				)}
				{people.map((user, index) => {
					const userEmail = user.email || user.invited_user_email;
					return (
						<RowPerson
							key={index}
							id={user.id}
							name={user.name}
							lastname={user.lastname}
							role={user.role}
							status={user.invitation_status}
							email={userEmail}
							activeModules={user.modules}
							projectCreator={user['is_project_creator?']}
							listTeamRole={listTeamRole}
							openPremiumModal={openPremiumModal}
						/>
					);
				})}
			</div>
		</div>
	);
};

PeopleContainer.propTypes = {
	rol: PropTypes.string,
	description: PropTypes.string,
	people: PropTypes.array,
	title: PropTypes.string,
	listTeamRole: PropTypes.object,
	openPremiumModal: PropTypes.func,
};

export default PeopleContainer;
