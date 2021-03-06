import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// for token and localstorage
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

//redux
import { Provider } from 'react-redux';

//import logo from './logo.svg';
import './App.css';

//reactstrap
//import { Container } from 'reactstrap';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

//Auth
import Register from './components/auth/Register';
import Login from './components/auth/Login';

//Store
import store from './store';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  // 1000 for mili seconds
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div>
            <Navbar /> 
            <Route exact path="/" component={ Landing } />

            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
