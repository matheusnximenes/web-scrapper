import * as fs from "fs";

const localScope = ["br", "pt"];

const handleCSVFilesData = (type) =>
  fs
    .readFileSync(`./files/names-${type}.csv`, "utf8")
    .split(";")
    .slice(0, -1)
    .map((n) => n.trim());

export const getCSVScope = () => {
  const uniqueNames = [
    ...new Set(
      [...localScope.map((s) => handleCSVFilesData(s))].flat(Infinity)
    ),
  ].sort();
  return uniqueNames;
};
