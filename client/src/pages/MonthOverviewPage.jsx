import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalContext';
import { Pie } from 'react-chartjs-2';
import categories from '../data/categories';
import themes from '../data/themes';

const Page = styled.div`
	height: 100vh;
	overflow-x: hidden;
	display: flex;
	justify-content: center;
	align-items: center;

	h1 {
		margin-bottom: 2rem;
	}

	.canvas-container {
		width: 600px;
	}
`;

const MonthOverviewPage = () => {
	const { transactions } = useContext(GlobalContext);

	const food = Math.abs(
		transactions
			.filter((transaction) => transaction.category === 'Food')
			.map((item) => item.amount)
			.reduce((sum, amount) => (sum += amount), 0)
	);
	const drinks = Math.abs(
		transactions
			.filter((transaction) => transaction.category === 'Drinks')
			.map((item) => item.amount)
			.reduce((sum, amount) => (sum += amount), 0)
	);
	const transportation = Math.abs(
		transactions
			.filter((transaction) => transaction.category === 'Transportation')
			.map((item) => item.amount)
			.reduce((sum, amount) => (sum += amount), 0)
	);
	const smoking = Math.abs(
		transactions
			.filter((transaction) => transaction.category === 'Smoking')
			.map((item) => item.amount)
			.reduce((sum, amount) => (sum += amount), 0)
	);
	const purchases = Math.abs(
		transactions
			.filter((transaction) => transaction.category === 'Purchases')
			.map((item) => item.amount)
			.reduce((sum, amount) => (sum += amount), 0)
	);
	const fees = Math.abs(
		transactions
			.filter((transaction) => transaction.category === 'Fees')
			.map((item) => item.amount)
			.reduce((sum, amount) => (sum += amount), 0)
	);

	const categoryNames = [
		'Food',
		'Drinks',
		'Transportation',
		'Smoking',
		'Purchases',
		'Fees',
	];

	const data = {
		labels: categoryNames,
		datasets: [
			{
				data: [
					food.toFixed(2),
					drinks.toFixed(2),
					transportation.toFixed(2),
					smoking.toFixed(2),
					purchases.toFixed(2),
					fees.toFixed(2),
				],
				backgroundColor: [
					categories.normal.food,
					categories.normal.drinks,
					categories.normal.transportation,
					categories.normal.smoking,
					categories.normal.purchases,
					categories.normal.fees,
				],
				hoverBackgroundColor: [
					categories.light.food,
					categories.light.drinks,
					categories.light.transportation,
					categories.light.smoking,
					categories.light.purchases,
					categories.light.fees,
				],
			},
		],
	};

	const options = {
		legend: {
			display: true,
			position: 'right',
			labels: {
				fontSize: 16,
				fontColor: '#333',
				padding: 16,
			},
		},
		title: {
			display: true,
			text: 'Expenses Categories',
			fontSize: 16,
			fontColor: '#333',
			padding: 16,
			position: 'left',
			lineHeight: 1,
		},
		tooltip: {},
	};

	return (
		<Page>
			<div>
				<h1>Month Overview</h1>
				<div className='canvas-container'>
					<Pie data={data} options={options} width={500} height={350} />
				</div>
			</div>
		</Page>
	);
};

export default MonthOverviewPage;
