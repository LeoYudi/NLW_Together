import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { routes } from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

//erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error)
    return res.status(400).json({ error: err.message });

  return res.status(500).json({ error: 'internal server error' });
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});