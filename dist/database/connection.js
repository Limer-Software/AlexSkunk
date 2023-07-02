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
const pg_1 = __importDefault(require("pg"));
class Database {
    /**
     * Database connection pool
     */
    pool;
    /**
     * Create a new database connection pool based on environment variables
     */
    constructor() {
        this.pool = new pg_1.default.Pool({
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            port: Number.parseInt(process.env.DB_PORT),
            user: process.env.DB_USER
        });
    }
    /**
     * Test the database connection
     */
    async testConnection() {
        try {
            await this.pool.query('SELECT NOW()');
            console.log('Connected to database');
        }
        catch (error) {
            console.error('Failed to connect to database');
            console.error(error);
            process.exit(1);
        }
    }
    /**
     * Get a client from the connection pool
     * @returns A client from the connection pool
     */
    async connect() {
        return this.pool.connect();
    }
}
exports.default = Database;
//# sourceMappingURL=connection.js.map