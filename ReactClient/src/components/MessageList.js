import React from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
    return (
        <div className="message-list">
            {messages.map((msg, index) => (
                <div key={index} className={`message-container ${msg.sender}`}>
                    <img
                        src={msg.sender === 'user' ? '/path/to/user-avatar.png' : '/path/to/bot-avatar.png'}
                        alt={`${msg.sender} avatar`}
                        className="avatar"
                    />
                    <div className="message-content">
                        <div className="message-bubble">
                            <p>{msg.text}</p>
                        </div>
                        <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
