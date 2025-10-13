# Beast Homepage - Neon Future Design 🚀

Eine moderne Next.js Unternehmensseite im Neon-Future-Style mit animierten Gradients, Glitch-Effekten und einem sicheren Kontaktformular.

## Features ✨

- **Neon-Future-Design**: Grelle Farben (Neon-Pink, Neon-Grün, Elektro-Blau) auf schwarzem Hintergrund
- **Animationen**: Animierte Farbverläufe, Glitch-Effekt, Hover-Animationen
- **Responsive**: Optimiert für Mobile, Tablet und Desktop
- **Smooth Scroll**: Navigation mit Sticky Navbar
- **Kontaktformular**: Mit reCAPTCHA v3 und Honeypot-Schutz
- **E-Mail-Versand**: Über Nodemailer an rehberg_marc@web.de

## Tech Stack 🛠

- Next.js
- React
- Tailwind CSS
- Nodemailer
- Google reCAPTCHA v3

## Installation 📦

1. Repository klonen:
```bash
git clone <repository-url>
cd beast-homepage
```

2. Dependencies installieren:
```bash
npm install
```

3. Environment Variables erstellen:
```bash
cp .env.local.example .env.local
```

4. Environment Variables in `.env.local` konfigurieren (siehe unten)

5. Development Server starten:
```bash
npm run dev
```

## Environment Variables 🔐

Erstelle eine `.env.local` Datei im Root-Verzeichnis mit folgenden Variablen:

```env
# E-Mail Konfiguration (Gmail)
MAIL_USER=deine-email@gmail.com
MAIL_PASS=dein-app-passwort

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=dein-site-key
RECAPTCHA_SECRET_KEY=dein-secret-key
```

### Gmail App-Passwort erstellen:

1. Gehe zu [Google Account Einstellungen](https://myaccount.google.com/)
2. Sicherheit → 2-Faktor-Authentifizierung aktivieren
3. App-Passwörter → Neues App-Passwort erstellen
4. Das generierte Passwort als `MAIL_PASS` verwenden

### reCAPTCHA Keys erhalten:

1. Gehe zu [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/)
2. Neue Website registrieren
3. reCAPTCHA v3 auswählen
4. Domain hinzufügen (localhost für Development, deine-domain.com für Production)
5. Site Key und Secret Key kopieren

## Deployment auf Vercel 🚀

1. Push zu GitHub
2. Import in Vercel
3. Environment Variables in Vercel Dashboard hinzufügen:
   - `MAIL_USER`
   - `MAIL_PASS`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`
4. Deploy!

## Projektstruktur 📁

```
beast-homepage/
├── pages/
│   ├── api/
│   │   └── contact.js      # API Route für Kontaktformular
│   ├── _app.js            # Next.js App Component
│   └── index.js           # Homepage mit allen Sektionen
├── styles/
│   └── globals.css        # Globale Styles mit Glitch-Effekt
├── tailwind.config.js     # Tailwind Konfiguration
├── package.json
└── README.md
```

## Anpassungen 🎨

### Farben ändern

In `tailwind.config.js`:
```javascript
colors: {
  'neon-green': '#39ff14',
  'neon-pink': '#ff007f',
  'electric-blue': '#00d4ff',
}
```

### Kontakt-E-Mail ändern

In `pages/api/contact.js`:
```javascript
to: 'neue-email@example.com',
```

## Troubleshooting 🔧

### E-Mail wird nicht gesendet

1. Gmail App-Passwort überprüfen
2. "Weniger sichere Apps" in Gmail erlauben (falls nötig)
3. Environment Variables in Vercel überprüfen

### reCAPTCHA funktioniert nicht

1. Domain in reCAPTCHA Admin Console hinzufügen
2. Correct Site Key und Secret Key verwenden
3. Für localhost: "localhost" als Domain hinzufügen

## License 📄

MIT

---

Built with 💜 and Neon-Power by Beast Team