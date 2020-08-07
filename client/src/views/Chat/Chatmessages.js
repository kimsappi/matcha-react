import React, {useEffect, useState, forEach} from 'react';

import {getToken} from '../../modules/userData';

import {getThisPage} from '../../modules/httpQueries';

const ChatMessages = (({messages}) => {


if(messages)
{
    return (
        messages.map((message) =>
            <> {message.content} </>
            )

    )
}
else
    return (
        <p>No messages</p>
    );
});


export default ChatMessages;


