# 🚀 Quick Setup Guide - Beast Homepage

## ⚡ Schnellstart in 5 Minuten

### 1. Dependencies installieren
```bash
npm install
```

### 2. Environment Variables einrichten

Erstelle eine `.env.local` Datei im Root-Verzeichnis:

```env
# Gmail-Konfiguration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=deine-email@gmail.com
MAIL_PASS=xxxx-xxxx-xxxx-xxxx

# reCAPTCHA Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=dein-site-key
RECAPTCHA_SECRET_KEY=dein-secret-key
```

### 3. Gmail App-Passwort erstellen

1. Gehe zu https://myaccount.google.com/apppasswords
2. Erstelle ein neues App-Passwort
3. Kopiere das 16-stellige Passwort in `MAIL_PASS`

### 4. reCAPTCHA Keys holen

1. Gehe zu https://www.google.com/recaptcha/admin
2. Erstelle eine neue reCAPTCHA v3 Site
3. Füge `localhost` als Domain hinzu
4. Kopiere Site Key und Secret Key

### 5. Development Server starten

```bash
npm run dev
```

Öffne http://localhost:3000 🎉

## 📦 Deployment auf Vercel

1. Pushe Code auf GitHub
2. Importiere Projekt in Vercel
3. Füge Environment Variables hinzu
4. Deploy! ✅

**Wichtig**: Vergiss nicht, deine Vercel-Domain zu den reCAPTCHA-Domains hinzuzufügen!

---

Vollständige Dokumentation: Siehe [README.md](./README.md)
