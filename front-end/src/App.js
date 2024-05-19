import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './scene/home';
import Appointment from './scene/appointment';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/appointment' element={<Appointment />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
