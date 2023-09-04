import { createBrowserHistory, createMemoryHistory } from 'history';

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

export const history = isServer
	? createMemoryHistory({
			initialEntries: ['/'],
	  })
	: createBrowserHistory();
