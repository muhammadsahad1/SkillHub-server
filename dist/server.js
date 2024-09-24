"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./framework/webServer/config/app"));
const socketIO_1 = __importDefault(require("./framework/service/socketIO"));
const PORT = process.env.PORT || 3002;
const server = http_1.default.createServer(app_1.default);
(0, socketIO_1.default)(server);
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
