import React from 'react';

export default function HeroImage() {
  return (
    <header>
      <div
        className='p-5 text-center bg-image'
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=600')",
          backgroundSize: 'cover', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center', 
          height: 600
        }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className='d-flex justify-content-center align-items-center h-100 p-5'>
            <div className='text-white'>
              <h1 className='mb-3'>CamioAssur</h1>
              <h4 className='mb-3'>Centre de contrôle technique agréé</h4>
              <a className='btn btn-outline-light btn-lg p-3' href='/rendezVous' role='button'>
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
