import { CITY, PROVINCE } from "../constants.js";

export const getUrl = ({ name }) => {
  return `https://www.canada411.ca/search/si/1/${encodeURIComponent(
    name
  )}/${encodeURIComponent(CITY)}${"+" + encodeURIComponent(PROVINCE)}/`;
};
