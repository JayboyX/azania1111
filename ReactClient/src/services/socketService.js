import { io } from 'socket.io-client';

let socket;

export const initSocket = () => {
    const serverURL = process.env.REACT_APP_SOCKET_SERVER_URL || 'https://nodeserverazania.onrender.com';
    socket = io(serverURL, {
        transports: ['websocket'],
        withCredentials: true,
    });
};

export const sendMessage = (message) => {
    if (socket) socket.emit('chat message', message);
};

export const receiveMessage = (callback) => {
    if (socket) socket.on('chat message', callback);
};

export const closeSocket = () => {
    if (socket) socket.disconnect();
};
