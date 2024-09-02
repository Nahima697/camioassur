
import  Navbar  from '../components/navbar';
import CalendarApi from '../services/calendarApi';
import React from 'react';


function RendezVous() {

  return (
    <div className="container">
      <Navbar/>
      <h1 className="text-center mb-5"> Prenez un rendez-vous</h1>
      <CalendarApi  />
    </div>
  );
}

export default RendezVous;
