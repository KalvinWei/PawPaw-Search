import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";

export default function Dashboard(){
    //all statistical data are stored in context value "dashboard".
    const {dashboard} = useContext(AppContext)
    return (
        <div>
            {/*<p>we have `${stats.userCount}` users. `${stats.lostTotal}` Lost posts, `${stats.lostTotal}` Found posts, ... </p>*/}
        </div>
    );
}