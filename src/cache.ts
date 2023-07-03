import fs from 'fs';
import path from 'path';
import util from 'util';


export default class Cache
{
	private static readonly readFile = util.promisify(fs.readFile);
	private static readonly writeFile = util.promisify(fs.writeFile);
	private static readonly mkdir = util.promisify(fs.mkdir);

	private static readonly path = path.join(process.cwd(), '.cache');

	private static async PrepareCachePath(): Promise<void>
	{
		await this.mkdir(this.path, { recursive: true });
	}


	public static async ReadFile(file: string): Promise<string>
	{
		await this.PrepareCachePath();

		const root = path.join(this.path, file);

		try {
			return await this.readFile(root, 'utf8');
		} catch (_) { }

		return '';
	}

	public static async WriteFile(file: string, data: string): Promise<void>
	{
		await this.PrepareCachePath();

		const root = path.join(this.path, file);

		try {
			await this.writeFile(root, data, 'utf8');
		} catch (_) { }
	}
}
