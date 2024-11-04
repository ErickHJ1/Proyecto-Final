// ChatMessage.js
import React from 'react';


const ChatMessage = ({ username, message, date }) => {
    return (
        <div className="chat-message">
            <div className="chat-header">
                <strong>{username}</strong>
                <span className="chat-date">{new Date(date).toLocaleString()}</span>
            </div>
            <p className="chat-text">{message}</p>
        </div>
    );
};

export default ChatMessage;
