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
const discord_js_1 = require("discord.js");
const discord_js_2 = __importDefault(require("discord.js"));
const random_1 = __importDefault(require("./random"));
const pick_1 = __importDefault(require("./pick"));
const hexColorRegex = /^#([0-9a-f]{6})$/i;
const data = new discord_js_1.SlashCommandBuilder();
data.setName('color');
data.setDescription('Get information about a color or generate a random one.');
data.setDescriptionLocalizations({
    'es-ES': 'Obtén información sobre un color o genera uno aleatorio.'
});
data.addSubcommand(random_1.default.data);
data.addSubcommand(pick_1.default.data);
data.setDMPermission(true);
const subCommands = new discord_js_2.default.Collection();
subCommands.set(random_1.default.data.name, random_1.default);
subCommands.set(pick_1.default.data.name, pick_1.default);
const command = {
    data,
    async execute(interaction) {
        const subcommandName = interaction.options.getSubcommand();
        const subcommand = subCommands.get(subcommandName);
        if (!subcommand) {
            return;
        }
        await subcommand.execute(interaction);
    }
};
exports.default = command;
//# sourceMappingURL=index.js.map