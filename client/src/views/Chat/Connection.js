import React, {useEffect, useState} from 'react';
import {generateImageUrl} from '../../modules/httpQueries';


const Connection = ({connections, chat, setChat, chatWindow, setChatWindow, setChatUsername}) => {

{
    return(
        connections.map( (connection) => 
            <>
            {connection.online ? 
            <>
                <button className="btn btn-success" style={{width: '100%', marginBottom: '3px'}} onClick={() => {setChatUsername(connection.username); setChat(connection.id); {chat === connection.id ? setChatWindow(!chatWindow) : (chat === null ? setChatWindow(!chatWindow) : (chatWindow == true ? setChatWindow(chatWindow) : setChatWindow(!chatWindow)))}}}><img src={generateImageUrl(connection.filename)} style={{maxHeight: '30px'}}/><h4 style={{color: 'white', display: 'inline'}}>  {connection.username}</h4></button>
                <br/>
            </>
            :
            <>
                <button className="btn btn-danger" style={{width: '100%', marginBottom: '3px'}} onClick={() => {setChatUsername(connection.username); setChat(connection.id); {chat === connection.id ? setChatWindow(!chatWindow) : (chat === null ? setChatWindow(!chatWindow) : (chatWindow == true ? setChatWindow(chatWindow) : setChatWindow(!chatWindow)))}}}><img src={generateImageUrl(connection.filename)} style={{maxHeight: '30px'}}/><h4 style={{color: 'white', display: 'inline'}}>  {connection.username}</h4></button>
                <br/>
            </>
            }
            </>
        )
        
    )
}

}

export default Connection;