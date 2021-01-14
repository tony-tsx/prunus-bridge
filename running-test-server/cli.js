"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const dist_1 = __importDefault(require("../dist"));
const User_1 = __importDefault(require("./bridges/User"));
commander_1.default.addCommand(dist_1.default.command(User_1.default).alias('user'));
commander_1.default.parse(process.argv);
