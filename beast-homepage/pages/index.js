import { useState, useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check honeypot
    if (formData.honeypot) {
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Get reCAPTCHA token
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Danke! Nachricht verschickt ✅')
        setFormData({
          name: '',
          email: '',
          message: '',
          honeypot: ''
        })
      } else {
        setSubmitMessage(data.error || 'Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal.')
      }
    } catch (error) {
      setSubmitMessage('Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Beast Homepage - Neon Future Design</title>
        <meta name="description" content="Beast Homepage - Workspace Design & Agent Workflows im Neon-Future-Style" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-neon-pink neon-text">BEAST</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-white hover:text-neon-green transition-colors">Home</a>
              <a href="#about" className="text-white hover:text-neon-green transition-colors">About</a>
              <a href="#services" className="text-white hover:text-neon-green transition-colors">Services</a>
              <a href="#showcase" className="text-white hover:text-neon-green transition-colors">Showcase</a>
              <a href="#contact" className="text-white hover:text-neon-green transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-neon-pink/20 via-electric-blue/20 to-neon-green/20 animate-gradient"></div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="glitch" data-text="BEAST">BEAST</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Workspace Design & Agent Workflows im krassen Neon-Future-Style
          </p>
          <a 
            href="#contact" 
            className="inline-block px-8 py-4 bg-neon-pink text-black font-bold rounded-lg hover:shadow-neon-pink hover:scale-105 transition-all duration-300"
          >
            Let's Go! 🚀
          </a>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-neon-pink/30 rounded-full blur-3xl animate-pulse-neon"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-electric-blue/30 rounded-full blur-3xl animate-pulse-neon animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-green/30 rounded-full blur-3xl animate-pulse-neon animation-delay-4000"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-neon-green neon-text">
            Über Beast
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-white/80 mb-6">
              Hey! Wir sind Beast - deine Crew für kranke Workspace Designs und smoothe Agent Workflows. 
              Wir bringen den Future-Vibe in deine digitale Welt und machen aus langweiligen Tools echte Eye-Catcher.
            </p>
            <p className="text-lg text-white/80">
              Egal ob du einen fresh Workspace brauchst oder deine Agents auf Next Level bringen willst - 
              wir haben den Style und das Know-how, um deine Vision Realität werden zu lassen. No Cap! 🔥
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900/50 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-electric-blue neon-text">
            Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Service Card 1 */}
            <div className="bg-black/80 border border-neon-pink/50 rounded-lg p-6 hover:border-neon-pink hover:shadow-neon-pink/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-neon-pink mb-4">Workspace Design</h3>
              <p className="text-white/70">
                Dein Workspace sieht aus wie aus den 90ern? Wir geben ihm den Neon-Glow und machen ihn zum Hingucker!
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-black/80 border border-neon-green/50 rounded-lg p-6 hover:border-neon-green hover:shadow-neon-green/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-neon-green mb-4">Agent Workflows</h3>
              <p className="text-white/70">
                Deine Agents arbeiten noch mit Stone-Age-Workflows? Zeit für ein Upgrade auf Lightspeed!
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-black/80 border border-electric-blue/50 rounded-lg p-6 hover:border-electric-blue hover:shadow-neon-blue/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-electric-blue mb-4">Performance Boost</h3>
              <p className="text-white/70">
                Lahme Performance? Wir tunen deine Systeme auf Maximum Power und bringen alles zum Fliegen!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-20 bg-black relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-neon-pink neon-text">
            Showcase
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-neon-green hover:shadow-neon-green/30 transition-all duration-300 hover:scale-105"
              >
                <div className="h-48 bg-gradient-to-br from-neon-pink/20 via-electric-blue/20 to-neon-green/20 animate-gradient"></div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">Projekt {item}</h3>
                  <p className="text-white/60 text-sm">Coming Soon...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900/50 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-neon-green neon-text">
            Contact
          </h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="ohnohoney"
                tabIndex="-1"
                autoComplete="off"
              />

              <div>
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">Nachricht</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-neon-green text-black font-bold rounded-lg hover:shadow-neon-green hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Absenden 🚀'}
              </button>

              {submitMessage && (
                <div className={`text-center mt-4 ${submitMessage.includes('✅') ? 'text-neon-green' : 'text-red-500'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/60">© 2024 Beast Homepage. Built with 💜 and Neon-Power.</p>
        </div>
      </footer>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  )
}