import React, {useEffect, useState} from 'react';

import {getToken} from '../../modules/userData';

import {getThisPage} from '../../modules/httpQueries';

import ChatMessages from './Chatmessages';

const Chatwindow = (({socket, chat, chatWindow, chatUsername}) => {

    const [chatMessages, setChatMessages] = useState(null);
    const [mostRecentMessage, setMostRecentMessage] = useState(null);

    const myToken = getToken();
    socket.emit('privateChat', {user: chat, me: myToken})

    useEffect(() => {
        getThisPage(`/chat?id=${chat}`)
            .then(results => {
                if (results)
                {
                    console.log(results);
                    console.log("results chat");
                    setChatMessages(results)
                }
            })
    }, [chatWindow, chat, mostRecentMessage]);

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
        console.log("testttt");
        setMostRecentMessage(data);
    })


    return (
        <>
            <h4>Chat with {chatUsername}</h4>
            <ChatMessages messages={chatMessages} otherUser={chatUsername} mostRecentMessage={mostRecentMessage}/>
            <input type="text" name="msg" id="message"/>
            <button onClick={() => message()}>Send</button>
        </>
    )
})


export default Chatwindow;
