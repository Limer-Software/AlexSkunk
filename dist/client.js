"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const client = new discord_js_1.default.Client({
    'partials': [
        discord_js_1.default.Partials.Channel,
        discord_js_1.default.Partials.GuildMember,
        discord_js_1.default.Partials.Message,
        discord_js_1.default.Partials.Reaction,
        discord_js_1.default.Partials.ThreadMember,
        discord_js_1.default.Partials.User
    ],
    'intents': discord_js_1.default.IntentsBitField.Flags.Guilds |
        discord_js_1.default.IntentsBitField.Flags.GuildMessages |
        discord_js_1.default.IntentsBitField.Flags.GuildMessageReactions |
        discord_js_1.default.IntentsBitField.Flags.DirectMessages |
        discord_js_1.default.IntentsBitField.Flags.DirectMessageReactions |
        discord_js_1.default.IntentsBitField.Flags.GuildMembers |
        discord_js_1.default.IntentsBitField.Flags.MessageContent
});
client.commands = new discord_js_1.default.Collection();
exports.default = client;
//# sourceMappingURL=client.js.map