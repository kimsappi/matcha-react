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
        if (message)
        {
            socket.emit('chat', {
                msg: message,
                id: chat,
                me: myToken
            }, response => console.log(response))
        
            document.getElementById('message').value = '';
        }
        // })
    }


    socket.on('FromClient', {
      message: 'asd'
    })
    
    socket.on('chat', function(data) {

        console.log(data);
        console.log("testttt");
        if (data.error == "block")
            setMostRecentMessage("blocked");
        else
            setMostRecentMessage(data);
    })

    function enterPressed(event)
    {
        var code = event.keyCode || event.which;
        if (code === 13)
            message();
    }

    return (
        <>
            
            <button className="btn btn-primary" onClick={() => message()}>Send</button>
            <input type="text" name="msg" id="message" autocomplete="off" onKeyPress={enterPressed.bind(this)}/>
            <div style={{display: 'flex', flexDirection: 'column-reverse', overflowY: 'scroll'}}>
                <div style={{display: 'flex', flexDirection: 'column', overflowWrap: 'break-word'}}>
                    <ChatMessages messages={chatMessages} otherUser={chatUsername} mostRecentMessage={mostRecentMessage}/>
                </div>
            </div>
        </>
    )
})


export default Chatwindow;
