import { createUser, findUserByEmail, findUserByMobile, verifyUser, createOTP, findOTP, updateUserProfile } from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ override: true });

export const signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    const existingMobile = await findUserByMobile(mobile);
    if (existingMobile) {
      return res.status(400).json({ error: "Mobile number already registered" });
    }

    const hashed = await hashPassword(password);
    const user = await createUser(name, email, mobile, hashed);

    // Generate a 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await createOTP(mobile, generatedOtp);

    // Send OTP via Email using Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: `"Mahila Bachat Gat" <${process.env.EMAIL_USER}>`,
          to: email, // Sending to the user's email
          subject: 'Verify Your Email - Mahila Bachat Gat',
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #e0e0e0;">
              
              <!-- Premium Dark Green & Gold Header -->
              <div style="background: linear-gradient(135deg, #022c22 0%, #064e3b 100%); padding: 40px 20px; text-align: center; border-bottom: 4px solid #d4af37;">
                
                <!-- Golden Logo Area -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center">
                      <div style="width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 15px auto; border: 2px solid #d4af37; background-color: rgba(212, 175, 55, 0.1); line-height: 80px; text-align: center;">
                        <span style="color: #d4af37; font-size: 28px; font-weight: bold; font-family: 'Georgia', serif;">MBG</span>
                      </div>
                    </td>
                  </tr>
                </table>
                
                <h2 style="color: #fef08a; margin: 0; font-size: 32px; font-weight: normal; font-family: 'Georgia', serif; letter-spacing: 1px;">Mahila Bachat Gat</h2>
                <p style="color: #a7f3d0; margin: 10px 0 15px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px;">Women Empowerment Platform</p>
                
                <!-- Marathi Tagline in Gold -->
                <div style="border-top: 1px solid rgba(212, 175, 55, 0.3); border-bottom: 1px solid rgba(212, 175, 55, 0.3); padding: 8px 0; margin: 0 auto; display: inline-block;">
                  <p style="color: #d4af37; margin: 0; font-size: 15px; font-weight: 500;">सशक्त महिला &nbsp;|&nbsp; सक्षम समाज &nbsp;|&nbsp; समृद्ध भविष्य</p>
                </div>
              </div>

              <!-- Body Content -->
              <div style="background-color: #ffffff; padding: 40px 30px; text-align: center;">
                <h3 style="color: #064e3b; margin-top: 0; font-size: 24px; font-weight: 600; font-family: 'Georgia', serif;">Welcome, <span style="color: #d4af37;">${name}</span>! ✨</h3>
                <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 35px;">
                  Thank you for joining our community. To complete your secure registration, please use the verification code below:
                </p>
                
                <!-- Premium OTP Box -->
                <div style="margin: 0 auto; padding: 25px 20px; background-color: #f0fdf4; border: 2px dashed #d4af37; border-radius: 12px; display: inline-block; min-width: 280px;">
                  <span style="font-size: 42px; font-weight: 800; letter-spacing: 16px; color: #064e3b; margin-left: 16px; font-family: monospace;">
                    ${generatedOtp}
                  </span>
                </div>
                
                <!-- Security Notice -->
                <div style="margin-top: 40px; padding: 15px; background-color: #fffbeb; border-left: 4px solid #d4af37; border-radius: 4px; text-align: left;">
                  <p style="color: #92400e; font-size: 14px; font-weight: 600; margin: 0 0 5px 0;">
                    ⏱️ Expires in 5 minutes
                  </p>
                  <p style="color: #92400e; font-size: 13px; margin: 0;">
                    For your security, never share this code with anyone. Our team will never ask for your OTP.
                  </p>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; padding: 25px 20px; background-color: #022c22; color: #a7f3d0; font-size: 13px;">
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #d4af37; letter-spacing: 1px;">Mahila Bachat Gat - Empowering Women</p>
                <p style="margin: 0; opacity: 0.8;">&copy; ${new Date().getFullYear()} All rights reserved.</p>
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to:", email);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    res.json({ message: "Signup successful. Verification OTP sent to your Email.", mobile: user.mobile_number });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    
    const otpRecord = await findOTP(mobile);
    if (!otpRecord) {
      return res.status(400).json({ error: "OTP expired or invalid" });
    }
    
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ error: "Incorrect OTP" });
    }
    
    const user = await verifyUser(mobile);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    
    const token = generateToken(user);
    
    res.json({ message: "Verification successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // The frontend sends email/mobile in the "email" field for login
    let user = await findUserByEmail(email);
    if (!user) {
      user = await findUserByMobile(email); // try finding by mobile
    }
    
    if (!user) return res.status(400).json({ error: "User not found" });
    
    if (!user.is_verified) {
      return res.status(403).json({ error: "Please verify your mobile number first", requiresVerification: true, mobile: user.mobile_number });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    const token = generateToken(user);

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id, name, role, profile_photo } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const updatedUser = await updateUserProfile(id, name, role, profile_photo);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
