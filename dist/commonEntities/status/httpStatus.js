"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpStatus;
(function (httpStatus) {
    httpStatus[httpStatus["OK"] = 200] = "OK";
    httpStatus[httpStatus["CREATED"] = 201] = "CREATED";
    httpStatus[httpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    httpStatus[httpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    httpStatus[httpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    httpStatus[httpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    httpStatus[httpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    httpStatus[httpStatus["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    httpStatus[httpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
})(httpStatus || (httpStatus = {}));
exports.default = httpStatus;
