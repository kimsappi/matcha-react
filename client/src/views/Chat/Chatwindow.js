import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {getToken} from '../../modules/userData';


const Chatwindow = (({chat}) => {

    const socket = io.connect('http://localhost:3001');
    const myToken = getToken();
    socket.emit('privateChat', {user: chat, me: myToken})


    function message()
    {
        var message = document.getElementById('message').value;
        console.log(socket);
        // socket.on('test', () => {
            socket.emit('chat', {
                msg: message,
                id: chat,
                me: myToken
            }, response => console.log(response))

        // })
    }



    socket.on('FromClient', {
      message: 'asd'
    })

    socket.on('chat', function(data) {
        console.log(data);
    })


    return (
        <>
            <h4>Chat with {chat}</h4>
            <input type="text" name="msg" id="message"/>
            <button onClick={() => message()}>Send</button>
        </>
    )
})


export default Chatwindow;