import express from 'express';
import 'dotenv/config';

import './db';
import authRouter from '#/routers/auth';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use('/auth', authRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
