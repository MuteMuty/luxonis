import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  password: 'erikp',
  host: 'database',
  port: 5432,
  database: 'postgres',
});
