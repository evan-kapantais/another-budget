import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalContext';

import Card from './Card';

const Component = styled.div`
	position: relative;
	height: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.iban {
		font-weight: 600;
		font-size: 0.85rem;
		text-align: right;
		mix-blend-mode: difference;
		color: rgba(245, 245, 245, 0.7);
	}
`;

const MasterBankBalance = () => {
	const { bankBalance } = useContext(GlobalContext);
	return (
		<Card row='span 2'>
			<Component>
				<p className='iban secondary-text'>ES41 0081 0200 2400 0324 0830</p>
				<div>
					<p className='title'>Bank Balance</p>
					<h1 className='master-amount'>{bankBalance.toFixed(2)} €</h1>
				</div>
			</Component>
		</Card>
	);
};

export default MasterBankBalance;
