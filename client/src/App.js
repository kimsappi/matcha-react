import React, { useState, useEffect } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Index from './components/Index';

import getThisPage from './modules/httpQueries';

function App() {
  const [state, setState] = useState({
    loggedIn: false
  });

  useEffect(() => {
    getThisPage(window.location.href)
      .then(data => {
        if (data.loggedIn !== state.loggedIn)
          setState({...state, loggedIn: data.loggedIn});
      });
  });

  return (
    <>
      <BrowserRouter>
        <Header state={state} />

        <Switch>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/'>
            <Index />
          </Route>

        </Switch>

      </BrowserRouter>
    </>
  );
}

export default App;
