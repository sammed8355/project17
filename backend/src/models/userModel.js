import pool from "../config/db.js";

export const createUser = async (name, email, mobile_number, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, mobile_number, password, is_verified) VALUES ($1, $2, $3, $4, FALSE) RETURNING *",
    [name, email, mobile_number, password]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

export const findUserByMobile = async (mobile_number) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE mobile_number = $1",
    [mobile_number]
  );
  return result.rows[0];
};

export const verifyUser = async (mobile_number) => {
  const result = await pool.query(
    "UPDATE users SET is_verified = TRUE WHERE mobile_number = $1 RETURNING *",
    [mobile_number]
  );
  return result.rows[0];
};

export const createOTP = async (mobile_number, otp) => {
  // Set expiration to 5 minutes from now
  const expires_at = new Date();
  expires_at.setMinutes(expires_at.getMinutes() + 5);

  const result = await pool.query(
    "INSERT INTO otps (mobile_number, otp, expires_at) VALUES ($1, $2, $3) RETURNING *",
    [mobile_number, otp, expires_at]
  );
  return result.rows[0];
};

export const findOTP = async (mobile_number) => {
  // Find the latest valid OTP
  const result = await pool.query(
    "SELECT * FROM otps WHERE mobile_number = $1 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
    [mobile_number]
  );
  return result.rows[0];
};

export const updateUserProfile = async (id, name, role, profile_photo) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, role = $2, profile_photo = $3 WHERE id = $4 RETURNING *",
    [name, role, profile_photo, id]
  );
  return result.rows[0];
};
