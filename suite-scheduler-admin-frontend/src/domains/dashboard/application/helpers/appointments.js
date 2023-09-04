export const existAppointment = (appointments, newAppointment) => {
	return !!appointments.find((appointment) => JSON.stringify(appointment) === JSON.stringify(newAppointment));
};

export const transformAppointment = (appointment) => {
	const value = { ...appointment };
	delete value.id;
	delete value.duration;
	delete value.hour;
	delete value.appointment_date;
	return JSON.stringify(value);
};

export const cleanDuplicates = (appointments) => {
	const dates = Object.keys(appointments);
	const result = {};
	dates.forEach((date) => {
		const dayAppointments = appointments[date];
		result[date] = dayAppointments.filter((value, index) => {
			const _value = transformAppointment(value);
			return (
				index ===
				dayAppointments.findIndex((obj) => {
					return transformAppointment(obj) === _value;
				})
			);
		});
	});
	return result;
};

export default {};
