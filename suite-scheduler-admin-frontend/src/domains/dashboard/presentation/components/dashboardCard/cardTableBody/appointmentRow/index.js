import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { TextTag } from '@vecindario/vecindario-suite-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import moment from 'moment';
import Dropdown from '../../../../../../../shared/presentation/components/Dropdown';
import {
	capitalize,
	copyTextToClipboard,
	getFirstWord,
} from '../../../../../../../shared/application/helpers/common-functions';
import AppointmentOptions from '../../../../pages/schedule/appointment/options';
import AppointmentSelected from '../../../../pages/schedule/appointment/selected';
import StatusOptions from '../../../../pages/schedule/status/options';
import StatusSelected from '../../../../pages/schedule/status/selected';
import { ICON_COPY_LINK, ICON_ERROR_WARNING } from '../../../../../../../shared/application/constants/icons';
import { getHasCalendar } from '../../../../../../../shared/application/selectors/myProfile';
import MOBILE_PHONE_FORMAT from '../../../../../../../shared/application/helpers/formats';
import NewAppointment from '../../../../../../appointment/presentation/components/appointment/NewAppointment';
import { SCHEDULE_STATUS } from '../../../../../application/constants/schedules';
import { scheduleToAppointmentData } from '../../../../../../../shared/application/helpers/appointment';
import { updateAppointmentState, updateAppointmentType } from '../../../../../../appointment/infrastructure/api';
import { updateAppointment } from '../../../../../application/slice/dashboard';
import ConfirmationModal from '../../../ConfirmationModal';
import AppointmentModal from '../../../../../../appointment/presentation/components/AppointmentModal';
import { errorToast, successToast } from '../../../../../../../shared/application/helpers/toast';
import { getSchedulerPermissions } from '../../../../../../../shared/application/selectors/core';
import { APPOINTMENT_TYPE_VALUES } from '../../../../../../profile/application/constants/myProfile';
import './AppointmentRow.scss';

const AppointmentRow = ({ schedule, index }) => {
	const [appointmentSelected, setAppointmentSelected] = useState(schedule.appointment_type);
	const [statusSelected, setStatusSelected] = useState(schedule.state);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
	const [isNotAttendedModalOpen, setIsNotAttendedModalOpen] = useState(false);
	const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
	const hasCalendar = useSelector(getHasCalendar);
	const dispatch = useDispatch();
	const formattedMobile = schedule?.user_snapshot_detail?.mobile?.replace(MOBILE_PHONE_FORMAT, '+$1 $2 $3 $4');
	const showCalendarSyncWarning = !hasCalendar && schedule?.appointment_type === APPOINTMENT_TYPE_VALUES.VIDEO_CALL;
	const permissions = useSelector(getSchedulerPermissions);

	const disableDropdown = useMemo(() => permissions?.appointment_type.length === 1, [permissions]);

	const handleCopy = (link) => {
		if (link) {
			copyTextToClipboard(link).then(() => {
				dispatch(setMessageToast(successToast('¡Link copiado!')));
			});
		}
	};

	const setVisingUserName = () => {
		return schedule?.user_snapshot_detail?.first_name && schedule?.user_snapshot_detail?.last_name
			? `${capitalize(getFirstWord(schedule?.user_snapshot_detail?.first_name))} ${capitalize(
					getFirstWord(schedule?.user_snapshot_detail?.last_name),
			  )}`
			: 'No disponible';
	};

	useEffect(() => {
		if (!isModalOpen || !isCancelModalOpen || !isDoneModalOpen) setStatusSelected(schedule.state);
	}, [setStatusSelected, isModalOpen, isCancelModalOpen, isDoneModalOpen, schedule.state]);

	const handleSetStatus = (option) => {
		setStatusSelected(option);
		if (option === SCHEDULE_STATUS.RESCHEDULED) setIsModalOpen(true);
		if (option === SCHEDULE_STATUS.CANCELLED) setIsCancelModalOpen(true);
		if (option === SCHEDULE_STATUS.NOT_ATTENDED) setIsNotAttendedModalOpen(true);
		if (option === SCHEDULE_STATUS.DONE) setIsDoneModalOpen(true);
	};

	const handleUpdateAppointmentType = (type) => {
		if (type !== schedule.appointment_type) {
			updateAppointmentType(schedule.id, { type }).then((res) => {
				dispatch(updateAppointment(res));
				dispatch(setMessageToast(successToast('Tipo de cita actualizado correctamente')));
			});
		}
	};

	const handleUpdateAppointmentStatus = useCallback(
		async (state) => {
			try {
				const resp = await updateAppointmentState(schedule.id, { state });
				dispatch(setMessageToast(successToast('Agendamiento actualizado correctamente')));
				dispatch(updateAppointment(resp));
			} catch (err) {
				dispatch(setMessageToast(errorToast(err.toString())));
			}
		},
		[dispatch, schedule.id],
	);

	const handleAppointmentRescheduled = () => {
		dispatch(updateAppointment({ ...schedule, state: SCHEDULE_STATUS.RESCHEDULED }));
		setIsModalOpen(false);
	};

	const getLastDays = (date) => moment(date).isBefore(moment(), 'day');

	return (
		<>
			<tr className="card-body">
				<td className="container-hour">
					<div
						className={`hour ${getLastDays(schedule.appointment_date) ? 'last-day' : ''}`}
						id={schedule?.tourStep ? schedule.tourStep : ''}
					>
						{schedule?.hour}
					</div>
				</td>
				<td className="text-ellipsis-table">
					<TextTag tag="p" font="DM-sans" fw="bold" variant="-body" className="name">
						{setVisingUserName()}
					</TextTag>
					<br />
					<TextTag className="email" tag="p" fw="normal" font="DM-sans" variant="-body-sm">
						{schedule?.user_snapshot_detail?.email}
					</TextTag>
				</td>
				<td className={`${!formattedMobile && 'disable-field'} `}>{formattedMobile || 'No disponible'}</td>
				<td>
					<Dropdown
						content={
							disableDropdown ? (
								<></>
							) : (
								<AppointmentOptions
									statusSelected={statusSelected}
									appointmentSelected={appointmentSelected}
									setAppointmentSelected={setAppointmentSelected}
									updateAppointmentType={handleUpdateAppointmentType}
								/>
							)
						}
					>
						<AppointmentSelected optionSelected={appointmentSelected} appointmentTypeSelected={statusSelected} />
					</Dropdown>
				</td>
				<td>
					<Dropdown
						content={
							<StatusOptions
								appointmentDate={schedule.appointment_date}
								statusSelected={statusSelected}
								setStatusSelected={setStatusSelected}
								handleSetStatus={handleSetStatus}
							/>
						}
					>
						<StatusSelected optionSelected={statusSelected} />
					</Dropdown>
				</td>
				{/* <td className="text-ellipsis-table">{schedule?.projectAvailability?.title || 'No disponible'}</td> */}
				<td className="container-link">
					{showCalendarSyncWarning ? (
						<CalendarSyncWarning />
					) : (
						<i className={`${ICON_COPY_LINK} icon-copy`} onClick={() => handleCopy(schedule?.link)} />
					)}
				</td>
			</tr>

			<AppointmentModal isOpen={isModalOpen} setOpen={setIsModalOpen}>
				{isModalOpen ? (
					<NewAppointment
						handleAppointmentRescheduled={handleAppointmentRescheduled}
						initialData={scheduleToAppointmentData(schedule)}
					/>
				) : null}
			</AppointmentModal>

			<ConfirmationModal
				handleConfirmation={handleUpdateAppointmentStatus}
				setIsOpen={setIsCancelModalOpen}
				modalIsOpen={isCancelModalOpen}
				title="¿Estas seguro?"
				description="Si aceptas, esta cita quedara como cancelada, y no se podrá modificar a estados anteriores."
				confirmationType={SCHEDULE_STATUS.CANCELLED}
			/>

			<ConfirmationModal
				handleConfirmation={handleUpdateAppointmentStatus}
				setIsOpen={setIsNotAttendedModalOpen}
				modalIsOpen={isNotAttendedModalOpen}
				title="¿Estas seguro?"
				description="Si aceptas, esta cita se marcara no asistida, y no se podrá modificar a estados anteriores."
				confirmationType={SCHEDULE_STATUS.NOT_ATTENDED}
			/>

			<ConfirmationModal
				handleConfirmation={handleUpdateAppointmentStatus}
				setIsOpen={setIsDoneModalOpen}
				modalIsOpen={isDoneModalOpen}
				title="¿Estas seguro?"
				description="Si aceptas, esta cita quedara como realizada, y no se podrá modificar a estados anteriores."
				confirmationType={SCHEDULE_STATUS.DONE}
			/>
		</>
	);
};

AppointmentRow.propTypes = {
	schedule: PropTypes.object,
	index: PropTypes.number,
};

export default AppointmentRow;

const CalendarSyncWarning = () => {
	const [openPopover, setOpenPopover] = useState(false);

	const popoverStyle = {
		zIndex: 10000,
	};

	const toolStyle = {
		boxShadow: '0px 9px 24px rgba(9, 23, 37, 0.2)',
		backgroundColor: '#FFF',
		padding: '11px 12px',
		borderRadius: '10px',
		fontSize: '1.2rem',
		lineHeight: '1.5rem',
	};

	const handleMouseEnter = () => setOpenPopover(true);

	const handleMouseLeave = () => setOpenPopover(false);

	return (
		<Popover
			isOpen={openPopover}
			containerStyle={popoverStyle}
			content={({ position, childRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					childRect={childRect}
					popoverRect={popoverRect}
					arrowColor="#FFF"
					arrowSize={10}
				>
					<div style={toolStyle}>
						<b>Lo sentimos, no estas sincronizado.</b>
						<br />
						Comunícate con el cliente y acuerda
						<br /> el agendamiento.
					</div>
				</ArrowContainer>
			)}
			padding={5}
		>
			<i
				className={`${ICON_ERROR_WARNING} sync-warning-icon`}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
		</Popover>
	);
};
