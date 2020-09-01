export const getStockData = async (symbol) => {
	const endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_VANTAGE_KEY}`;

	const response = await fetch(endpoint);
	const data = await response.json();

	return {
		symbol: data['Global Quote']['01. symbol'],
		currentPrice: Number(data['Global Quote']['05. price']),
	};
};
