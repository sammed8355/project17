import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initializeDB() {
  try {
    console.log("Connecting to the database...");

    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        mobile_number VARCHAR(15) UNIQUE,
        is_verified BOOLEAN DEFAULT FALSE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'Member',
        profile_photo TEXT
      );
    `);

    // Try to add columns if the table already existed without them
    try {
      await pool.query(`ALTER TABLE users ADD COLUMN mobile_number VARCHAR(15) UNIQUE;`);
    } catch(e) {}
    try {
      await pool.query(`ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;`);
    } catch(e) {}
    try {
      await pool.query(`ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'Member';`);
    } catch(e) {}
    try {
      await pool.query(`ALTER TABLE users ADD COLUMN profile_photo TEXT;`);
    } catch(e) {}
    console.log("✅ 'users' table is ready.");

    // Create the new otps table for OTP verification
    await pool.query(`
      CREATE TABLE IF NOT EXISTS otps (
        id SERIAL PRIMARY KEY,
        mobile_number VARCHAR(15) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ 'otps' table is ready.");

  } catch (error) {
    console.error("❌ Error creating database tables:", error);
  } finally {
    // Close the connection
    await pool.end();
    console.log("Database connection closed.");
  }
}

initializeDB();
