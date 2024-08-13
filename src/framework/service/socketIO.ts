import { allowedOrigins } from '../webServer/config/app'
import { Server, Socket } from "socket.io";
import http from 'http'

export const initializeSocket = (server : http.Server) => {
  const socketIo = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  
  socketIo.on("connection", (socket : Socket) => {
    console.log("server is connected in with socket");
    
  });

  return socketIo
}

