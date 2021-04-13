import Modal from "../Modal";
import React from "react";
import {useState, useContext} from 'react';
import {AppContext} from "../../../ContextProvider";
import {useHistory} from "react-router-dom";


export default function SignUpDialog() {

    const {signUpUser, loginUser} = useContext(AppContext);
    console.log(loginUser || "no user logged in")

    const [user, setUser] = useState({
        username: "",
        password: "",
        cfmPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: {
            number: "",
            street: "",
            city: "",
            postcode: ""
        }
    })
    const [isUsernameValid, setIsUsernameValid] = useState(true)
    const [isPwdMatch, setIsPwdMath] =  useState(true)

    const history = useHistory()

    // TODO CHECK username duplicate -> check if this should be implemented in schema
    // TODO the format of phone number and email is correct or not -> 39/ week 4
    // TODO check whether the confirm password matches with password
    async function handleUserCreate() {
        console.log(user)
        if(user.password  !== user.cfmPassword){
            setIsPwdMath(false)
            return
        }
        const {cfmPassword,...rest} = user
        setUser(rest)
        const dbUser = await signUpUser(user)
        if(dbUser){
            history.goBack()
        } else {
            setIsUsernameValid(false)
        }
    }

    function handleCancel() {
        history.goBack()
    }


    return (
        <Modal style={{width: '50%', height: 'auto'}} dismissOnClickOutside={true} onCancel={() => history.goBack()}>
            <h2>Create An Account</h2>
            <div>
                <div>
                    <label>First Name</label>
                    <input type="text" value={user.firstName} onInput={e => setUser({...user, firstName:e.target.value})}/>
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" value={user.lastName} onInput={e => setUser({...user, lastName:e.target.value})}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={user.email} onInput={e => setUser({...user, email:e.target.value})}/>
                </div>
                <div>
                    <label>addr No.</label>
                    <input type="text" value={user.address.number} onInput={e => setUser({...user, address:{number:e.target.value}})}/>
                </div>
                <div>
                    <label>street</label>
                    <input type="text" value={user.address.street} onInput={e => setUser({...user, address:{street:e.target.value}})}/>
                </div>
                <div>
                    <label>city</label>
                    <input type="text" value={user.address.city} onInput={e => setUser({...user, address:{city:e.target.value}})}/>
                </div>
                <div>
                    <label>postcode</label>
                    <input type="text" value={user.address.postcode} onInput={e => setUser({...user, address:{postcode:e.target.value}})}/>
                </div>
                <div>
                    <label>Phone</label>
                    <input type="text" value={user.phone} onInput={e => setUser({...user, phone:e.target.value})}/>
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" value={user.username} onInput={e => setUser({...user, username:e.target.value})}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={user.password} onInput={e => setUser({...user, password:e.target.value})}/>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" value={user.cfmPassword} onInput={e => setUser({...user, cfmPassword:e.target.value})}/>
                </div>
                <div>
                    {isUsernameValid || <p>{user.username} is in use. Try with another one.</p>}
                    {isPwdMatch || <p>Passwords don't match with each other.</p>}
                </div>
                <div style={{flexDirection: 'row-reverse'}}>
                    <button
                        style={{flexBasis: '100px', flexGrow: 0}}
                        onClick={handleUserCreate}>
                        Creat
                    </button>
                    <button
                        style={{flexBasis: '100px', flexGrow: 0}}
                        onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}