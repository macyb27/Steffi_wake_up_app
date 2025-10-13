import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message, honeypot, recaptchaToken } = req.body;

  // Check honeypot - if filled, it's likely a bot
  if (honeypot) {
    return res.status(400).json({ message: 'Bot detected' });
  }

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Alle Felder sind erforderlich' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Ungültige E-Mail-Adresse' });
  }

  // Verify reCAPTCHA if configured
  if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken) {
    try {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
      });

      const recaptchaData = await recaptchaResponse.json();
      
      if (!recaptchaData.success) {
        return res.status(400).json({ message: 'reCAPTCHA-Verifizierung fehlgeschlagen' });
      }
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return res.status(500).json({ message: 'Fehler bei der reCAPTCHA-Verifizierung' });
    }
  }

  // Create Nodemailer transporter
  let transporter;
  
  try {
    // Check if we have email credentials
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.error('Email credentials not configured');
      return res.status(500).json({ message: 'E-Mail-Service nicht konfiguriert' });
    }

    // Configure transporter for Gmail (adjust for other providers)
    transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Use App Password for Gmail
      },
    });

    // Alternative configuration for other SMTP providers:
    /*
    transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com', // or your SMTP host
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    */

  } catch (error) {
    console.error('Transporter creation error:', error);
    return res.status(500).json({ message: 'E-Mail-Konfigurationsfehler' });
  }

  // Email content
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'rehberg_marc@web.de',
    subject: `🚀 Neue Nachricht von ${name} - Beast Homepage`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000 0%, #1a0010 50%, #000a1a 100%); color: #fff; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ff007f; font-size: 2.5rem; margin: 0; text-shadow: 0 0 20px #ff007f;">BEAST</h1>
          <p style="color: #39ff14; font-size: 1.2rem; margin: 5px 0 0 0;">Neue Kontaktanfrage</p>
        </div>
        
        <div style="background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 8px; border: 1px solid rgba(57, 255, 20, 0.3);">
          <h2 style="color: #39ff14; border-bottom: 2px solid #39ff14; padding-bottom: 10px;">Kontaktdaten</h2>
          <p><strong style="color: #0080ff;">Name:</strong> ${name}</p>
          <p><strong style="color: #0080ff;">E-Mail:</strong> <a href="mailto:${email}" style="color: #ff007f;">${email}</a></p>
          
          <h3 style="color: #39ff14; margin-top: 30px;">Nachricht</h3>
          <div style="background: rgba(57, 255, 20, 0.1); padding: 15px; border-radius: 5px; border-left: 4px solid #39ff14;">
            <p style="line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          <p style="color: #888; font-size: 0.9rem;">
            Gesendet über die Beast Homepage<br>
            <span style="color: #39ff14;">🚀 Digitale Träume. Futuristische Realitäten.</span>
          </p>
        </div>
      </div>
    `,
    text: `
      BEAST - Neue Kontaktanfrage
      
      Name: ${name}
      E-Mail: ${email}
      
      Nachricht:
      ${message}
      
      ---
      Gesendet über die Beast Homepage
    `
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully to rehberg_marc@web.de');
    
    res.status(200).json({ 
      message: 'Nachricht erfolgreich gesendet!',
      success: true 
    });
    
  } catch (error) {
    console.error('Email sending error:', error);
    
    // Different error messages based on error type
    let errorMessage = 'Fehler beim Senden der E-Mail';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'E-Mail-Authentifizierung fehlgeschlagen';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Verbindung zum E-Mail-Server fehlgeschlagen';
    } else if (error.code === 'EMESSAGE') {
      errorMessage = 'Ungültige E-Mail-Nachricht';
    }
    
    res.status(500).json({ 
      message: errorMessage,
      success: false 
    });
  }
}