import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CamioAssur</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link"  exact to="/">Home</NavLink>
            <NavLink className="nav-link"  to="/agences">Trouver une agence</NavLink>
            <NavLink className="nav-link"  to="/en-savoir-plus">En savoir plus</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
