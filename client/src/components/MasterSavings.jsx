import React, { useContext, useEffect } from 'react';
import Card from './Card';
import { GlobalContext } from '../context/GlobalContext';
import MoreButton from './MoreButton';

export const MasterSavings = () => {
	const {
		settings,
		savings,
		getValue,
		additionalSavings,
		handlePanel,
	} = useContext(GlobalContext);

	useEffect(() => {
		getValue('savings');
		getValue('additionalSavings');
	}, []);

	const additionalSavingsPc =
		additionalSavings > 0 ? (100 * additionalSavings) / savings : 0;

	return (
		<Card id='savings'>
			<div className='card-content' id='content-master-savings'>
				<header>
					<MoreButton
						padding='padding-right'
						onClick={() => handlePanel('savingsMenu', true)}
					>
						<p>Transfer Funds</p>
					</MoreButton>
					<div className='difference'>
						<p>
							{additionalSavings > 0 && '+'}
							{additionalSavings > 0 ? additionalSavings.toFixed(2) : 0} €
						</p>
						<p>
							{additionalSavings > 0 && '↑'}
							{additionalSavings > 0 ? additionalSavingsPc.toFixed(2) : 0} %
						</p>
					</div>
				</header>
				<div>
					<p className='title'>Savings</p>
					<h1 className='master-amount'>{savings.toFixed(2)} €</h1>
				</div>
			</div>
		</Card>
	);
};

export default MasterSavings;
