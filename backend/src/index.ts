import express from 'express';
import cors from 'cors';
import expensesRouter from './routes/expenses';
import authRouter from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/expenses', expensesRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('server running 3000');
});