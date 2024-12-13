import * as fs from "fs";
import { logger } from "./logger.js";

const CSV_ROW_END = "\r\n";

export const writeCSVData = (name, data) => {
  const fileDirectory = `output/${name}.csv`;
  const header = "id, name, phone, postalCode, address" + CSV_ROW_END;
  const fileContent = data
    .map(
      (m, index) =>
        `${index}, ${m.name}, ${m.phone}, ${m.postalCode}, ${m.address} ${CSV_ROW_END}`
    )
    .join("");

  fs.writeFileSync(fileDirectory, header + fileContent);
  logger.info(`File available in ${fileDirectory}, with ${data.length} names.`);
};
