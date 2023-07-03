"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
class Cache {
    static readFile = util_1.default.promisify(fs_1.default.readFile);
    static writeFile = util_1.default.promisify(fs_1.default.writeFile);
    static mkdir = util_1.default.promisify(fs_1.default.mkdir);
    static path = path_1.default.join(process.cwd(), '.cache');
    static async PrepareCachePath() {
        await this.mkdir(this.path, { recursive: true });
    }
    static async ReadFile(file) {
        await this.PrepareCachePath();
        const root = path_1.default.join(this.path, file);
        try {
            return await this.readFile(root, 'utf8');
        }
        catch (_) { }
        return '';
    }
    static async WriteFile(file, data) {
        await this.PrepareCachePath();
        const root = path_1.default.join(this.path, file);
        try {
            await this.writeFile(root, data, 'utf8');
        }
        catch (_) { }
    }
}
exports.default = Cache;
//# sourceMappingURL=cache.js.map