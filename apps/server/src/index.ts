import express from 'express';
import authRouter from './routes/auth';
import userRouter from './routes/user';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
