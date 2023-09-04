import { useLocation } from 'react-router-dom';

export const useQuery = (param) => {
	const search = new URLSearchParams(useLocation().search);
	return search.get(param);
};

export default { useQuery };
