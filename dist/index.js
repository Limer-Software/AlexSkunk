"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
require("./env");
const client_1 = __importDefault(require("./client"));
(async () => {
    await client_1.default.login(process.env.TOKEN);
})();
//# sourceMappingURL=index.js.map