import express from "express";
import authRouter from "./authAdmin";

const app = express();

app.use('/auth', authRouter)

export default app;