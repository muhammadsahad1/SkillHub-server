import { Server } from "socket.io";
import http from "http";
declare const initializeSocket: (server: http.Server) => Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
export default initializeSocket;
