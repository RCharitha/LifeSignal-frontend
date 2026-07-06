import { io } from 'socket.io-client';

let socket = null;

export const initializeSocket = (userId, latitude, longitude, fullName) => {
  socket = io('http://localhost:5000', {
    transports: ['websocket'],
    autoConnect: true
  });
  
  socket.on('connect', () => {
    console.log('✅ WebSocket connected');
    
    // Register user with their location
    socket.emit('register-user', {
      userId: userId,
      latitude: latitude,
      longitude: longitude,
      fullName: fullName
    });
  });
  
  socket.on('disconnect', () => {
    console.log('❌ WebSocket disconnected');
  });
  
  return socket;
};

export const updateSocketLocation = (latitude, longitude) => {
  if (socket) {
    socket.emit('update-location', { latitude, longitude });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default socket;