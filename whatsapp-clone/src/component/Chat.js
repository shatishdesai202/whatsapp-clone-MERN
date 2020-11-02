import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MicNone, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState } from 'react';

import axios from '../axios';

// importing CSS
import './chat.css';
import ChatMessage from './ChatMessage';

function Chat( {messages} ) {

    const [input, setInput] = useState('');

    const sendMessage =  async (e) =>{
        
        e.preventDefault();

        await axios.post("messages/new", {
            
            message: input,
            name: "Shatish desai",
            timestamp: "12:00",
            receive : true
        
        });

        setInput('');

    }

    return (
        <div className="chat">

            <div className="chat__header">

                <Avatar />

                <div className="chat__headerInfo">
                    <h3> room name </h3>
                    <p> Last seen at .... </p>
                </div>                

                <div className="chat__headerRight">

                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                        
                        <IconButton>
                            <AttachFile />
                        </IconButton>

                        <IconButton>
                            <MoreVert />
                        </IconButton>
                        
                </div>

            </div>


            <div className="chat__body">

                { messages.map( (message) => (
                    <ChatMessage className= {message.receive} message = {message} />

                ) ) }
                
                {/* <ChatMessage className= {true} />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage className= {true} />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage className= {true} />
                <ChatMessage /> */}
                
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon/>
                </IconButton>
                
                <form>
                    <input value={input} onChange={ (e) => setInput(e.target.value) } placeholder="Type A Message" type="text" />
                    <button onClick={sendMessage} type="submit">Send A Message</button>
                </form>

                <IconButton>
                    <MicNone/>
                </IconButton>
                
            </div>

        </div>
    )
}

export default Chat
