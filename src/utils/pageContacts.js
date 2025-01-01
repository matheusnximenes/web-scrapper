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
        const address = [...geo].slice(0, -4).join(" ");
        const city = [...geo].reverse().slice(3, 4).join();
        const province = [...geo].reverse().slice(2, 3).join();
        const postalCode = [...geo].reverse().slice(0, 2).join(" ");
        return {
          name: name ?? "",
          phone: phone ?? "",
          address: address ?? "",
          city: city ?? "",
          province: province ?? "",
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
          .innerHTML.split(",");
        const address = geo[0].trim();
        const city = [...geo[1].split(" ")].slice(0, -1).join(" ").trim();
        const province = [...geo[1].split().reverse()].slice(0, 1).join("");
        const postalCode = `${geo[2]
          .trim()
          .split("")
          .slice(0, 3)
          .join("")} ${geo[2].trim().split("").slice(3, 6).join("")}`;
        return [
          {
            name: name ?? "",
            phone: phone ?? "",
            address: address ?? "",
            city: city ?? "",
            province: province ?? "",
            postalCode: postalCode ?? "",
          },
        ];
      }
    }
  });

  return data;
};
