import logo from '../../public/vertX-logo-bold.svg'
import moon from '../../public/moon-photoroom.png'
import shirt from '../../public/shirt.png'
import code from '../../public/programmer.png'
import gsap from 'gsap'
import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation
    gsap.from(".hero-image-top", {
      y: -50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
      stagger: 0.2
    })

    gsap.from(".hero-content", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    })

    gsap.from(".hero-image-bottom", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
      stagger: 0.2
    })

    // Programmer identity section
    gsap.from(".identity-title", {
      scrollTrigger: {
        trigger: ".programmer-identity",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    })

    gsap.from(".identity-text", {
      scrollTrigger: {
        trigger: ".programmer-identity",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      delay: 0.3,
      duration: 1.2,
      ease: "back.out(1.7)"
    })

    gsap.from(".programmer-image", {
      scrollTrigger: {
        trigger: ".programmer-identity",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(2)"
    })

    gsap.from(".identity-keywords span", {
      scrollTrigger: {
        trigger: ".programmer-identity",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "back.out(1.7)"
    })

    // Shirt card section
    gsap.from(".shirt-card-item", {
      scrollTrigger: {
        trigger: ".shirt-card-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1.2,
      ease: "back.out(2)"
    })

    gsap.from(".shirt-cta-button", {
      scrollTrigger: {
        trigger: ".shirt-card-section",
        start: "top 80%",
      },
      y: 20,
      opacity: 0,
      delay: 1.2,
      duration: 1.2,
      ease: "back.out(2)"
    })

    // Mugs section
    gsap.from('.mug-card-item', {
      scrollTrigger: {
        trigger: '.mugs-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1.2,
      ease: "back.out(2)"
    })

    gsap.from('.mug-cta-button', {
      scrollTrigger: {
        trigger: '.mugs-section',
        start: 'top 80%',
      },
      y: 20,
      opacity: 0,
      delay: 1.2,
      duration: 1.2,
      ease: "back.out(2)"
    })

    // Courses section
    gsap.from('.course-card-item', {
      scrollTrigger: { trigger: '.courses-section', start: 'top 80%' },
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1.2,
      ease: 'back.out(2)'
    })

    gsap.from('.course-cta-button', {
      scrollTrigger: { trigger: '.courses-section', start: 'top 85%' },
      y: 20,
      opacity: 0,
      delay: 1.2,
      duration: 1.2,
      ease: 'back.out(2)'
    })

    // Footer section
    gsap.from('.footer-section', {
      scrollTrigger: {
        trigger: '.footer-section',
        start: 'top 95%',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(2)"
    })
  })

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)

    // close mobile menu when a link inside it is clicked
    const onMobileClick = (e) => {
      const link = e.target.closest && e.target.closest('a')
      if (!link) return
      const menu = document.getElementById('mobile-menu')
      if (menu && menu.contains(link)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', onMobileClick)

    // focus first link when menu opens
    if (menuOpen) {
      setTimeout(() => {
        const el = document.querySelector('#mobile-menu a')
        if (el) el.focus()
      }, 50)
    }

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('click', onMobileClick)
    }
  }, [menuOpen])

  return (
    <main className="bg-black text-white font-f2 min-h-screen">
      <title>vertX - Home</title>
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden flex flex-col items-center justify-center px-4 pb-5 pt-20 bg-gradient-to-t from-gray-900 via-black to-gray-950">
        {/* Top row images */}
        <div className="flex justify-around w-full mb-8 gap-96">
          <img src={moon} alt="Moon" className="h-52 rotate-12 hero-image-top max-md:hidden" />
          <img src={moon} alt="Moon" className="h-52 -rotate-12 hero-image-top max-md:hidden" />
        </div>
        
        {/* Center content */}
        <div className="hero-content text-center">
          <h1 className='font-f1 text-6xl md:text-8xl font-extrabold tracking-widest max-md:text-5xl'>vertX.</h1>
          <p className="mt-4 text-md text-gray-300 max-w-2xl">Wear Your Code. Premium Merch for Developers.</p>
          <button className="mt-8 px-6 py-3 absolute w-max left-1/2 -translate-x-1/2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition transform hover:scale-105">
            Explore the Collection
          </button>
        </div>
        
        {/* Bottom row images */}
        <div className="flex justify-around w-full mt-8">
          <img src={moon} alt="Moon" className="h-52 rotate-12 hero-image-bottom max-md:hidden" />
          <img src={moon} alt="Moon" className="h-52 -rotate-12 hero-image-bottom max-md:hidden" />
        </div>
      </section>

      {/* Programmer Identity Section */}
      <section className="programmer-identity py-20 px-4 md:px-6 border-b border-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="identity-title text-center text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Built for Coders Who Think in Color
          </h2>
          <p className="identity-text text-lg text-center text-gray-300 leading-relaxed mb-10">
            You debug in the dark. You sketch ideas in the margins. You build things that feel alive.  
            vertX is for the ones who see beauty in logic, and emotion in every pixel.
          </p>

          <img src={code} alt="Programmer" className='programmer-image w-full max-w-xl h-auto rounded-xl mb-10 mx-auto md:ml-36' />

          <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-sm font-semibold">
            {["React", "GSAP", "Tailwind", "Syntax", "Flow", "Craft", "Dark Mode", "Precision", "Emotion"].map((word) => (
              <span
                key={word}
                className="identity-keyword px-3 md:px-4 py-2 bg-slate-950/70 rounded-full border-2 border-gray-900 cursor-default hover:border-white transition-colors duration-300"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Shirt Card Section */}
      <section className="shirt-card-section py-16 border-b border-gray-900">
        <div className='w-full max-w-6xl px-4 md:px-6 mx-auto'>
          <h1 className='text-3xl md:text-4xl font-bold text-center mb-4'>Wear What You Code</h1>
          <p className="text-center text-gray-400 mb-12">Premium merchandise for developers</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, index) => (
              <article 
                key={index} 
                className="shirt-card-item group card-lift relative w-full h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden shadow-lg bg-black border border-gray-900 transform transition-all duration-500"
              >
                <div className="absolute inset-0">
                  <img
                    src={shirt}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-left">
                  <div className="flex items-start justify-between">
                    <h3 className="text-base sm:text-lg font-semibold">Product {index + 1}</h3>
                    <div className="text-lg font-bold">$28</div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 mt-2">Description for product {index + 1}</p>

                  <div className="mt-3 flex flex-wrap items-center justify-start gap-2 sm:gap-3">
                    <button className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs sm:text-sm">View</button>
                    <button className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs sm:text-sm">❤</button>
                    <button className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs sm:text-sm">Add to cart</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button className="shirt-cta-button px-6 py-3 mt-12 md:mt-24 mx-auto block border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition transform hover:scale-105 text-sm md:text-base">
            See More Shirts
          </button>
        </div>
      </section>

      {/* Mugs Section */}
      <section className="mugs-section py-16 border-b border-gray-900 bg-black">
        <div className='w-full max-w-6xl px-4 md:px-6 mx-auto'>
          <h1 className='text-3xl md:text-4xl font-bold text-center mb-4'>Mug Collection</h1>
          <p className="text-center text-gray-400 mb-12">Perfect companions for your coding sessions</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <article 
                key={index} 
                className="mug-card-item group card-lift relative w-full h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden shadow-lg bg-black border border-gray-900 transform transition-all duration-500"
              >
                <div className="absolute inset-0">
                  <img
                    src={shirt}
                    alt={`Mug ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-left">
                  <div className="flex items-start justify-between">
                    <h3 className="text-base sm:text-lg font-semibold">Mug {index + 1}</h3>
                    <div className="text-lg font-bold">$15</div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 mt-2">Description for mug {index + 1}</p>

                  <div className="mt-3 flex flex-wrap items-center justify-start gap-2 sm:gap-3">
                    <button className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs sm:text-sm">View</button>
                    <button className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs sm:text-sm">❤</button>
                    <button className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs sm:text-sm">Add to cart</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button className="mug-cta-button px-6 py-3 mt-12 md:mt-24 mx-auto block border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition transform hover:scale-105 text-sm md:text-base">
            See More Mugs
          </button>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses-section py-16">
        <div className='w-full max-w-6xl px-4 md:px-6 mx-auto'>
          <h1 className='text-3xl md:text-4xl font-bold text-center mb-4'>Learn & Grow</h1>
          <p className="text-center text-gray-400 mb-12">Master cutting-edge skills with our courses</p>

          <div className="course-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <article
                key={index}
                className="course-card-item group card-lift relative w-full h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden shadow-lg bg-black border border-gray-900 transition-all duration-500"
              >
                <div className="absolute inset-0">
                  <img
                    src={shirt}
                    alt={`Course ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/28 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-left">
                  <div className="flex items-start justify-between">
                    <h3 className="text-base sm:text-lg font-semibold">Course {index + 1}</h3>
                    <div className="text-lg font-bold">$39</div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 mt-2">Description for course {index + 1}</p>

                  <div className="mt-3 flex flex-wrap items-center justify-start gap-2 sm:gap-3">
                    <button className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs sm:text-sm">View</button>
                    <button className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs sm:text-sm">❤</button>
                    <button className="px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs sm:text-sm">Add to cart</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button className="course-cta-button px-6 py-3 mt-12 md:mt-24 mx-auto block border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition transform hover:scale-105 text-sm md:text-base">
            See More Courses
          </button>
        </div>
      </section>
      
      {/* Contact Section - Black and White Only */}
      <section className="contact-section py-16 bg-black">
        <div className='w-full max-w-4xl px-4 md:px-6 mx-auto'>
          <h1 className='contact-element text-3xl md:text-4xl font-bold text-center mb-4'>Get In Touch</h1>
          <p className="contact-element text-center text-gray-400 mb-12">We'd love to hear from you</p>

          <div className="contact-element bg-black text-white rounded-xl p-6 md:p-8 border border-gray-900 transform transition-all duration-500 hover:shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-black border-2 border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-black border-2 border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-black border-2 border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-black border-2 border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full px-3 py-2 bg-white/10 text-white rounded-full border border-white/20 font-semibold hover:bg-white hover:text-black transition text-sm md:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section py-12 border-t border-gray-900 max-md:text-center">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src={logo} alt="vertX Logo" className="w-16 mb-4 max-md:left-1/2 max-md:absolute max-md:-translate-x-1/2" />
              <p className="text-gray-400 text-sm max-md:mt-28">
                Building the future of developer tools and community.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/shop" className="hover:text-white transition">Merchandise</a></li>
                <li><a href="/courses" className="hover:text-white transition">Courses</a></li>
                <li><a href="#" className="hover:text-white transition">Tools</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/about" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition">Discord</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-900 mt-24 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 vertX. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}