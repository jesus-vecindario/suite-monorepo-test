import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import BxInfiniteScroll from 'bx-stable-infinite-scroll';

import { Button, Helmet, TextTag } from '@vecindario/vecindario-suite-components';
import { getCurrentProject, getCurrentUser, setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { useHistory, useParams } from 'react-router-dom';
import DashboardCard from '../../components/dashboardCard';
import SearchBar from '../../../../../shared/presentation/components/searchBar';

import { ICON_PLUS, ICON_STATS, ICON_COPY_LINK } from '../../../../../shared/application/constants/icons';
import { setNewAppointmentModalOpen, setPermissions } from '../../../../../shared/application/slices/core';
import NewAppointment from '../../../../appointment/presentation/components/appointment/NewAppointment';
import LateralModal from '../../../../../shared/presentation/components/Modal';
import AssessorSchedulerStats from '../../components/assessorSchedulerStats';
import {
	addAppointmentToList,
	fetchAppointments,
	setClosePopoverDashboard,
	fetchSearchAppointments,
	clearSearchResult,
} from '../../../application/slice/dashboard';
import {
	getAppointmentsDashboard,
	getIsSearchingAppointments,
	getSearchAppointmentsDashboard,
} from '../../../application/selectors/dashboard';
import { getAppointments, getSchedulerPermissions } from '../../../infrastructure/api';
import { newAppointmentFields } from '../../../application/constants/appointment';
import Spinner from '../../../../../shared/presentation/components/Spinner';
import {
	copyTextToClipboard,
	debounce,
	isEmptyObject,
} from '../../../../../shared/application/helpers/common-functions';
import ButtonSync from '../../components/ButtonSync';
import AppointmentModal from '../../../../appointment/presentation/components/AppointmentModal';
import { adviserLinkAppointment } from '../../../../linkAdviser/infrastructure/routes';
import { successToast } from '../../../../../shared/application/helpers/toast';
import { DIRECTOR_ROLE, SUPER_ADMIN_ROLE } from '../../../../projectAvailability/application/constants/project';
import { homeRoute } from '../../../../../shared/infrastructure/routing/routes';
import './Schedule.scss';

window.moment = moment;

const Schedule = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { slug } = useParams();
	const newAppointmentModalOpen = useSelector((state) => state.core.newAppointmentModalOpen);
	const loadingAppointments = useSelector((state) => state.dashboard?.loading);
	const [isStatsOpen, setStatsOpen] = useState(false);
	const appointments = useSelector(getAppointmentsDashboard);
	const searchAppointments = useSelector(getSearchAppointmentsDashboard);
	const isSearchingAppointments = useSelector(getIsSearchingAppointments);
	const currentProject = useSelector(getCurrentProject);
	const currentUser = useSelector(getCurrentUser);

	const dashboardAppointments = useMemo(() => {
		if (isSearchingAppointments) {
			return searchAppointments;
		}

		return appointments;
	}, [isSearchingAppointments, appointments, searchAppointments]);

	const [followingPage, setFollowingPage] = useState(1);
	const [previousPage, setPreviousPage] = useState(0);

	const [loadingNext, setLoadingNext] = useState(false);
	const [loadingPrevious, setLoadingPrevious] = useState(false);
	const [isActiveScroll, setIsActiveScroll] = useState(false);

	const [isFollowingEnd, setIsFollowingEnd] = useState(false);
	const [isPreviousEnd, setIsPreviousEnd] = useState(false);

	const debounceRef = useRef();

	const appointmentsRequested = useSelector((state) => state.dashboard?.appointmentsRequested);
	const schedulerDivRef = useRef();

	useEffect(() => {
		getSchedulerPermissions(currentProject?.slug, currentUser?.email).then((res) => {
			dispatch(setPermissions(res));
		});
	}, [currentUser, currentProject, dispatch]);

	useEffect(() => {
		const initComponent = async () => {
			await dispatch(fetchAppointments({ per_page: 5 }));
			setTimeout(() => {
				setIsActiveScroll(true);
			}, 150);
		};
		initComponent();
	}, [dispatch]);

	useEffect(() => {
		const closePopoverOnScroll = () => {
			dispatch(setClosePopoverDashboard(true));
			setTimeout(() => dispatch(setClosePopoverDashboard(false)), 50);
		};
		setTimeout(() => {
			const { current } = schedulerDivRef;
			if (current?.containerRef?.current?.addEventListener) {
				current?.containerRef?.current?.addEventListener('scroll', closePopoverOnScroll);
			}
			return () => {
				current?.containerRef?.current?.removeEventListener('scroll', closePopoverOnScroll);
			};
		}, 1000);
	}, [dispatch, schedulerDivRef]);

	const handleOpenAdviserLink = () => {
		if (currentProject && currentUser) {
			copyTextToClipboard(`${origin}${adviserLinkAppointment(slug, currentUser.email)}`).then(() => {
				dispatch(setMessageToast(successToast('Link copiado al portapapeles')));
			});
		}
	};

	const getNextDate = useCallback(() => {
		const dates = Object.keys(dashboardAppointments);
		const now = moment().format('YYYY-MM-DD');

		return dates.sort().find((date) => new Date(date) >= new Date(now));
	}, [dashboardAppointments]);

	const backToTop = () => {
		const element = document.querySelector('#dashboard-appointment-today');
		if (element) {
			element?.scrollIntoView({ block: 'center', behavior: 'smooth' });
		}
	};

	const addAppointmentsToList = (appointmentsObject) => {
		Object.keys(appointmentsObject).forEach((key) => {
			const appointmentsArray = appointmentsObject[key];
			appointmentsArray?.forEach((appointment) => {
				dispatch(
					addAppointmentToList({
						[newAppointmentFields.DATE_DAY]: key,
						...appointment,
					}),
				);
			});
		});
	};

	const handleDataLoad = async (isPrevious = false) => {
		if (!isActiveScroll || loadingAppointments) {
			return;
		}
		try {
			if (isPrevious) {
				setLoadingPrevious(true);
			} else {
				setLoadingNext(true);
			}
			const nextPage = isPrevious ? previousPage + 1 : followingPage + 1;
			const followingAppointments = await getAppointments(slug, nextPage, 5, isPrevious ? 'previous' : 'following');
			if (!followingAppointments || isEmptyObject(followingAppointments)) {
				if (isPrevious) {
					setLoadingPrevious(false);
					setIsPreviousEnd(true);
				} else {
					setLoadingNext(false);
					setIsFollowingEnd(true);
				}
			} else {
				if (isPrevious) {
					setLoadingPrevious(false);
					setPreviousPage(previousPage + 1);
				} else {
					setFollowingPage(followingPage + 1);
					setLoadingNext(false);
				}
				addAppointmentsToList(followingAppointments);
			}
		} catch (error) {
			setLoadingPrevious(false);
			setLoadingNext(false);
		}
	};

	const callbackSearch = (_, text) => {
		debounce(
			debounceRef,
			async () => {
				text.length >= 3
					? await dispatch(fetchSearchAppointments({ list: 'search', search: text, slug }))
					: await dispatch(clearSearchResult());
			},
			1000,
		);
	};

	const renderAppointments = () => {
		if (isSearchingAppointments && isEmptyObject(searchAppointments)) {
			return <h3 className="empty-appointments">No se encontraron resultados</h3>;
		}

		if (!Object.keys(dashboardAppointments)?.length && appointmentsRequested) {
			return <h3 className="empty-appointments">No tienes citas agendadas</h3>;
		}

		return (
			<>
				{appointmentsRequested && isPreviousEnd && isEmptyObject(searchAppointments) && (
					<h3 className="no-more-scheduling">No tienes más agendamientos pasados</h3>
				)}
				<div className="vanish-appointments top-vanish" />
				{Object.keys(dashboardAppointments)
					.sort()
					.map((date, index) => (
						<DashboardCard
							key={`day-${date}`}
							id={index}
							date={date}
							schedules={dashboardAppointments[date]}
							isScrollFocusCard={date === getNextDate()}
						/>
					))}
				<div className="vanish-appointments"></div>
				{appointmentsRequested && isFollowingEnd && isEmptyObject(searchAppointments) && (
					<h3 className="no-more-scheduling">No tienes más agendamientos</h3>
				)}
			</>
		);
	};

	// Verificar si el rol actual es de director
	useEffect(() => {
		if (currentProject?.role === DIRECTOR_ROLE && !currentUser?.user_roles?.includes(SUPER_ADMIN_ROLE)) {
			history.push(homeRoute);
		}
	}, [currentProject, currentUser?.user_roles, history]);

	return (
		<>
			<Helmet title={'Vecindario Suite - Gestor de calendarios - Cronología'} />
			<div className="scheduler-container">
				<main className="schedule">
					<div className="schedule-description">
						<TextTag tag="h2" font="DM-sans" variant="-body" fw="bold" className="title">
							Cronología
						</TextTag>
						<TextTag tag="p" font="DM-sans" variant="-body" fw="normal" className="description">
							Agenda y distribuye tus citas de una manera más eficiente y rápida, tanto para tus asesores como para los
							clientes que están interesados en visitar tu proyecto
						</TextTag>

						<Button onClick={backToTop} variant="bordered" className="button-today">
							Hoy
						</Button>
					</div>
					<header className="header-schedule">
						<SearchBar placeHolder="Buscar" objsArray={[]} callbackSearch={callbackSearch} />
						<div className="actions">
							<ButtonSync />

							<Button variant="bordered" onClick={handleOpenAdviserLink} className="btn-adviser-link">
								<i className={`${ICON_COPY_LINK} icon`} />
								Link de contacto
							</Button>

							<Button variant="bordered" onClick={() => setStatsOpen(true)} className="btn-stats">
								<i className={`${ICON_STATS} icon`} />
								Ver estadísticas
							</Button>

							<Button
								variant="default"
								onClick={() => dispatch(setNewAppointmentModalOpen(true))}
								className="btn-new-appointment"
							>
								<i className={`${ICON_PLUS} icon`} />
								Nuevo Agendamiento
							</Button>
						</div>
					</header>
					{getNextDate() && (
						<Button onClick={() => backToTop()} variant="bordered" className="button-today">
							Hoy
						</Button>
					)}
					<section
						className={`${dashboardAppointments === appointments ? 'section-appointments' : ''} ${
							getNextDate() ? '' : 'm-without-button'
						}`}
					>
						<BxInfiniteScroll
							loadingComponent={<Spinner />}
							nextDataFn={handleDataLoad}
							nextEnd={isFollowingEnd}
							nextLoading={loadingNext}
							previousDataFn={() => handleDataLoad(true)}
							previousEnd={isPreviousEnd}
							previousLoading={loadingPrevious}
							ref={schedulerDivRef}
						>
							{renderAppointments()}
						</BxInfiniteScroll>
					</section>
				</main>
			</div>

			<AppointmentModal isOpen={newAppointmentModalOpen} setOpen={(value) => dispatch(setNewAppointmentModalOpen(value))}>
				{newAppointmentModalOpen ? <NewAppointment /> : null}
			</AppointmentModal>
			<LateralModal modalIsOpen={isStatsOpen} setIsOpen={setStatsOpen}>
				<AssessorSchedulerStats callRequest={isStatsOpen} />
			</LateralModal>
		</>
	);
};

export default Schedule;
