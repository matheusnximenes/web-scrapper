import puppeteer from "puppeteer";

import { writeCSVData } from "./utils/whiteFile.js";
import { getCSVScope } from "./utils/getScope.js";
import { pageContacts } from "./utils/pageContacts.js";
import { getUrl } from "./utils/getUrls.js";
import { logger } from "./utils/logger.js";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const names = getCSVScope();

  for (let name of names) {
    logger.info(`Looking for ${name} - ${getUrl({ name })}`);
    await page.goto(
      getUrl({ name }, { waitUntil: "networkidle2", timeout: 70000 })
    );

    let allContacts = [];

    //Loop to all pages until finish it
    do {
      try {
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
      } catch (e) {
        logger.error(`Name ${name} not found!!!!!`);
        break;
      }
    } while (true);

    logger.info(`Search ended with ${allContacts.length} contacts`);

    writeCSVData(name, allContacts);
  }
  logger.info(`Done`);
  await browser.close();
};

main();
