import React, { Component } from 'react';
import logo from './logo.svg';

import Login from './Components/pages/login/Login';
import Signin from './Components/pages/signin/Signin';
import Footer from './Components/generics/footer/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login></Login>
        <Signin></Signin>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
