import express from "express";
import authRouter from "./authAdmin";
import cors from "cors";

const app = express();
app.use(cors());
app.use('/auth', authRouter)

export default app;