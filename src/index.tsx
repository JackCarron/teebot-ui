import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';

import { getAwsExports } from './aws-exports';
import { HashRouter } from 'react-router-dom';

const bootstrap = async(): Promise<void> => {
  Amplify.configure(getAwsExports())

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  
  root.render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
}

bootstrap();
reportWebVitals();

