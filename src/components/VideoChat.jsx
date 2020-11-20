import React, { useState, useCallback } from 'react';

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  // useCallback takes two arguments, the function to be memoized and an array of the function's dependencies. If any of the function's dependencies change, that implies the memoized function is out of date and the function is then redefined and memoized again

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  // When the user submits the form we want to send the username and room name to the server to exchange for an access token we can use to enter the room

  // Use fetch API to send the data as JSON to the endpoint, receive and parse the response, then use setToken to store the token in our state

  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    const data = await fetch('/video/token', {
      method: 'POST',
      body: JSON.stringify({
        identity: username,
        room: roomName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    setToken(data.token);
  }, [username, roomName]);

  // Eject the user from the room and return them to lobby, setting token to null
  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  return <div></div> 
};

export default VideoChat;