import * as fs from "fs";
import { logger } from "./logger.js";
import { LANGUAGE, NOTE, STATUS } from "../constants.js";

const CSV_ROW_END = "\r\n";

export const writeCSVData = (name, data) => {
  const fileDirectory = `output/${name}.csv`;
  const header =
    "Address_ID;	Territory_ID;	Language;	Status;	Name;	Suite;	Address;	City;	Province;	Postal_code;	Country;	Latitude;	Longitude;	Telephone;	Notes;	Notes_private" +
    CSV_ROW_END;
  const fileContent = data
    .map(
      (m, index) =>
        ` ; ; ${LANGUAGE}; ${STATUS}; ${m.name}; ; ${m.address}; ${m.city}; ${m.province}; ${m.postalCode}; Canada; ; ; ${m.phone}; ${NOTE}; ; ${CSV_ROW_END}`
    )
    .join("");

  fs.writeFileSync(fileDirectory, header + fileContent);
  logger.info(`File available in ${fileDirectory}, with ${data.length} names.`);
};
