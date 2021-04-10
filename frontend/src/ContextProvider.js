import React from 'react';
import useGet from './hooks/useGet';

const AppContext = React.createContext({});

function AppContextProvider({ children }) {

    const context = useGet();

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};