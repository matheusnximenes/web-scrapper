# Canada411 Web Scraper

## Overview
This project is a web scraper designed to extract phone numbers and addresses of individuals from the website [Canada411](https://www.canada411.ca). The extracted data is stored in CSV files for easy access and analysis.

---

## Features
- Scrapes phone numbers and addresses for specified cities and provinces.
- Outputs data in a structured CSV format like id, name, phone, postalCode, address.
- Easy-to-use CLI interface.

---

## Prerequisites
Before using the scraper, ensure you have the following installed:

1. [Node.js](https://nodejs.org/) (version 14 or above)
2. [npm](https://www.npmjs.com/)

---

## Installation
1. Clone this repository:
   ```bash
   git clone "matheusnximenes/web-scrapper"
   cd "web-scrapper"
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

---

## Usage
To start the scraper, use the following command:
```bash
npm run start <city> <province>
```

### Arguments
- `<city>`: The city to scrape data from (e.g., Toronto, Vancouver).
- `<province>`: The province of the specified city (e.g., ON for Ontario, BC for British Columbia, AB for Alberta,...).

### Example
```bash
npm run start Toronto ON
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
- id 
- name
- phone
- postalCode
- address

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


---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

