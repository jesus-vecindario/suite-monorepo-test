import { useEffect, useRef, useState } from 'react';

export const AMOUNT_STEPS = 75;

export const autoIncrementNumber = (callback, number, begin, steps) => {
	if (typeof callback !== 'function') return null;
	if (!requestAnimationFrame) {
		callback(number);
		return null;
	}
	let incrementer = begin;
	const increment = () => {
		if (incrementer >= number) {
			callback(number);
			return;
		}
		incrementer += steps;
		callback(incrementer);
		requestAnimationFrame(increment);
	};
	return requestAnimationFrame(increment);
};

const useAutoIncrementNumber = (numberToGo, startFrom, steps, fixedTo) => {
	const incrementRef = useRef(null);
	const [number, incrementNumber] = useState(startFrom);
	const isMounted = useRef(true);

	useEffect(() => {
		if (
			!(Number.isNaN(parseFloat(numberToGo)) || Number.isNaN(parseFloat(startFrom)) || Number.isNaN(parseFloat(steps)))
		) {
			const callbackIncrement = (value) => {
				if (isMounted.current) {
					incrementNumber(value);
				}
			};
			if (incrementRef.current) cancelAnimationFrame(incrementRef.current);
			isMounted.current = true;
			incrementRef.current = autoIncrementNumber(callbackIncrement, numberToGo, startFrom, steps);
		} else incrementNumber(numberToGo);

		return () => {
			isMounted.current = false;
			if (incrementRef.current) cancelAnimationFrame(incrementRef.current);
		};
	}, [numberToGo, startFrom, steps]);
	return number.toFixed(fixedTo || 0);
};

export default useAutoIncrementNumber;
