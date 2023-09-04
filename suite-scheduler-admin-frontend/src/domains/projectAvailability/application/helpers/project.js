import { getHourFormatByNumber } from '../../../../shared/application/helpers/date';
import { createNumberArray, getKeysFromObject } from '../../../../shared/application/helpers/common-functions';
import { projectFields } from '../constants/project';

export const cleanRestDays = (attention_days) =>
	getKeysFromObject(attention_days).filter((day) => !attention_days[day].isRestDay);

export const transformAttentionDays = (attention_days, scheduling_time) => {
	return cleanRestDays(attention_days).map((attention_day) => {
		const day = parseInt(attention_day.slice(-1));
		return {
			day_of_week: day - 1,
			duration: parseInt(scheduling_time),
			begin_hour: getHourFormatByNumber(attention_days[attention_day].hourStart),
			end_hour: getHourFormatByNumber(attention_days[attention_day].hourEnd),
		};
	});
};

export const toFormData = (object) => {
	const formData = new FormData();
	Object.keys(object).forEach((key) => formData.append(key, object[key]));
	return formData;
};

export const transformProjectData = (data) => {
	const body = { ...data };
	if (data[projectFields.ATTENTION_DAYS]) {
		body[projectFields.ATTENTION_DAYS] = JSON.stringify(
			transformAttentionDays(data[projectFields.ATTENTION_DAYS], data[projectFields.SCHEDULING_TIME]),
		);
	}
	delete body[projectFields.SCHEDULING_TIME];
	return toFormData(body);
};

export const fillRestDays = (attention_days) => {
	const days = createNumberArray(1, 7);
	const object = {};
	days.forEach((raw_day) => {
		const day = `d${raw_day}`;
		object[day] = {
			day_of_week: raw_day,
			hourStart: attention_days?.[raw_day]?.hourStart || null,
			hourEnd: attention_days?.[raw_day]?.hourEnd || null,
			isRestDay: attention_days?.[raw_day]?.isRestDay ?? true,
		};
	});
	return object;
};

export const transformEditProject = (data) => {
	const body = { ...data };
	body[projectFields.SCHEDULING_TIME] = String(data[projectFields.SCHEDULING_TIME]);
	body[projectFields.ATTENTION_DAYS] = fillRestDays(data[projectFields.ATTENTION_DAYS]);
	return body;
};

export const slugIsValid = (slug, myProjects) => myProjects.some((myProject) => myProject.slug === slug);
