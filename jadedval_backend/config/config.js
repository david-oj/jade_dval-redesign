// config.js
import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const SALT = process.env.SALT;
