import * as commonFunctions from '../common-functions';

describe('When call importResource', () => {
	test('should import resource and head should have one child', async () => {
		commonFunctions.importResource({
			style: `https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700,800|300,400,500,600,700Inter:&display=swap`,
			id: 'google-fonts',
			async: true,
		});
		expect(document.querySelector('head').children.length).toBe(1);
	});
});

describe('When call filterData with a array of objects and text', () => {
	test('Should return a new array filtered with text results ignoring accents and capitalize', () => {
		const array = [
			{
				name: 'Juanito',
				lastname: 'Juarez',
			},
			{
				name: 'Pepito',
				lastname: 'Perez',
			},
			{
				name: 'Pepito',
				lastname: 'Juarez',
			},
		];

		const filteredArray = commonFunctions.filterData(array, 'pepito');
		expect(filteredArray).toStrictEqual([
			{
				name: 'Pepito',
				lastname: 'Perez',
			},
			{
				name: 'Pepito',
				lastname: 'Juarez',
			},
		]);

		const findJuanito = commonFunctions.filterData(array, 'juanito');
		expect(findJuanito).toStrictEqual([
			{
				name: 'Juanito',
				lastname: 'Juarez',
			},
		]);
	});
});
