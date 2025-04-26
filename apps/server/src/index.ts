import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth';
import userRouter from './routes/user';
import sitesRouter from './routes/sites';
import documentRouter from './routes/documents';
import generatorRouter from './routes/generator';
import dashboardRouter from './routes/dashboard';
import publicRouter from './routes/public';
import plansRouter from './routes/plans';
import stripeRouter from './routes/stripe';
import webhookRouter from './routes/webhook';
import invoicesRouter from './routes/invoices';
import subscriptionRouter from './routes/subscription';
import resetPasswordRouter from './routes/passwordReset';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use('/', webhookRouter)

app.use(express.json());
app.use('/auth', authRouter);
app.use('/auth', resetPasswordRouter);
app.use('/user', userRouter);
app.use('/user/subscription', subscriptionRouter)
app.use('/user/invoices', invoicesRouter)
app.use('/sites', sitesRouter);
app.use('/docs', documentRouter);
app.use('/docs/generate', generatorRouter);
app.use('/dashboard', dashboardRouter);
app.use('/public', publicRouter);
app.use('/plans', plansRouter)
app.use('/plans', stripeRouter)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
