import { useContext, useEffect, useState } from "react";
import FlightList, { Flight } from "../components/FlightList";
import AppContext from "../store/AppContext";
import axios from "axios";

const ManageFlights: React.FC = () => {
  const [flights, setFlight] = useState<Flight[]>([])
  const { accessToken } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const flightsData = await axios.get('http://localhost:3000/booking/avilableFlight', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      let fligts: Flight[] = flightsData.data
      setFlight((prev: Flight[]) => prev = fligts)
    })()
  }, [])

  return (
    <>
      <FlightList flights={flights} manageFlight={true}/>
    </>
  );
};

export default ManageFlights;
