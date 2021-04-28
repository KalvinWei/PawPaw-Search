import Modal from "../Modal";
import {AppContext} from "../../../ContextProvider";
import React, {useContext} from 'react';
import {useState} from 'react';
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormHelperText} from "@material-ui/core";

// TODO check username duplicate -> check if this should be implement in schema
// TODO check pas

export default function LoginDialog({open, onClose}) {
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
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Log In</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please log in with username and password!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={username}
                        label="username"
                        fullWidth
                        onChange={e=>setUsername(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        value={password}
                        label="password"
                        type='password'
                        fullWidth
                        onChange={e=>setPassword(e.target.value)}
                    />
                    {flag ||
                    <FormHelperText style={{color:'red', fontSize:'large'}}>validation failed: an existing username or a wrong password.</FormHelperText>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogin} color="primary">
                        Log In
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}