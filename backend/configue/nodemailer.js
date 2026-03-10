// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

// module.exports = transporter;


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // IMPORTANT: false for 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS, // App Password
  },
  tls: {
    rejectUnauthorized: false, // Fix self-signed issue
  },
});
