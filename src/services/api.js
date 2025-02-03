import axios from 'axios';

const BASE_URL = 'https://api.green-api.com/waInstance';

export const receiveMessages = async (idInstance, apiTokenInstance) => {
  const url = `${BASE_URL}${idInstance}/ReceiveNotification/${apiTokenInstance}`;
  try {
    const response = await axios.get(url);
    console.log('receiveMessages response:', response.data); // Добавлено для отладки
    return response.data;
  } catch (error) {
    console.error('Error receiving messages:', error);
    throw error;
  }
};

export const deleteNotification = async (idInstance, apiTokenInstance, receiptId) => {
  const url = `${BASE_URL}${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

export const getChatHistory = async (idInstance, apiTokenInstance, chatId) => {
  const url = `${BASE_URL}${idInstance}/GetChatHistory/${apiTokenInstance}`;
  const data = {
    chatId,
    count: 100
  };
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting chat history:', error);
    throw error;
  }
};

export const sendMessage = async (idInstance, apiTokenInstance, phoneNumber, message) => {
  const url = `${BASE_URL}${idInstance}/SendMessage/${apiTokenInstance}`;
  const data = {
    chatId: `${phoneNumber}@c.us`,
    message
  };
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getChats = async (idInstance, apiTokenInstance) => {
  const url = `${BASE_URL}${idInstance}/GetChats/${apiTokenInstance}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error getting chats:', error);
    throw error;
  }
};
