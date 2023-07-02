import puppeteer from 'puppeteer';
import { pool } from './my_pool';

async function createDatabase() {
  const client = await pool.connect(); // Get a client from the connection pool

  try {
    // Check if the table exists
    const checkTableQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'scraped_data')";
    const checkTableResult = await client.query(checkTableQuery);

    if (checkTableResult.rows[0].exists) {
      // If the table exists, drop it
      const dropTableQuery = 'DROP TABLE scraped_data';
      await client.query(dropTableQuery);
    }

    // Create a new table
    const createTableQuery = `
      CREATE TABLE scraped_data (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        location VARCHAR(255),
        price VARCHAR(255),
        image_url VARCHAR(255)[]
      )
    `;
    await client.query(createTableQuery);

    console.log('Database created successfully!');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    client.release(); // Release the client back to the connection pool
  }
}

async function saveDataToDatabase(items: any[]) {
  const client = await pool.connect(); // Get a client from the connection pool

  try {
    // Iterate over the items and insert them into the database
    for (const item of items) {
      const { title, location, price, imageUrl } = item;
      const insertQuery = 'INSERT INTO scraped_data (title, location, price, image_url) VALUES ($1, $2, $3, $4)';
      const values = [title, location, price, imageUrl];

      await client.query(insertQuery, values); // Execute the insert query
    }

    console.log('Data saved to the database successfully!');
  } catch (error) {
    console.error('Error while saving data to the database:', error);
  } finally {
    client.release(); // Release the client back to the connection pool
  }
}

async function scrapeSReality(numberOfPages: number) {
  const browser = await puppeteer.launch(); // Launch a new browser instance
  const page = await browser.newPage(); // Create a new page

  for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
    await page.goto(`https://www.sreality.cz/en/search/for-sale/apartments?page=${pageNumber}`); // Navigate to the target website
    await page.waitForSelector('div.property'); // Wait for the relevant elements to be loaded
  
    const items = await page.evaluate(() => {
      // Extract the required data from the page using JavaScript in the browser context
      const elements = Array.from(document.querySelectorAll('div.property'));
  
      return elements.map((element: any) => {
        const title = element.querySelector('span.name').innerText;
        const location = element.querySelector('span.locality').innerText;
        const price = element.querySelector('span.price').innerText;
        const imageUrl = Array.from(element.querySelectorAll('a img')).map((img: any) => img.src.replace("400,300", "749,562")).filter(link => link.endsWith("jpg,90"));
  
        return { title, location, price, imageUrl };
      });
    });
  
    // console.log(items); // Output the scraped data for testing purposes
  
    await saveDataToDatabase(items); // Save the scraped data to the database
  }

  await browser.close(); // Close the browser instance
}

createDatabase();
scrapeSReality(25)
.then(() => {
  console.log(`Scraping data complete!`);
})
.catch((error) => {
  console.error('An error occurred:', error);
});
