import React, {useContext} from "react";
import {AppContext} from "../../../ContextProvider";

export default function Posts({searchIn}){
    //TODO: here should be a paginated div to show posts(which are <PostCard>s) meeting the search criteria.
    //TODO: "criteria" is a context variable. When it changes, this view re-renders.
    const {setSearchLocale} = useContext(AppContext);
    setSearchLocale(searchIn);

    const [privateStateVariable, setPrivateStateVariable] = useState()

    return <div><h1>Here are all posts meeting search criteria</h1></div>;
}