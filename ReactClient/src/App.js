import React, { useState, useEffect } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import MessageInput from './components/MessageInput';
import { initSocket, sendMessage, receiveMessage, closeSocket } from './services/socketService';
import './App.css';

function App() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Greetings, I am Azania, passionately set to assist with any queries you might have about QCTO." },
    ]);

    useEffect(() => {
        initSocket();

        receiveMessage((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            closeSocket();
        };
    }, []);

    const handleSendMessage = (text) => {
        const message = { text, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, message]);
        sendMessage(message);
    };

    return (
        <div className="app">
            <ChatHeader />
            <ChatContainer messages={messages} />
            <MessageInput onSend={handleSendMessage} />
        </div>
    );
}

export default App;
