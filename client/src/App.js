import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from './context/GlobalContext';
import entries from './data/storedEntries';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

import './App.scss';
import Home from './pages/Home';
import NewUser from './components/panels/NewUser';
import Dev from './components/panels/Dev';

const App = () => {
	const { isNewUser, getValue } = useContext(GlobalContext);

	useEffect(() => {
		getValue(entries.isNewUser);
	}, [isNewUser]);

	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					{isNewUser ? <NewUser /> : <Home />}
				</Route>
				<Route path='/dev' component={Dev} />
			</Switch>
		</Router>
	);
};

export default App;
