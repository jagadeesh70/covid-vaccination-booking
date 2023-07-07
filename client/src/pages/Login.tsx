import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import AppContext from '../store/AppContext';

const Login: React.FC = () => {

    const { updateAccessToken } = useContext(AppContext);
    const navigate = useNavigate()

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await axios.post('http://localhost:3000/auth/login',{
                email: data.get('email'),
                password: data.get('password'),
            })
            updateAccessToken(response.data.accessToken)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
       
    };


    return <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>       
                            Forgot password?
                    </Grid>
                    <Grid item>
                            <Link to={'/register'}>
                            {"Don't have an account? Sign Up"}
                            </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>;
};

export default Login;
