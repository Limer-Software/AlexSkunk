# Setting up the environment
You're interested on contributing to this project? That's great! But, before you
start, you need to set up your environment. This guide will help you set up your
environment so you can start contributing to this project.

## Requirements
- Node.js 18.15.0 or higher
- PostgreSQL 14.0 or higher
- TypeScript 5.0.2 or higher
- Nginx (or any other reverse proxy, this is optional)
- PM2 (or any other process manager)

I suggest you use Linux (Debian) to run this bot, but you can use any other
operating system that supports Node.js and PostgreSQL.

If you're using Windows, you can use WSL2 to run this bot or install all
the requirements manually.

## Clone the repository
```bash
$ git clone https://github.com/RobotoSkunk/AlexSkunk.git
$ cd AlexSkunk
```

## Configure the environment variables
```bash
$ cp .env.example .env
$ nano .env
```

# URL rewrite
If you're using Nginx, you need to set up a URL rewrite.

```nginx
location / {
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header Host $host;
	proxy_pass http://127.0.0.1:8080;
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection "upgrade";
}
```

If you use any other reverse proxy, you need to set up it yourself.

# Finish the setup
```bash
$ npm run setup
```

# Start the bot
```bash
$ npm run debug
```

Or

```bash
$ nodemon
```
