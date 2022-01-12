import { Button, CircularProgress, FormControl, Input, InputLabel, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import { useFirebase } from '../../Hooks/useFirebase';
import register1 from '../../assets/register1.jpg';
import { selectIsLoading } from '../../features/isloadingSlice';

const Register = () => {
    const { userRegister, Redirect } = useFirebase();
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
        // console.log(userInput);
    }
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        if (userInput.password !== userInput.confirmPassword) {
            alert("Password doesn't match");
            return;
        }
        userRegister(userInput.name, userInput.photoURL, userInput.email, userInput.password);
        e.target.reset();
    }
    // console.log(user);
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', minHeight: '100vh' }}>
            <Box sx={{ p: 8, width: "500px" }}>
                <Paper sx={{ p: 6 }} elevation={3}>
                    <form onSubmit={handleSubmitRegister}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                            <Box sx={{ mb: 5 }}>
                                <img style={{ width: 'calc(100% - 60px)' }} src={register1} alt="" />
                            </Box>
                            <FormControl variant="standard">
                                <InputLabel>Full Name</InputLabel>
                                <Input onChange={handleUserInput} defaultValue={userInput.name} name="name" type="text" />
                            </FormControl>
                            <FormControl variant="standard" sx={{ mt: 2 }}>
                                <InputLabel>Email</InputLabel>
                                <Input onChange={handleUserInput} defaultValue={userInput.email} name="email" type="email" />
                            </FormControl>
                            <FormControl variant="standard" sx={{ mt: 2 }}>
                                <InputLabel>Password</InputLabel>
                                <Input onChange={handleUserInput} defaultValue={userInput.password} name="password" type="password" />
                            </FormControl>
                            <FormControl variant="standard" sx={{ mt: 2 }}>
                                <InputLabel>Confirm Password</InputLabel>
                                <Input onChange={handleUserInput} defaultValue={userInput.confirmPassword} name="confirmPassword" type="password" />
                            </FormControl>
                            <FormControl variant="standard" sx={{ mt: 2 }}>
                                <InputLabel>Profile Photo URL (optional)</InputLabel>
                                <Input onChange={handleUserInput} defaultValue={userInput.photoURL} name="photoURL" type="text" />
                            </FormControl>
                            <Button type="submit" variant="contained" sx={{ mt: 5 }}>
                                {
                                    isLoading ? <CircularProgress color="inherit" size="25px" /> : 'Register'
                                }
                            </Button>
                            <Typography variant='subtitle' sx={{ mt: 2 }}>Already have an account? <NavLink to="/">Sign in</NavLink></Typography>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default Register;