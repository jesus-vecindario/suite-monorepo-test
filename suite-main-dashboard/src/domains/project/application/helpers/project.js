import { INTERNATIONALIZATION_CONFIG_FIELD, projectFields } from '../../../../shared/application/constants/project';

export const toFormData = (object) => {
	const formData = new FormData();
	Object.keys(object).forEach((key) => formData.append(key, object[key]));
	return formData;
};

export const transformProjectData = (data) => {
	const body = { ...data };
	if (!body[projectFields.STATUS]) {
		delete body[projectFields.STATUS];
	}
	if (data[projectFields.LOCATION]) {
		body[projectFields.LOCATION] = JSON.stringify(data[projectFields.LOCATION]);
	}
	if (data[projectFields.CITY]) {
		body.project_city = data[projectFields.CITY];
		delete body[projectFields.CITY];
	}
	if (data[INTERNATIONALIZATION_CONFIG_FIELD]) {
		body[INTERNATIONALIZATION_CONFIG_FIELD] = JSON.stringify(data[INTERNATIONALIZATION_CONFIG_FIELD]);
	}
	return body;
};
