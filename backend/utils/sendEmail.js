// backend/utils/sendEmail.js
import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html }) => {
    // utils/sendEmail.js ke andar:

  // 1. Gmail ke mail server se connection banaya
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Mail details set ki
  const mailOptions = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  // 3. Email send kiya
  await transporter.sendMail(mailOptions);
};