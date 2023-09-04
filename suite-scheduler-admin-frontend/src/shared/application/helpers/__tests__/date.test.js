import * as dateFunctions from '../date';

describe('When call formatScheduleNotificationDate with a date', () => {
	test('Should return a string in format dddd DD MMMM [-] h:mm a', () => {
		const date = Date.UTC(2020, 1, 1, 8, 35);
		expect(dateFunctions.formatScheduleNotificationDate(date)).toContain('Sábado, 01 de feb. - ');
	});
});

describe('When call getHourFromDate with a date', () => {
	test('Should return a string in format h:mm', () => {
		const date = Date.UTC(2020, 1, 1, 8, 35);
		expect(dateFunctions.getHourFromDate(new Date(date))).toContain(':35');
		const date2 = Date.UTC(2020, 1, 1, 10, 35);
		expect(dateFunctions.getHourFromDate(new Date(date2))).toContain(':35');
	});
});
