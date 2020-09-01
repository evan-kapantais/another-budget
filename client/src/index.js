import React from 'react';
import ReactDOM from 'react-dom';

import { GlobalProvider, GlobalContext } from './context/GlobalContext';
import './index.scss';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
