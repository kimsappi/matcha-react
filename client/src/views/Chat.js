import React, {useEffect, useState} from 'react';





const Chat= ({socket}) => {



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
        <input type="text" name="msg" id="message"/>
        <button onClick={() => message()}>Send</button>
    </>)
}

export default Chat;