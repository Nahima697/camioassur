import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './scene/home';
import Appointment from './scene/appointment';
import RendezVous from './scene/rendez-vous';
import EnSavoirPlus from './scene/enSavoirPlus';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/appointment' element={<Appointment />} />
            <Route exact path='/rendezVous' element={<RendezVous />} />
            <Route exact path='/enSavoirPlus' element={<EnSavoirPlus />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
