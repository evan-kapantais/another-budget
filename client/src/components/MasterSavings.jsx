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
	grid-column: span 1;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.difference {
		text-align: right;
		font-size: 0.85rem;
		font-weight: 600;
		color: ${(props) => themes[props.theme].positive};

		p {
			display: inline-block;

			&:first-of-type {
				margin-right: 0.5rem;
			}
		}
	}
`;

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
		<Card column='1 / 2' row='5 / 7' id='savings'>
			<Component theme={settings.theme}>
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
			</Component>
		</Card>
	);
};

export default MasterSavings;
