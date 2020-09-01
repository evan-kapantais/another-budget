import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context/GlobalContext';
import MainButton from '../MainButton';
import { getCurrentMonth, getNextMonth, getYear } from '../../helpers/date';

import themes from '../../data/themes';

const Comp = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 999;

	display: ${(props) => (props.newMonthMenu ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.8);
	border-radius: 0 !important;

	.container {
		position: relative;
		width: 600px;
		height: 500px;
		background: #fff;
		border-radius: 10px;
		padding: 2rem;

		header h3 {
			margin-bottom: 0.3rem;
		}

		form {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
		}
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1rem;

		> div {
			position: relative;
		}
	}

	.full-width-row {
		margin-bottom: 2rem;
	}

	p.split-option {
		font-size: 0.8rem;
		color: #5a4ba0;
		text-decoration: underline;
		cursor: pointer;
		margin-top: 2rem;
	}

	footer {
		display: flex;
		justify-content: space-between;

		button:first-of-type {
			margin-right: 0.5rem;
		}
	}

	section:first-of-type {
		margin-bottom: 2rem;
	}

	.step {
		font-weight: 600;
		color: grey;
		font-size: smaller;
	}

	section h4 {
		margin-bottom: 2rem;
		color: #333;
	}

	.allocation-available {
		align-self: flex-end;
		justify-self: center;

		&.positive {
			color: ${themes.light.positive};
		}

		&.negative {
			color: ${themes.light.negative};
		}
	}
`;

const NewMonth = () => {
	const {
		newMonthMenu,
		handlePanel,
		transactions,
		monthlyBalance,
		addToSum,
		setSum,
		fixedExpenses,
		resetTransactions,
		storeLastMonth,
		updateFixedExpenses,
	} = useContext(GlobalContext);

	const [index, setIndex] = useState(0);

	// Housekeeping step state
	const [toNextMonth, setToNextMonth] = useState(90);
	const [toSavings, setToSavings] = useState(10);

	const expenses =
		transactions.length > 0
			? transactions
					.map((transaction) => transaction.amount)
					.filter((amount) => amount < 0)
					.reduce((sum, amount) => (sum += amount), 0)
			: 0;

	const income =
		transactions.length > 0
			? transactions
					.map((transaction) => transaction.amount)
					.filter((amount) => amount > 0)
					.reduce((sum, amount) => (sum += amount), 0)
			: 0;

	const remainingBalance = monthlyBalance + income + expenses;
	const availablePercentage = 100 - toNextMonth - toSavings;

	// New month setup
	const [grossBudget, setGrossBudget] = useState(2200.43);
	const [grossToSavings, setGrossToSavings] = useState(10);

	// Fixed expenses check
	const [rent, setRent] = useState(fixedExpenses.rent);
	const [power, setPower] = useState(fixedExpenses.power);
	const [water, setWater] = useState(fixedExpenses.water);
	const [telephony, setTelephony] = useState(fixedExpenses.telephony);

	const handleEvents = (e) => {
		if (e.type === 'keydown') {
			if (e.keyCode === 27) {
				handlePanel('newMonthMenu', false);
			}
		}

		if (e.type === 'click') {
			const overlay = document.querySelector('.overlay');

			if (e.target === overlay) {
				handlePanel('newMonthMenu', false);
			}
		}
	};

	const handleIndex = (newIndex) => {
		if (newIndex < 0) {
			return;
		}

		setIndex(newIndex);
	};

	const validateFirstStep = () => {
		if (availablePercentage > 0) {
			window.alert('Please allocate the remaining budget.');
			return;
		} else if (availablePercentage < 0) {
			window.alert('You have allocated more than your available budget');
			return;
		}

		handleIndex(1);
	};
	const validateSecondStep = () => {
		// if (Number(grossToInvestments) > 100) {
		// 	alert('Asset allocation exceeds the available budget');

		// 	console.log(grossToSavings);
		// 	return;
		// }

		handleIndex(2);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Steps

		// 1. add additional savings
		// 2. add additional investments idle
		// 3. add remaining available budget to next month's budget
		// 4. retract fixed expenses from new monthly budget
		// 5. make a new onbect to store last month's transactions
		// 6. add salary percentage to savings
		// 7. add salary percentage to investments idle
		// 8. if expenses are more than the month's available budget, retract this amount from the total savings
		// 9. reset and update transactions
		// 10. reset and update displayed fixed expenses

		const additionalSavings = (remainingBalance * toSavings) / 100;
		const additionalNextMonth = (remainingBalance * toNextMonth) / 100;

		const newAdditionalSavings = (grossBudget * grossToSavings) / 100;
		const newFixedExpenses = -(rent + power + water + telephony);
		const newMonthlyBudget =
			grossBudget +
			additionalNextMonth -
			newAdditionalSavings -
			newFixedExpenses;

		const totalNewSavings = additionalSavings + newAdditionalSavings;

		storeLastMonth({
			name: `${getCurrentMonth()}${getYear()}`,
			transactions,
			fixedExpenses,
		});

		addToSum('savings', totalNewSavings);
		setSum('monthlyBalance', newMonthlyBudget);
		updateFixedExpenses(
			Number(rent),
			Number(power),
			Number(water),
			Number(telephony)
		);
		setSum('additionalSavings', totalNewSavings);

		resetTransactions();

		handlePanel('newMonthMenu', false);
	};

	useEffect(() => {
		document.addEventListener('keydown', handleEvents);
		document.addEventListener('click', handleEvents);

		return () => {
			document.removeEventListener('keydown', handleEvents);
			document.removeEventListener('click', handleEvents);
		};
	}, [newMonthMenu]);

	return (
		<Comp className='overlay' newMonthMenu={newMonthMenu}>
			<div className='container'>
				<form onSubmit={(e) => handleSubmit(e)}>
					<header>
						<div>
							<h3>Start New Month</h3>
							<p className='step'>
								{index === 0 && 'Step 1: Housekeeping'}
								{index === 1 && 'Step 2: New Month Setup'}
								{index === 2 && 'Step 3: Fixed Expenses'}
							</p>
						</div>
						<p className='month'>
							{`${getCurrentMonth()} → ${getNextMonth()}, ${getYear()}`}
						</p>
					</header>

					<main>
						{index === 0 && (
							<section className='housekeeping'>
								<div className='form-row'>
									<div>
										<label>
											Transfer % to <span className='keyword'>Next Month</span>
										</label>
										<input
											type='number'
											min='0'
											max='100'
											value={toNextMonth}
											onChange={(e) => setToNextMonth(e.target.value)}
										/>
										<p className='input-message'>
											{toNextMonth > 0
												? `${((remainingBalance * toNextMonth) / 100).toFixed(
														2
												  )} €`
												: '-'}
										</p>
									</div>
									<div>
										<label>
											Transfer % to <span className='keyword'>Savings</span>
										</label>
										<input
											type='number'
											min='0'
											max='100'
											value={toSavings}
											onChange={(e) => setToSavings(e.target.value)}
										/>
										<p className='input-message'>
											{toSavings > 0
												? `${((remainingBalance * toSavings) / 100).toFixed(
														2
												  )} €`
												: '-'}
										</p>
									</div>
								</div>
								<div className='form-row'></div>
								<div className='form-row'>
									<div
										className={`allocation-available ${
											availablePercentage === 0
												? 'positive'
												: availablePercentage > 0
												? ''
												: 'negative'
										}`}
									>
										<p>Available to allocate: {availablePercentage} %</p>
									</div>
								</div>
							</section>
						)}

						{index === 1 && (
							<section className='new-month'>
								<div className='full-width-row'>
									<label>New Gross Budget</label>
									<input
										type='number'
										step='0.01'
										value={grossBudget}
										onChange={(e) => setGrossBudget(e.target.value)}
									/>
								</div>
								<div className='form-row'>
									<div>
										<label>
											Add % to <span className='keyword'>Savings</span>
										</label>
										<input
											type='number'
											min={0}
											max={100}
											value={grossToSavings}
											onChange={(e) => setGrossToSavings(e.target.value)}
										/>
										<p className='input-message'>
											{grossToSavings > 0
												? `${((grossBudget * grossToSavings) / 100).toFixed(
														2
												  )} €`
												: '-'}
										</p>
									</div>
								</div>
							</section>
						)}

						{index === 2 && (
							<section className='fixed'>
								<h4>Check and modify your fixed expenses for next month</h4>
								<div className='form-row'>
									<div>
										<label>Rent</label>
										<input
											type='number'
											value={rent}
											onChange={(e) => setRent(e.target.value)}
										/>
									</div>
									<div>
										<label>Power</label>
										<input
											type='number'
											value={power}
											onChange={(e) => setPower(e.target.value)}
										/>
									</div>
									<div>
										<label>Water</label>
										<input
											type='number'
											value={water}
											onChange={(e) => setWater(e.target.value)}
										/>
									</div>
									<div>
										<label>Telephony</label>
										<input
											type='number'
											value={telephony}
											onChange={(e) => setTelephony(e.target.value)}
										/>
									</div>
								</div>
							</section>
						)}
					</main>

					<footer>
						{index === 0 && (
							<>
								<div></div>
								<MainButton
									type='button'
									className='btn-positive'
									onClick={() => validateFirstStep()}
								>
									Next: Setup
								</MainButton>
							</>
						)}
						{index === 1 && (
							<>
								<MainButton
									type='button'
									className='btn-transparent'
									onClick={() => handleIndex(index - 1)}
								>
									Back
								</MainButton>
								<MainButton
									type='button'
									className='btn-positive'
									onClick={() => validateSecondStep()}
								>
									Next: Fixed Expenses
								</MainButton>
							</>
						)}
						{index === 2 && (
							<>
								<MainButton
									type='button'
									className='btn-transparent'
									onClick={() => handleIndex(index - 1)}
								>
									Back
								</MainButton>
								<MainButton type='submit'>Submit</MainButton>
							</>
						)}
					</footer>
				</form>
			</div>
		</Comp>
	);
};

export default NewMonth;
