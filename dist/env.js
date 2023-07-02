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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const wanted = [
    'TOKEN',
    'APP_ID',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'DOMAIN',
    'SHA_SALT'
];
const missing = wanted.filter((key) => !process.env[key]);
if (missing.length > 0) {
    console.error(`Missing environment variables: ${missing.join(', ')}`);
    process.exit(1);
}
if (Number.isNaN(Number.parseInt(process.env.DB_PORT))) {
    console.error(`DB_PORT is not a number`);
    process.exit(1);
}
if (process.env.PORT && Number.isNaN(Number.parseInt(process.env.PORT))) {
    console.error(`PORT is not a number`);
    process.exit(1);
}
console.log(process.env.NODE_ENV === 'production' ? `Running in production mode` : 'Running in development mode');
//# sourceMappingURL=env.js.map