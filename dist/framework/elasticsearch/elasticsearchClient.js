"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = client;
