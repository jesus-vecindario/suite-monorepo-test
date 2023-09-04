const getItemFn = jest.fn(() => null);
const setItemFn = jest.fn(() => null);

export const localStorageMock = (getItem = getItemFn, setItem = setItemFn) =>
	Object.defineProperty(window, 'localStorage', {
		value: {
			getItem,
			setItem,
		},
		writable: true,
	});

export default localStorageMock;
