const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const getCurrentMonth = () => {
	const d = new Date();
	const monthNumber = d.getMonth();
	const day = d.getDay();

	if (day < 10) {
		return months[monthNumber - 1];
	}

	return months[monthNumber];
};

export const getNextMonth = () => {
	const d = new Date();
	const monthNumber = d.getMonth();
	const day = d.getDay();

	if (day < 10) {
		return months[monthNumber];
	}

	return months[monthNumber + 1];
};

export const getYear = () => {
	return new Date().getFullYear();
};

export const getDisplayDate = (date) => {
	const formatDate = (date) => {
		if (date.split('').some((el) => el === '/')) {
			return date.split('/').slice(0, 2).join('.');
		} else {
			return date.split('-').reverse().slice(0, 2).join('.');
		}
	};

	const currentDate = formatDate(new Date().toLocaleDateString());

	const yesterday = formatDate(
		new Date(Date.now() - 864e5).toLocaleDateString()
	);

	const transactionDate = formatDate(date);

	return currentDate === transactionDate
		? 'Today'
		: yesterday === transactionDate
		? 'Yeday'
		: transactionDate;
};
