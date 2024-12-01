
export const pageContacts = async (page) => {
    return await page.evaluate(() => {
      const rawContacts = document.querySelectorAll(".c411Listing");
      return Array.from(rawContacts).map((contact) => {
        const name = contact.querySelector(".c411ListedName").innerText;
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