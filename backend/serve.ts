import { pool } from './my_pool';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

// Enable CORS
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Get the pagination parameters from the query string
    const pageNumber = parseInt(page as string, 10); // Convert page to a number
    const limitNumber = parseInt(limit as string, 10); // Convert limit to a number
    const offset = (pageNumber - 1) * limitNumber; // Calculate the offset for the query

    const client = await pool.connect();
    const query = 'SELECT * FROM scraped_data LIMIT $1 OFFSET $2'; // Add LIMIT and OFFSET to the query
    const values = [limit, offset];
    const result = await client.query(query, values);
    const data = result.rows;

    // Render the data on a web page using your preferred template engine or plain HTML
    res.send(data ?? []);
  } catch (error) {
    console.error('Error while fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});