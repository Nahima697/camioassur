
import  Navbar  from '../components/navbar';
import CalendarApi from '../services/calendarApi';
import React from 'react';


function Home() {

  return (
    <div className="container">
      <Navbar/>
      <h1> Bienvenue chez CamionAssur</h1>
      <CalendarApi  />
    </div>
  );
}

export default Home;
