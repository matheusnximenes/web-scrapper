export const getUrl = ({ name, city = "london", province = "on" }) =>
  `https://www.canada411.ca/search/si/1/${encodeURIComponent(
    name
  )}/${encodeURIComponent(city)}${"+" + encodeURIComponent(province)}/`;
