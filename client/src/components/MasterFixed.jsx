import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalContext';
import themes from '../data/themes';
import MoreButton from './MoreButton';

import Card from './Card';

const Component = styled.div`
	position: relative;
	height: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: transparent;

	header {
		display: flex;
		justify-content: space-between;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.expenses-row {
		text-align: right;
		margin-bottom: 0.8rem;
		font-weight: 600;
		font-size: 0.85rem;

		&:last-of-type {
			margin-bottom: 0;
		}

		P:first-of-type {
			color: white;
			mix-blend-mode: difference;
		}

		p:last-of-type {
			color: ${themes.light.negative};
		}
	}
`;

export const MasterSavings = () => {
	const { fixedExpenses, getFixed, handlePanel } = useContext(GlobalContext);

	useEffect(() => {
		getFixed();
	}, []);

	const { rent, power, water, telephony } = fixedExpenses;
	const totalFixed = rent + power + water + telephony;

	return (
		<Card column='2 / 3' row='4 / 7' id='fixed'>
			<Component>
				<header>
					<MoreButton
						padding='padding-right'
						onClick={() => handlePanel('fixedMenu', true)}
					>
						<p>Modify Expenses</p>
					</MoreButton>
					<div className='expenses'>
						<div className='expenses-row'>
							<p>Rent</p>
							<p>{rent.toFixed(2)} €</p>
						</div>
						<div className='expenses-row'>
							<p>Power</p>
							<p>{power.toFixed(2)} €</p>
						</div>
						<div className='expenses-row'>
							<p>Water</p>
							<p>{water.toFixed(2)} €</p>
						</div>
						<div className='expenses-row'>
							<p>Telephony</p>
							<p>{telephony.toFixed(2)} €</p>
						</div>
					</div>
				</header>
				<div className='row'>
					<div>
						<p className='title'>Fixed Expenses</p>
						<h1 className='master-amount'>{totalFixed.toFixed(2)} €</h1>
					</div>
				</div>
			</Component>
		</Card>
	);
};

export default MasterSavings;
