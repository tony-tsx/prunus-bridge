"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const api = axios_1.default.create({
    baseURL: 'http://localhost:8080',
    paramsSerializer: qs_1.default.stringify
});
exports.default = api;
