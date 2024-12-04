import mysql from 'mysql2/promise.js';
import 'dotenv/config.js'

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	port: process.env.DB_PORT,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
})

export default db;