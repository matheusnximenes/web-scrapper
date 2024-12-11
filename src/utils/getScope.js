import * as fs from "fs";
import { normalizeText } from "normalize-text";

//todo Remove this Make it mode generic
const localScope = ["ao"];

const handleCSVFilesData = (type) =>
  fs
    .readFileSync(`./files/names-${type}.csv`, "utf8")
    .split(";")
    .slice(0, -1)
    .map((n) => normalizeText(n).trim());

export const getCSVScope = () => {
  const uniqueNames = [
    ...new Set(
      [...localScope.map((s) => handleCSVFilesData(s))].flat(Infinity)
    ),
  ].sort();
  console.log(uniqueNames);
  return uniqueNames;
};
