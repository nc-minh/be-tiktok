import fs from 'fs';
import path from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { createLogger, format } = winston;
const { combine, colorize, printf } = format;

// logs dir
const logDir: string = path.join(__dirname, '/logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log format
const logFormat = printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const developmentFormat = () => {
  return combine(colorize(), logFormat);
};

const productionFormat = () => {
  const replaceError = ({ label, level, message, stack }: any) => ({
    label,
    level,
    message,
    stack,
  });

  const replacer = (key: string, value: any) => (value instanceof Error ? replaceError(value) : value);

  return combine(format.json({ replacer }));
};

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = createLogger({
  format: combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    process.env.NODE_ENV === 'production' ? productionFormat() : developmentFormat()
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(new winston.transports.Console());

export { logger };
