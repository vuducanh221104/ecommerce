import styles from './ChatAdmin.module.scss';
import classNames from 'classnames/bind';

import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
const host = 'http://localhost:4000';

const cx = classNames.bind(styles);
function ChatAdmin({ role = 'admin' }) {
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [activeRooms, setActiveRooms] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient.connect(host);

        // Join on room when component mouted
        socketRef.current.emit('joinRoom', room);

        // When get history to server
        socketRef.current.on('chat-history', (chatHistory) => {
            setMessages(chatHistory);
        });

        // Listen  message to server
        socketRef.current.on('message', (message) => {
            const messageData = message.content;
            const messageRole = message.role;
            const data = {
                content: messageData,
                role: messageRole,
            };
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        // Fetch the list of active rooms when the component mounts
        axios
            .get('http://localhost:4000/activeRooms')
            .then((response) => {
                setActiveRooms(response.data.rooms);
                if (response.data.rooms.length === 0) {
                    setMessages([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching active rooms:', error);
            });

        //When called will delete all room chat has alive
        // axios.delete('http://localhost:4000/deleteAllRooms');

        return () => {
            // Rời khỏi phòng khi component bị unmount
            socketRef.current.emit('leaveRoom', room);
        };
    }, [room, activeRooms]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            // Send  message to server
            socketRef.current.emit('message', { room, message, role });
            setMessage('');
        }
    };

    const handleClickRoom = (item) => {
        setRoom(item);
    };

    // Function to parse messages and replace links with anchor tags
    const parseMessages = (msg) => {
        const parts = msg.split(/\b(https?:\/\/[^\s]+)\b/);
        return parts.map((part, index) =>
            part.match(/^https?:\/\/[^\s]+$/) ? (
                <a key={index} href={part} target="_blank" rel="noopener noreferrer" className={cx('text-link')}>
                    {part}
                </a>
            ) : (
                part
            ),
        );
    };

    return (
        <div>
            {activeRooms.map((item, index) => (
                <h1 onClick={() => handleClickRoom(item)}>Chat Room: {item}</h1>
            ))}
            <div>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.role === 'user' ? 'black-text' : 'red-text'}>
                            {parseMessages(msg.content)}
                        </div>
                    ))}
                </div>
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatAdmin;
