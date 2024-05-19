import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from '../components/calendar';

const CalendarApi = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/calendar/appointments`);
        setApiData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {apiData ? (
        <Calendar data={apiData} />
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default CalendarApi;
