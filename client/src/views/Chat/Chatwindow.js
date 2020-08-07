import React, {useEffect, useState} from 'react';

import {getToken} from '../../modules/userData';

import {getThisPage} from '../../modules/httpQueries';

const Chatwindow = (({socket, chat}) => {

    const [chatMessages, setChatMessages] = useState(<p>Loading...</p>);

    const myToken = getToken();
    socket.emit('privateChat', {user: chat, me: myToken})

    useEffect(() => {
        getThisPage(`/chat?id=${chat}`)
            .then(results => {
                setChatMessages(results.map(msg => <p>{msg.content}</p>))
            })
    }, []);

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
            {chatMessages}
            <input type="text" name="msg" id="message"/>
            <button onClick={() => message()}>Send</button>
        </>
    )
})


export default Chatwindow;
