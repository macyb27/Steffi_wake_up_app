import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message, honeypot, recaptchaToken } = req.body

  // Honeypot-Check
  if (honeypot) {
    return res.status(400).json({ message: 'Spam erkannt!' })
  }

  // Validierung der Eingaben
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Alle Felder sind erforderlich' })
  }

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'reCAPTCHA-Verifizierung fehlgeschlagen' })
  }

  try {
    // reCAPTCHA-Verifizierung
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`
      }
    )

    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return res.status(400).json({ 
        message: 'reCAPTCHA-Verifizierung fehlgeschlagen. Bitte versuche es erneut.' 
      })
    }

    // Nodemailer-Transport konfigurieren
    // Beispiel für Gmail (du kannst auch andere SMTP-Provider verwenden)
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.MAIL_PORT || '587'),
      secure: process.env.MAIL_SECURE === 'true', // true für Port 465, false für andere Ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    // E-Mail-Optionen
    const mailOptions = {
      from: `"Beast Homepage Kontaktformular" <${process.env.MAIL_USER}>`,
      to: 'rehberg_marc@web.de',
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #0a0a0a;
                color: #ffffff;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: linear-gradient(135deg, #1a0a2e 0%, #0f0a1e 100%);
                border: 2px solid #ff007f;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 0 20px rgba(255, 0, 127, 0.3);
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #39ff14;
              }
              .header h1 {
                color: #ff007f;
                margin: 0;
                font-size: 28px;
                text-transform: uppercase;
                letter-spacing: 2px;
              }
              .field {
                margin-bottom: 20px;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border-left: 4px solid #39ff14;
                border-radius: 5px;
              }
              .label {
                color: #00f0ff;
                font-weight: bold;
                font-size: 14px;
                text-transform: uppercase;
                margin-bottom: 8px;
                display: block;
              }
              .value {
                color: #ffffff;
                font-size: 16px;
                line-height: 1.6;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #bc13fe;
                text-align: center;
                color: #888;
                font-size: 12px;
              }
              .emoji {
                font-size: 24px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚀 Neue Kontaktanfrage</h1>
                <p style="color: #39ff14; margin: 10px 0 0 0;">Beast Homepage</p>
              </div>
              
              <div class="field">
                <span class="label">👤 Name:</span>
                <span class="value">${name}</span>
              </div>
              
              <div class="field">
                <span class="label">📧 E-Mail:</span>
                <span class="value">${email}</span>
              </div>
              
              <div class="field">
                <span class="label">💬 Nachricht:</span>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="footer">
                <p>Diese Nachricht wurde über das Kontaktformular der Beast Homepage gesendet.</p>
                <p style="color: #ff007f; margin-top: 10px;">Made with 💜 and lots of Neon</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Neue Kontaktanfrage von der Beast Homepage

Name: ${name}
E-Mail: ${email}

Nachricht:
${message}

---
Diese Nachricht wurde über das Kontaktformular gesendet.
      `,
    }

    // E-Mail senden
    await transporter.sendMail(mailOptions)

    return res.status(200).json({ 
      message: 'Nachricht erfolgreich gesendet!' 
    })

  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error)
    return res.status(500).json({ 
      message: 'Fehler beim Senden der Nachricht. Bitte versuche es später noch einmal.' 
    })
  }
}
