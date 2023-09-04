export const analyticsFields = {
	ACTIVE: 'active',
	GOOGLE_TAG_MANAGER: 'google_tag_manager_id',
};

export const defaultValues = (status) => {
	const obj = {
		[analyticsFields.ACTIVE]: status,
	};
	return obj;
};

export default { analyticsFields };
