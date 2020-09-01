import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import Card from './Card';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import themes from '../data/themes';
import MoreButton from './MoreButton';

const Component = styled.div`
	position: relative;
	height: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	main {
		display: flex;
		justify-content: space-between;
		align-items: center;

		div:last-of-type {
			/* text-align: right; */

			p {
				margin-bottom: 0.5rem;
			}
		}
	}

	.income-expenses {
		font-size: 0.85rem;
		font-weight: 600;
		text-align: right;
	}

	.income {
		color: ${(props) => themes[props.theme].positive};
		margin-right: 0.5rem;
	}

	.expenses {
		color: ${(props) => themes[props.theme].negative};
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	/* 
	.starting {
		mix-blend-mode: difference;
		color: rgba(255, 255, 255, 0.8);
	} */
`;

export const MasterMonthlyBalance = () => {
	const {
		settings,
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
			<Component theme={settings.theme}>
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
					{/* <div className='starting'>
						<p>Starting Budget</p>
						<h3>{monthlyBalance.toFixed(2)} €</h3>
					</div> */}
				</main>
			</Component>
		</Card>
	);
};

export default MasterMonthlyBalance;
