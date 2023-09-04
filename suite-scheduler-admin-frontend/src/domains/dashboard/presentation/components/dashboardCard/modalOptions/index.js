import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '@vecindario/suite-dashboard-layout-lib';
import './ModalOptions.scss';

const ModalOptions = ({ user }) => {
	const currentUser = useSelector(getCurrentUser);

	return (
		<>
			{(!user['is_project_creator?'] || currentUser.id !== user.user_id) && (
				<div className="modal-options-team">
					{!user['is_principal_director?'] && <button className="action">Eliminar</button>}
				</div>
			)}
		</>
	);
};

ModalOptions.propTypes = {
	user: PropTypes.object,
};

export default ModalOptions;
