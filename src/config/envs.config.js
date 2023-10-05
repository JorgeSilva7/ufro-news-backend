import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const CRON_CONFIG = process.env.CRON_CONFIG;

export default { MONGO_URI, PORT, CRON_CONFIG };
