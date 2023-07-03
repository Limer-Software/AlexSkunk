"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
client_1.default.on('messageCreate', async (message) => {
    if (message.author.bot) {
        return;
    }
    await message.reply('Mrrrrr!');
});
// Null export to keep the TS module system happy
exports.default = null;
//# sourceMappingURL=messageCreate.js.map