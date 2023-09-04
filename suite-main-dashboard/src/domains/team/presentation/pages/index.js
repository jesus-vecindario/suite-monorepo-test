import React, { useState, useEffect, useMemo } from 'react';
import { Button, FooterSuite, Helmet, Input, TextTag } from '@vecindario/vecindario-suite-components';
import './Team.scss';
import { useDispatch, useSelector } from 'react-redux';
import Fuse from 'fuse.js';
import { getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import { useTranslation } from 'react-i18next';
import { ICON_SEARCH_LINE } from '../../application/constants/icons';
import PeopleContainer from '../components/PeopleContainer/index';
import ModalAddPeople from '../components/ModalAddPeople';
import { ADVISER_ROLE, DIRECTOR_ROLE, MARKETING_ROLE } from '../../application/constants/addPeople';
import { getArrayTeam } from '../../application/selector/team';
import { getTeam } from '../../application/slices/team';
import { checkCookieExistence } from '../../../../shared/application/helpers/common-functions';
import { LAST_SELECTED_SLUG } from '../../../../shared/application/constants/cookiesKeys';
import PremiumModal from '../../../../shared/presentation/components/PremiumModal';
import { LICENCE_FREE_PLAN } from '../../../../shared/application/constants/premium';
import AlertVersionPlan from '../../../../shared/presentation/components/AlertVersionPlan';
import { TEAM } from '../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../infrastructure/locales';

const Team = () => {
	const currentProject = useSelector(getCurrentProject);
	const arrayTeam = useSelector(getArrayTeam);
	const [open, setOpen] = useState(false);
	const [dataArrayTeam, setDataArrayTeam] = useState([]);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpenPremium = () => setModalOpen(!modalOpen);
	const isFree = currentProject?.licence_type === LICENCE_FREE_PLAN;
	const { t } = useTranslation();

	useEffect(() => {
		const slug = currentProject?.slug || checkCookieExistence(LAST_SELECTED_SLUG);
		if (slug) {
			dispatch(getTeam(slug));
		}
	}, [dispatch, currentProject]);

	useEffect(() => {
		setDataArrayTeam(arrayTeam);
	}, [arrayTeam]);

	const directors = useMemo(() => dataArrayTeam.filter((item) => item.role === DIRECTOR_ROLE), [dataArrayTeam]);
	const advisers = useMemo(() => dataArrayTeam.filter((item) => item.role === ADVISER_ROLE), [dataArrayTeam]);
	const marketing = useMemo(() => dataArrayTeam.filter((item) => item.role === MARKETING_ROLE), [dataArrayTeam]);

	const sizeTeams = directors.length !== 0 && advisers.length !== 0 && marketing.length !== 0;
	const listTeamRole = { director: directors, asesor: advisers, marketing };

	const handleSearch = (event) => {
		const valueSearch = event.target.value;
		if (valueSearch.length > 0) {
			const fuseOptions = {
				includeScore: true,
				threshold: 0.45,
				keys: ['email', 'name', 'lastname', 'invited_user_email'],
			};
			const fuse = new Fuse(arrayTeam, fuseOptions);
			const resultSearch = fuse.search(valueSearch);
			const resultArray = resultSearch.map((result) => result.item);
			setDataArrayTeam(resultArray);
		} else {
			setDataArrayTeam(arrayTeam);
		}
	};

	const handleClick = () => {
		if (isFree && sizeTeams) {
			setModalOpen(true);
		} else {
			setOpen(true);
		}
	};

	return (
		<>
			<Helmet title={t(TEAM.HELMET, { ns: DOMAIN_NAME })} />
			<div className="container-module-team">
				<section className="section-header">
					<TextTag tag="h5" className="title">
						{t(TEAM.TEX_TAG_1, { ns: DOMAIN_NAME })} {currentProject?.title}
					</TextTag>
					<p className="description">
						{t(TEAM.DESCRIPTION, { ns: DOMAIN_NAME })} {currentProject?.title}
					</p>
				</section>
				<section className="section-body">
					<div className="header-team">
						<div className="search-field">
							<Input
								className="search"
								placeholder={t(TEAM.SEARCH_PLACEHOLDER, { ns: DOMAIN_NAME })}
								icon={`${ICON_SEARCH_LINE} search-icon`}
								iconPosition="right"
								onChange={handleSearch}
							/>
						</div>
						<div className="add-people">
							<Button variant="bordered" className="add-button" onClick={handleClick}>
								{t(TEAM.BUTTON_ADD_USER, { ns: DOMAIN_NAME })}
							</Button>
						</div>
					</div>
					<section className="body-team">
						<PeopleContainer
							rol={DIRECTOR_ROLE}
							description={t(TEAM.PEOPLE_DESCRIPTION_DIRECTOR, { ns: DOMAIN_NAME })}
							people={directors}
							listTeamRole={listTeamRole}
							openPremiumModal={setModalOpen}
						/>
						<hr className="separator" />
						<PeopleContainer
							rol={ADVISER_ROLE}
							description={t(TEAM.PEOPLE_DESCRIPTION_ADVISER, { ns: DOMAIN_NAME })}
							people={advisers}
							listTeamRole={listTeamRole}
							openPremiumModal={setModalOpen}
						/>
						<hr className="separator" />
						<PeopleContainer
							rol={MARKETING_ROLE}
							description={t(TEAM.PEOPLE_DESCRIPTION_MARKETING, { ns: DOMAIN_NAME })}
							people={marketing}
							title={t(TEAM.MARKETING_TITLE, { ns: DOMAIN_NAME })}
							listTeamRole={listTeamRole}
							openPremiumModal={setModalOpen}
						/>
					</section>
				</section>
				<ModalAddPeople
					isModalOpen={open}
					setIsModalOpen={() => handleClose()}
					openPremiumModal={setModalOpen}
					listTeamRole={listTeamRole}
				/>
				<PremiumModal
					isModalOpen={modalOpen}
					setIsModalOpen={handleOpenPremium}
					title={
						<>
							{t(TEAM.PREMIUM_MODAL_TITLE_1, { ns: DOMAIN_NAME })}
							<br />
							{t(TEAM.PREMIUM_MODAL_TITLE_2, { ns: DOMAIN_NAME })}
						</>
					}
					description={t(TEAM.PREMIUM_MODAL_DESCRIPTION, { ns: DOMAIN_NAME })}
				/>
				<FooterSuite />
			</div>
			{isFree && <AlertVersionPlan />}
		</>
	);
};

export default Team;
