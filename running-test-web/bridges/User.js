"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_bridge_1 = __importDefault(require("../../dist/create-bridge"));
const calcAge = (from) => {
    if (!from)
        return NaN;
    const today = new Date();
    const age = today.getFullYear() - from.getFullYear();
    const methods = ['getMonth', 'getDate', 'getMonth', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds'];
    return methods.some((method, index, methods) => {
        const check = methods.slice(0, index).every(method => today[method]() === from[method]());
        return check && today[method]() < from[method]();
    }) ? age - 1 : age;
};
const User = create_bridge_1.default({
    target: () => Promise.resolve().then(() => __importStar(require('../entities/User'))).then(module => module.User),
    axios: () => Promise.resolve().then(() => __importStar(require('../services/api'))).then(module => module.default),
    uri: '/users',
    name: 'User',
    prototype: Object.defineProperties({}, {
        age: {
            get() {
                return calcAge(this.birthDate);
            },
            set: () => { },
            configurable: true,
            enumerable: true
        }
    })
});
exports.default = User;
