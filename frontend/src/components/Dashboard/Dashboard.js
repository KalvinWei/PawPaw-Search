import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";

export default function Dashboard(){
    //all statistical data are stored in AppContext.data.dashboard.
    const {ctxData} = useContext(AppContext)
    const stats = ctxData.dashboard;
    return (
        <div>
            <p>we have `${stats.userCount}` users. `${stats.lostTotal}` Lost posts, `${stats.lostTotal}` Found posts, ... </p>
        </div>
    );
}