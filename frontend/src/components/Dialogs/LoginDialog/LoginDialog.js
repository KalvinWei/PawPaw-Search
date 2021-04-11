import Modal from "../Modal";
import {AppContext} from "../../../ContextProvider";
import React, {useContext} from 'react';
import {useState} from 'react';

export default function LoginDialog() {
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [flag, setFlag] = useState(true);

    //
    const {authenticateUser} = useContext(AppContext)
    return (
        <Modal style={{ width: '50%', height: 'auto' }} dismissOnClickOutside={true} onCancel={()=> history.goBack()}>
            <h2>Login</h2>
            <div>
                <div >
                    <label >Username:</label>
                    <input type="text" value={username} onInput={e => setUsername(e.target.value)} />
                </div>
                <div >
                    <label >Password:</label>
                    <input type="password" value={password} onInput={e => setPassword(e.target.value)} />
                </div>
                <div>
                    {flag || <p>Username does not exist or wrong password!</p>}
                </div>
                <div>
                    <button onClick={() => {
                        setFlag(authenticateUser(username, password).isValidUser)
                    }}>
                        Log in
                    </button>
                </div>
            </div>
        </Modal>
    );
}