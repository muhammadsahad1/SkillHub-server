import http from "http";
import { app } from "./framework/webServer/config/app";
import { initializeSocket } from "./framework/service/socketIO";
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
initializeSocket(server);
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
