import React from "react";
import {useState, useContext} from 'react';
import {AppContext} from "../../../ContextProvider";
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormHelperText} from "@material-ui/core";


export default function SignUpDialog({open, onClose}) {

    const {signUpUser, loginUser} = useContext(AppContext);

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

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please input the fields to sign up!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        value={user.username}
                        onChange={e => setUser({...user, username:e.target.value})}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        value={user.firstName}
                        onChange={e => setUser({...user, firstName:e.target.value})}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Last Name"
                        type="text"
                        value={user.lastName}
                        onChange={e => setUser({...user, lastName:e.target.value})}
                        fullWidth
                    />
                    <TextField
                        autoFocu
                        margin="dense"
                        label="Email"
                        type="email"
                        value={user.email}
                        onChange={e => setUser({...user, email:e.target.value})}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Address Number"
                        type="text"
                        value={user.address.number}
                        onChange={e => setUser({...user, address:{...user.address, number:e.target.value}})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Street"
                        type="text"
                        value={user.address.street}
                        onChange={e => setUser({...user, address:{...user.address, street:e.target.value}})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="City"
                        type="text"
                        value={user.address.city}
                        onChange={e => setUser({...user, address:{...user.address, city:e.target.value}})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="PostCode"
                        type="text"
                        value={user.address.postcode}
                        onChange={e => setUser({...user, address:{...user.address, postcode:e.target.value}})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Phone Number"
                        type="text"
                        value={user.phone}
                        onChange={e => setUser({...user, phone:e.target.value})}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        type="password"
                        value={user.password}
                        onChange={e => setUser({...user, password:e.target.value})}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        value={user.cfmPassword}
                        onChange={e => setUser({...user, cfmPassword:e.target.value})}
                        fullWidth
                    />
                    <div>
                        {isUsernameValid ||
                        <FormHelperText style={{color:'red', fontSize:'large'}}>
                            Username you input is in already use
                        </FormHelperText>}
                        {isPwdMatch ||
                        <FormHelperText style={{color:'red', fontSize:'large'}}>
                            The passwords you input don't match
                        </FormHelperText>}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUserCreate} color="primary">
                        Sign up
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
