import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import AppContext from '../store/AppContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { accessToken,user,resetAccessToken } = useContext(AppContext);
    const navigate = useNavigate()


    const logout = () => {
        resetAccessToken()
        navigate('/login')
    }

    const myBookings = () => {
        navigate('/mybookings')
    }

    const manageFlights = () => {
        navigate('/flight')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link to={'/'} style={{textDecoration:'none',color:'white'}}>Fligh Booking</Link>
                    </Typography>
                    <Box sx={{display:'flex',columnGap:'10px'}}>
                        {user.isAdmin && <Button variant='contained' sx={{ color: 'white' }} onClick={manageFlights}>Manage Flights</Button>}
                        {!!accessToken && !user.isAdmin && <Button variant='contained' sx={{ color: 'white' }} onClick={myBookings}>MyBookings</Button>}   
                        {!!accessToken && <Button variant='contained' sx={{ color: 'white' }} onClick={logout}>Logout</Button>}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}