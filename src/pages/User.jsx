import { useState, useEffect } from 'react'
import gsap from 'gsap'
import logo from "../../public/vertX-logo-bold.svg"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { Home } from '../components/Home'
import { Shop } from '../components/Shop'
import { Courses } from '../components/Courses'
import { Customize } from '../components/Customize'

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

export const User = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true)
        setUser({
          name: currentUser.displayName || 'User',
          email: currentUser.email,
          avatar: currentUser.photoURL || `https://placehold.co/40x40?text=${currentUser.displayName ? currentUser.displayName.charAt(0) : 'U'}`
        });
      } else {
        setIsLoggedIn(false)
        setUser(null);
      }
    });

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setShowUserMenu(false);
        setShowLogoutConfirm(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setShowUserMenu(false);
        setShowLogoutConfirm(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);

    // Close mobile menu when a link inside it is clicked
    const handleMobileClick = (e) => {
      const link = e.target.closest && e.target.closest('a');
      if (!link) return;
      const menu = document.getElementById('mobile-menu');
      if (menu && menu.contains(link)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleMobileClick);

    // Focus first link when menu opens
    if (menuOpen) {
      setTimeout(() => {
        const el = document.querySelector('#mobile-menu a');
        if (el) el.focus();
      }, 50);
    }

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleMobileClick);
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setShowUserMenu(false);
        setShowLogoutConfirm(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Smooth transition animation (without header animation)
  const handlePageChange = (newPage) => {
    gsap.to('.page-transition', {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentPage(newPage);
        gsap.to('.page-transition', {
          opacity: 1,
          duration: 0.3
        });
      }
    });
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'courses':
        return <Courses />;
      case 'customize':
        return <Customize />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="w-full h-20 flex items-center justify-between px-4 md:px-6 border-b border-gray-900 fixed top-0 z-50 bg-black/80 backdrop-blur-sm">
        <img src={logo} alt="vertX Logo" className="w-12 md:w-16" />
        <nav className="hidden md:flex gap-6 items-center">
          <ul className="flex gap-4">
            {[
              { id: 'home', name: 'Home' },
              { id: 'shop', name: 'Shop' },
              { id: 'courses', name: 'Courses' },
              { id: 'customize', name: 'Customize' }
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => handlePageChange(tab.id)}
                  className={`font-semibold hover:text-gray-300 transition-colors duration-200 relative ${
                    currentPage === tab.id ? 'text-white' : 'text-white'
                  }`}
                >
                  {tab.name}
                  {currentPage === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden ml-2 p-2 rounded-md" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div className="flex gap-3 mr-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* User Profile Button - Mobile */}
              <button 
                className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img 
                  src={user?.avatar} 
                  alt="User" 
                  className="w-8 h-8 rounded-full"
                />
              </button>
              
              {/* User Profile Button - Desktop */}
              <button 
                className="md:flex p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img 
                  src={user?.avatar} 
                  alt="User" 
                  className="w-8 h-8 rounded-full"
                />
              </button>
              
              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-[450px] mr-10 w-64 bg-gray-900 rounded-lg shadow-lg py-2 z-50 border border-gray-800 max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                  
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-800 transition-colors">My Profile</a>
                  <a href="/orders" className="block px-4 py-2 hover:bg-gray-800 transition-colors">My Orders</a>
                  <a href="/payments" className="block px-4 py-2 hover:bg-gray-800 transition-colors">Payment Methods</a>
                  <a href="/history" className="block px-4 py-2 hover:bg-gray-800 transition-colors">Purchase History</a>
                  <a href="/wishlist" className="block px-4 py-2 hover:bg-gray-800 transition-colors">Wishlist</a>
                  <a href="/settings" className="block px-4 py-2 hover:bg-gray-800 transition-colors">Account Settings</a>
                  
                  <div className="border-t border-gray-800 mt-2">
                    <button 
                      onClick={confirmLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
              
              {/* Logout Confirmation Modal */}
              {showLogoutConfirm && (
                <div className="fixed inset-0 mt-28 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                  <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full border border-gray-800">
                    <h3 className="text-lg font-bold mb-2">Confirm Logout</h3>
                    <p className="text-gray-300 mb-4">Are you sure you want to log out of your account?</p>
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={cancelLogout}
                        className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href='/register'><button className="px-4 py-2 max-md:hidden text-white rounded-full font-semibold hover:text-white transition transform relative overflow-hidden text-sm">
                Register
              </button></a>
              <a href='/login'><button className="px-4 py-2 max-md:hidden bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition transform text-sm">
                Login
              </button></a>
            </>
          )}
        </div>
      </header>

      {/* Mobile nav panel */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden fixed bg-black/95 z-40 p-6 mt-20 w-full">
          <ul className="flex flex-col gap-4 text-lg">
            {[
              { id: 'home', name: 'Home' },
              { id: 'shop', name: 'Shop' },
              { id: 'courses', name: 'Courses' },
              { id: 'customize', name: 'Customize' }
            ].map((tab) => (
              <li key={tab.id}>
                <button 
                  onClick={() => {
                    handlePageChange(tab.id);
                    setMenuOpen(false);
                  }}
                  className={`${tab.id === currentPage ? 'text-white' : 'text-white'} block w-full text-left`}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-white/10 pt-4 flex flex-col gap-3">
            <a href="/shop" className="block px-4 py-3 bg-white/5 rounded-lg text-white text-center">Shop Dev Merch</a>
            <a href="/courses" className="block px-4 py-3 bg-white/5 rounded-lg text-white text-center">Learn to Build</a>
            {isLoggedIn ? (
              <button 
                onClick={() => {
                  setShowLogoutConfirm(true);
                  setMenuOpen(false);
                }}
                className="block px-4 py-3 border border-white/10 rounded-lg text-white text-center"
              >
                Logout
              </button>
            ) : (
              <>
                <a href="/register" className="block px-4 py-3 bg-white rounded-lg text-black text-center font-semibold">Register</a>
                <a href="/login" className="block px-4 py-3 border border-white/10 rounded-lg text-white text-center">Login</a>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content with Smooth Transitions */}
      <main className="flex-grow pt-20">
        <div className="page-transition transition-opacity duration-300">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};