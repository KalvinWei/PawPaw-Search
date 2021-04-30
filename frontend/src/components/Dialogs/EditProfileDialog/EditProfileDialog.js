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

export default function EditProfileDialog({open, onClose}) {
    const {updateUserProfile, loginUser, setLoginUser} = useContext(AppContext)
    const history = useHistory();

    const  [isPwdMatch, setIsPwdMatch] = useState(true)

    //a copy of logged-in user to react to form input
    const [user, setUser] = useState(()=>{
        const userProfile = {
            username:loginUser.username,
            firstName:loginUser.firstName,
            lastName:loginUser.lastName,
            password:"",
            cfmPassword:"",
            email:loginUser.email,
            phone:loginUser.phone,
            address:{
                number:loginUser.address.number,
                street:loginUser.address.street,
                city:loginUser.address.city,
                postcode:loginUser.address.postcode
            }
        }
        return userProfile
    })

    const handleUpdate = async () => {
        if(user.password && user.password !== user.cfmPassword){
            setIsPwdMatch(false)
            return
        }

        delete user.cfmPassword
        if(!user.password) delete user.password
        const updatedUser = await updateUserProfile(user)
        if(updatedUser) {
            setLoginUser(updatedUser)
            onClose()
            history.goBack()
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit {user.firstName} {user.lastName}'s Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        It must be a fresh you today ~
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={user.firstName}
                        label="First Name"
                        onChange={e=>setUser({...user, firstName:e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        value={user.lastName}
                        label="Last Name"
                        onChange={e=>setUser({...user, lastName:e.target.value})}
                    />
                    <TextField
                        autoFocu
                        margin="dense"
                        label="Email"
                        type="text"
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
                        label="Postcode"
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
                        placeholder='not change? leave it emtpy!'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        value={user.cfmPassword}
                        onChange={e => setUser({...user, cfmPassword:e.target.value})}
                        placeholder='not change? leave it emtpy!'
                        fullWidth
                    />
                    <div>
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
                    <Button onClick={handleUpdate} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}