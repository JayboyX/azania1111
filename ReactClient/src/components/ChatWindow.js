import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader'; // Import ChatHeader
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { initSocket, sendMessage, receiveMessage, closeSocket } from '../services/socketService';
import './ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        initSocket();

        const handleMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        receiveMessage(handleMessage);

        return () => {
            closeSocket();
        };
    }, []);

    const handleSendMessage = (text) => {
        const message = { text, sender: 'user', timestamp: new Date() };
        setMessages((prevMessages) => [...prevMessages, message]);
        sendMessage(message);
    };

    return (
        <div className="chat-window">
            <ChatHeader name="Azania Bot" status="Online" /> {/* ChatHeader at the top */}
            <MessageList messages={messages} />
            <MessageInput onSend={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
