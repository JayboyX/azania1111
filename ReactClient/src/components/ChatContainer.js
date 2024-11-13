const ChatContainer = ({ messages }) => (
    <div className="chat-container">
        {messages.map((msg, index) => (
            <div
                key={index}
                className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
            >
                {msg.text}
            </div>
        ))}
    </div>
);

export default ChatContainer;
