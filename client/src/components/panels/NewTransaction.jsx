import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context/GlobalContext';
import MainButton from '../MainButton';

const Component = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;

	display: ${(props) => (props.open ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.8) !important;
	border-radius: 0 !important;
	z-index: 999;

	.container {
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;

		header,
		main {
			margin-bottom: 4em;
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.form-row {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
			margin-bottom: 2rem;

			&:last-of-type {
				margin-bottom: 0;
			}
		}
	}

	.input-group {
		position: relative;

		p {
			margin-top: 0.3rem;
			font-size: 0.8rem;

			span {
				color: #5a4ba0;
			}
		}
	}

	input {
		position: relative;
		padding: 0.5rem;
		border-radius: 5px;
		border: 1px solid lightgrey;
		width: 100%;
	}

	footer {
		button {
			margin-right: 0.5rem;

			&:last-of-type {
				margin-right: 0;
			}
		}
	}
`;

const NewTransactionOverlay = () => {
	const {
		addTransaction,
		handlePanel,
		addMenu,
		transactions,
		getValue,
	} = useContext(GlobalContext);

	useEffect(() => {
		getValue('transactions');
	}, []);

	const d = new Date();

	const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
	const month = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
	const year = d.getFullYear();
	const today = `${year}-${month}-${day}`;

	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [category, setCategory] = useState('');
	const [date, setDate] = useState(today);

	const [amount, setAmount] = useState(0);

	const handleEvents = (e) => {
		if (e.type === 'keydown') {
			if (e.keyCode === 27) {
				handlePanel('addMenu', false);
			}
		}

		if (e.type === 'click') {
			const overlay = document.querySelector('.overlay');

			if (e.target === overlay) {
				handlePanel('addMenu', false);
			}
		}
	};

	const resetValues = () => {
		setName('');
		setType('');
		setCategory('');
		setDate(today);
		setAmount(0);
	};

	const prefillForm = () => {
		setName('Test Transaction');
		setType('Card');
		setCategory('Drinks');
		setDate(today);
		setAmount(-12.34);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (amount === 0) {
			window.alert('Please enter a negative or positive amount');
			return;
		}

		let newId = Math.floor(Math.random() * 10000);
		const transactionsIds = transactions.map((transaction) => transaction.id);

		while (transactionsIds.includes(newId)) {
			newId = Math.floor(Math.random() * 10000);
		}

		if (transactionsIds.includes(newId)) {
			window.alert('Warning: identical transaction ID');
		}

		const newTransaction = {
			id: newId,
			name,
			type: type === '' ? 'Card' : type,
			category: category === '' ? 'General' : category,
			date,
			amount: Number(amount),
		};

		addTransaction(newTransaction);
		resetValues();
		handlePanel('addMenu', false);
	};

	useEffect(() => {
		document.addEventListener('keydown', handleEvents);
		document.addEventListener('click', handleEvents);

		return () => {
			document.removeEventListener('keydown', handleEvents);
			document.removeEventListener('click', handleEvents);
		};
	}, [addMenu]);

	return (
		<Component className='overlay' open={addMenu}>
			<div className='container'>
				<form onSubmit={handleSubmit}>
					<header>
						<h3>Add Transaction</h3>
					</header>
					<main>
						<div className='form-row'>
							<div className='input-group'>
								<label>Name *</label>
								<input
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className='form-row'>
							<div className='input-group'>
								<label htmlFor='type'>Type</label>
								<input
									type='text'
									list='type'
									placeholder='Card'
									value={type}
									onChange={(e) => setType(e.currentTarget.value)}
								/>
								<datalist id='type'>
									<option value='Card' />
									<option value='Card' />
									<option value='Fees' />
								</datalist>
								<p>
									Defaults to <span>Card</span>
								</p>
							</div>
							<div className='input-group'>
								<label>Category</label>
								<input
									type='text'
									list='category'
									placeholder='Drinks'
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								/>
								<datalist id='category'>
									<option value='Drinks' />
									<option value='Food' />
									<option value='Fees' />
									<option value='Smoking' />
									<option value='Transportation' />
									<option value='Purchases' />
								</datalist>
								<p>
									Defaults to <span>General</span>
								</p>
							</div>
						</div>
						<div className='form-row'>
							<div className='input-group'>
								<label>Date *</label>
								<input
									type='date'
									value={date}
									onChange={(e) => setDate(e.target.value)}
									required
								/>
								<p>
									Defaults to <span>Today</span>
								</p>
							</div>
							<div className='input-group'>
								<label>Amount *</label>
								<input
									type='number'
									step='0.01'
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									style={{
										color: `${
											amount < 0 ? 'red' : amount > 0 ? 'green' : 'auto'
										}`,
									}}
									required
								/>
							</div>
						</div>
					</main>
					<footer>
						<MainButton type='submit'>Submit</MainButton>
						<MainButton
							type='button'
							onClick={() => handlePanel('addMenu', false)}
							className='btn-negative'
						>
							Cancel
						</MainButton>
						<MainButton
							type='button'
							onClick={() => prefillForm()}
							className='btn-default'
						>
							Prefill Form
						</MainButton>
					</footer>
				</form>
			</div>
		</Component>
	);
};

export default NewTransactionOverlay;
