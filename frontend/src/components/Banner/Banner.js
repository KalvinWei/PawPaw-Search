import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";
import {NavLink, Route, Switch, useHistory} from 'react-router-dom'
import LoginDialog from "../Dialogs/LoginDialog/LoginDialog";
import SignUpDialog from "../Dialogs/SignUpDialog/SignUpDialog";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PetsIcon from '@material-ui/icons/Pets'
import Grid from "@material-ui/core/Grid";
import {Person} from "@material-ui/icons";

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
        },
        marginLeft:20,
        fontWeight:'bold'
    },
    nav:{
        textDecoration:"none",
        color:'lightblue'
    },
    navActive:{

    },
    appBar:{
        backgroundImage: 'radial-gradient( circle farthest-corner at 16.5% 28.1%,  rgba(15,27,49,1) 0%, rgba(0,112,218,1) 90% )',
        borderRadius:20,
        backdropFilter:'drop-shadow(4px 4px 10px blue)'
    },
    logoImg:{
        position:"relative",
        height:46
    },
    buttonAtRight:{
        textTransform:"capitalize",
        color:'ivory',
        fontSize:16,
        margin:'0 6px'
    }
}));


export default function Banner() {
    const classes = useStyles();
    const {loginUser, clearSession} = useContext(AppContext)

    const history = useHistory()

    const logout = () => {
        clearSession()
        history.replace("/")
    }

    const openNewPost = () => {
        if (!!loginUser) {
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
        history.push('/')
    };

    //for signup dialog
    const [signupOpen, setSignupOpen] = React.useState(false);
    const openSignup = () => {
        setSignupOpen(true);
    };
    const closeSignup = () => {
        setSignupOpen(false);
        history.push('/')
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} className={classes.logoImg}/>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink to='/' className={classes.nav} activeClassName={classes.navActive}>Home</NavLink>
                        <NavLink to='/PostPlaza' className={classes.nav} activeClassName={classes.navActive}>Post Plaza</NavLink>
                        {loginUser &&
                        <NavLink to='/MyPage' className={classes.nav} activeClassName={classes.navActive}>My Page</NavLink>
                        }
                    </Typography>
                    <Button color='inherit' onClick={openNewPost} size='small' className={classes.buttonAtRight}>New Post</Button>
                    {loginUser ?
                        <div>
                            <Grid container alignItems='center'>
                                <Grid item>
                                    <Button color='inherit' onClick={logout}  size='small'  className={classes.buttonAtRight}>Log Out</Button>
                                </Grid>
                                <Grid item>
                                    <Person/>
                                </Grid>
                                <Grid item>
                                    <Typography style={{textDecoration: 'capitalize', fontWeight:'bolder'}}>
                                        &nbsp;{loginUser.firstName} {loginUser.lastName}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        <div>
                            <Button color='inherit'  size='small' onClick={() => {
                                history.push('/login')
                                openLogin()
                            }}
                                    className={classes.buttonAtRight}
                            >Log In</Button>
                            <Button color='inherit'  size='small' onClick={() => {
                                history.push('/sign-up')
                                openSignup()
                            }}
                                    className={classes.buttonAtRight}
                            >Sign Up</Button>
                            <LoginDialog open={loginOpen} onClose={closeLogin}/>
                            <SignUpDialog open={signupOpen} onClose={closeSignup}/>
                        </div>
                    }
                </Toolbar>
            </AppBar>


        </div>

    );
}