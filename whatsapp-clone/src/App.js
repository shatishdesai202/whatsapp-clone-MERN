import React, {useEffect, useState} from 'react';
import Chat from './component/Chat';
import Sidebar from './component/Sidebar';

import Pusher from 'pusher-js';

import axios from './axios';

// importing CSS
import './App.css';

function App() {
    
    const [messages, setMessages] = useState([]);  

    useEffect( ()=>{

        axios.get("messages/getAll")
            .then( responce => setMessages(responce.data));
            

    }, [] )

    useEffect( ()=>{

        Pusher.logToConsole = true;

        const pusher = new Pusher('b5d9822cbd230ce7b055', {
        cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(newMessage) {
            // alert(JSON.stringify(newMessage));
            setMessages( [...messages, newMessage] )
        });

        return () =>{
            channel.unbind_all();
            channel.unsubscribe();
        }

    },[messages])

    return (
        <div className="app">
            <div className="app__body">
                <Sidebar />
                <Chat messages={messages} />
            </div>
        </div>
    )
}

export default App
