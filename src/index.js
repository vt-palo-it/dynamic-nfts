import './polyfill.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'

import { store } from './store/';
import { Provider } from 'react-redux';

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

window.Buffer = window.Buffer || require("buffer").Buffer; 

const chainAPI = process.env.REACT_APP_ALCHEMY_KEY;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
		<Provider store={store}>
			<ThirdwebProvider
					desiredChainId = {ChainId.Rinkeby}
					chainRpc={{ [ChainId.Rinkeby]:chainAPI }}>
				<App />
			</ThirdwebProvider>
		</Provider>
	// </React.StrictMode> 
);