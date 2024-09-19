import http from "http";
import { initializeSocket } from "./framework/service/socketIO";
import app from "./framework/webServer/config/app";

const PORT = process.env.PORT || 3002;

const server = http.createServer(app);
initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
