import Modal from "../Modal";
import React from "react";
import {useState, useContext} from 'react';
import {AppContext} from "../../../ContextProvider";


export default function SignupDialog() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState ('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {createUser} = useContext(AppContext);

    // TODO CHECK username duplicate -> check if this should be implemented in schema
    // TODO the format of phone number and email is correct or not -> 39/ week 4
    // TODO check whether the confirm password matches with password
    async function handleUserCreate() {

    }

    function handleCancel() {
        history.goBack()
    }


    return (
        <Modal style={{ width: '50%', height: 'auto' }} dismissOnClickOutside={true} onCancel={()=> history.goBack()}>
            <h2>Create An Account</h2>
            <div>
                <div>
                    <label>First Name</label>
                    <input type="text" value={firstName} onInput={e => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" value={lastName} onInput={e => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onInput={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Home Address</label>
                    <input type="text" value={address} onInput={e => setAddress(e.target.value)} />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="text" value={phone} onInput={e => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onInput={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onInput={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onInput={e => setConfirmPassword(e.target.value)} />
                </div>
                <div className={styles.formRow} style={{ flexDirection: 'row-reverse' }}>

                    <button
                        style={{ flexBasis: '100px', flexGrow: 0 }}
                        onClick={handleUserCreate}>
                        Creat
                    </button>
                    <button
                        style={{ flexBasis: '100px', flexGrow: 0 }}
                        onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}