import client from "../client";


client.on('messageCreate', async message =>
{
	if (message.author.bot) {
		return;
	}

	await message.reply('Mrrrrr!');
});


// Null export to keep the TS module system happy
export default null;
