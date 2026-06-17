import express from 'express';
import cors from 'cors';
import expensesRouter from './routes/expenses';
import authRouter from './routes/auth';
import chatRouter from './routes/chat';
import { PORT } from './config';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/expenses', expensesRouter);
app.use('/auth', authRouter);
app.use('/chat', chatRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});