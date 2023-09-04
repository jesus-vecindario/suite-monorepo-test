import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { Button } from '@vecindario/vecindario-suite-components';
import { debounce, importResource } from '../../../../../../shared/application/helpers/common-functions';
import { errorToast, successToast } from '../../../../../../shared/application/helpers/toast';
import { COPY_TEXT_ICON } from '../../../../../tools/application/constants/icons';
import './CodeHighlight.scss';

let initializedHighlight = false;

const CodeHighlight = ({ comments, codeText }) => {
	const dispatch = useDispatch();
	const timerRef = useRef();
	const codeEl = useRef();
	const [showCode, setShowCode] = useState(true);

	const configureHighlight = () => {
		if (initializedHighlight) {
			debounce(
				timerRef,
				() => {
					setShowCode(false);
					setTimeout(() => {
						setShowCode(true);
						setTimeout(() => {
							window.hljs.configure({ useBR: true });
							document.querySelectorAll('code').forEach((block) => {
								window.hljs.highlightBlock(block);
							});
						}, 2);
					}, 1);
				},
				250,
			);
		}
	};

	const initHighlight = useCallback(() => {
		if (window.hljs) {
			setTimeout(() => {
				window.hljs.configure({ useBR: true });
				document.querySelectorAll('code').forEach((block) => {
					window.hljs.highlightBlock(block);
				});
				initializedHighlight = true;
			}, 1);
		} else {
			setTimeout(() => {
				initHighlight();
			}, 80);
		}
	}, []);

	useEffect(() => {
		importResource({
			style: `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/monokai.min.css`,
			id: 'monokai-highlight',
			async: true,
		});
		importResource({
			id: 'highlight-js',
			script: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js',
			async: true,
		});
		configureHighlight();
		initHighlight();
	}, [initHighlight]);

	useEffect(() => {
		configureHighlight();
		setTimeout(() => {
			initHighlight();
		}, 251);
	}, [codeText, initHighlight]);

	const copyToClipboard = useCallback(() => {
		const text = codeEl.current.textContent;
		navigator.clipboard.writeText(text).then(
			() => {
				dispatch(setMessageToast(successToast('Copiado al portapapeles!')));
			},
			(err) => {
				dispatch(setMessageToast(errorToast('No se pudo copiar')));
			},
		);
	}, [dispatch]);

	return (
		<div className="code-highlight-container">
			<Button variant="bordered" className="icon-container" onClick={copyToClipboard}>
				<i className={`${COPY_TEXT_ICON} icon`} />
				Copiar
			</Button>

			<pre className="code-container">
				{showCode && (
					<code className="language-html padding-3" ref={codeEl}>
						{comments?.map((comment, i) => (
							<div key={`comment-${i}`}>
								{comment}
								<br />
								<br />
							</div>
						))}
						{codeText}
					</code>
				)}
			</pre>
		</div>
	);
};

CodeHighlight.propTypes = {
	comments: PropTypes.arrayOf(PropTypes.string),
	codeText: PropTypes.string,
	previewCallback: PropTypes.func,
};

export default CodeHighlight;
