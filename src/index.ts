import 'source-map-support/register';
import './env';

import client from './client';


(async () => {


	await client.login(process.env.TOKEN);
})();
