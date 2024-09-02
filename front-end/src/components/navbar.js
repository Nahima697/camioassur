import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light justify-content-center">
      <div>
        <NavLink className="navbar-brand" to="/">CamioAssur</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ">
            <NavLink className="nav-link"  to="/home">Home</NavLink>
            <NavLink className="nav-link"  to="/rendezVous">Prendre rendez-vous</NavLink>
            <NavLink className="nav-link"  to="/en-savoir-plus">En savoir plus</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
