// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
	{
		id: '410544b2-4001-4271-9855-fec4b6a6442a',
		name: 'Valerie Temiz',
		email: 'ValerieTemiz@gmail.com',
		password: 'Temiz210524',
	},
]

const customers = [
	{
		id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
		name: 'Evil Rabbit',
		email: 'evil@rabbit.com',
		phone: '+420999999999999',
	},
	{
		id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
		name: 'Delba de Oliveira',
		email: 'delba@oliveira.com',
		phone: '+420999999999999',
	},
	{
		id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
		name: 'Lee Robinson',
		email: 'lee@robinson.com',
		phone: '+420999999999999',
	},
	{
		id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
		name: 'Michael Novotny',
		email: 'michael@novotny.com',
		phone: '+420999999999999',
	},
	{
		id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
		name: 'Amy Burns',
		email: 'amy@burns.com',
		phone: '+420999999999999',
	},
	{
		id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
		name: 'Balazs Orban',
		email: 'balazs@orban.com',
		phone: '+420999999999999',
	},
]

const appointments = [
	{
		customer_id: customers[0].id,
		note: 'something 15 gram',
		date: '2022-12-06',
	},
	{
		customer_id: customers[1].id,
		note: 'something 15 gram',
		date: '2022-11-14',
	},
	{
		customer_id: customers[4].id,
		note: 'something 20 gram',
		date: '2022-10-29',
	},
	{
		customer_id: customers[3].id,
		note: 'something 20 gram',
		date: '2023-09-10',
	},
	{
		customer_id: customers[5].id,
		note: 'something 15 gram',
		date: '2023-08-05',
	},
	{
		customer_id: customers[2].id,
		note: 'something 15 gram',
		date: '2023-07-16',
	},
	{
		customer_id: customers[0].id,
		note: 'something 15 gram',
		date: '2023-06-27',
	},
	{
		customer_id: customers[3].id,
		note: 'something 20 gram',
		date: '2023-06-09',
	},
	{
		customer_id: customers[4].id,
		note: 'something 20 gram',
		date: '2023-06-17',
	},
	{
		customer_id: customers[5].id,
		note: 'something 20 gram',
		date: '2023-06-07',
	},
	{
		customer_id: customers[1].id,
		note: 'something 20 gram',
		date: '2023-08-19',
	},
	{
		customer_id: customers[5].id,
		note: 'something 20 gram',
		date: '2023-06-03',
	},
	{
		customer_id: customers[2].id,
		note: 'something 20 gram',
		date: '2022-06-05',
	},
]

const revenue = [
	{ month: 'Jan', appointment: 2000 },
	{ month: 'Feb', appointment: 1800 },
	{ month: 'Mar', appointment: 2200 },
	{ month: 'Apr', appointment: 2500 },
	{ month: 'May', appointment: 2300 },
	{ month: 'Jun', appointment: 3200 },
	{ month: 'Jul', appointment: 3500 },
	{ month: 'Aug', appointment: 3700 },
	{ month: 'Sep', appointment: 2500 },
	{ month: 'Oct', appointment: 2800 },
	{ month: 'Nov', appointment: 3000 },
	{ month: 'Dec', appointment: 4800 },
]

export { users, customers, appointments, revenue }
