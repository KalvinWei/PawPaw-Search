import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppContextProvider} from "./ContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
    <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
