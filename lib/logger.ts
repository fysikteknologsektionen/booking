import { createLogger, format, transports } from "winston";

/**
 * Default backend logger.
 */
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/activity.log", level: "info" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
