import PropTypes from 'prop-types';
import React from 'react';
import { TextTag } from '@vecindario/vecindario-suite-components';
import { useParams } from 'react-router-dom';
import { SCHEDULER_EMBEDDED } from '../../../../../../shared/application/constants/env';
import CodeHighlight from '../CodeHighlight';
import './EmbededScheduler.scss';

const EmbededScheduler = ({ commentsStep1, commentsStep2 }) => {
	const { slug } = useParams();

	return (
		<div className="embeded-scheduler-integration animate__animated animate__fadeIn">
			<TextTag tag="h3" font="DM-sans" fw="normal" variant="-body-sm" className="title">
				Paso 1
			</TextTag>

			<TextTag className="description" tag="p" font="DM-sans" fw="normal" variant="-body">
				Ahora debes copiar y pegar el siguiente código en tu sitio web, en el lugar exacto donde quieras que aparezca el
				agendador.
			</TextTag>

			<div className="code-wrapper">
				<CodeHighlight
					codeText={`<div id="agendadorByVecindario" data-projectslug='${slug}'></div>`}
					comments={commentsStep1}
				/>
			</div>

			<TextTag tag="h3" font="DM-sans" fw="normal" variant="-body-sm" className="title">
				Paso 2
			</TextTag>
			<p className="description">
				Para finalizar la instalación del simulador en tu sitio web, solo debes copiar y pegar el siguiente código antes del
				cierre de la etiqueta {'</body>'} en la misma página donde pegaste el código del paso 1
			</p>

			<div className="code-wrapper">
				<CodeHighlight codeText={`<script src="${SCHEDULER_EMBEDDED}"></script>`} comments={commentsStep2} />
			</div>
		</div>
	);
};

EmbededScheduler.propTypes = {
	commentsStep1: PropTypes.arrayOf(PropTypes.string),
	commentsStep2: PropTypes.arrayOf(PropTypes.string),
};

export default EmbededScheduler;
