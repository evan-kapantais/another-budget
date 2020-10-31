import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Card from './Card';

export const NetAssets = () => {
	const { savings, monthlyBalance, transactions } = useContext(GlobalContext);

	const expenses =
		transactions.length > 0
			? transactions
					.map((transaction) => transaction.amount)
					.filter((amount) => amount < 0)
					.reduce((sum, amount) => (sum += amount), 0)
			: 0;

	const income =
		transactions.length > 0
			? transactions
					.map((transaction) => transaction.amount)
					.filter((amount) => amount > 0)
					.reduce((sum, amount) => (sum += amount), 0)
			: 0;

	const balance = monthlyBalance + expenses + income;

	const netAssets = savings + balance;

	return (
		<Card id='net-assets'>
			<div id='content-master-net-assets'>
				<div className='dark-overlay'></div>
				<div>
					<p className='title'>Net Assets</p>
					<h1 className='master-amount'>{netAssets.toFixed(2)} €</h1>
				</div>
			</div>
		</Card>
	);
};

export default NetAssets;
