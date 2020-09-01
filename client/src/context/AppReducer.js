import entries from '../data/storedEntries';

export default (state, action) => {
	switch (action.type) {
		default:
			return {
				...state,
			};

		// Dev methods

		case 'DEV_PURGE':
			localStorage.removeItem(entries.userDisplayName);
			localStorage.removeItem(entries.email);
			localStorage.removeItem(entries.savings);
			localStorage.removeItem(entries.additionalSavings);
			localStorage.removeItem(entries.balance);
			localStorage.removeItem(entries.fixed);
			localStorage.removeItem(entries.transactions);

		// Data fetch

		case 'GET_VALUE':
			return {
				...state,
				[action.payload]: JSON.parse(
					localStorage.getItem(entries[action.payload])
				),
			};

		case 'GET_TRANSACTIONS':
			return {
				...state,
				transactions: action.payload,
			};

		case 'GET_FIXED':
			return {
				...state,
				fixedExpenses: action.payload,
			};

		case 'GET_SETTINGS':
			return {
				...state,
				settings: {
					theme: action.payload.theme,
					// showImages: action.payload.showImages,
				},
			};

		// Transactions methods

		case 'ADD_TRANSACTION':
			const transactions = [
				...state.transactions.slice(0, action.payload.index),
				action.payload.transaction,
				...state.transactions.slice(action.payload.index),
			];

			localStorage.setItem(entries.transactions, JSON.stringify(transactions));

			return {
				...state,
				transactions: transactions,
			};

		case 'DELETE_TRANSACTION':
			const newTransactions = state.transactions.filter(
				(transaction) => transaction.id !== action.payload
			);

			localStorage.setItem(
				'budget.transactions',
				JSON.stringify(newTransactions)
			);

			return {
				...state,
				transactions: newTransactions,
			};

		case 'RESET_TRANSACTIONS':
			localStorage.setItem(entries.transactions, JSON.stringify([]));
			return {
				...state,
				transactions: [],
			};

		case 'HANDLE_PANEL':
			return {
				...state,
				[action.payload.panel]: action.payload.value,
				editId: action.payload.id,
			};

		case 'HANDLE_SETTING_CHANGE':
			localStorage.setItem(
				entries[action.payload.setting],
				JSON.stringify(action.payload.value)
			);

			return {
				...state,
				settings: {
					...state.settings,
					[action.payload.setting]: action.payload.value,
				},
			};

		case 'SET_SUM':
			localStorage.setItem(
				`budget.${action.payload.sum}`,
				JSON.stringify(action.payload.amount)
			);

			console.log(action.payload.sum, action.payload.amount);
			return {
				...state,
				[action.payload.sum]: action.payload.amount,
			};

		case 'ADD_TO_SUM':
			const newSum =
				JSON.parse(localStorage.getItem(`budget.${action.payload.sum}`)) +
				action.payload.amount;

			localStorage.setItem(
				`budget.${action.payload.sum}`,
				JSON.stringify(newSum)
			);

			return {
				...state,
				[action.payload.sum]: state[action.payload.sum] + action.payload.amount,
			};

		case 'STORE_LAST_MONTH':
			return {
				...state,
				months: [action.payload, ...state.months],
			};

		case 'UPDATE_FIXED_EXPENSES':
			const { rent, power, water, telephony } = action.payload;
			const fixedExpenses = { rent, power, water, telephony };

			localStorage.setItem(entries.fixed, JSON.stringify(fixedExpenses));
			return {
				...state,
				fixedExpenses,
			};

		case 'RESET_DATA':
			localStorage.setItem(entries.balance, JSON.stringify(0));
			localStorage.setItem(entries.savings, JSON.stringify(0));
			localStorage.setItem(entries.additionalSavings, JSON.stringify(0));
			localStorage.setItem(entries.transactions, JSON.stringify([]));
			localStorage.setItem(
				entries.fixed,
				JSON.stringify({ rent: 0, power: 0, water: 0, telephony: 0 })
			);
			localStorage.setItem(entries.isNewUser, JSON.stringify(true));

			return {
				...state,
				isNewUser: false,
				userDisplayName: '',
				userEmail: '',
				months: [],
				transactions: [],
				bankBalance: 0,
				monthlyBalance: 0,
				fixedExpenses: {
					rent: 0,
					power: 0,
					water: 0,
					telephony: 0,
				},
				savings: 0,
				additionalSavings: 0,
			};
	}
};
