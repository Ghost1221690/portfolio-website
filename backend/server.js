const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (optional: adjust to your frontend path)
app.use(express.static('../frontend'));

// Route for handling form submissions
app.post('/send-email', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // from .env
      pass: process.env.EMAIL_PASS   // from .env
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,  // send to your Gmail
    subject: `${subject} (from ${name}, ${phone})`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Error sending email" });
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({ success: true });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



