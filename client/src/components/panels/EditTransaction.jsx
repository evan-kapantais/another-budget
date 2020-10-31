import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context/GlobalContext';
import MainButton from '../MainButton';

const Comp = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 999;

	display: ${(props) => (props.editMenu ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.8) !important;
	border-radius: 0 !important;

	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;

		header,
		main {
			margin-bottom: 4rem;
		}

		header {
			align-items: center;
		}

		.form-row {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
			margin-bottom: 2rem;
		}
	}

	footer {
		display: flex;
		justify-content: space-between;

		> div {
			button:first-of-type {
				margin-right: 0.5rem;
			}
		}
	}
`;

const EditTransaction = () => {
	const {
		transactions,
		editMenu,
		editId,
		handlePanel,
		deleteTransaction,
		addTransaction,
	} = useContext(GlobalContext);

	const transaction = transactions.find(
		(transaction) => transaction.id === editId
	);

	const formattedDate = transaction.date.split('/').reverse().join('-');

	const index = transactions.findIndex((element) => element === transaction);

	const [name, setName] = useState(transaction.name);
	const [type, setType] = useState(transaction.type);
	const [category, setCategory] = useState(transaction.category);
	const [date, setDate] = useState(formattedDate);
	const [amount, setAmount] = useState(transaction.amount);

	const handleEvents = (e) => {
		if (e.type === 'keydown') {
			if (e.keyCode === 27) {
				handlePanel('editMenu', false, null);
			}
		}

		if (e.type === 'click') {
			const overlay = document.querySelector('.overlay');

			if (e.target === overlay) {
				handlePanel('editMenu', false, null);
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newTransaction = {
			id: Math.floor(Math.random() * 10000),
			name,
			type,
			category,
			date,
			amount: Number(amount),
		};

		deleteTransaction(transaction.id);

		addTransaction(newTransaction, index);

		handlePanel('editMenu', false, null);
	};

	useEffect(() => {
		document.addEventListener('keydown', handleEvents);
		document.addEventListener('click', handleEvents);

		return () => {
			document.removeEventListener('keydown', handleEvents);
			document.removeEventListener('click', handleEvents);
		};
	}, [editMenu]);

	return (
		<Comp className='overlay' editMenu={editMenu}>
			<div className='container'>
				<form onSubmit={handleSubmit}>
					<header>
						<h3>Edit Transaction</h3>
						<h5 className='id'>ID: {editId || 9999}</h5>
					</header>
					<main>
						<div className='form-row'>
							<div>
								<label>Name</label>
								<input
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>
						<div className='form-row'>
							<div>
								<label htmlFor='type'>Type</label>
								<input
									type='text'
									placeholder='Card, Cash, Fee...'
									value={type}
									onChange={(e) => setType(e.currentTarget.value)}
								/>
							</div>
							<div>
								<label>Category</label>
								<input
									type='text'
									placeholder='Food, Clothes, Entertainment...'
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								/>
							</div>
						</div>
						<div className='form-row'>
							<div>
								<label>Date</label>
								<input
									type='date'
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>
							<div>
								<label>Amount</label>
								<input
									style={{
										color: `${
											amount < 0 ? 'red' : amount > 0 ? 'green' : 'auto'
										}`,
									}}
									type='number'
									step='0.01'
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
						</div>
					</main>
					<footer>
						<MainButton
							className='btn-negative-simple'
							type='button'
							onClick={() => handlePanel('editMenu', false, null)}
						>
							Cancel
						</MainButton>
						<div>
							<MainButton
								type='button'
								onClick={() => deleteTransaction(transaction.id)}
								className='btn-negative'
							>
								Delete Transaction
							</MainButton>
							<MainButton type='submit'>Submit</MainButton>
						</div>
					</footer>
				</form>
			</div>
		</Comp>
	);
};

export default EditTransaction;
