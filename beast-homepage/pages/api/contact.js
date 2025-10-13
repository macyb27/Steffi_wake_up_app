import nodemailer from 'nodemailer'
import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message, honeypot, recaptchaToken } = req.body

  // Check honeypot field
  if (honeypot) {
    return res.status(400).json({ error: 'Bot detected' })
  }

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Bitte fülle alle Felder aus' })
  }

  // Verify reCAPTCHA
  try {
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken
        }
      }
    )

    if (!recaptchaResponse.data.success || recaptchaResponse.data.score < 0.5) {
      return res.status(400).json({ error: 'reCAPTCHA-Verifizierung fehlgeschlagen' })
    }
  } catch (error) {
    console.error('reCAPTCHA error:', error)
    return res.status(500).json({ error: 'reCAPTCHA-Verifizierung fehlgeschlagen' })
  }

  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  // Email options
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'rehberg_marc@web.de',
    subject: `Neue Nachricht von ${name} - Beast Homepage`,
    text: `
Name: ${name}
E-Mail: ${email}

Nachricht:
${message}
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #000;
      color: #fff;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: linear-gradient(135deg, #ff007f22, #39ff1422, #00d4ff22);
      border: 2px solid #39ff14;
      border-radius: 10px;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #39ff14;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #39ff14;
      text-shadow: 0 0 10px #39ff14;
      margin: 0;
    }
    .content {
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
    }
    .field {
      margin-bottom: 15px;
    }
    .label {
      color: #ff007f;
      font-weight: bold;
      text-shadow: 0 0 5px #ff007f;
    }
    .value {
      color: #fff;
      margin-top: 5px;
    }
    .message-box {
      background-color: rgba(0, 217, 255, 0.1);
      border: 1px solid #00d4ff;
      padding: 15px;
      border-radius: 5px;
      margin-top: 10px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #39ff14;
      color: #888;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BEAST Homepage - Neue Nachricht</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">E-Mail:</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">Nachricht:</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      Diese Nachricht wurde über das Kontaktformular der Beast Homepage gesendet.
    </div>
  </div>
</body>
</html>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ error: 'Fehler beim Senden der E-Mail' })
  }
}