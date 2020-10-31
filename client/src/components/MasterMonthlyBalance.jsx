import React, { useContext, useEffect } from 'react';
import Card from './Card';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import MoreButton from './MoreButton';

export const MasterMonthlyBalance = () => {
	const {
		monthlyBalance,
		getValue,
		getTransactions,
		transactions,
	} = useContext(GlobalContext);

	useEffect(() => {
		getTransactions();

		getValue('monthlyBalance');
	}, []);

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

	const balance = monthlyBalance + income + expenses;

	return (
		<Card column='2 / 3' row='1 / 4'>
			<div className='card-content' id='content-master-monthly-balance'>
				<header>
					<Link to='/month-overview'>
						<MoreButton padding='padding-right'>
							<p>Month Overview</p>
						</MoreButton>
					</Link>
					<p className='income-expenses'>
						<span className='income'>+{income.toFixed(2)} €</span>
						<span className='expenses'>{expenses.toFixed(2)} €</span>
					</p>
				</header>
				<main>
					<div>
						<p className='title'>
							Available (of {monthlyBalance.toFixed(2)} €)
						</p>
						<h1 className='master-amount'>{balance.toFixed(2)} €</h1>
					</div>
				</main>
			</div>
		</Card>
	);
};

export default MasterMonthlyBalance;
