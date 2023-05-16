import 'dotenv/config';


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

console.log(process.env.NODE_ENV === 'production' ? `Running in production mode` : 'Running in development mode');
