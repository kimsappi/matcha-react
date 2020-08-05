import React, {useEffect, useState} from 'react';

import {getConnections} from '../modules/httpQueries';



const Chat= ({socket}) => {


    const connectionsWindow =
    {
        position: "fixed",
        bottom: '40px',
        right: '0px',
        width: '200px',
        backgroundColor: 'gray',
        display: 'none'
    }

    const chatWindow = 
    {
        display: 'block',
        position: 'fixed',
        bottom: '40px',
        right: '200px',
        width: '200px',
        backgroundColor: 'red'
    }

    const connectionButton =
    {
        width: '200px',
        height: '40px',
        backgroundColor: 'lightGray',
        position: 'fixed',
        bottom: '0px',
        right: '0px'
    }

    const [connections, setConnections] = useState(null);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        console.log("USE");
		getConnections()
			.then(response => {
				//console.log('myProfiles/likes response:');
                //console.log(response);
                setConnections(response);
                console.log(connections);
            });

    }, [refresh]);

    console.log(connections);
    console.log("connecitn");

    socket.on('chat', function(data) {
        console.log(data);
    })
    function message()
    {
        var message = document.getElementById('message').value;
        console.log(socket);
        // socket.on('test', () => {
            socket.emit('chat', {
                msg: message
            }, response => console.log(response))

        // })
    }

    return(
    <>
        <div style={connectionsWindow} id="connections">
            <h1>asd</h1>
        </div>
        <div style={chatWindow}>Chat</div>
        <div onClick={() => {openConnections(); setRefresh(!refresh);}} style={connectionButton}>Connections</div>
        <input type="text" name="msg" id="message"/>
        <button onClick={() => message()}>Send</button>
    </>)


function openConnections()
{
    var connections = document.getElementById('connections');
    console.log(connections);
    console.log("asd");
    if (connections.style.display == 'none')
        connections.style.display = 'block'
    else
        connections.style.display = 'none'
}
}

export default Chat;
