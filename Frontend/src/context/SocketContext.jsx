
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
      return () => { socket.disconnect(); };


    }, []);

// const sendMesage=(eventName,message)=>{
//     socket.emit(eventName,message)
// }
// const reciveMessage=(eventName,callback)=>{
//     socket.on(eventName,callback)
// }

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;