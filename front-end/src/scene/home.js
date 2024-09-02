
import HeroImage from '../components/heroImage';
import  Navbar  from '../components/navbar';
import React from 'react';

function Home() {

  return (
    <div className="container-fluid">
      <Navbar/>
      <HeroImage/>
    </div>
  );
}

export default Home;
