import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth';
import userRouter from './routes/user';
import sitesRouter from './routes/sites';
import documentRouter from './routes/documents';
import generatorRouter from './routes/generator';
import dashboardRouter from './routes/dashboard';
import publicRouter from './routes/public';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/sites', sitesRouter);
app.use('/docs', documentRouter);
app.use('/docs/generate', generatorRouter);
app.use('/dashboard', dashboardRouter);
app.get('/public', publicRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
