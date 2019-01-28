import app from './server';
import logger from './helpers/logger';

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  logger.info(`App running on port ${PORT}...`);
});
