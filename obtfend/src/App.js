import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Login from './Components/pages/login/Login';
import Signin from './Components/pages/signin/Signin';
import Footer from './Components/generics/footer/Footer';
import './App.css';

function Home() {
  return (<h1>Home Page</h1>);
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/login">Login</Link> </li>
            <li><Link to="/signin">SignIn</Link> </li>
          </nav>
            <Route path="/" exact component={Home}  />
            <Route path="/login"  component={Login} />
            <Route path="/signin" component={Signin} />
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
