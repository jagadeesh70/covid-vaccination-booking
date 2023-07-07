import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import AppContext from '../store/AppContext';

const AddFlight: React.FC = () => {

    const { accessToken } = useContext(AppContext);
    const navigate = useNavigate()
    const params = useParams()

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(params.id){
            try {
                const avilableSeats = data.get('availableSeats') ? data.get('availableSeats') : 0
                const response = await axios.post('http://localhost:3000/admin/addFlight',{
                    flightNo: data.get('flightNo'),
                    date: data.get('date'),
                    source: data.get('source'),
                    destination: data.get('destination'),
                    availableSeats: Number(avilableSeats),
                },{headers:{
                    Authorization:`Bearer ${accessToken}`
                }})
                console.log(response.data)
                navigate('/flight')
            } catch (error) {
                console.log(error)
            }
        }
        else{
            try {
                const avilableSeats = data.get('availableSeats') ? data.get('availableSeats') : 0
                const response = await axios.post('http://localhost:3000/admin/addFlight',{
                    flightNo: data.get('flightNo'),
                    date: data.get('date'),
                    source: data.get('source'),
                    destination: data.get('destination'),
                    availableSeats: Number(avilableSeats),
                },{headers:{
                    Authorization:`Bearer ${accessToken}`
                }})
                console.log(response.data)
                navigate('/flight')
            } catch (error) {
                console.log(error)
            }
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
                    id="flightNo"
                    label="Flight Number"
                    name="flightNo"
                    type='text'
                    autoComplete="flightNo"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="source"
                    label="Source"
                    type="text"
                    id="source"
                    autoComplete="source"
                />
                 <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="destination"
                    label="Destination"
                    type="text"
                    id="destination"
                    autoComplete="destination"
                />
                 <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="date"
                    type="date"
                    id="date"
                    autoComplete="date"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="availableSeats"
                    label="Available Seats"
                    type="number"
                    id="availableSeats"
                    autoComplete="availableSeats"
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

export default AddFlight;
