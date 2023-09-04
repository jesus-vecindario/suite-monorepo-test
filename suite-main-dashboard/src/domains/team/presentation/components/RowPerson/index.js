import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextTag } from '@vecindario/vecindario-suite-components';
import { useSelector } from 'react-redux';
import { MODULE_OPTIONS_KEYS, getCurrentUser } from '@vecindario/suite-dashboard-layout-lib';
import './RowPerson.scss';
import { useTranslation } from 'react-i18next';
import { ICON_EDIT } from '../../../application/constants/icons';
import ActiveModule from '../ActiveModule/index';
import { capitalize, getFirstWord } from '../../../../../shared/application/helpers/common-functions';
import ModalEditPerson from '../ModalEditPerson';
import { DOMAIN_NAME as SHARED_DOMAIN } from '../../../../../shared/infrastructure/i18n/locales';
import { ROW_PERSON } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const RowPerson = ({
	id,
	name,
	lastname,
	role,
	email,
	status,
	activeModules,
	projectCreator,
	listTeamRole,
	openPremiumModal,
}) => {
	const modules = activeModules !== null ? activeModules : [];
	const currentUser = useSelector(getCurrentUser);
	const { t } = useTranslation();

	const setPersonName = () => {
		if (status === 'pending') {
			return <small className="pending-invitation">{t(ROW_PERSON.SMALL, { ns: DOMAIN_NAME })}</small>;
		}
		return `${capitalize(getFirstWord(name))} ${capitalize(getFirstWord(lastname))}`;
	};

	const setAvatarLetters = () => {
		if (status === 'pending') {
			return null;
		}
		const firstLetter = name ? name.charAt(0) : '';
		const secondLetter = lastname ? lastname.charAt(0) : '';
		return `${capitalize(firstLetter + secondLetter)}`;
	};

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);
	const handleClose = () => setOpen(false);

	const showConfiguration = currentUser?.email !== email || !projectCreator;

	return (
		<div className="container-row-person">
			<div className="avatar">
				<TextTag>{setAvatarLetters()}</TextTag>
			</div>
			<div className="info-person">
				<div className="name-and-edit">
					<p className="name-person" title={setPersonName()}>
						{setPersonName()}
					</p>
					<div className="container-icon-confg" onClick={() => handleOpen()}>
						{showConfiguration && (
							<>
								<i className={`${ICON_EDIT} icon-person`} />
								<TextTag variant="-body-xs">{t(ROW_PERSON.EDIT, { ns: DOMAIN_NAME })}</TextTag>
							</>
						)}
					</div>
				</div>
				<p className="email-person" title={email}>
					{email}
				</p>
				<div className="container-active-modules">
					{modules.length > 0 &&
						modules.map((item, index) => {
							return (
								<ActiveModule
									module={item.name}
									text={t(`${MODULE_OPTIONS_KEYS[item.key?.toUpperCase()]?.PARSED_NAME}`, { ns: SHARED_DOMAIN })}
									key={index}
								/>
							);
						})}
				</div>
			</div>

			<ModalEditPerson
				projectAccessId={id}
				name={status === 'pending' ? email : setPersonName()}
				isModalOpen={open}
				setIsModalOpen={() => handleClose()}
				myModules={modules}
				role={role}
				listTeamRole={listTeamRole}
				openPremiumModal={openPremiumModal}
			/>
		</div>
	);
};

RowPerson.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	lastname: PropTypes.string,
	role: PropTypes.string,
	email: PropTypes.string,
	status: PropTypes.string,
	activeModules: PropTypes.array,
	projectCreator: PropTypes.bool,
	listTeamRole: PropTypes.object,
	openPremiumModal: PropTypes.func,
};

export default RowPerson;
