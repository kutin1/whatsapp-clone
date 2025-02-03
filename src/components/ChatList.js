import React, { useState, useEffect } from 'react';
import { getChats } from '../services/api';

const ChatList = ({ idInstance, apiTokenInstance, onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChats(idInstance, apiTokenInstance);
        console.log('Received chats data:', response); // Отладочная информация
        if (response) {
          setChats(response);
        } else {
          console.error('No data received');
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error('Too many requests: Please slow down your requests.');
        } else {
          console.error('Error getting chats:', error);
        }
      }
    };

    fetchChats(); // Вызов сразу после рендера
    const id = setInterval(fetchChats, 60000); // Увеличение интервала до 60 секунд
    return () => clearInterval(id);
  }, [idInstance, apiTokenInstance]);

  const handleCreateChat = () => {
    onSelectChat(`${phoneNumber}@c.us`);
    setPhoneNumber('');
  };

  return (
    <div>
      <h2>Chats</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleCreateChat}>Create Chat</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {chats.map((chat, index) => (
          <li key={index} onClick={() => onSelectChat(chat.id)} style={{ padding: '10px', borderBottom: '1px solid #ccc', cursor: 'pointer' }}>
            <div>
              <strong>{chat.name}</strong>
              <p>{chat.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
