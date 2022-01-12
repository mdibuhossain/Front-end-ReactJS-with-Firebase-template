import { Button, CircularProgress, FormControl, Input, InputLabel, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../../Hooks/useFirebase';
import { selectIsLoading } from '../../features/isloadingSlice';
import { selectUser } from '../../features/userSlice';
import gym1 from '../../assets/gym1.jpg';

const Login = () => {
    const { logIn, Redirect } = useFirebase();
    const [userInput, setUserInput] = useState({});
    const isLoading = useSelector(selectIsLoading);
    const user = useSelector(selectUser);
    useEffect(() => {
        if (user.email)
            Redirect();
    });
    const handleUserInput = (e) => {
        const tmpData = { ...userInput };
        tmpData[e.target.name] = e.target.value;
        setUserInput(tmpData);
    }
    const handleLogin = (e) => {
        e.preventDefault();
        logIn(userInput.email, userInput.password);
        e.target.reset();
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ p: 8, width: "500px" }}>
                <Paper sx={{ p: 6 }} elevation={3}>
                    <form onSubmit={handleLogin}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                            <Box sx={{ mb: 5 }}>
                                <img style={{ width: 'calc(100% - 50px)' }} src={gym1} alt="" />
                            </Box>
                            <FormControl variant="standard">
                                <InputLabel>Email</InputLabel>
                                <Input onChange={handleUserInput} defaultValue={userInput.email} name="email" type="email" />
                            </FormControl>
                            <FormControl variant="standard" sx={{ mt: 3 }}>
                                <InputLabel>Password</InputLabel>
                                <Input onChange={handleUserInput} defaultValue={userInput.password} name="password" type="password" />
                            </FormControl>
                            <Button type="submit" variant="contained" sx={{ mt: 8 }}>
                                {
                                    isLoading ? <CircularProgress color="inherit" size="25px" /> : 'Login'
                                }
                            </Button>
                            <Typography variant='subtitle' sx={{ mt: 1 }}>Don't have an account? <NavLink to="/register">Sign up</NavLink></Typography>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default Login;