import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: ''
  })
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const recaptchaRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    // Honeypot-Check
    if (formData.honeypot) {
      setFormStatus({ type: 'error', message: 'Spam erkannt!' })
      setIsSubmitting(false)
      return
    }

    try {
      const recaptchaToken = await recaptchaRef.current.executeAsync()
      recaptchaRef.current.reset()

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken })
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Danke! Nachricht verschickt ✅' })
        setFormData({ name: '', email: '', message: '', honeypot: '' })
      } else {
        setFormStatus({ type: 'error', message: data.message || 'Fehler beim Versenden' })
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Verbindungsfehler. Bitte versuche es später noch einmal.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Head>
        <title>Beast Homepage - Neon Future Design</title>
        <meta name="description" content="Beast Homepage - Workspace Design & Agent Workflows mit Neon-Future-Style" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-neon-pink' : 'bg-transparent'
      }`}>
        <div className="container-custom flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold text-gradient">BEAST</div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('hero')} className="hover:text-neon-pink transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-neon-green transition-colors">About</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-neon-blue transition-colors">Services</button>
            <button onClick={() => scrollToSection('showcase')} className="hover:text-neon-purple transition-colors">Showcase</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-neon-pink transition-colors">Contact</button>
          </div>
          <div className="md:hidden">
            <button className="text-neon-pink text-2xl">☰</button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center neon-gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-green rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-blue rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          <div className="container-custom text-center relative z-10">
            <h1 className="glitch text-6xl md:text-8xl lg:text-9xl font-black mb-6" data-text="BEAST">
              BEAST
              <span aria-hidden="true">BEAST</span>
              <span aria-hidden="true">BEAST</span>
            </h1>
            <p className="text-xl md:text-3xl mb-4 text-gradient font-bold">
              Workspace Design & Agent Workflows
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-300">
              Willkommen in der Zukunft. Wir gestalten digitale Erlebnisse, die rocken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className="neon-button bg-neon-pink hover:bg-neon-pink/80 text-white font-bold py-4 px-8 rounded-lg shadow-neon-pink hover:shadow-neon-pink hover:scale-105 transition-all"
              >
                Let&apos;s Talk 🚀
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="neon-button border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-black font-bold py-4 px-8 rounded-lg hover:shadow-neon-green hover:scale-105 transition-all"
              >
                Unsere Services
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="gradient-bg">
          <div className="container-custom">
            <h2 className="text-5xl md:text-6xl font-black mb-12 text-center">
              <span className="text-gradient">Wer wir sind</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border-2 border-neon-purple/30 shadow-neon-purple/20 hover:shadow-neon-purple transition-all duration-300">
                <p className="text-xl md:text-2xl leading-relaxed mb-6 text-gray-300">
                  Hey! 👋 Wir sind <span className="text-neon-pink font-bold">BEAST</span> – ein Team, 
                  das digitale Experiences erschafft, die nicht nur funktionieren, sondern begeistern.
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-400">
                  Mit einer Mischung aus kreativem Design und technischer Expertise bringen wir 
                  deine Vision zum Leben. Ob <span className="text-neon-green font-semibold">Workspace Design</span>, 
                  <span className="text-neon-blue font-semibold"> Agent Workflows</span> oder komplett 
                  neue Projekte – wir lieben es, Grenzen zu sprengen.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-gray-400">
                  Unser Motto: <span className="text-neon-purple font-bold italic">Keine Langeweile. 
                  Nur Innovation.</span> 🔥
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-black">
          <div className="container-custom">
            <h2 className="text-5xl md:text-6xl font-black mb-16 text-center">
              <span className="text-gradient">Was wir machen</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="neon-card bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-neon-pink/30 hover:border-neon-pink group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-pink">Workspace Design</h3>
                <p className="text-gray-400 leading-relaxed">
                  Wir kreieren produktive und inspirierende Arbeitsumgebungen, 
                  die dein Team auf das nächste Level bringen. Modern, effizient, 
                  und mit Stil.
                </p>
              </div>

              {/* Service Card 2 */}
              <div className="neon-card bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-neon-green/30 hover:border-neon-green group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Agent Workflows</h3>
                <p className="text-gray-400 leading-relaxed">
                  Automatisierung, die funktioniert. Wir bauen intelligente Workflows, 
                  die repetitive Aufgaben eliminieren und dir mehr Zeit für das Wesentliche geben.
                </p>
              </div>

              {/* Service Card 3 */}
              <div className="neon-card bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-neon-blue/30 hover:border-neon-blue group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🚀</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-blue">Full-Stack Development</h3>
                <p className="text-gray-400 leading-relaxed">
                  Von der Idee bis zum Launch. Wir entwickeln moderne Web-Apps 
                  mit neuesten Technologien, die skalieren und performen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="gradient-bg">
          <div className="container-custom">
            <h2 className="text-5xl md:text-6xl font-black mb-16 text-center">
              <span className="text-gradient">Unsere Projekte</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Project Card 1 */}
              <div className="neon-card bg-gradient-to-br from-neon-pink/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-neon-pink/30 hover:border-neon-pink overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/0 to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-6">🎯</div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Project Alpha</h3>
                  <p className="text-gray-300 mb-4">
                    Ein revolutionäres Dashboard für Workflow-Management mit AI-Integration.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-neon-pink/20 text-neon-pink px-3 py-1 rounded-full text-sm">Next.js</span>
                    <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm">AI</span>
                    <span className="bg-neon-blue/20 text-neon-blue px-3 py-1 rounded-full text-sm">React</span>
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="neon-card bg-gradient-to-br from-neon-green/20 to-emerald-900/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-neon-green/30 hover:border-neon-green overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/0 to-neon-green/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-6">💎</div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Project Beta</h3>
                  <p className="text-gray-300 mb-4">
                    E-Commerce-Plattform mit modernster UX und blitzschneller Performance.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm">TypeScript</span>
                    <span className="bg-neon-blue/20 text-neon-blue px-3 py-1 rounded-full text-sm">Tailwind</span>
                    <span className="bg-neon-purple/20 text-neon-purple px-3 py-1 rounded-full text-sm">Stripe</span>
                  </div>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="neon-card bg-gradient-to-br from-neon-blue/20 to-cyan-900/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-neon-blue/30 hover:border-neon-blue overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-6">🌐</div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Project Gamma</h3>
                  <p className="text-gray-300 mb-4">
                    Social-Media-Analytics-Tool mit Echtzeit-Datenvisualisierung.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-neon-blue/20 text-neon-blue px-3 py-1 rounded-full text-sm">D3.js</span>
                    <span className="bg-neon-pink/20 text-neon-pink px-3 py-1 rounded-full text-sm">GraphQL</span>
                    <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm">Node.js</span>
                  </div>
                </div>
              </div>

              {/* Project Card 4 */}
              <div className="neon-card bg-gradient-to-br from-neon-purple/20 to-violet-900/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-neon-purple/30 hover:border-neon-purple overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/0 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-6">🤖</div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Project Delta</h3>
                  <p className="text-gray-300 mb-4">
                    Chatbot-Framework für Kundenservice mit NLP und Multi-Channel-Support.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-neon-purple/20 text-neon-purple px-3 py-1 rounded-full text-sm">Python</span>
                    <span className="bg-neon-pink/20 text-neon-pink px-3 py-1 rounded-full text-sm">NLP</span>
                    <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm">WebSocket</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-black min-h-screen flex items-center">
          <div className="container-custom w-full">
            <h2 className="text-5xl md:text-6xl font-black mb-16 text-center">
              <span className="text-gradient">Lass uns reden</span>
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border-2 border-neon-pink/30 shadow-neon-pink/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot Field (hidden) */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-neon-green">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="Dein Name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-neon-blue">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="deine@email.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-neon-purple">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full resize-none"
                      placeholder="Erzähl uns von deinem Projekt..."
                    />
                  </div>

                  {/* reCAPTCHA */}
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'your-site-key-here'}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="neon-button w-full bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white font-bold py-4 px-8 rounded-lg shadow-neon-pink hover:shadow-neon-purple hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden 🚀'}
                  </button>

                  {/* Status Messages */}
                  {formStatus.message && (
                    <div className={`p-4 rounded-lg text-center font-semibold ${
                      formStatus.type === 'success' 
                        ? 'bg-neon-green/20 text-neon-green border-2 border-neon-green' 
                        : 'bg-red-500/20 text-red-400 border-2 border-red-500'
                    }`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-2 border-neon-pink/30 py-8">
        <div className="container-custom text-center">
          <p className="text-gray-400 mb-2">
            © 2025 <span className="text-gradient font-bold">BEAST</span> - Made with 💜 and lots of Neon
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-neon-pink hover:text-neon-green transition-colors">Twitter</a>
            <a href="#" className="text-neon-blue hover:text-neon-purple transition-colors">GitHub</a>
            <a href="#" className="text-neon-green hover:text-neon-pink transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  )
}
