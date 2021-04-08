import React from 'react';
import ReactDOM from 'react-dom';
import PawsHome from './PawsHome';
import {AppContextProvider} from "./ContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
    <PawsHome />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
