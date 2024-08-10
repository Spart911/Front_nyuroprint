import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './SupportChat.css';
import send_logo from '../img/send_logo.svg';
import mas_svg from '../img/message-logo.svg';
import manager_svg from '../img/manager-logo.svg';
import person_svg from '../img/person-logo.svg';

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [lastUpdateId, setLastUpdateId] = useState(null);
  const [userId, setUserId] = useState(null);
  const chatLogsRef = useRef(null);
  const processedMessagesRef = useRef(new Set());
  const botToken = '7421433140:AAEydhYMTmYvUZ9CqowaEADFXW17vewlT_k';
  const chatId = '7027915437';

  useEffect(() => {
    const storedUserId = localStorage.getItem('supportChatUserId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('supportChatUserId', newUserId);
      setUserId(newUserId);
    }

    const storedMessages = localStorage.getItem('supportChatMessages');
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages);
      setMessages(parsedMessages);
      parsedMessages.forEach(msg => processedMessagesRef.current.add(msg.id));
    }

    const storedLastUpdateId = localStorage.getItem('lastUpdateId');
    if (storedLastUpdateId) {
      setLastUpdateId(parseInt(storedLastUpdateId));
    }
  }, []);

  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('supportChatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (lastUpdateId) {
      localStorage.setItem('lastUpdateId', lastUpdateId.toString());
    }
  }, [lastUpdateId]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const addMessage = useCallback((newMessage) => {
    if (!processedMessagesRef.current.has(newMessage.id)) {
      processedMessagesRef.current.add(newMessage.id);
      setMessages(prevMessages => {
        if (!prevMessages.some(msg => msg.id === newMessage.id)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newMessage = generateMessage(inputMessage, 'self');
    addMessage(newMessage);
    setInputMessage('');

    try {
      await sendMessageToTelegram(inputMessage);
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
    }
  };

  const sendMessageToTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
      await axios.post(url, {
        chat_id: chatId,
        text: `${userId}: ${message}`,
      });
    } catch (error) {
      console.error('Error sending message to Telegram:', error.response ? error.response.data : error.message);
    }
  };

  const receiveMessageFromTelegram = useCallback(async () => {
    const url = `https://api.telegram.org/bot${botToken}/getUpdates`;
    try {
      const response = await axios.get(url, {
        params: {
          offset: lastUpdateId ? lastUpdateId + 1 : undefined,
          timeout: 30,
        },
      });
      const updates = response.data.result;

      if (updates.length > 0) {
        const newMessages = updates.reduce((acc, update) => {
          const messageText = update.message?.text;
          const messageId = update.message?.message_id;
          const messageParts = messageText?.split(': ');
          const senderId = messageParts?.[0];
          const messageContent = messageParts?.slice(1).join(': ');

          if (messageContent && senderId === userId && !processedMessagesRef.current.has(messageId)) {
            const newMessage = {
              id: messageId,
              text: messageContent,
              type: 'user'
            };
            acc.push(newMessage);
          }
          return acc;
        }, []);

        newMessages.forEach(addMessage);

        if (updates.length > 0) {
          setLastUpdateId(updates[updates.length - 1].update_id);
        }
      }
    } catch (error) {
      console.error('Error receiving messages from Telegram:', error.response ? error.response.data : error.message);
    }
  }, [lastUpdateId, userId, addMessage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      receiveMessageFromTelegram();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [receiveMessageFromTelegram]);

  const generateMessage = (msg, type) => {
    return {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: msg,
      type: type
    };
  };

  return (
    <div id="body">
      {!isOpen && (
        <div id="chat-circle" className="btn btn-raised" onClick={toggleChat}>
          <img src={mas_svg} alt="Логотип сообщения" />
          <i className="material-icons"></i>
        </div>
      )}
      
      {isOpen && (
        <div className="chat-box">
          <div className="chat-box-header">
            Поддержка
            <span className="chat-box-toggle" onClick={toggleChat}>
              <div className="material-icons">x</div>
            </span>
          </div>
          <div className="chat-box-body">
            <div className="chat-box-overlay"></div>
            <div className="chat-logs" ref={chatLogsRef}>
              <p>Отправляя сообщение Вы даёте свое согласие на <a href="/consent" target="_blank" rel="noopener noreferrer">обработку персональных данных</a>.</p>
              {messages.map((message) => (
                <div key={message.id} className={`chat-msg ${message.type}`}>
                  <span className="msg-avatar">
                    <img src={message.type === 'self' ? person_svg : manager_svg} alt="avatar" />
                  </span>
                  <div className="cm-msg-text">{message.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chat-input">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="chat-input"
                placeholder="Отправить сообщение..."
                value={inputMessage}
                onChange={handleInputChange}
              />
              <button type="submit" className="chat-submit" id="chat-submit">
                <div className="material-icons">
                  <img src={send_logo} alt="Логотип отправки сообщения" />
                </div>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
