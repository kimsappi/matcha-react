import React from 'react';

const ChatMessages = (({messages, otherUser, mostRecentMessage}) => {

    if (mostRecentMessage == 'blocked')
        alert("You have been blocked by the user you're trying to message");
if (messages)
{
    {var asd = 0}
    {var asd2 = 0}
    return (
        
        messages.map((message) => {
            asd2 = asd;
            asd = otherUser == message.sender_name ? 1 : 2
            return (
                <> 
                
                {asd === 1 ?
                    <>
                        {asd !== asd2 ? <h5 style={{textAlign: 'left'}}>{otherUser}</h5> : ''}
                        <p style={{textAlign: 'left'}}>{message.content}</p>
                    </>
                    :
                    <>
                        {asd !== asd2 ? <h5 style={{textAlign: 'right'}}>{message.sender_name}</h5> : ''}
                        <p style={{textAlign: 'right'}}>{message.content}</p>
                    </>
                    }
                    
                </>
            )
        })
    )
}
else
    return (
        <p>No messages</p>
    );
});


export default ChatMessages;


