import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import themes from '../data/themes';

import Card from './Card';
import MainButton from './MainButton';
import MoreButton from './MoreButton';
import Transaction from './Transaction';

const Comp = styled.div`
	position: relative;
	overflow-x: hidden;
	height: 100%;
	padding: 2rem;
	grid-column: 3 / -1;
	grid-row: 1 / -1;

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;

		> div {
			display: flex;
			align-items: flex-end;
		}

		h3 {
			mix-blend-mode: difference;
			color: #fff;
		}
	}

	.no-transactions {
		position: absolute;
		width: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;

		h1 {
			margin-bottom: 2rem;
			mix-blend-mode: difference;
			color: ${(props) => themes[props.theme].primaryColor};
			transition: all 500ms 300ms ease-in-out;
		}
	}

	.add-transaction-container {
		text-align: right;
		margin-bottom: 0.5rem;
	}
`;

const Transactions = () => {
	const { transactions, getTransactions, handlePanel, settings } = useContext(
		GlobalContext
	);

	useEffect(() => {
		getTransactions();
	}, []);

	const sortedTransactions = transactions.sort((a, b) => b.date - a.date);

	return (
		<Card column='3 / -1' row='1 / -1' id='transactions'>
			<Comp theme={settings.theme}>
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
			</Comp>
		</Card>
	);
};

export default Transactions;
