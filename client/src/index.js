import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import './i18n';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Suspense fallback="loading">
				<App />
			</Suspense>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
