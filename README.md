# 🚀 Beast Homepage - Neon Future Design

Eine futuristische Next.js + Tailwind CSS Unternehmensseite mit Neon-Design, Glitch-Effekten und modernen Animationen.

## ✨ Features

- **🎨 Neon-Future-Design**: Grelle Farben (Neon-Pink, Neon-Grün, Elektro-Blau) auf schwarzem Hintergrund
- **⚡ Animierte Farbverläufe**: Dynamische Hintergründe mit smooth Animationen
- **👻 Glitch-Effekt**: Spektakuläre Glitch-Animation für die Hero-Headline
- **💫 Hover-Effekte**: Glow und Scale-Effekte für interaktive Elemente
- **📱 Responsive Design**: Optimiert für Mobile, Tablet und Desktop
- **🧭 Smooth Scroll**: Flüssige Navigation mit Sticky Navbar
- **📧 Kontaktformular**: Mit Honeypot-Schutz und reCAPTCHA-Integration
- **🔒 Sicherheit**: Environment Variables für sensible Daten
- **🚀 Vercel-Ready**: Out-of-the-box Deployment auf Vercel

## 🛠 Tech Stack

- **Next.js 14** - React Framework
- **Tailwind CSS 3** - Utility-First CSS Framework
- **Nodemailer** - E-Mail-Versand
- **react-google-recaptcha** - reCAPTCHA Integration
- **Custom CSS** - Glitch-Effekte und Animationen

## 🚦 Quick Start

### 1. Repository klonen

```bash
git clone <repository-url>
cd beast-homepage
```

### 2. Dependencies installieren

```bash
npm install
# oder
yarn install
```

### 3. Environment Variables einrichten

Erstelle eine `.env.local` Datei im Root-Verzeichnis:

```env
# E-Mail Konfiguration (Gmail)
MAIL_USER=deine-email@gmail.com
MAIL_PASS=dein-app-passwort

# reCAPTCHA (optional aber empfohlen)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=dein-site-key
RECAPTCHA_SECRET_KEY=dein-secret-key
```

### 4. Development Server starten

```bash
npm run dev
# oder
yarn dev
```

Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

## 📧 E-Mail Setup

### Gmail Configuration

1. **Google Account einrichten**:
   - Gehe zu deinem Google Account
   - Aktiviere 2-Faktor-Authentifizierung
   - Erstelle ein App-spezifisches Passwort

2. **Environment Variables setzen**:
   ```env
   MAIL_USER=deine-email@gmail.com
   MAIL_PASS=xxxx xxxx xxxx xxxx  # App-Passwort (16 Zeichen)
   ```

### Alternative E-Mail Provider

Für andere Provider, bearbeite `pages/api/contact.js`:

```javascript
// Beispiel für allgemeine SMTP-Konfiguration
transporter = nodemailer.createTransporter({
  host: 'mail.dein-provider.de',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
```

## 🔐 reCAPTCHA Setup

### 1. Google reCAPTCHA Account erstellen

1. Gehe zu [Google reCAPTCHA](https://www.google.com/recaptcha/)
2. Registriere eine neue Site
3. Wähle reCAPTCHA v2 "I'm not a robot"
4. Füge deine Domain hinzu (für local development: `localhost`)

### 2. Keys in Environment Variables eintragen

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...
```

**Wichtig**: Der Site Key (`NEXT_PUBLIC_*`) ist öffentlich sichtbar, der Secret Key muss geheim bleiben!

## 🎨 Customization

### Farben anpassen

In `tailwind.config.js`:

```javascript
colors: {
  'neon-green': '#39ff14',    // Dein Neon-Grün
  'neon-pink': '#ff007f',     // Dein Neon-Pink
  'electric-blue': '#0080ff', // Dein Elektro-Blau
}
```

### Glitch-Effekt anpassen

In `styles/globals.css` unter `.glitch`:

```css
.glitch {
  font-size: 4rem; /* Größe anpassen */
  animation: glitch 2s infinite; /* Geschwindigkeit ändern */
}
```

### Animationsgeschwindigkeit

In `tailwind.config.js`:

```javascript
animation: {
  'gradient-xy': 'gradient-xy 6s ease infinite', // 6s ändern
  'glow-pulse': 'glow-pulse 2s ease-in-out infinite', // 2s ändern
}
```

## 📦 Build & Deployment

### Local Build testen

```bash
npm run build
npm start
```

### Vercel Deployment

#### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

#### Option 2: GitHub Integration
1. Push Code zu GitHub
2. Gehe zu [vercel.com](https://vercel.com)
3. Verbinde GitHub Repository
4. Setze Environment Variables in Vercel Dashboard

#### Vercel Environment Variables setzen

Im Vercel Dashboard unter Settings → Environment Variables:

```
MAIL_USER = deine-email@gmail.com
MAIL_PASS = xxxx xxxx xxxx xxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 6Lc...
RECAPTCHA_SECRET_KEY = 6Lc...
```

### Andere Deployment Platforms

- **Netlify**: Funktioniert out-of-the-box
- **Railway**: Automatisches Deployment
- **AWS Amplify**: Mit Serverless Functions
- **DigitalOcean App Platform**: Container-basiert

## 🗂 Projektstruktur

```
beast-homepage/
├── pages/
│   ├── api/
│   │   └── contact.js          # API Route für Kontaktformular
│   ├── _app.js                 # App Wrapper
│   └── index.js                # Hauptseite
├── styles/
│   └── globals.css             # Globale Styles + Glitch-Effekt
├── tailwind.config.js          # Tailwind Konfiguration
├── next.config.js              # Next.js Konfiguration
├── package.json                # Dependencies
└── README.md                   # Diese Datei
```

## 🎯 Sektionen Übersicht

### Hero Section
- Glitch-animierte Headline "BEAST"
- Animierter Gradient-Hintergrund
- Call-to-Action Buttons
- Schwebende geometrische Elemente

### About Section
- Zweispaltige Karten mit Neon-Effekten
- Lockerer, persönlicher Ton
- Feature-Liste mit Emoji-Icons

### Services Section
- 3 Service-Karten:
  - 🎨 Workspace Design
  - 🤖 Agent Workflows
  - ⚡ Full-Stack Development
- Hover-Animationen mit Glow-Effekten

### Showcase Section
- 3 Projekt-Platzhalter
- Technologie-Tags
- Vorbereitet für echte Projekte

### Contact Section
- Kontaktformular mit Validation
- Honeypot-Schutz gegen Bots
- reCAPTCHA Integration
- Erfolgs-/Fehlermeldungen

## 🔧 Troubleshooting

### E-Mail wird nicht gesendet

1. **Überprüfe Environment Variables**:
   ```bash
   console.log(process.env.MAIL_USER); // In API Route
   ```

2. **Gmail App-Passwort**:
   - Stelle sicher, dass 2FA aktiviert ist
   - Verwende App-Passwort, nicht dein normales Passwort

3. **Provider-spezifische Settings**:
   - Gmail: `service: 'gmail'`
   - Outlook: `service: 'outlook'`
   - Custom: SMTP-Settings konfigurieren

### reCAPTCHA funktioniert nicht

1. **Domain überprüfen**:
   - Localhost für Development hinzufügen
   - Produktions-Domain für Deployment

2. **Keys validieren**:
   - Site Key ist öffentlich (`NEXT_PUBLIC_*`)
   - Secret Key ist server-only

### Styles werden nicht geladen

1. **Tailwind CSS**:
   ```bash
   npm run build # Regeneriert CSS
   ```

2. **Custom Styles**:
   - Überprüfe `_app.js` Import
   - Browser-Cache leeren

## 🚀 Performance Optimierungen

- **Image Optimization**: Next.js Image Component verwenden
- **Font Loading**: Google Fonts mit `next/font` optimieren
- **Code Splitting**: Automatisch durch Next.js
- **Static Generation**: Für bessere Performance

## 📝 License

MIT License - Du kannst das Projekt frei verwenden und anpassen.

## 🤝 Contributing

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 💡 Weitere Ideen

- **Particle System**: Three.js für 3D-Effekte
- **Sound Effects**: Web Audio API für Interaktionen
- **PWA**: Service Worker für Offline-Funktionalität
- **Analytics**: Google Analytics oder Umami integrieren
- **Blog**: CMS-Integration für Content Management
- **Multi-Language**: i18n für internationale Benutzer

## 📞 Support

Bei Fragen oder Problemen:

1. Überprüfe diese README
2. Schaue in die [Next.js Dokumentation](https://nextjs.org/docs)
3. Erstelle ein GitHub Issue

---

**Happy Coding! 🚀✨**

*Erstellt mit ❤️ und viel Koffein*