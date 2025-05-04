import express from "express";
import authRouter from "./authAdmin";
import planRouter from "./planAdmin";
import userRouter from "./userAdmin";
import cors from "cors";

const app = express();
app.use(cors());
app.use('/auth', authRouter)
app.use('/plans', planRouter)
app.use('/users', userRouter)

export default app;
