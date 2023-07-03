export default class Cache {
    private static readonly readFile;
    private static readonly writeFile;
    private static readonly mkdir;
    private static readonly path;
    private static PrepareCachePath;
    static ReadFile(file: string): Promise<string>;
    static WriteFile(file: string, data: string): Promise<void>;
}
