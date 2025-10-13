import Head from 'next/head';
import { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Honeypot field
  });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check honeypot
    if (formData.honeypot) {
      return; // Bot detected
    }

    if (!recaptchaToken) {
      setFormStatus('error:Bitte bestätigen Sie das reCAPTCHA');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus('success:Danke! Nachricht verschickt ✅');
        setFormData({ name: '', email: '', message: '', honeypot: '' });
        setRecaptchaToken('');
      } else {
        setFormStatus(`error:${result.message || 'Fehler beim Senden'}`);
      }
    } catch (error) {
      setFormStatus('error:Fehler beim Senden der Nachricht');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Head>
        <title>Beast Homepage - Neon Future Design</title>
        <meta name="description" content="Beast Homepage mit Neon-Future-Design - Workspace Design & Agent Workflows" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-green bg-clip-text text-transparent">
              BEAST
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('hero')} className="text-white hover:text-neon-green transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-neon-green transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="text-white hover:text-neon-green transition-colors">Services</button>
              <button onClick={() => scrollToSection('showcase')} className="text-white hover:text-neon-green transition-colors">Showcase</button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-neon-green transition-colors">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-neon-green"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button onClick={() => scrollToSection('hero')} className="block px-3 py-2 text-white hover:text-neon-green">Home</button>
                <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-white hover:text-neon-green">About</button>
                <button onClick={() => scrollToSection('services')} className="block px-3 py-2 text-white hover:text-neon-green">Services</button>
                <button onClick={() => scrollToSection('showcase')} className="block px-3 py-2 text-white hover:text-neon-green">Showcase</button>
                <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-white hover:text-neon-green">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="animated-bg min-h-screen">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-neon-gradient opacity-20 animate-gradient-xy"></div>
          <div className="relative z-10 text-center px-4">
            <h1 
              className="glitch mb-8"
              data-text="BEAST"
            >
              BEAST
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Willkommen in der Zukunft des Designs. Wir kreieren digitale Erfahrungen, 
              die deine Erwartungen sprengen und deine Träume zum Leben erwecken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('services')} 
                className="neon-button border-neon-green text-neon-green hover:shadow-neon-green"
              >
                Unsere Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="neon-button border-neon-pink text-neon-pink hover:shadow-neon-pink"
              >
                Projekt starten
              </button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-neon-green opacity-30 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-neon-pink opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-20 w-12 h-12 border-2 border-electric-blue opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">
                Über uns
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-neon-green to-neon-pink mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="neon-card p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Wer sind wir?</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Wir sind ein Team von kreativen Visionären und technischen Experten, 
                  die es lieben, Grenzen zu überschreiten. Mit einer Leidenschaft für 
                  Innovation und einem Auge für Details schaffen wir digitale Welten, 
                  die begeistern.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Unsere Mission? Deine Ideen in spektakuläre digitale Realitäten 
                  zu verwandeln, die nicht nur funktionieren, sondern auch Emotionen wecken.
                </p>
              </div>

              <div className="neon-card p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-electric-blue">Warum Beast?</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-neon-pink mr-3 text-xl">⚡</span>
                    <span>Blitzschnelle Umsetzung deiner Projekte</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-3 text-xl">🚀</span>
                    <span>Innovative Technologien und Trends</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-electric-blue mr-3 text-xl">🎯</span>
                    <span>Präzise Umsetzung deiner Vision</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-pink mr-3 text-xl">💡</span>
                    <span>Kreative Lösungen für komplexe Probleme</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-neon-green to-neon-pink bg-clip-text text-transparent">
                Unsere Services
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-electric-blue to-neon-green mx-auto mb-4"></div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Von der Idee bis zum fertigen Produkt - wir begleiten dich auf deiner digitalen Reise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Workspace Design */}
              <div className="neon-card p-8 rounded-lg group">
                <div className="text-4xl mb-4 text-neon-green group-hover:animate-glow-pulse">🎨</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Workspace Design</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Wir gestalten digitale Arbeitsräume, die nicht nur schön aussehen, 
                  sondern auch die Produktivität steigern. Von minimalistisch bis futuristisch - 
                  dein perfekter Workspace wartet.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• UI/UX Design</li>
                  <li>• Responsive Layouts</li>
                  <li>• Design Systeme</li>
                  <li>• Prototyping</li>
                </ul>
              </div>

              {/* Agent Workflows */}
              <div className="neon-card p-8 rounded-lg group">
                <div className="text-4xl mb-4 text-electric-blue group-hover:animate-glow-pulse">🤖</div>
                <h3 className="text-2xl font-bold mb-4 text-electric-blue">Agent Workflows</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Automatisierung ist die Zukunft. Wir entwickeln intelligente Agent-Workflows, 
                  die deine Prozesse optimieren und dir wertvolle Zeit schenken. 
                  Lass die KI für dich arbeiten!
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• KI-Integration</li>
                  <li>• Prozessautomatisierung</li>
                  <li>• Chatbot Entwicklung</li>
                  <li>• Workflow Optimierung</li>
                </ul>
              </div>

              {/* Full-Stack Development */}
              <div className="neon-card p-8 rounded-lg group md:col-span-2 lg:col-span-1">
                <div className="text-4xl mb-4 text-neon-pink group-hover:animate-glow-pulse">⚡</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-pink">Full-Stack Development</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Von der Datenbank bis zur Benutzeroberfläche - wir beherrschen den 
                  gesamten Tech-Stack. Schnell, skalierbar und sicher entwickeln wir 
                  deine Web-Anwendung nach den neuesten Standards.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• React/Next.js</li>
                  <li>• Node.js Backend</li>
                  <li>• Database Design</li>
                  <li>• Cloud Deployment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-electric-blue to-neon-green bg-clip-text text-transparent">
                Showcase
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-neon-pink to-electric-blue mx-auto mb-4"></div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Hier findest du bald unsere spektakulärsten Projekte und Erfolgsgeschichten
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Placeholder 1 */}
              <div className="neon-card p-8 rounded-lg group">
                <div className="bg-gradient-to-br from-neon-green/20 to-transparent h-48 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-6xl opacity-50">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-neon-green">E-Commerce Revolution</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Ein futuristischer Online-Shop mit KI-gestützter Produktempfehlung 
                  und immersiver AR-Produktvisualisierung.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs rounded">AI</span>
                  <span className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs rounded">AR</span>
                </div>
              </div>

              {/* Project Placeholder 2 */}
              <div className="neon-card p-8 rounded-lg group">
                <div className="bg-gradient-to-br from-electric-blue/20 to-transparent h-48 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-6xl opacity-50">💼</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-electric-blue">Smart Workspace</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Ein intelligentes Dashboard für Projektmanagement mit 
                  Echtzeitanalyse und automatisierten Workflows.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-electric-blue/20 text-electric-blue text-xs rounded">Dashboard</span>
                  <span className="px-2 py-1 bg-electric-blue/20 text-electric-blue text-xs rounded">Analytics</span>
                  <span className="px-2 py-1 bg-electric-blue/20 text-electric-blue text-xs rounded">Automation</span>
                </div>
              </div>

              {/* Project Placeholder 3 */}
              <div className="neon-card p-8 rounded-lg group md:col-span-2 lg:col-span-1">
                <div className="bg-gradient-to-br from-neon-pink/20 to-transparent h-48 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-6xl opacity-50">🎮</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-neon-pink">Gaming Platform</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Eine Next-Gen Gaming-Plattform mit Blockchain-Integration 
                  und immersiven VR-Erlebnissen.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-neon-pink/20 text-neon-pink text-xs rounded">Blockchain</span>
                  <span className="px-2 py-1 bg-neon-pink/20 text-neon-pink text-xs rounded">VR</span>
                  <span className="px-2 py-1 bg-neon-pink/20 text-neon-pink text-xs rounded">Gaming</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-400 mb-6">Mehr spektakuläre Projekte kommen bald!</p>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="neon-button border-neon-green text-neon-green hover:shadow-neon-green"
              >
                Dein Projekt besprechen
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-black/60">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">
                Lass uns sprechen!
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-neon-green to-neon-pink mx-auto mb-4"></div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Bereit für dein nächstes digitales Abenteuer? Schreib uns und lass uns gemeinsam etwas Großartiges erschaffen!
              </p>
            </div>

            <div className="neon-card p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot Field */}
                <input 
                  type="text" 
                  name="honeypot" 
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  style={{ display: 'none' }} 
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Dein Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg neon-input"
                      placeholder="Wie sollen wir dich nennen?"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      E-Mail Adresse *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg neon-input"
                      placeholder="deine@email.de"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Deine Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg neon-input resize-none"
                    placeholder="Erzähl uns von deinem Projekt! Was hast du vor? Welche Träume sollen wir Realität werden lassen?"
                  ></textarea>
                </div>

                {/* reCAPTCHA */}
                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={setRecaptchaToken}
                      theme="dark"
                    />
                  </div>
                )}

                {/* Status Message */}
                {formStatus && (
                  <div className={`text-center p-4 rounded-lg ${
                    formStatus.startsWith('success') 
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {formStatus.split(':')[1]}
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="neon-button border-neon-pink text-neon-pink hover:shadow-neon-pink disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading mr-2"></div>
                        Wird gesendet...
                      </>
                    ) : (
                      'Nachricht senden ⚡'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-green bg-clip-text text-transparent mb-4">
              BEAST
            </div>
            <p className="text-gray-400 mb-6">
              Digitale Träume. Futuristische Realitäten.
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-neon-green transition-colors">Impressum</a>
              <a href="#" className="hover:text-neon-green transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-neon-green transition-colors">AGB</a>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-gray-500 text-sm">
              © 2024 Beast Homepage. Alle Rechte vorbehalten.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}