import express from "express";
import authRouter from "./authAdmin";
import planRouter from "./planAdmin";
import cors from "cors";

const app = express();
app.use(cors());
app.use('/auth', authRouter)
app.use('/plans', planRouter)

export default app;
