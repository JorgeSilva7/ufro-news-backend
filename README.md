## UFRO NEWS BACKEND

This project extract the news and events from UFRO webpage and save on a database

### Environments

- Need a .env` file on root folder or in system environment

| Name        | Description                 | Example                            |
| ----------- | --------------------------- | ---------------------------------- |
| MONGO_URI   | Mongo URI                   | mongodb://localhost:27017/ufro-web |
| PORT        | PORT for start the server   | 3002                               |
| CRON_CONFIG | cron schedule configuration | "*/2 * * * *"                      |

### Run locally

- `npm i`
- `npm run start`
