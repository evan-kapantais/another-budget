import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

import Card from './Card';

const MasterBankBalance = () => {
	const { bankBalance } = useContext(GlobalContext);
	return (
		<Card row='span 2'>
			<div id='content-master-bank-balance'>
				<p className='iban secondary-text'>ES41 0081 0200 2400 0324 0830</p>
				<div>
					<p className='title'>Bank Balance</p>
					<h1 className='master-amount'>{bankBalance.toFixed(2)} €</h1>
				</div>
			</div>
		</Card>
	);
};

export default MasterBankBalance;
