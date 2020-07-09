import { Actor } from '../models/actor';
import { Subject } from '../models/subject';

export default [
	{
		id: 1,
		name: 'Ólafur Björn Magnússon',
		nationalId: '2606862759',
		scope: [
			'@Island.is/finance',
			'@Island.is/finance/personal.edit',
			'@Island.is/finance/vaccines.view'
		],
		subjectType: 'person'
	},
	{
		id: 2,
		name: 'Sendiráðið',
		nationalId: '5401482231',
		scope: [
			'@Island.is/finance',
			'@Island.is/finance/accounts',
			'@Island.is/finance/vaccines.view'
		],
		subjectType: 'company'
	},
	{
		id: 3,
		name: 'Þjóðskrá',
		nationalId: '7401482231',
		scope: [
			'@Island.is/finance',
			'@Island.is/finance/perscriptions.edit',
			'@Island.is/finance/vaccines.view'
		],
		subjectType: 'instituion'
	}
] as Subject[]