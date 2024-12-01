import puppeteer from "puppeteer";

import { writeCSVData } from "./utils/whiteFile.js";
import { getCSVScope } from "./utils/getScope.js";
import { pageContacts } from "./utils/pageContacts.js";
import { getUrl } from "./utils/getUrls.js";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const names = getCSVScope();

  for (let name of names) {
    console.log(`Looking for ${name} - ${getUrl({ name })}`);
    await page.goto(getUrl({ name }, { waitUntil: "domcontentloaded" }));

    let allContacts = [];

    //Loop to all pages until finish it
    do {
      const listings = await page.$(".c411Listing");
      if (!listings) {
        break;
      }
      //Code => Wait for the page to load and get the context
      const contacts = await pageContacts(page);

      //Mapping Page Contacts
      allContacts.push(...contacts);

      // Check NextButton
      const nextButton = await page.$(".pagingNext > a");
      if (nextButton) {
        await nextButton.click();
        await page.waitForNavigation({ waitUntil: "networkidle0" });
      } else {
        break;
      }
    } while (true);

    console.log(`Search ended with ${allContacts.length} contacts`);

    writeCSVData(name, allContacts);
  }

  await browser.close();
};

main();
// getCSVScope();
