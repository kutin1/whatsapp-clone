import React, { useState } from 'react';
import Login from './components/Login';
import ChatWindow from './components/ChatWindow';
import ChatList from './components/ChatList';
import './App.css';

function App() {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const handleLogin = (id, token) => {
    setIdInstance(id);
    setApiTokenInstance(token);
  };

  const handlePhoneNumber = (number) => {
    setPhoneNumber(number);
  };

  const handleSelectChat = (chatId) => {
    setPhoneNumber(chatId.replace('@c.us', ''));
    setSelectedChat(chatId);
  };

  if (!idInstance || !apiTokenInstance) {
    return (
      <div className="App">
        <h1>WhatsApp Clone</h1>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>WhatsApp Clone</h1>
      <div className="container">
        <div className="chat-list">
          <ChatList idInstance={idInstance} apiTokenInstance={apiTokenInstance} onSelectChat={handleSelectChat} />
        </div>
        <div className="chat-window">
          {selectedChat && (
            <ChatWindow 
              idInstance={idInstance} 
              apiTokenInstance={apiTokenInstance} 
              phoneNumber={phoneNumber} 
              onPhoneNumberChange={handlePhoneNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
