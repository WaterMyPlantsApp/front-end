import React from 'react';
import './App.css';
import SignUp from './components/SignUp'
import Login from './components/Login'
import Header from './components/Header'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Profile from './components/Profile'


function App() {
  return (
    
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          {/* <Route path="/profile" component={Profile} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;