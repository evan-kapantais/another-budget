import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';

import Transactions from '../components/Transactions';
import MasterSavings from '../components/MasterSavings';
import MasterMonthlyBalance from '../components/MasterMonthlyBalance';
import MasterFixed from '../components/MasterFixed';
import NetAssets from '../components/NetAssets';
import NewTransactionOverlay from '../components/panels/NewTransaction';
import EditTransaction from '../components/panels/EditTransaction';
import NewMonth from '../components/panels/NewMonth';
import User from '../components/User';
import LogOutConfirmation from '../components/panels/LogOutConfirmation';
import Fixed from '../components/panels/Fixed';
import Savings from '../components/panels/Savings';
import SettingsPanel from '../components/panels/SettingsPanel';

const Home = () => {
	const {
		editMenu,
		addMenu,
		newMonthMenu,
		logOutMenu,
		settings,
		fixedMenu,
		savingsMenu,
	} = useContext(GlobalContext);

	return (
		<div className={`App ${settings.theme === 'dark' && 'dark'}`}>
			<User />
			<NetAssets />
			<MasterMonthlyBalance />
			<MasterSavings />
			<MasterFixed />
			<Transactions />
			<SettingsPanel />
			{addMenu && <NewTransactionOverlay />}
			{editMenu && <EditTransaction />}
			{newMonthMenu && <NewMonth />}
			{logOutMenu && <LogOutConfirmation />}
			{fixedMenu && <Fixed />}
			{savingsMenu && <Savings />}
		</div>
	);
};

export default Home;
