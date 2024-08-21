const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = async (email, subject, text) => {
  //   Gmail (Google Mail):
  //   SMTP Host: smtp.gmail.com
  //   Port: 465 (SSL) or 587 (TLS)
  //   Requires: Enable "Less secure app access" or set up an App Password in your Google Account settings for two-factor authentication.
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    // use SSL
    auth: {
      user: process.env.NODEMAILER_EMAIL,

      pass: process.env.NODEMAILER_PASS,
    },
  });

  // Configure the mailoptions object
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
