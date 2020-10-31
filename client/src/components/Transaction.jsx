import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { GlobalContext } from '../context/GlobalContext';
import Category from './Category';
import { getDisplayDate } from '../helpers/date';
import { numberWithCommas } from '../helpers/display';
import themes from '../data/themes';

const Comp = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 2fr 1fr 2fr 100px;
	align-items: center;
	font-size: 0.9rem;
	font-weight: 600;
	padding: 1.5rem 1rem;
	border-radius: 10px;
	color: #fff;
	transition: all 200ms ease;

	&:hover {
		cursor: pointer;
		transform: translateY(-2px) scale(1.01);
		background: rgba(0, 0, 0, 0.3);
	}

	&:last-of-type {
		border-bottom: none;
	}

	.date {
		font-weight: 900;
		color: #fff;
		mix-blend-mode: difference;
	}

	.name {
		color: rgba(232, 232, 232, 0.8);
		mix-blend-mode: difference;
		width: 100%;

		p {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

	.type {
		color: rgba(232, 232, 232, 0.8);
		mix-blend-mode: difference;
	}

	.amount {
		justify-self: end;
		font-weight: 900;
	}

	.negative-amount {
		color: ${(props) => themes[props.theme].negative};
	}

	.positive-amount {
		color: ${(props) => themes[props.theme].positive};
	}

	.arrow {
		div {
			width: 8px;
			height: 8px;
			float: right;
			margin-right: 3px;
			border: 2px solid grey;
			border-top: none;
			border-left: none;
			transform: rotate(45deg);
			transition: transform 200ms ease;
		}

		&:hover > div {
			transform: rotate(-135deg);
		}
	}
`;

const Transaction = ({ transaction }) => {
	const { date, name, type, category, amount } = transaction;
	const [menuShown, setMenuShown] = useState(false);
	const { settings, getSettings, handlePanel } = useContext(GlobalContext);

	useEffect(() => {
		getSettings();
	}, []);

	return (
		<Comp
			theme={settings.theme}
			onClick={() => handlePanel('editMenu', true, transaction.id)}
			onMouseLeave={() => setMenuShown(false)}
			draggable
		>
			<div className='date'>
				<p>{getDisplayDate(date)}</p>
			</div>
			<div className='name'>
				<p>{name}</p>
			</div>
			<div className='type'>
				<p>{type}</p>
			</div>
			<div className='category'>
				<Category category={category} />
			</div>
			<div
				className={`amount ${
					amount > 0 ? 'positive-amount' : 'negative-amount'
				}`}
			>
				<p>
					{amount > 0 && '+'}
					{numberWithCommas(amount.toFixed(2))} €
				</p>
			</div>
			{/* <button
				type='button'
				className='arrow'
				onMouseOver={() => setMenuShown(true)}
			>
				<div />
			</button>
			<TransactionMenu
				transaction={transaction}
				menuShown={menuShown}
				setMenuShown={setMenuShown}
			/> */}
		</Comp>
	);
};

export default Transaction;
