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
const __generator__1 = __importDefault(require("./__generator__"));
const hexColorRegex = /^#([0-9a-f]{6})$/i;
const data = new discord_js_1.SlashCommandSubcommandBuilder();
data.setName('random');
data.setDescription('Generate a random color and get information about it.');
data.setDescriptionLocalizations({
    'es-ES': 'Genera un color aleatorio y obtén información sobre él.'
});
const command = {
    data,
    async execute(interaction) {
        const colorValue = Math.floor(Math.random() * 0xFFFFFF);
        await interaction.reply((0, __generator__1.default)(colorValue));
    }
};
exports.default = command;
//# sourceMappingURL=random.js.map