import React, { useReducer, createContext } from 'react';
import AppReducer from './AppReducer';
import entries from '../data/storedEntries';

const initialState = {
	// User state
	isNewUser: null,

	// User info
	userDisplayName: '',
	userEmail: '',

	// Past data
	months: [],

	// Expenses categories
	additionalCategories: [
		'Drinks',
		'Food',
		'Fees',
		'Smoking',
		'Transportation',
		'Purchases',
	],

	additionalTypes: ['Card', 'Cash', 'Fees'],

	// Financials
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

	// Panel State
	addMenu: false,
	editMenu: false,
	editId: null,
	newMonthMenu: false,
	logOutMenu: false,
	fixedMenu: false,
	savingsMenu: false,
	avatarMenu: false,
	settingsMenu: false,

	// Settings
	theme: 'dark',

	settings: {
		theme: 'dark',
	},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Data fetch //
	function getValue(key) {
		dispatch({
			type: 'GET_VALUE',
			payload: key,
		});
	}

	function getValues(...keys) {
		for (const key in keys) {
			dispatch({
				type: 'GET_VALUE',
				payload: keys[key],
			});
		}
	}

	function getTransactions() {
		dispatch({
			type: 'GET_TRANSACTIONS',
			payload: JSON.parse(localStorage.getItem(entries.transactions)) || [],
		});
	}

	function getFixed() {
		dispatch({
			type: 'GET_FIXED',
			payload: JSON.parse(localStorage.getItem(entries.fixed)) || {
				rent: 0,
				power: 0,
				water: 0,
				telephony: 0,
			},
		});
	}

	function getSettings() {
		dispatch({
			type: 'GET_SETTINGS',
			payload: {
				theme: JSON.parse(localStorage.getItem(entries.theme)) || 'light',
				showImages:
					JSON.parse(localStorage.getItem(entries.showImages)) || true,
			},
		});
	}

	// Transaction actions //

	function addTransaction(transaction, index = 0) {
		dispatch({
			type: 'ADD_TRANSACTION',
			payload: {
				transaction,
				index,
			},
		});
	}

	function deleteTransaction(id) {
		dispatch({
			type: 'DELETE_TRANSACTION',
			payload: id,
		});
	}

	// Panel actions //

	function handlePanel(panel, value, id = null) {
		dispatch({
			type: 'HANDLE_PANEL',
			payload: {
				panel,
				value,
				id,
			},
		});
	}

	// Settings actions //

	function handleSettingChange(setting, value) {
		dispatch({
			type: 'HANDLE_SETTING_CHANGE',
			payload: {
				setting,
				value,
			},
		});
	}

	// State amount modification actions //

	function addToSum(sum, amount) {
		dispatch({
			type: 'ADD_TO_SUM',
			payload: {
				sum,
				amount,
			},
		});
	}

	function setSum(sum, amount) {
		dispatch({
			type: 'SET_SUM',
			payload: {
				sum,
				amount,
			},
		});
	}

	function setValue(key, value) {
		dispatch({
			type: 'SET_VALUE',
			payload: {
				key,
				value,
			},
		});
	}

	function resetTransactions() {
		dispatch({
			type: 'RESET_TRANSACTIONS',
		});
	}

	function storeLastMonth(month = {}) {
		dispatch({
			type: 'STORE_LAST_MONTH',
			payload: month,
		});
	}

	function updateFixedExpenses(rent, power, water, telephony) {
		dispatch({
			type: 'UPDATE_FIXED_EXPENSES',
			payload: {
				rent,
				power,
				water,
				telephony,
			},
		});
	}

	// Dev methods //

	function resetData() {
		dispatch({
			type: 'RESET_DATA',
		});
	}

	function devPurge() {
		dispatch({
			type: 'DEV_PURGE',
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				// User state
				isNewUser: state.isNewUser,

				// User info
				userDisplayName: state.userDisplayName,
				userEmail: state.userEmail,

				// Expenses categories
				additionalCategories: state.additionalCategories,
				additionalTypes: state.additionalTypes,

				// Past data
				months: state.months,

				// Current data
				transactions: state.transactions,
				bankBalance: state.bankBalance,
				monthlyBalance: state.monthlyBalance,
				fixedExpenses: state.fixedExpenses,
				savings: state.savings,
				additionalSavings: state.additionalSavings,
				additionalIdle: state.additionalIdle,
				investments: state.investments,

				// Panels state
				addMenu: state.addMenu,
				editMenu: state.editMenu,
				logOutMenu: state.logOutMenu,
				fixedMenu: state.fixedMenu,
				editId: state.editId,
				settingsMenu: state.settingsMenu,
				newMonthMenu: state.newMonthMenu,
				savingsMenu: state.savingsMenu,

				// Settings
				settings: state.settings,
				theme: state.theme,

				// Data fetch
				getValue,
				getValues,
				getTransactions,
				getFixed,
				getSettings,

				// Methods
				addTransaction,
				deleteTransaction,
				handlePanel,
				handleSettingChange,
				addToSum,
				setSum,
				setValue,
				storeLastMonth,
				resetTransactions,
				updateFixedExpenses,
				resetData,
				devPurge,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
