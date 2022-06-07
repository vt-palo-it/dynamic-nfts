import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

window.Buffer = window.Buffer || require("buffer").Buffer; 

const chainAPI = process.env.REACT_APP_ALCHEMY_KEY;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider
				desiredChainId = {ChainId.Rinkeby}
				chainRpc={{ [ChainId.Rinkeby]:chainAPI }}>
			<App />
		</ThirdwebProvider>
  </React.StrictMode>
);