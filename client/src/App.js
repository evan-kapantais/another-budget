import React, { useContext, useEffect } from 'react';
import { GlobalContext } from './context/GlobalContext';
import entries from './data/storedEntries';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';
import Home from './pages/Home';
import NewUser from './components/panels/NewUser';
import Dev from './components/panels/Dev';

const App = () => {
	const { isNewUser, getValue, setSum } = useContext(GlobalContext);

	useEffect(() => {
		getValue(entries.isNewUser);

		setSum('additionalCategories', []);
		setSum('additionalTypes', []);
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
