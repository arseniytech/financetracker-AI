import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'expense_secret_key';
export const PORT = Number(process.env.PORT) || 3000;
