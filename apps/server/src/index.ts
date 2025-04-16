import express from 'express';
import { PrismaClient } from './generated/prisma';

const PORT = process.env.PORT || 3001;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send({ users });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
