import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalContext';
import Card from './Card';

const Component = styled.div`
	position: relative;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	* {
	}

	> div {
		h1 {
			font-size: 3rem;
		}

		p {
			text-align: right;
		}
	}
`;

export const NetAssets = () => {
	const { settings, savings, monthlyBalance, transactions } = useContext(
		GlobalContext
	);

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

	const balance = monthlyBalance + expenses;

	const netAssets = savings + balance;

	return (
		<Card column='1 / 2' row='3 / 5'>
			<Component settings={settings}>
				<div className='dark-overlay'></div>
				<div>
					<p className='title'>Net Assets</p>
					<h1 className='master-amount'>{netAssets.toFixed(2)} €</h1>
				</div>
			</Component>
		</Card>
	);
};

export default NetAssets;
