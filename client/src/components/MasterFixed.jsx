import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import MoreButton from './MoreButton';

import Card from './Card';

export const MasterSavings = () => {
	const { fixedExpenses, getFixed, handlePanel } = useContext(GlobalContext);

	useEffect(() => {
		getFixed();
	}, []);

	const { rent, power, water, telephony } = fixedExpenses;
	const totalFixed = rent + power + water + telephony;

	return (
		<Card column='2 / 3' row='4 / 7' id='fixed'>
			<div className='card-content' id='content-master-fixed'>
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
			</div>
		</Card>
	);
};

export default MasterSavings;
