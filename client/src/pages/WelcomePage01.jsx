import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalContext';
import themes from '../data/themes';
import { useHistory } from 'react-router-dom';

// Steps components
import Savings from '../components/welcome/Savings';
import MonthSetup from '../components/welcome/MonthSetup';
import FixedExpenses from '../components/welcome/FixedExpenses';
import Review from '../components/welcome/Review';
import Header from '../components/welcome/Header';
import Footer from '../components/welcome/Footer';

const Comp = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.container {
		position: relative;
		border-radius: 10px;
		padding: 2rem;
		box-shadow: 0 0 3px lightgrey;

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

		&-three {
			grid-template-columns: 1fr 1fr 1fr;
		}

		&-full {
			margin-bottom: 2rem;
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

	.prefill {
		position: absolute;
		top: 2rem;
		left: 2rem;
	}
`;

const WelcomePage01 = () => {
	const { setSum, updateFixedExpenses, isNewUser } = useContext(GlobalContext);

	let history = useHistory();

	const [index, setIndex] = useState(0);

	// Total savings
	const [totalSavings, setTotalSavings] = useState('');

	// New month setup
	const [grossBudget, setGrossBudget] = useState('');
	const [grossPcToSavings, setGrossPcToSavings] = useState('');
	const [grossToSavings, setGrossToSavings] = useState('');
	const [netBudget, setNetBudget] = useState(0);

	// Fixed expenses check
	const [rent, setRent] = useState('');
	const [power, setPower] = useState('');
	const [water, setWater] = useState('');
	const [telephony, setTelephony] = useState('');

	const handleIndex = (newIndex) => {
		if (newIndex < 0) {
			return;
		}

		setIndex(newIndex);
	};

	// Savings Step

	const validateSavings = () => {
		if (totalSavings < 0 || totalSavings === '') {
			setTotalSavings(0);
			return;
		}

		handleIndex(1);
	};

	// Monthly Budget Step
	const validateBudget = () => {
		// Budget control
		if (grossBudget <= 0 || grossBudget === '') {
			alert('Please enter a starting budget for the month');
			setGrossBudget(0);
			return;
		}

		// Savings allocation control
		if (
			grossPcToSavings < 0 ||
			grossPcToSavings === 0 ||
			grossPcToSavings === ''
		) {
			setGrossPcToSavings(0);
		} else if (grossPcToSavings > 100) {
			alert('Cannot allocate more than the available monthly budget');
			setGrossPcToSavings('');
			return;
		}

		setNetBudget(grossBudget - grossToSavings);
		handleIndex(2);
	};

	// Fixed Expenses Step
	const validateExpenses = () => {
		setNetBudget(netBudget - rent - power - water - telephony);
		handleIndex(3);
	};

	// Review and Submit Form
	const handleSubmit = (e) => {
		e.preventDefault();

		setSum('monthlyBalance', netBudget);
		setSum('savings', totalSavings);
		updateFixedExpenses(rent, power, water, telephony);

		setSum('isNewUser', false);

		history.push('/');
	};

	const prefillForm = () => {
		setTotalSavings(4500);
		setGrossBudget(2200);
		setGrossPcToSavings(20);
		setGrossToSavings((grossBudget * 20) / 100);
		setRent(825);
		setPower(50);
		setWater(30);
		setTelephony(43.5);
	};

	useEffect(() => {
		const nextButton = document.querySelector('.btn-positive');

		if (nextButton === null) {
			return;
		}

		if (totalSavings < 0 || totalSavings === '') {
			nextButton.setAttribute('disabled', true);
		} else {
			nextButton.removeAttribute('disabled');
		}
	}, [totalSavings]);

	return (
		<Comp>
			<button className='prefill' onClick={prefillForm}>
				Prefill Form
			</button>
			<div className='container'>
				<form onSubmit={(e) => handleSubmit(e)}>
					<Header index={index} />

					<main>
						{index === 0 && (
							<Savings
								totalSavings={totalSavings}
								setTotalSavings={setTotalSavings}
							/>
						)}
						{index === 1 && (
							<MonthSetup
								grossBudget={grossBudget}
								setGrossBudget={setGrossBudget}
								grossToSavings={grossToSavings}
								setGrossToSavings={setGrossToSavings}
								grossPcToSavings={grossPcToSavings}
								setGrossPcToSavings={setGrossPcToSavings}
							/>
						)}
						{index === 2 && (
							<FixedExpenses
								rent={rent}
								setRent={setRent}
								power={power}
								setPower={setPower}
								water={water}
								setWater={setWater}
								telephony={telephony}
								setTelephony={setTelephony}
							/>
						)}
						{index === 3 && (
							<Review
								totalSavings={totalSavings}
								grossBudget={grossBudget}
								grossToSavings={grossToSavings}
								grossPcToSavings={grossPcToSavings}
								netBudget={netBudget}
								rent={rent}
								power={power}
								water={water}
								telephony={telephony}
							/>
						)}
					</main>
					<Footer
						index={index}
						handleIndex={handleIndex}
						validateSavings={validateSavings}
						validateBudget={validateBudget}
						validateExpenses={validateExpenses}
						totalSavings={totalSavings}
					/>
				</form>
			</div>
		</Comp>
	);
};

export default WelcomePage01;
