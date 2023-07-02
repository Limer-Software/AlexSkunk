"use strict";
/*
    Alex Skunk, a discord bot.
    Copyright (C) 2023 RobotoSkunk <contact@robotoskunk.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
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
        discord_js_1.default.IntentsBitField.Flags.DirectMessageReactions
});
client.commands = new discord_js_1.default.Collection();
exports.default = client;
//# sourceMappingURL=client.js.map