import React, {useEffect, useState} from 'react';

import {getConnections} from '../../modules/httpQueries';

import Connection from './Connection';
import Chatwindow from './Chatwindow';



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
    const [chat, setChat] = useState(null);
    const [chatWindowOpen, setChatWindow] = useState(false);

    useEffect(() => {
        console.log("USE");
		getConnections()
			.then(response => {
				//console.log('myProfiles/likes response:');
                //console.log(response);
                setConnections(response);
                // console.log(connections);
            });

    }, [refresh, chat]);

    console.log(connections);
    console.log(chat);




    if (connections)
    {
        return(
        <>
            
            <div style={connectionsWindow} id="connections">
                    <Connection connections={connections} chat={chat} setChat={setChat} setChatWindow={setChatWindow} chatWindow={chatWindowOpen}/> 
            </div>
            {chatWindowOpen ?
                <div style={chatWindow}>
                    <Chatwindow socket={socket} chat={chat}/>
                </div>
            : ''}
            <div onClick={() => {openConnections(); setRefresh(!refresh);}} style={connectionButton}>Connections</div>

        </>)
    }
    else
    {
        return(<h1>Loading</h1>)
    }



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
