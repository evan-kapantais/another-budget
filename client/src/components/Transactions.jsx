import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import Card from './Card';
import MainButton from './MainButton';
import MoreButton from './MoreButton';
import Transaction from './Transaction';

const Transactions = () => {
	const { transactions, getTransactions, handlePanel, settings } = useContext(
		GlobalContext
	);

	useEffect(() => {
		getTransactions();
	}, []);

	const sortedTransactions = transactions.sort((a, b) => b.date - a.date);

	return (
		<Card id='transactions'>
			<div id='content-master-transactions' theme={settings.theme}>
				<header>
					<h3>Transactions</h3>
					<Link to='/transactions'>
						<MoreButton padding='padding-left'>
							<p>View Details</p>
						</MoreButton>
					</Link>
				</header>
				{transactions.length > 0 && (
					<div className='add-transaction-container'>
						<MainButton
							className='btn-positive small'
							onClick={() => handlePanel('addMenu', true)}
						>
							Add Transaction
						</MainButton>
					</div>
				)}
				{transactions.length === 0 && (
					<div className='no-transactions'>
						<h1>You currently have no transactions</h1>
						<MainButton
							className='btn-positive'
							onClick={() => handlePanel('addMenu', true)}
						>
							Add Transaction
						</MainButton>
					</div>
				)}
				<main>
					{sortedTransactions.map((transaction) => (
						<Transaction key={transaction.id} transaction={transaction} />
					))}
				</main>
			</div>
		</Card>
	);
};

export default Transactions;
