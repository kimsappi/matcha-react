import React, {useEffect, useState} from 'react';
import {generateImageUrl} from '../../modules/httpQueries';


const Connection = ({connections, chat, setChat, chatWindow, setChatWindow}) => {

{
    return(
        connections.map( (connection) => 
            <>
            {connection.online ? 
            <>
                <button onClick={() => {setChat(connection.id); {chat === connection.id ? setChatWindow(!chatWindow) : setChatWindow(chatWindow)}}}><img src={generateImageUrl(connection.filename)}/><h4 style={{color: 'green', display: 'inline'}}>{connection.username}</h4></button>
                <br/>
            </>
            :
            <>
                <button onClick={() => {setChat(connection.id); {chat === connection.id ? setChatWindow(!chatWindow) : setChatWindow(chatWindow)}}}><img src={generateImageUrl(connection.filename)} style={{maxHeight: '30px'}}/><h4 style={{color: 'red', display: 'inline'}}>{connection.username}</h4></button>
                <br/>
            </>
            }
            </>
        )
        
    )
}

}

export default Connection;