# 🚀 Beast Homepage - Neon Future Design

Eine moderne, responsive Next.js-Unternehmensseite mit Neon-Future-Style, animierten Farbverläufen, Glitch-Effekten und einem vollständig funktionsfähigen Kontaktformular.

## ✨ Features

- **🎨 Neon-Future-Design**: Grelle Farben (Neon-Pink, Neon-Grün, Elektro-Blau) auf schwarzem Hintergrund
- **🌊 Animierte Farbverläufe**: Dynamische Hintergrund-Animationen
- **⚡ Glitch-Effekt**: Für Hero-Headline und besondere Akzente
- **💫 Hover-Effekte**: Mit Glow und Scale-Transformationen
- **📱 Responsive Layout**: Optimiert für Mobile, Tablet und Desktop
- **🧭 Smooth Scroll Navigation**: Sticky Navbar mit sanften Übergängen
- **📬 Kontaktformular**: Mit Nodemailer, Honeypot und Google reCAPTCHA v3
- **🔒 Sicherheit**: Environment Variables für sensible Daten

## 📋 Seitenstruktur

1. **Hero Section**: Animierter Gradient, Glitch-Headline, Call-to-Action
2. **About Section**: Kurze Vorstellung mit lockerem Ton
3. **Services Section**: 3 Cards mit Workspace Design & Agent Workflows
4. **Showcase Section**: 4 Projekt-Platzhalter mit Tech-Stack
5. **Contact Section**: Formular mit Name, E-Mail, Nachricht

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 3
- **E-Mail**: Nodemailer
- **Sicherheit**: Google reCAPTCHA v3
- **Deployment**: Vercel (optimiert)

## 🚀 Schnellstart

### 1. Repository klonen

```bash
git clone <dein-repo-url>
cd beast-homepage
```

### 2. Dependencies installieren

```bash
npm install
# oder
yarn install
# oder
pnpm install
```

### 3. Environment Variables einrichten

Kopiere die `.env.example`-Datei und benenne sie in `.env.local` um:

```bash
cp .env.example .env.local
```

Dann fülle die Werte aus:

```env
# E-Mail-Konfiguration (Nodemailer)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=deine-email@gmail.com
MAIL_PASS=dein-app-passwort

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=dein-recaptcha-site-key
RECAPTCHA_SECRET_KEY=dein-recaptcha-secret-key
```

### 4. Development Server starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

## 📧 E-Mail-Konfiguration (Gmail)

### Schritt 1: Gmail-Konto vorbereiten

1. Gehe zu deinem [Google-Konto](https://myaccount.google.com/)
2. Navigiere zu **Sicherheit**
3. Aktiviere **2-Faktor-Authentifizierung** (falls noch nicht aktiviert)

### Schritt 2: App-Passwort erstellen

1. Gehe zu [App-Passwörter](https://myaccount.google.com/apppasswords)
2. Wähle "E-Mail" und "Anderes Gerät" aus
3. Gib einen Namen ein (z.B. "Beast Homepage")
4. Kopiere das generierte 16-stellige Passwort

### Schritt 3: Environment Variables setzen

```env
MAIL_USER=deine-email@gmail.com
MAIL_PASS=xxxx-xxxx-xxxx-xxxx  # Das 16-stellige App-Passwort
```

### Andere E-Mail-Provider

**Outlook/Hotmail:**
```env
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_SECURE=false
```

**Yahoo:**
```env
MAIL_HOST=smtp.mail.yahoo.com
MAIL_PORT=587
MAIL_SECURE=false
```

**Eigener SMTP-Server:**
```env
MAIL_HOST=dein-smtp-server.com
MAIL_PORT=465  # oder 587
MAIL_SECURE=true  # true für Port 465
```

## 🔑 Google reCAPTCHA v3 einrichten

### Schritt 1: reCAPTCHA-Keys erstellen

1. Gehe zu [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Klicke auf "**+**" (Neue Site registrieren)
3. Fülle das Formular aus:
   - **Label**: Beast Homepage
   - **reCAPTCHA-Typ**: reCAPTCHA v3
   - **Domains**: 
     - `localhost` (für lokale Entwicklung)
     - `deine-domain.com` (für Production)
4. Akzeptiere die Nutzungsbedingungen
5. Klicke auf "Senden"

### Schritt 2: Keys kopieren

Du erhältst zwei Keys:
- **Website-Schlüssel** (Site Key) → für das Frontend
- **Geheimer Schlüssel** (Secret Key) → für das Backend

### Schritt 3: Environment Variables setzen

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=dein-site-key-hier
RECAPTCHA_SECRET_KEY=dein-secret-key-hier
```

**Wichtig**: Der Präfix `NEXT_PUBLIC_` ist für Next.js erforderlich, damit die Variable im Browser verfügbar ist!

## 📦 Deployment auf Vercel

### Option 1: Über GitHub (empfohlen)

1. Pushe deinen Code auf GitHub
2. Gehe zu [Vercel](https://vercel.com)
3. Klicke auf "**New Project**"
4. Wähle dein GitHub-Repository
5. Konfiguriere das Projekt:
   - **Framework Preset**: Next.js (wird automatisch erkannt)
   - **Build Command**: `npm run build` (Standard)
   - **Output Directory**: `.next` (Standard)

### Option 2: Über Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Environment Variables in Vercel setzen

1. Gehe zu deinem Projekt-Dashboard
2. Navigiere zu "**Settings**" → "**Environment Variables**"
3. Füge alle Variablen aus `.env.local` hinzu:

| Name | Value | Environment |
|------|-------|-------------|
| `MAIL_HOST` | `smtp.gmail.com` | Production, Preview, Development |
| `MAIL_PORT` | `587` | Production, Preview, Development |
| `MAIL_SECURE` | `false` | Production, Preview, Development |
| `MAIL_USER` | `deine-email@gmail.com` | Production, Preview, Development |
| `MAIL_PASS` | `dein-app-passwort` | Production, Preview, Development |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | `dein-site-key` | Production, Preview, Development |
| `RECAPTCHA_SECRET_KEY` | `dein-secret-key` | Production, Preview, Development |

4. Klicke auf "**Save**"
5. Vercel deployed deine App automatisch neu

**Wichtig**: Vergiss nicht, deine Vercel-Domain bei den reCAPTCHA-Domains hinzuzufügen!

## 🎨 Tailwind-Anpassungen

Die Tailwind-Config wurde erweitert mit:

### Custom Colors
- `neon-green`: #39ff14
- `neon-pink`: #ff007f
- `neon-blue`: #00f0ff
- `neon-purple`: #bc13fe
- `dark-bg`: #0a0a0a

### Custom Shadows
- `shadow-neon-green`: Glow-Effekt in Neon-Grün
- `shadow-neon-pink`: Glow-Effekt in Neon-Pink
- `shadow-neon-blue`: Glow-Effekt in Neon-Blau
- `shadow-neon-purple`: Glow-Effekt in Neon-Lila

### Custom Animations
- `animate-gradient`: Animierte Farbverläufe (15s)
- `animate-glitch`: Glitch-Effekt (1s)
- `animate-float`: Schwebende Elemente (3s)
- `animate-pulse-glow`: Pulsierendes Leuchten (2s)

### Verwendung

```jsx
<div className="text-neon-pink shadow-neon-pink animate-gradient">
  Neon Text mit Glow und Animation
</div>
```

## 🔒 Sicherheitsfeatures

- **Honeypot-Feld**: Verstecktes Feld zur Bot-Erkennung
- **Google reCAPTCHA v3**: Invisible CAPTCHA mit Score-Bewertung
- **Environment Variables**: Sensible Daten werden niemals im Code gespeichert
- **Input-Validierung**: Serverseitige Validierung aller Formulardaten
- **Rate Limiting**: Kann über Vercel Edge Functions hinzugefügt werden

## 📝 Anpassungen

### Logo ändern

Ersetze den Text "BEAST" in `pages/index.js` (Zeile ~75):

```jsx
<div className="text-2xl font-bold text-gradient">DEIN LOGO</div>
```

### Farben anpassen

Bearbeite `tailwind.config.js` und ändere die Custom Colors:

```js
colors: {
  'neon-green': '#39ff14',
  'neon-pink': '#ff007f',
  // Deine Farben hier
}
```

### Services/Projekte anpassen

Bearbeite die entsprechenden Sections in `pages/index.js`:
- Services Section: ab Zeile ~190
- Showcase Section: ab Zeile ~240

### E-Mail-Empfänger ändern

In `pages/api/contact.js`, Zeile ~54:

```js
to: 'deine-neue-email@domain.com',
```

## 🐛 Troubleshooting

### Problem: E-Mails werden nicht gesendet

**Lösung 1**: Überprüfe deine E-Mail-Credentials
```bash
# Teste die Verbindung mit einem SMTP-Tester
npm install -g smtp-tester
```

**Lösung 2**: Für Gmail - stelle sicher, dass du ein App-Passwort verwendest (nicht dein normales Passwort)

**Lösung 3**: Überprüfe die Firewall/Port-Einstellungen
- Port 587 (TLS) oder 465 (SSL) muss offen sein
- Bei Vercel: Ports sind standardmäßig offen

### Problem: reCAPTCHA funktioniert nicht

**Lösung 1**: Überprüfe die Keys in `.env.local` und Vercel
- Site Key muss mit `NEXT_PUBLIC_` beginnen
- Secret Key darf NICHT mit `NEXT_PUBLIC_` beginnen

**Lösung 2**: Domain zu reCAPTCHA hinzufügen
- Gehe zu [reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
- Füge `localhost` und deine Production-Domain hinzu

**Lösung 3**: Cache leeren und neu bauen
```bash
rm -rf .next
npm run dev
```

### Problem: Styles werden nicht geladen

**Lösung**: Stelle sicher, dass PostCSS korrekt konfiguriert ist
```bash
# Überprüfe ob postcss.config.js existiert
ls postcss.config.js

# Tailwind und PostCSS neu installieren
npm install -D tailwindcss postcss autoprefixer
```

## 📚 Weiterführende Links

- [Next.js Dokumentation](https://nextjs.org/docs)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)
- [Nodemailer Dokumentation](https://nodemailer.com/)
- [Google reCAPTCHA Dokumentation](https://developers.google.com/recaptcha/docs/v3)
- [Vercel Deployment Dokumentation](https://vercel.com/docs)

## 📄 Lizenz

Dieses Projekt steht zur freien Verfügung. Du kannst es nach Belieben anpassen und verwenden.

## 🤝 Support

Bei Fragen oder Problemen:
1. Erstelle ein Issue in diesem Repository
2. Kontaktiere uns über das Kontaktformular
3. Schreibe eine E-Mail an rehberg_marc@web.de

---

**Made with 💜 and lots of Neon**

🚀 Viel Erfolg mit deiner Beast Homepage!
