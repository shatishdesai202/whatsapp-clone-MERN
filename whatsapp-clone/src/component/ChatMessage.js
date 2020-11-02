import React from 'react';

import './ChatMessage.css';

function ChatMessage( {className, message} ) {
    return (
        
            <p className= {`chat__message   ${ className ? " chat__receiver" : null }`} >
                <span className="chat__name">
                    {message.name}
                </span>
                {message.message}
                <span className="chat__timestamp">
                    {message.timestamp}
                </span>
            </p>
       
    )
}

export default ChatMessage
