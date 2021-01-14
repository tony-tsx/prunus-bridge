"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const User_1 = __importDefault(require("./bridges/User"));
Object.assign(window, { User: User_1.default });
const App = () => {
    react_1.default.useEffect(() => {
        User_1.default.find({
            where: {
                firstName: User_1.default.op.In(['Tony', 'Jô'])
            }
        }).then(console.log);
    }, []);
    return null;
};
const app = document.createElement('div');
app.setAttribute('id', 'app');
document.body.append(app);
react_dom_1.default.render(react_1.default.createElement(App, null), app);
