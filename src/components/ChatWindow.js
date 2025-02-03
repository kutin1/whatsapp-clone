import React, { useState, useEffect } from 'react';
import { sendMessage, getChatHistory} from '../services/api';

const ChatWindow = ({ idInstance, apiTokenInstance, phoneNumber, onPhoneNumberChange }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getChatHistory(idInstance, apiTokenInstance, `${phoneNumber}@c.us`);
        console.log('Received chat history:', response); // Отладочная информация

        if (response) {
          const newMessages = response.map((msg) => {
            const isIncoming = msg.sender !== `${phoneNumber}@c.us`;
            return {
              chatId: msg.chatId || 'unknown',
              message: msg.textMessageData?.textMessage || 'Unsupported message type',
              isIncoming
            };
          });

          console.log('New messages:', newMessages); // Отладочная информация
          setMessages(newMessages);
        } else {
          console.error('No data received');
        }
      } catch (error) {
        console.error('Error receiving chat history:', error);
      }
    };

    fetchMessages(); // Вызов сразу после рендера
  }, [idInstance, apiTokenInstance, phoneNumber]);

  const handleSend = () => {
    sendMessage(idInstance, apiTokenInstance, phoneNumber, newMessage).then(() => {
      setMessages((prevMessages) => [...prevMessages, { chatId: `${phoneNumber}@c.us`, message: newMessage, isIncoming: false }]);
      setNewMessage('');
    }).catch(error => {
      console.error('Error sending message:', error);
    });
  };

  return (
    <div className="chat-window">
      <label htmlFor="phoneNumber">Phone Number:</label>
      <input 
        id="phoneNumber"
        type="text" 
        placeholder="Phone Number" 
        value={phoneNumber} 
        onChange={(e) => onPhoneNumberChange(e.target.value)} 
      />
      <label htmlFor="newMessage">Message:</label>
      <input 
        id="newMessage"
        type="text" 
        placeholder="Message" 
        value={newMessage} 
        onChange={(e) => setNewMessage(e.target.value)} 
      />
      <button onClick={handleSend}>Send</button>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isIncoming ? 'incoming' : 'outgoing'}`}>
            <strong>{msg.chatId}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
