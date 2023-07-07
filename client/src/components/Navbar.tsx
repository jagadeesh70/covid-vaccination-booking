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
    const { accessToken,resetAccessToken } = useContext(AppContext);
    const navigate = useNavigate()


    const logout = () => {
        resetAccessToken()
        navigate('/login')
    }

    const myBookings = () => {
        navigate('/mybookings')
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
                        {!!accessToken && <Button variant='contained' sx={{ color: 'white' }} onClick={logout}>Logout</Button>}
                        {!!accessToken && <Button variant='contained' sx={{ color: 'white' }} onClick={myBookings}>MyBookings</Button>}   
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}