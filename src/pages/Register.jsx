import code from '../../public/vertX-logo-bold.svg'
import { useState } from 'react'
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsbVS-SWSlJkaVQbcPOsTc7ZKufEN-cy0",
  authDomain: "vertx-71c23.firebaseapp.com",
  projectId: "vertx-71c23",
  storageBucket: "vertx-71c23.firebasestorage.app",
  messagingSenderId: "984539509498",
  appId: "1:984539509498:web:e4abdf21c492a301af4f43",
  measurementId: "G-5VXPBBVV94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const Register = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      // Redirect to dashboard or home page
      window.location.href = '/'
    } catch (error) {
      console.error(error.message);
      setError(error.message)
    } finally {
      setLoading(false)
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert("Google sign-in successful!");
      window.location.href = '/';
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const provider = new MicrosoftAuthProvider();
      await signInWithPopup(auth, provider);
      alert("Microsoft sign-in successful!");
      window.location.href = '/';
    } catch (error) {
      console.error("Microsoft sign-in error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <main className="bg-black text-white font-f2 min-h-screen flex flex-col">
    <title>vertX - Register</title>
    <div className="flex-grow flex items-center justify-center px-4 py-6">
      <div className="registration-container w-full max-w-4xl h-[90vh] md:h-[85vh] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          {/* Left side - Image Section */}
          <div className="w-full md:w-1/2 relative overflow-hidden hidden md:block image-section">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
            <img src={code} alt="Code Visualization" className='w-full h-full object-cover opacity-20' />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6 md:p-8">
                  <div className="text-4xl md:text-6xl mb-4 text-white/30">
                    <i className="fas fa-code"></i>
                  </div>
                  <h2 className="text-lg md:text-2xl font-bold text-white mb-3">Join Our Developer Community</h2>
                  <p className="text-xs md:text-sm text-gray-400 max-w-md mx-auto">
                    Connect with fellow developers and enhance your skills
                  </p>
                </div>
            </div>
          </div>

          {/* Right side - Register Section */}
          <div className="w-full md:w-1/2 bg-black p-6 md:p-8 flex flex-col justify-center border-l border-gray-800 overflow-y-hidden scrollbar-hide">
            
            <div className="flex items-center mb-6">
              <a href="/" className="flex items-center text-cyan-400 hover:text-cyan-300 transition">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
              </a>
            </div>
            
            <div className="text-center mb-6">
              <h1 className="text-xl md:text-3xl font-bold mb-2">Join vertX</h1>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="form-element">
                <label htmlFor="fullname" className="block text-xs md:text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="fullname" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 text-sm md:text-base"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="form-element">
                <label htmlFor="email" className="block text-xs md:text-sm font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 text-sm md:text-base"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="form-element">
                <label htmlFor="password" className="block text-xs md:text-sm font-medium mb-1">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 text-sm md:text-base"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="form-element flex items-center">
                <input 
                  id="terms" 
                  type="checkbox" 
                  className="w-3 h-3 md:w-4 md:h-4 text-white bg-gray-900 border-gray-700 rounded focus:ring-white accent-white"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-xs md:text-sm text-gray-300">I agree to the <a href="#" className="text-white hover:text-gray-300 underline">Terms</a> and <a href="#" className="text-white hover:text-gray-300 underline">Privacy Policy</a></label>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="form-element w-full bg-white text-black rounded-lg px-4 py-2 md:px-6 md:py-2 font-semibold hover:bg-gray-200 transition transform text-sm md:text-base flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
              
              {error && (
                <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400 text-xs md:text-sm">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 social-login">
                <button 
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="form-element w-full justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-xs md:text-sm font-medium text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  <i className="fab fa-google text-base md:text-lg"></i>
                  <span className="ml-2 mt-1 text-xs md:text-sm">Google</span>
                </button>
                
                <button 
                  onClick={handleMicrosoftSignIn}
                  disabled={loading}
                  className="form-element w-full py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-xs md:text-sm font-medium text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <i className="fab fa-microsoft text-base md:text-lg"></i>
                  <span className="ml-2 mt-1 text-xs md:text-sm">Microsoft</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs md:text-sm text-gray-400">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-white hover:text-gray-300 transition">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}