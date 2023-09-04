import React from 'react';
import PropTypes from 'prop-types';
import { ICON_WINDOW } from '../../../application/constants/icons';

import './ModuleToas.scss';

const ModuleToast = ({ moduleName = 'Agendador' }) => {
	return (
		<div className="module-toast-container">
			<i className={`${ICON_WINDOW} icon`} />
			Módulo: <b className="module-name">{moduleName}</b>
		</div>
	);
};

ModuleToast.propTypes = {
	moduleName: PropTypes.string,
};

export default React.memo(ModuleToast);
