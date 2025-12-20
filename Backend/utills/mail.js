



import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // ✅ Gmail ke liye ye likh
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS, // ✅ App password (not your Gmail login password)
  },
});

export const sendOtpmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // ✅ spelling 'from' hota hai, 'form' nahi
      to,
      subject: "Reset your password",
      html: `<h3>Your OTP for password reset is <b>${otp}</b>. It will expire in 5 minutes.</h3>`,
    });

    console.log("✅ OTP mail sent:", info.messageId);
  } catch (err) {
    console.error("❌ OTP mail error:", err);
  }
};

