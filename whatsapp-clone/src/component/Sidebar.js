import React from 'react';

// importing CSS
import './sidebar.css';

//importing Icon
import ChatIcon from '@material-ui/icons/Chat';
import { Avatar ,IconButton } from '@material-ui/core';
import { DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (

        <div className="sidebar">
            
            <div className="sidebar__header">
                <Avatar src="https://www.hackingwithswift.com/uploads/matrix.jpg"/>
                
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    
                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>

            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined/>
                    <input placeholder="Search Or Start New Chat" type="text" />  
                </div>
                
            </div>

            <div className="sidebar__chats">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
            </div>


        </div>
    )
}

export default Sidebar
