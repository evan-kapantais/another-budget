import React, { useEffect, useContext } from 'react';

import Card from './Card';
import { GlobalContext } from '../context/GlobalContext';
import { getCurrentMonth, getYear } from '../helpers/date';

const User = () => {
	const {
		userDisplayName,
		userEmail,
		settings,
		handlePanel,
		getValues,
		setSum,
	} = useContext(GlobalContext);

	useEffect(() => {
		getValues('userDisplayName', 'userEmail');
	}, [userDisplayName, userEmail]);

	return (
		<Card id='user'>
			<div id='content-master-user'>
				<header>
					<div className='user'>
						<img src={require(`../images/85.jpg`)} alt='user avatar' />
						<div className='user-info'>
							<h2>{userDisplayName}</h2>
							<p className='secondary-text'>{userEmail}</p>
						</div>
					</div>
					<h4 className='date'>
						{getCurrentMonth()}, {getYear()}
					</h4>
				</header>
				<footer>
					<div className='buttons'>
						<button
							type='button'
							onClick={() => handlePanel('newMonthMenu', true)}
						>
							New Month
						</button>
						<button type='button' onClick={() => setSum('isNewUser', true)}>
							New User
						</button>
						<button
							type='button'
							onClick={() => handlePanel('settingsMenu', true)}
						>
							Settings
						</button>
					</div>
				</footer>
			</div>
		</Card>
	);
};

export default User;
