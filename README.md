# Canada411 Web Scraper

## Overview
This project is a web scraper designed to extract **phone numbers and addresses of individuals public registered** in [Canada411](https://www.canada411.ca). The extracted data is stored in _CSV_ files for easy access and analysis.

---

## Features
- Scrapes phone numbers and addresses for specified cities and provinces.
- Outputs data in a structured **CSV** format like **Address_ID;	Territory_ID;	Language;	Status;	Name;	Suite;	Address;	City;	Province;	Postal_code;	Country;	Latitude;	Longitude;	Telephone;	Notes;	Notes_private**.

---

## Prerequisites
Before using the scraper, ensure you have the following installed:

1. [Node.js](https://nodejs.org/) (version 14 or above)
2. [npm](https://www.npmjs.com/)

---

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/matheusnximenes/web-scrapper.git
   cd "web-scrapper"
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

---

## Usage
Before start:
Add you name to a csv file `;` separated to `input` folder
Change you the province, city, language, and note in the constants.js

To start the scraper, use the following command:
```bash
npm run start
```


### Example
```bash
npm run start
```

This command will scrape data for Toronto, Ontario, and store the results in a CSV file.

---

## Output
The scraper generates a CSV file named in the following format:
```
<name>.csv
```
For example:
```
Khaleb.csv
```
Each row in the CSV file contains the following fields:
- Address_ID
- Territory_ID
- Language
- Status
- Name
- Suite
- Address
- City
- Province
- Postal_code
- Country
- Latitude
- Longitude
- Telephone
- Notes
- Notes_private


---

## Logs
- **All logs** are combined into _app.log_ file
- All **errors** or **0 output** are logger into _errors.log_ 


---

## Notes
- Ensure you comply with all applicable laws and terms of service of Canada411 when using this scraper.
- Large-scale scraping may result in your IP being blocked by the website. Use responsibly.

---

## Troubleshooting
### Common Issues
1. **Error: "Module not found"**
   - Ensure you have run `npm install` before starting the application.

2. **No Data Found**
   - Verify the `<city>` and `<province>` values are correct.
   - Ensure the target website structure has not changed.
3. Even though `<name>`,  `<city>`, and `<province>` is correct Canada411.ca sometimes gives other near by cities.

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

