import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";
import {Route, Switch, useHistory} from 'react-router-dom'
import LoginDialog from "../Dialogs/LoginDialog/LoginDialog";
import SignUpDialog from "../Dialogs/SignUpDialog/SignUpDialog";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PetsIcon from '@material-ui/icons/Pets'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        '& > *': {
            margin: '0 20px'
        }
    },
}));


export default function Banner() {
    const classes = useStyles();
    const {loginUser, clearSession} = useContext(AppContext)

    const history = useHistory()

    const logout = () => {
        clearSession()
        history.push("/")
    }

    const openNewPost = ()=>{
        if(!!loginUser){
            history.push("/create-new-post")
        } else {
            history.replace('/login')
            openLogin()
        }

    }

    //for login dialog
    const [loginOpen, setLoginOpen] = React.useState(false);
    const openLogin = () => {
        setLoginOpen(true);
    };
    const closeLogin = () => {
        setLoginOpen(false);
        history.goBack()
    };

    //for signup dialog
    const [signupOpen, setSignupOpen] = React.useState(false);
    const openSignup = () => {
        setSignupOpen(true);
    };
    const closeSignup = () => {
        setSignupOpen(false);
        history.goBack()
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <PetsIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <span onClick={() => {
                            history.push('/')
                        }}>Home</span>
                        <span onClick={() => {
                            history.push('/PostPlaza')
                        }}>Post Plaza</span>
                        {loginUser &&
                        <span onClick={() => {
                            history.push('/MyPage')
                        }}>My Page</span>
                        }
                    </Typography>
                    {loginUser ?
                        <div>
                            <Typography variant='button'>
                                <span>{loginUser.firstName + " " + loginUser.lastName}</span>
                            </Typography> /
                            <Button color='inherit' onClick={logout}>Log Out</Button>
                        </div>
                        :
                        <div>
                            <Button color='inherit' onClick={() => {
                                history.push('/login')
                                openLogin()
                            }}>Log In</Button>
                            <Button color='inherit' onClick={() => {
                                history.push('/sign-up')
                                openSignup()
                            }}>Sign Up</Button>
                        </div>
                    }
                    <Button color='inherit' onClick={openNewPost}>New Post</Button>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path={`/login`}>
                    <LoginDialog open={loginOpen} onClose={closeLogin}/>
                </Route>
                <Route path={`/sign-up`}>
                    <SignUpDialog open={signupOpen} onClose={closeSignup}/>
                </Route>
            </Switch>
        </div>

    );
}