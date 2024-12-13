export const getUrl = ({ name }) => {
  const city = process.argv[3] ?? "london";
  const province = process.argv[4] ?? "om";
  return `https://www.canada411.ca/search/si/1/${encodeURIComponent(
    name
  )}/${encodeURIComponent(city)}${"+" + encodeURIComponent(province)}/`;
};
