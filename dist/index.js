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
require("source-map-support/register");
require("./env");
const client_1 = __importDefault(require("./client"));
const connection_1 = __importDefault(require("./database/connection"));
(async () => {
    client_1.default.database = new connection_1.default();
    await client_1.default.database.testConnection();
    await client_1.default.login(process.env.TOKEN);
})();
//# sourceMappingURL=index.js.map