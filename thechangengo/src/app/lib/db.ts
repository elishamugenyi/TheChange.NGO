//db connection
import { createPool } from '@vercel/postgres';

const DATABASE_URL = process.env.POSTGRES_URL_NON_POOLING;

export const db = createPool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

