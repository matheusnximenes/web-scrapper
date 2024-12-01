import puppeteer from "puppeteer";
import * as fs from "fs";

export const getUrl = ({
  name,
  city = "london",
  province = "ontario",
}: {
  name: string;
  city?: string;
  province?: string;
}) =>
  `https://www.canada411.ca/search/si/1/${encodeURIComponent(
    name
  )}/${encodeURIComponent(city)}+${encodeURIComponent(province)}/`;

let csvRowEnd = "\r\n";

export const pageContacts = async (page) => {
  return await page.evaluate(() => {
    const rawContacts: NodeListOf<Element> =
      document.querySelectorAll(".c411Listing");
    return Array.from(rawContacts).map((contact) => {
      const name = (
        contact.querySelector(".c411ListedName") as HTMLAnchorElement
      ).innerText;
      const phone = contact.querySelector(".c411Phone").innerHTML;
      const addressField = contact.querySelector(".adr").innerHTML.split(" ");
      const address = addressField.slice(0, -2).join(" ");
      const postalCode = addressField.reverse().slice(0, 2).join(" ");
      return {
        name: name ?? "",
        phone: phone ?? "",
        address: address ?? "",
        postalCode: postalCode ?? "",
      };
    });
  });
};

const getCSVScope = () =>
  fs.readFileSync("scope.csv", "utf8").split(";").slice(0, -1);

const writeCSVData = (name, data) => {
  const header = "id, name, phone, postalCode, address" + csvRowEnd;
  const fileContent = data
    .map(
      (m, index) =>
        `${index}, ${m.name}, ${m.phone}, ${m.postalCode}, ${m.address} ${csvRowEnd}`
    )
    .join("");
  fs.writeFileSync(`${name}.csv`, header + fileContent);
};

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const scope = getCSVScope();

  console.log("Get scope");
  await scope.forEach(async (name: string) => {
    // const name = "santos";
    console.log("Name", name);
    await page.goto(getUrl({ name }));
    console.log("goto");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    let allContacts = [];

    //Loop to all pages until finish it
    do {
      console.log("getContacts");
      //Code => Wait for the page to load and get the context
      const contacts = await pageContacts(page);

      //Mapping Page Contacts
      allContacts.push(...contacts);

      // Check NextButton
      const nextButton = await page.$(".pagingNext > a");
      if (nextButton) {
        console.log("Next");
        await nextButton.click();
        await page.waitForNavigation({ waitUntil: "networkidle0" });
      } else {
        console.log("Stop!!!!");
        break;
      }
    } while (true);

    console.log("create file");
    writeCSVData(name, allContacts);
  });

  await browser.close();
};


main();
