import puppeteer from "puppeteer";

import { writeCSVData } from "./utils/whiteFile.js";
import { getCSVScope } from "./utils/getScope.js";
import { pageContacts } from "./utils/pageContacts.js";
import { getUrl } from "./utils/getUrls.js";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const names = getCSVScope();
  // const name = "gaspar";

  for (let name of names) {
    //TODO create a log folder with log files
    console.log(`Looking for ${name} - ${getUrl({ name })}`);
    await page.goto(
      getUrl({ name }, { waitUntil: "networkidle2", timeout: 70000 })
    );

    let allContacts = [];

    //TODO Still breaking asking to "ProtocolError: Network.enable timed out. Increase the 'protocolTimeout' setting in launch/connect calls for a higher timeout if needed."
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
        console.log(`Name ${name} not found!!!!!`);
        break;
      }
    } while (true);

    console.log(`Search ended with ${allContacts.length} contacts`);

    writeCSVData(name, allContacts);
  }

  await browser.close();
};

main();
