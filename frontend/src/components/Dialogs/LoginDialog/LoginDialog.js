import Modal from "../Modal";
import {AppContext} from "../../../ContextProvider";
import React, {useContext} from 'react';
import {useState} from 'react';
import {useHistory} from 'react-router-dom'

// TODO check username duplicate -> check if this should be implement in schema
// TODO check pas

export default function LoginDialog() {
    const {authenticateUser, loginUser} = useContext(AppContext)
    const history = useHistory();

    //if a user has logged in, then redirect to "home"
    if(loginUser) {
        history.replace('/')
    }

    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [flag, setFlag] = useState(true);

    const handleLogin = async () => {
        const user = await authenticateUser(username, password)
        if(user) history.push('/')
        else {
            setFlag(false)
            setUsername("")
            setPassword("")
        }
    }


    return (
        <Modal style={{ width: '50%', height: 'auto' }} dismissOnClickOutside={true} onCancel={()=> history.goBack()}>
            <h2>Login</h2>
            <div>
                <div >
                    <label >Username:</label>
                    <input type="text" value={username} onChange={e => {setUsername(e.target.value);}} />
                </div>
                <div >
                    <label >Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    {flag ? "": <p>Username does not exist or wrong password!</p>}
                </div>
                <div>
                    <button onClick={handleLogin}>
                        Log in
                    </button>
                </div>
            </div>
        </Modal>
    );
}