import http from "http";

import app from "./framework/webServer/config/app.ts";
import initializeSocket from "./framework/service/socketIO.ts";

const PORT = process.env.PORT || 3002;

const server = http.createServer(app);
initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
