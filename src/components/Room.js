import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import YouTube from 'react-youtube';

import Chat from './Chat';

import useMessages from './hooks/useMessages';

const SERVER_URL = 'https://58aab3c90017465bbb8c7cbf0b87d6b3.vfs.cloud9.us-east-2.amazonaws.com';
const SERVER_PORT = '8081';
const SERVER_ENDPOINT = SERVER_URL.concat(':', SERVER_PORT);

let socket;

const Room = (props) => {
    const newUserInfo = props.location.state.user;

    const [roomName, setRoomName] = useState(newUserInfo.groupID);
    const [user, setUser] = useState(newUserInfo.username); 
    const { messages, addMessage } = useMessages();
    
    const emitMessage = (msg) => {
        socket.emit('chat message', {roomName, msg});
    }
    
    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo();
    }
    
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    
    useEffect(() => {
        setRoomName(newUserInfo.groupID);
        setUser(newUserInfo.username);
        socket = io(SERVER_ENDPOINT);
        socket.emit('room connection', {roomName, user});
        
        socket.on('room connection', (msg) => {
            console.log('received room connection' + msg);
            addMessage(msg);
        })
        
        socket.on('chat message', (msg) => {
            addMessage(msg);
        });
        
        return () => {
            socket.emit('disconnect');
            socket.disconnect();
        }
    }, []);

    return (
        <div className="container-fluid m-auto h-100" style={{color: 'white'}}>
            <div className='row'>
                <nav className="navbar navbar-dark bg-dark w-100">
                    <a className="navbar-brand" href="/">Lets<span style={{color: '#E53A3A'}}>Watch</span></a>
                    <span>{user}</span>
                </nav>
            </div>
            
            <div className='row h-75 p-3'>
                <div className='col-8' style={{backgroundColor: 'black'}}>
                    <div id="player" className='video-wrapper w-100 h-100' style={{backgroundColor: '#E53A3A'}}>
                        <YouTube
                            videoId="V2hlQkVJZhE"
                            opts={opts}
                            onReady={_onReady}
                        />
                    </div>
                </div>
                
                <div className='col pr-0'>
                    <Chat group={roomName} messages={messages} emitMessage={emitMessage}/>
                </div>
            </div>
        </div> 
          
        // <h1 style={{color: 'white'}}>Hello '{user.username}'! You are in the '{user.groupID}' group.</h1>
    );
}

export default Room;