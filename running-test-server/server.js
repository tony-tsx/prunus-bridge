"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const src_1 = __importDefault(require("../src"));
const User_1 = __importDefault(require("./bridges/User"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(src_1.default.router(User_1.default));
typeorm_1.createConnection(require('../ormconfig.json'))
    .then(() => {
    app.listen(8080, () => {
        console.log(`> dev server start at ${new Date().toLocaleString()}`);
        console.log('> dev server running in localhost:8080');
    });
});
