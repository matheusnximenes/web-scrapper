export const pageContacts = async (page) => {
  const data = await page.evaluate(() => {
    const rawContacts = document.querySelectorAll(".c411Listing");
    if (Array.from(rawContacts).length > 0) {
      return Array.from(rawContacts).map((contact) => {
        let geo;
        const name = contact.querySelector(".c411ListedName").innerText;
        const phone = contact.querySelector(".c411Phone").innerHTML;
        const addressField = contact.querySelector(".adr");
        if (addressField) {
          geo = addressField.innerHTML.split(" ");
        } else {
          geo = contact
            .querySelector(".c411ListingGeo strong")
            .innerHTML.split(" ");
        }
        const address = geo.slice(0, -2).join(" ");
        const postalCode = geo.reverse().slice(0, 2).join(" ");
        return {
          name: name ?? "",
          phone: phone ?? "",
          address: address ?? "",
          postalCode: postalCode ?? "",
        };
      });
    } else {
      const card = document.querySelectorAll(".vcard");
      if (card) {
        const name = document.querySelector(".vcard__name").innerText;
        const phone = document.querySelector(".vcard__label").innerHTML;
        const geo = document
          .querySelector(".vcard__address")
          .innerHTML.split(" ");
        const address = geo.slice(0, -2).join(" ");
        const postalCode = geo.reverse().slice(0, 2).join(" ");
        return [
          {
            name: name ?? "",
            phone: phone ?? "",
            address: address ?? "",
            postalCode: postalCode ?? "",
          },
        ];
      }
      return [];
    }
  });

  return data;
};
