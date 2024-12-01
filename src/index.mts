import puppeteer from "puppeteer";

const getUrl = (name) =>
  `https://www.canada411.ca/search/si/1/${name}/london+ontario/`;

const getContacts = (contact) => {
  const name = contact.querySelector(".c411ListedName").innerText;
  const phone = contact.querySelector(".c411Phone").innerText;
  const address = contact.querySelector(".adr").innerText;
  return {
    name: name ?? "",
    phone: phone ?? "",
    address: address ?? "",
  };
};

const contactFromPage = async (page) => {
  
  return await page.evaluate(() => {
    
    const rawContacts: NodeListOf<Element> = document.querySelectorAll(".c411Listing");
    return Array.from(rawContacts).map((contact) => {
      const name = (contact.querySelector(".c411ListedName") as HTMLAnchorElement).innerText;
      const phone = contact.querySelector(".c411Phone").innerHTML;
      const addressField = contact.querySelector(".adr").innerHTML.split(" ")
      const address = addressField.slice(0, -2).join(" ");
      const postalCode = addressField.reverse().slice(0,2).join(" ")
      return {
        name: name ?? "",
        phone: phone ?? "",
        address: address ?? "",
        postalCode: postalCode ?? ""
      };
    });
  });
  
};

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(getUrl("santos"));

  let allContacts = [];

  do {
    
    //Code => Wait for the page to load and get the context
    const pageContacts = await contactFromPage(page);

    //Mapping Page Contacts
    //allContacts = [allContacts, ...newContacts];
    allContacts.push(...pageContacts);

    const nextButton = await page.$(".pagingNext > a")
    if(nextButton) {
      console.log("Next")
      await nextButton.click()
      await page.waitForNavigation({ waitUntil: "networkidle0"})
    } else {
      console.log("Stop!!!!")
      break;
    }

  } while (true);

  console.log(allContacts.length);

  await browser.close();
};

main();
