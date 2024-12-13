import * as fs from "fs";
import { normalizeText } from "normalize-text";
import { logger } from "./logger.js";

const fileFolder = "./input/";

const handleCSVFilesData = (fileName) =>
  fs
    .readFileSync(`${fileFolder}/${fileName}`, "utf8")
    .split(";")
    .slice(0, -1)
    .map((n) => normalizeText(n).trim());

const deleteLogsFiles = () => {
  fs.unlink("./error.log", (err) => {
    console.log("Could not delete error.log file");
  });

  fs.unlink("./app.log", (err) => {
    console.log("Could not remove app.log file");
  });
};

export const getCSVScope = () => {
  // deleteLogsFiles();

  const filesToRead = fs
    .readdirSync(fileFolder)
    .filter((f) => f.includes(".csv"));

  const uniqueNames = [
    ...new Set(
      [...filesToRead.map((s) => handleCSVFilesData(s))].flat(Infinity)
    ),
  ].sort();

  logger.info(`Unique names ${uniqueNames.length}`);

  return uniqueNames;
};
