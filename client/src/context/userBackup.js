const initialState = {
	// App state
	isNewUser: false,

	// Past data
	months: [],

	// Financials
	transactions: [
		{
			id: Math.floor(Math.random() * 10000),
			date: '07/06/2020',
			name: 'Sixteen Bar',
			type: 'Cash',
			category: 'Drinks',
			amount: -3.5,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '07/06/2020',
			name: 'Big Mouth',
			type: 'Card',
			category: 'Drinks',
			amount: -6,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '07/06/2020',
			name: 'Gas',
			type: 'Card',
			category: 'Transportation',
			amount: -20,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '07/06/2020',
			name: 'Cien Coffee',
			type: 'Card',
			category: 'Drinks',
			amount: -3,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '07/06/2020',
			name: 'Tobacco',
			type: 'Card',
			category: 'Smoking',
			amount: -7.7,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '06/06/2020',
			name: 'Proedros',
			type: 'Card',
			category: 'Food',
			amount: -15.3,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '06/06/2020',
			name: 'La Costa Coffee',
			type: 'Card',
			category: 'Drinks',
			amount: -3.7,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '06/06/2020',
			name: 'Molonis Breakfast',
			type: 'Card',
			category: 'Food',
			amount: -9.2,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '05/06/2020',
			name: 'Sante Bar',
			type: 'Card',
			category: 'Drinks',
			amount: -18,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '05/06/2020',
			name: 'Bebidas',
			type: 'Card',
			category: 'Drinks',
			amount: -8,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '03/06/2020',
			name: 'Karamuza',
			type: 'Card',
			category: 'Drinks',
			amount: -10.7,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '03/06/2020',
			name: 'Cosmic Coffee',
			type: 'Cash',
			category: 'Drinks',
			amount: -4.2,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '02/06/2020',
			name: 'Truck Bushings',
			type: 'Card',
			category: 'Purchases',
			amount: -4.2,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '02/06/2020',
			name: 'Lakai Shoes',
			type: 'Card',
			category: 'Purchases',
			amount: -35.8,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '01/06/2020',
			name: 'Drinks',
			type: 'Card',
			category: 'Drinks',
			amount: -5.4,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '01/06/2020',
			name: 'Tax Return',
			type: 'Fee',
			category: 'Fees',
			amount: 138.38,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '31/05/2020',
			name: 'Tobacco & Papers',
			type: 'Card',
			category: 'Smoking',
			amount: -8.1,
		},
		{
			id: Math.floor(Math.random() * 10000),
			date: '30/05/2020',
			name: 'Papers',
			type: 'Card',
			category: 'Smoking',
			amount: -0.5,
		},
	],
	bankBalance: 5400.329,
	monthlyBalance: 955.405,
	fixedExpenses: {
		rent: 825,
		power: 130,
		water: 30,
		telephony: 43,
	},
	savings: 4300,
	additionalSavings: 0,
	additionalIdle: 0,
	investments: {
		idle: 100,
		stocks: [
			{
				symbol: 'ALPHA',
				name: 'Alpha Bank',
				amount: 150,
				purchasePrice: 1.5087,
				currentPrice: 0.6844,
			},
			{
				symbol: 'GEKTERNA',
				name: 'Gekterna Energy',
				amount: 20,
				purchasePrice: 4.4,
				currentPrice: 6.3,
			},
			{
				symbol: 'PPC',
				name: 'Public Power Company',
				amount: 100,
				purchasePrice: 1.871,
				currentPrice: 3.642,
			},
			{
				symbol: 'PLATH',
				name: 'Thrace Plastics',
				amount: 100,
				purchasePrice: 1.97,
				currentPrice: 1.724,
			},
		],
	},

	// Panel State
	addMenu: false,
	editMenu: false,
	editId: null,
	settingsMenu: false,
	newMonthMenu: false,
	logOutMenu: false,

	// Settings
	settings: {
		showImages: true,
		theme: 'dark',
	},
};
