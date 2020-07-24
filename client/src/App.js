import React, { useState, useEffect } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Index from './components/Index';

import {getUser} from './modules/userData';

function App() {
  let user = getUser();

  const [state, setState] = useState({
    user: user
  });

  // useEffect(() => {
  //   getThisPage(window.location.href)
  //     .then(data => {
  //       if (data.loggedIn && data.loggedIn !== state.loggedIn)
  //         setState({...state, loggedIn: data.loggedIn});
  //         localStorage.setItem('loggedIn', data.loggedIn);
  //     });
  // });

  return (
    <>
      <BrowserRouter>
        <Header state={state} />

        <Switch>

          <Route path='/login'>
            <Login setState={setState} state={state}/>
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
