import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import logo from "../../public/vertX-logo-bold.svg"

try { gsap.registerPlugin(ScrollTrigger) } catch (e) {}

export const Customize = () => {
  useGSAP(() => {
    // Animation for the entire customize page

    gsap.from(".customize-container", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });

    // Animation for the heading
    gsap.from("h1", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out"
    });

    // Animation for the coming soon message
    gsap.from(".coming-soon", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "power2.out"
    });

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
  }, []);

  return (
    <main className="bg-black text-white font-f2 min-h-screen flex flex-col">
      <title>vertX - Customize</title>

      <div className="flex-grow flex items-center justify-center px-4 py-20 mt-20">
        <div className="customize-container w-full max-w-6xl flex flex-col">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-lime-400">Customize Your Experience</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Personalize your vertX products with our customization tools
            </p>
          </div>

          {/* Coming Soon Section */}
          <div className="coming-soon bg-gradient-to-r from-gray-900 to-black border border-lime-400 rounded-2xl p-8 md:p-12 text-center mb-16">
            <div className="inline-block bg-lime-400 text-black px-6 py-2 rounded-full mb-6 font-bold">
              COMING SOON
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-lime-400">3D Customization Tools</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              Soon you'll be able to design and customize your own vertX merchandise including mugs, shirts, and courses with our powerful 3D editor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-500 transition transform hover:scale-105">
                Notify Me When Ready
              </button>
              <button className="px-6 py-3 bg-gray-900 text-lime-400 border border-lime-400 font-semibold rounded-full hover:bg-lime-400 hover:text-black transition transform hover:scale-105">
                View Examples
              </button>
            </div>
          </div>

          {/* 3D Model Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mug Card */}
            <div className="model-card bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-lime-400 transition-all duration-300 transform hover:scale-105">
              <div className="p-6">
                <div className="w-full h-48 bg-gradient-to-br from-lime-900/30 to-black rounded-lg flex items-center justify-center mb-4">
                  <div className="text-5xl text-lime-400">
                    <i className="fas fa-mug-hot"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-lime-400">Custom Mug</h3>
                <p className="text-gray-400 mb-4">
                  Design your own personalized mug with custom artwork
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lime-400 font-bold">$24.99</span>
                  <button className="px-4 py-2 bg-lime-400 text-black rounded-full text-sm font-semibold hover:bg-lime-500 transition">
                    Customize
                  </button>
                </div>
              </div>
            </div>

            {/* Shirt Card */}
            <div className="model-card bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-lime-400 transition-all duration-300 transform hover:scale-105">
              <div className="p-6">
                <div className="w-full h-48 bg-gradient-to-br from-lime-900/30 to-black rounded-lg flex items-center justify-center mb-4">
                  <div className="text-5xl text-lime-400">
                    <i className="fas fa-tshirt"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-lime-400">Custom Shirt</h3>
                <p className="text-gray-400 mb-4">
                  Create your unique t-shirt design with our 3D editor
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lime-400 font-bold">$34.99</span>
                  <button className="px-4 py-2 bg-lime-400 text-black rounded-full text-sm font-semibold hover:bg-lime-500 transition">
                    Customize
                  </button>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="model-card bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-lime-400 transition-all duration-300 transform hover:scale-105">
              <div className="p-6">
                <div className="w-full h-48 bg-gradient-to-br from-lime-900/30 to-black rounded-lg flex items-center justify-center mb-4">
                  <div className="text-5xl text-lime-400">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-lime-400">Course Materials</h3>
                <p className="text-gray-400 mb-4">
                  Customize learning materials for your personal development
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lime-400 font-bold">Free</span>
                  <button className="px-4 py-2 bg-lime-400 text-black rounded-full text-sm font-semibold hover:bg-lime-500 transition">
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
              <div className="w-16 h-16 bg-lime-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-paint-brush text-lime-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-lime-400">Creative Design</h3>
              <p className="text-gray-400">
                Unleash your creativity with our intuitive 3D design tools
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
              <div className="w-16 h-16 bg-lime-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-sync-alt text-lime-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-lime-400">Real-time Preview</h3>
              <p className="text-gray-400">
                See your designs come to life instantly with real-time rendering
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
              <div className="w-16 h-16 bg-lime-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shopping-cart text-lime-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-lime-400">Easy Ordering</h3>
              <p className="text-gray-400">
                Simple checkout process to bring your custom designs to life
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 px-4 md:px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src={logo} alt="vertX Logo" className="w-12 md:w-16 mb-4" />
              <p className="text-gray-400 text-sm md:text-base">Building the future of developer education and community.</p>
            </div>
            
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="text-gray-400 hover:text-lime-400 transition text-sm md:text-base">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-lime-400 transition text-sm md:text-base">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-lime-400 transition text-sm md:text-base">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-lime-400 transition text-sm md:text-base">Discord</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-xs md:text-sm">
            <p>© 2025 vertX. All rights reserved.</p>
            <div className="mt-2 flex justify-center gap-4 md:gap-6">
              <a href="#" className="hover:text-lime-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-lime-400 transition">Terms of Service</a>
              <a href="#" className="hover:text-lime-400 transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}