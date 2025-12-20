// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();
// // // const transporter = nodemailer.createTransport({
// // //   host: "smtp.ethereal.email",
// // //   port: 465,
// // //   secure: true, // true for 465, false for other ports
// // //   auth: {
// // //     user: process.env.EMAIL, // generated ethereal user
// // //     pass: process.env.Pass, // generated ethereal password
// // //   },
// // });

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587, // 465 → 587
//   secure: false, // 587 port के लिए secure:false रखना चाहिए
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS
//   }
// });

// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: process.env.EMAIL,
// //     pass: process.env.PASS
// //   }
// // });

// export const sendOtpmail = async (to, otp) => {
//   transporter.sendMail({
//     form:process.env.EMAIL,
//      to,
//     subject:"reset you password",

//     html:`<h1>Your OTP for password reset is ${otp} 5 minut </h1>`
   

//   })
// }



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

