import * as yup from 'yup';

export function validateForm(data, formSchema) {
	const schema = yup.object().shape(formSchema);
	return schema.validate(data, { abortEarly: false });
}

export async function isValidForm(data, formSchema) {
	const schema = yup.object().shape(formSchema);
	return schema.isValid(data);
}
