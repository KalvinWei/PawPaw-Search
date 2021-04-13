import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";

export default function Dashboard(){
    //all statistical data are stored in context value "dashboard".
    const {dashboard} = useContext(AppContext)

    return (
        <div>
            <h1>Dashboard</h1>
            <table>
                {dashboard && Object.keys(dashboard).map(key=>
                    <tr key={key}><td>{key}</td><td>{dashboard[key]}</td></tr>
                )}
            </table>
        </div>
    );
}