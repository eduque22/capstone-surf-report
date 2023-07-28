import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useSigninCheck } from 'reactfire';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {
    getAuth,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
import {
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input, InputPassword } from  '../sharedComponents';




const signinStyles = {
    googleButton: {
        backgroundColor: 'rgb(66, 133, 244)',
        margin: '2em',
        padding: 0,
        color: 'white',
        height: '50px',
        width: '250px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '40px',
        display: 'block',
        borderRadius: '10px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo: {
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-serif',
        textAlign: 'center',
        fontSize: '2em'
    },
    containerStyle: {
        marginTop: '2em'
    },
    snackBar: {
        color: 'white',
        backgroundColor: '#4caf50'
    }
}


const NavA = styled(Link)({
    display: 'block',
    color: 'black',
    fontFamily: 'Roboto, arial, sans-serif',
    marginBottom: '20px'
})

const NavBarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const Logo = styled('h1')({
    margin: '0 0 0 0.45em'
})

const LogoA = styled(Link)({
    color: 'rgb(28,24,22)',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
})

const LogoNavigation = styled('ul')({
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'flex'
})

const Alert = (props:AlertProps) => {
    return (<MUIAlert elevation={6} variant='filled'/>)
}


interface ButtonProps {
    open?: boolean
    onClick?: () => void
}

export const GoogleButton = (props:ButtonProps) => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [ SignInWithGoogle, user, loading, error ] = useSignInWithGoogle(auth);


    const signIn = async () => {
        await SignInWithGoogle()
        console.log(auth)
        if (auth.currentUser){
            localStorage.setItem('myAuth', 'true')
            navigate('/wavecard')
        } else {
            navigate('./signin')
        }
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email)
            console.log(user.uid)
        }
    })

    const signUsOut = async () => {
        await signOut(auth)

        localStorage.setItem('myAuth', 'false')
        navigate('/')
    }

    if (loading){
        return (<CircularProgress/>)
    }

    const myAuth = localStorage.getItem('myAuth')

    if (myAuth === 'true') {
        return (
            <Button variant='contained' color='secondary' onClick={signUsOut}>Sign Out</Button>
        )
    } else {
        return (
            <Button sx={signinStyles.googleButton} onClick={signIn}>Sign In With Google</Button>
        )
    }
}


interface UserProps {
    email: string,
    password: string
}


export const SignIn = () => {
    const myAuth = localStorage.getItem('myAuth')
    const [open, setOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<UserProps>({})
    const auth = getAuth()

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClosed = () => {
        setOpen(false)
        setAlertOpen(true)
    }

    const navToCard = () => {
        navigate('./wavecard')
    }

    const onSubmit: SubmitHandler<UserProps> = async (data, event) => {
        console.log(data.email, data.password)

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                console.log(userCredential.user.uid);
                localStorage.setItem('myAuth', 'true')
                localStorage.setItem('userId', `${userCredential.user.uid}`)
                const user = userCredential.user;
                navigate('/wavecard')
            })

            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage, errorCode)
            });
    }



    return (
        <><NavBarContainer>
                <Logo>
                    <LogoA to='/'>Ojo Del Mar</LogoA>
                </Logo>
                <LogoNavigation>
                    <li>
                        <NavA to='/'>Home</NavA>
                    </li>
                    {myAuth === 'true' ? 
                        <>
                        <li>
                        <NavA to='/wavecard'>Wave Card</NavA>
                       </li>
                       <li>
                            <NavA to='/signin'>Sign Out</NavA>
                        </li></>
                        :
                         <><li>
                         <NavA to='/signin'>Sign In</NavA>
                        </li><li>
                             <NavA to='/signup'>Sign Up</NavA>
                         </li></>
                    }
                </LogoNavigation>
            </NavBarContainer>
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign In Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Place Email Here' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <InputPassword {...register('password')} name='password' placeholder='Place Password Here' />
                </div>
                <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </form>
            {/* <NavA to='/signup'>Don't have an account? Register Now!</NavA> */}
            <GoogleButton open={open} onClick={handleSnackClosed} />
            <Snackbar message='success' open={alertOpen} autoHideDuration={3000} onClose={navToCard}>
                <div>
                    <Alert severity='success'>
                        <AlertTitle>Successful Sign In --Redirect in 3 seconds </AlertTitle>
                    </Alert>
                </div>
            </Snackbar>
        </Container></>
    )
}


export const SignUp = () => {
    const myAuth = localStorage.getItem('myAuth')

    const [open, setOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<UserProps>({})
    const auth = getAuth()

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClosed = () => {
        setOpen(false)
        setAlertOpen(true)
    }

    const navToCard = () => {
        navigate('./wavecard')
    }

    const onSubmit: SubmitHandler<UserProps> = async (data, event) => {
        console.log(data.email, data.password)

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                localStorage.setItem('myAuth', 'true')
                const user = userCredential.user;
                navigate('/signin')
            })

            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage, errorCode)
            });
    }



    return (
        <><NavBarContainer>
        <Logo>
            <LogoA to='/'>Ojo Del Mar</LogoA>
        </Logo>
        <LogoNavigation>
            <li>
                <NavA to='/'>Home</NavA>
            </li>
            {myAuth === 'true' ? 
                <>
                <li>
                <NavA to='/wavecard'>Wave Card</NavA>
               </li>
               <li>
                    <NavA to='/signin'>Sign Out</NavA>
                </li></>
                :
                 <><li>
                 <NavA to='/signin'>Sign In</NavA>
                </li><li>
                     <NavA to='/signup'>Sign Up</NavA>
                 </li></>
            }
        </LogoNavigation>
    </NavBarContainer>
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign Up Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Place Email Here' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <InputPassword {...register('password')} name='password' placeholder='Place Password Here' />
                </div>
                <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </form>
            <Snackbar message='success' open={alertOpen} autoHideDuration={3000} onClose={navToCard}>
                <div>
                    <Alert severity='success'>
                        <AlertTitle>Successful Sign Up --Redirect in 3 seconds </AlertTitle>
                    </Alert>
                </div>
            </Snackbar>
        </Container></>
    )
}