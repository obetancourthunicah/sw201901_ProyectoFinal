import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import PrivateRoute from './Components/generics/privateroute/PrivateRoute';

import Login from './Components/pages/login/Login';
import Signin from './Components/pages/signin/Signin';
import Footer from './Components/generics/footer/Footer';
import List from './Components/pages/list/List';
import Detail from './Components/pages/detail/Detail';
import NewItem from './Components/pages/newitem/NewItem';
import './App.css';

function Home() {
  return (<h1>Home Page</h1>);
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      isAuthenticated : false,
      user: null,
      firsVerified: false
    }
    this.setAuthState = this.setAuthState.bind(this);
  }
  setAuthState(authProps){
    this.setState(authProps);
  }
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/login">Login</Link> </li>
            <li><Link to="/signin">SignIn</Link> </li>
            <li><Link to="/list">List</Link> </li>
          </nav>
            <Route path="/" exact component={Home}  />
            <Route path="/login"  render={(p)=>(<Login {...p} auth={{...this.state, setAuthState:this.setAuthState}}/>)} />
            <Route path="/signin" component={Signin} />
            <PrivateRoute path="/list" component={List} auth={this.state}/>
            <PrivateRoute path="/addnew" component={NewItem} auth={this.state}/>
            <PrivateRoute path="/detail/:itemid" component={Detail} auth={this.state}/>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
