import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const { NODE_ENV } = process.env;

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  if (NODE_ENV === 'production') {
    res.status(404).send('Not found');
  }
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

export default app;
