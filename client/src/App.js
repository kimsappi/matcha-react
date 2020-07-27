import React, { useState, useEffect } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import './App.css';
import Header from './views/Header/Header';
import Login from './components/Login';
import Index from './views/Index/Index';
import MyProfile from './views/MyProfile/MyProfile';
import MyLikes from './views/MyProfile/MyLikes';
import MyVisits from './views/MyProfile/MyVisits';

import {getUser} from './modules/userData';

function App() {
  let user = getUser();
  console.log(user);

  const [state, setState] = useState(user);
  

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
        <Header state={state} setState={setState} />

        <Switch>

          <Route path='/myProfile/profile'>
            <MyProfile setState={setState} state={state} />
          </Route>

          <Route path='/myProfile/likes'>
            <MyLikes setState={setState} state={state} />
          </Route>

          <Route path='/myProfile/visits'>
            <MyVisits setState={setState} state={state} />
          </Route>

          <Route path='/login'>
            <Login setState={setState} state={state} />
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
