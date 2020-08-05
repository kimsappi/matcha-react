import React, { useState, useEffect } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';


import './App.css';
import Header from './views/Header/Header';
import Login from './components/Login';
import Index from './views/Index/Index';
import MyProfile from './views/MyProfile/MyProfile';
import MyLikes from './views/MyProfile/MyLikes';
import MyVisits from './views/MyProfile/MyVisits';
import Profile from './views/Profile/Profile';
import io from 'socket.io-client';
import Chat from './views/Chat';
import CHATTEST from './CHATTEST';

import {getUser} from './modules/userData';

function App() {
  let user = getUser();
  console.log(user);

  const [state, setState] = useState(user);
  const [popupState, setPopupState] = useState(false);
  

  
  const socket = io.connect('http://localhost:3001');
  socket.on('FromClient', {
    message: 'asd'
  })

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
        <Header state={state} setState={setState} popupState={popupState} setPopupState={setPopupState} />
        <Chat socket={socket}/>
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

          <Route path='/profile/:id' component={Profile} />

          <Route path='/login'>
            <Login setState={setState} state={state} />
          </Route>

          <Route path='/confirmEmail'>
            <Index state={state} action='confirmEmail' setPopupState={setPopupState} />
          </Route>

          <Route path='/resetPassword'>
            <Index state={state} action='resetPassword' setPopupState={setPopupState} />
          </Route>

          <Route path='/CHATTEST'>
            <CHATTEST />
          </Route>

          <Route path='/'>
            <Index state={state} />
          </Route>

        </Switch>

      </BrowserRouter>
    </>
  );
}

export default App;
