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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_connection_1 = __importDefault(require("../src/helpers/get-connection"));
const User_1 = __importDefault(require("./bridges/User"));
get_connection_1.default()
    .then((conn) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.clear();
    // const repo = getRepository( UserEntity )
    const data = {
        firstName: 'Tony',
        lastName: 'Tea',
        email: 'tony.js@zoho.eu',
        birthDate: new Date()
    };
    const user = yield User_1.default(data).save();
    // const user = await repo.save( Object.assign( new UserEntity(), data ) )
    console.log(user);
    conn.close();
}));
