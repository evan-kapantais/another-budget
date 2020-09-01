import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context/GlobalContext';
import themes from '../../data/themes';
import lake from '../../images/lake.jpg';
import MainButton from '../MainButton';

const Page = styled.section`
	position: absolute;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ddd;
	background: url(${lake}) no-repeat 50% 20% / cover;
	color: #fff;
	label {
		color: #ddd;
	}

	form {
		header,
		main {
			margin-bottom: 2rem;
		}

		section {
			margin: 2rem 0;

			&:last-of-type {
				margin: 0;
			}
		}
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 0.5rem;

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	.section-heading {
		margin-bottom: 1rem;
	}

	button:first-of-type {
		margin-right: 0.5rem;
	}
`;

const NewUser = () => {
	const { setSum, updateFixedExpenses, resetTransactions } = useContext(
		GlobalContext
	);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const [savings, setSavings] = useState(0);

	const [gross, setGross] = useState(0);
	const [pcToSavings, setPcToSavings] = useState(0);

	const [rent, setRent] = useState(0);
	const [power, setPower] = useState(0);
	const [water, setWater] = useState(0);
	const [telephony, setTelepholy] = useState(0);

	const prefill = () => {
		setSavings(4500);
		setGross(2200);
		setPcToSavings(10);
		setRent(825);
		setPower(50.4);
		setWater(30.5);
		setTelepholy(43.5);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		resetTransactions();

		if (pcToSavings >= 100) {
			alert(
				'You are allocating to your savings more than your available monthly budget in New Month Setup > Add % to Savings. Please reduce the percentage allocated.'
			);
			return;
		}

		const totalSavings = savings + (gross * pcToSavings) / 100;
		const additionalSavings = (gross * pcToSavings) / 100;
		const netBalance =
			gross - rent - power - water - telephony - additionalSavings;

		setSum('userDisplayName', name);
		setSum('userEmail', email);

		setSum('savings', totalSavings);
		setSum('additionalSavings', additionalSavings);
		setSum('monthlyBalance', netBalance);
		updateFixedExpenses(rent, power, water, telephony);

		setSum('isNewUser', false);
	};

	return (
		<Page>
			<form onSubmit={onSubmit}>
				<header>
					<h1>Welcome to Budget!</h1>
					<p>Let's get set up.</p>
				</header>
				<main>
					<section>
						<h3 className='section-heading'>User Info</h3>
						<label>Display Name *</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<label>Email *</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</section>
					<section>
						<h3 className='section-heading'>Savings</h3>
						<label>Total Savings</label>
						<input
							type='number'
							step='0.01'
							value={savings}
							onChange={(e) => setSavings(Number(e.target.value))}
						/>
					</section>
					<section>
						<h3 className='section-heading'>New Month Setup</h3>
						<div className='form-row'>
							<div>
								<label>New Gross Budget</label>
								<input
									type='number'
									step='0.01'
									value={gross}
									onChange={(e) => setGross(Number(e.target.value))}
								/>
							</div>
							<div>
								<label>
									Add % to <span className='keyword'>Savings</span>
								</label>
								<input
									type='number'
									step='0.01'
									value={pcToSavings}
									onChange={(e) => setPcToSavings(Number(e.target.value))}
								/>
								{/* <p className='input-message'>
									{grossPcToSavings > 0
										? `${(grossPcToSavings * grossBudget) / 100} €`
										: '0 €'}
								</p> */}
							</div>
						</div>
					</section>
					<section>
						<h3 className='section-heading'>Fixed Expenses</h3>
						<div className='form-row'>
							<div>
								<label>Rent</label>
								<input
									type='number'
									step='0.01'
									value={rent}
									onChange={(e) => setRent(Number(e.target.value))}
								/>
							</div>
							<div>
								<label>Power</label>
								<input
									type='number'
									step='0.01'
									value={power}
									onChange={(e) => setPower(Number(e.target.value))}
								/>
							</div>
						</div>
						<div className='form-row'>
							<div>
								<label>Water</label>
								<input
									type='number'
									step='0.01'
									value={water}
									onChange={(e) => setWater(Number(e.target.value))}
								/>
							</div>
							<div>
								<label>Telephony</label>
								<input
									type='number'
									step='0.01'
									value={telephony}
									onChange={(e) => setTelepholy(Number(e.target.value))}
								/>
							</div>
						</div>
					</section>
				</main>
				<footer>
					<MainButton type='submit'>Submit</MainButton>
					<MainButton type='button' className='btn-default' onClick={prefill}>
						Prefill Form
					</MainButton>
				</footer>
			</form>
		</Page>
	);
};

export default NewUser;
