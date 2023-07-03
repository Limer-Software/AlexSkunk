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
const emoji_1 = __importDefault(require("./analysis/emoji"));
const commands = [
    emoji_1.default
];
// Load commands
const discord_js_1 = require("discord.js");
const crypto_1 = __importDefault(require("crypto"));
const cache_1 = __importDefault(require("../cache"));
const client_1 = __importDefault(require("../client"));
const hashStream = crypto_1.default.createHash('sha256');
for (const command of commands) {
    client_1.default.commands.set(command.data.name, command);
    hashStream.update(JSON.stringify(command.data.toJSON()));
}
(async () => {
    // Check if commands have changed
    const hash = hashStream.digest('hex');
    try {
        const oldHash = await cache_1.default.ReadFile('commandsHash');
        if (oldHash === hash) {
            return;
        }
        await cache_1.default.WriteFile('commandsHash', hash);
    }
    catch (error) {
        console.error(error);
        return;
    }
    // Publish commands
    const rest = new discord_js_1.REST().setToken(process.env.TOKEN);
    const commands = client_1.default.commands.map(command => command.data.toJSON());
    await rest.put(discord_js_1.Routes.applicationCommands(process.env.APP_ID), { body: commands });
    console.log('Successfully registered application commands.');
})();
//# sourceMappingURL=index.js.map