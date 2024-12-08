"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkElasticsearchConnection = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
const client = new elasticsearch_1.Client({
    node: "http://localhost:9201",
    auth: {
        username: "elastic",
        password: "YN8Bj5DK_Ud6xMDSJpq9",
    },
    tls: {
        rejectUnauthorized: false // Only use this for self-signed certificates
    }
});
const checkElasticsearchConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield client.info();
        if (response.statusCode === 200) {
            console.log("Elasticsearch server is connected");
            return true;
        }
        else {
            console.log("Elasticsearch server is not reachable. Status Code:", response.statusCode);
            return false;
        }
    }
    catch (error) {
        console.error("Error connecting to Elasticsearch:", error.message);
        return false;
    }
});
exports.checkElasticsearchConnection = checkElasticsearchConnection;
exports.default = client;
