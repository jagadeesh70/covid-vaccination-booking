import React, { useContext, useEffect, useState } from 'react';
import FlightList, { Flight } from '../components/FlightList';
import axios from 'axios';
import AppContext from '../store/AppContext';

const Home: React.FC = () => {
    const [flights,setFlight] = useState<Flight[]>([])
    const { accessToken } = useContext(AppContext);

    useEffect(() => {
        (async() => {
            const flightsData = await axios.get('http://localhost:3000/booking/avilableFlight',{
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                    }
            })
            let fligts:Flight[] = flightsData.data
            setFlight((prev:Flight[]) => prev=fligts)
        })()
    },[])

  return (
    <>
      <FlightList flights={flights} />
    </>
  );
};

export default Home;
