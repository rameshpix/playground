import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    const handleKeyPress = (event) => {
      if (event.key === 'L' || event.key === 'l') {
        console.log('L key pressed');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    socket.emit('send_message', message);
    setMessage('');
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>React Chat App</h2>
      <div style={{ border: '1px solid #ccc', height: 300, padding: 10, overflowY: 'scroll', marginBottom: 10 }}>
        {chat.map((msg, idx) => (
          <div key={idx} style={{ margin: '5px 0' }}>{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: '80%', padding: 8 }}
        />
        <button type="submit" style={{ width: '18%', padding: 8, marginLeft: 4 }}>Send</button>
      </form>
    </div>
  );
}

export default App;
