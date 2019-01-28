import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import logger from './helpers/logger';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`app started at port ${port}..`);
});
