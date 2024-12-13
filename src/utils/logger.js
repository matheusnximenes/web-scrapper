import { createLogger, format, transports } from "winston";

// Define custom log levels (optional)
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
  },
};

// Create the logger
export const logger = createLogger({
  levels: customLevels.levels,
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.colorize(), // Makes output colorful in console
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} - ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: "error.log", level: "error" }), // Log errors to a file
    new transports.File({
      filename: `app.log`,
    }), // Log all levels to a file
  ],
});
