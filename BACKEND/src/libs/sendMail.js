
import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail=async(to,otp)=>{
     await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: "RESET YOURE PASSWORD",
    html: `<p>Youre Otp for password reset is <b>${otp}</b>. it will expire in 5 minutes</p>` // HTML body
  });
}

export default sendMail;