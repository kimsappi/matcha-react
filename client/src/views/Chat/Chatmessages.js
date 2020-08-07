import React, {useEffect, useState, forEach} from 'react';

import {getToken} from '../../modules/userData';

import {getThisPage} from '../../modules/httpQueries';

const ChatMessages = (({messages, otherUser, mostRecentMessage}) => {


if(messages)
{
    return (
        messages.map((message) =>
            <> 
            {otherUser == message.sender_name ?
                <>
                    <p style={{textAlign: 'right'}}>{message.content}</p>
                    <h5 style={{textAlign: 'right'}}>{otherUser}</h5>
                </>
                :
                <>
                    <p style={{textAlign: 'left'}}>{message.content}</p>
                    <h5 style={{textAlign: 'left'}}>{message.sender_name}</h5>
                </>
                }
                
            </>
            )
    )
}
else
    return (
        <p>No messages</p>
    );
});


export default ChatMessages;


