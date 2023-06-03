import './App.css'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5174"); //now we have connected to socket serer
  // now we use this to emit or listen to events whenever we want to
  //so whenever we are emitting there should be listener in thr server, so go and create listener in io

function App() {

  const [room, setRoom] = useState('')

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState();

  function joinRoom() {
    if(room !== '') {
      socket.emit("join_room", room)
    }
  }

  function sendMessage() {
    socket.emit("send_message", {message, room});
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    });
},[socket]);

  return (
    <>
    <input placeholder='join room' onChange={(e)=>setRoom(e.target.value)}/>
    <button onClick={joinRoom}>join room</button>
      <input type='text' placeholder='type message...' onChange={(e)=>setMessage(e.target.value)}/>
      <button onClick={sendMessage}>send message</button>
      <h1>Message:</h1>
      <h2>{messageReceived}</h2>
    </>
  )
}

export default App
