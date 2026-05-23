import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then((client) => {
    console.log("✅ Conectado correctamente a PostgreSQL");

    client.release();
  })
  .catch((err) => {
    console.error("❌ Error conectando a PostgreSQL", err);
  });

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
