import logo from '../../public/vertX-logo-bold.svg'
import { useState, useEffect } from 'react'
import img1 from '../../public/course2.png'
import img2 from '../../public/course2.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

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

export const Courses = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Mock course data
    const courses = [
        {
            id: 1,
            title: "React Mastery",
            instructor: "Alex Johnson",
            description: "Master React fundamentals and advanced patterns",
            price: "$99",
            image: img1,
            category: "Frontend",
            duration: "8 weeks",
            level: "Intermediate"
        },
        {
            id: 2,
            title: "Node.js Backend Development",
            instructor: "Sarah Williams",
            description: "Build scalable server-side applications with Node.js",
            price: "$129",
            image: img2,
            category: "Backend",
            duration: "10 weeks",
            level: "Advanced"
        },
        {
            id: 3,
            title: "UI/UX Design Fundamentals",
            instructor: "Michael Chen",
            description: "Learn design principles for modern web applications",
            price: "$79",
            image: img1,
            category: "Design",
            duration: "6 weeks",
            level: "Beginner"
        },
        {
            id: 4,
            title: "Python for Data Science",
            instructor: "Emma Rodriguez",
            description: "Data analysis and visualization with Python",
            price: "$149",
            image: img2,
            category: "Data Science",
            duration: "12 weeks",
            level: "Intermediate"
        },
        {
            id: 5,
            title: "Mobile App Development",
            instructor: "David Kim",
            description: "Build cross-platform apps with React Native",
            price: "$159",
            image: img1,
            category: "Mobile",
            duration: "10 weeks",
            level: "Advanced"
        },
        {
            id: 6,
            title: "Cloud Architecture",
            instructor: "James Wilson",
            description: "Design and deploy cloud solutions on AWS & Azure",
            price: "$199",
            image: img2,
            category: "Cloud",
            duration: "14 weeks",
            level: "Expert"
        }
    ];

    // Categories
    const categories = ['All', 'Frontend', 'Backend', 'Design', 'Data Science', 'Mobile', 'Cloud'];

    // GSAP animations
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        gsap.fromTo('.Hero h1', {y: -50, opacity: 0}, {y: 0, opacity: 1, duration: 1, ease: 'power2.out'});
        gsap.fromTo('.Hero p', {y: -30, opacity: 0}, {y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out'});
        gsap.fromTo('.Hero button', {y: -20, opacity: 0}, {y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out'});
        gsap.fromTo('.images', {opacity: 0}, {opacity: 1, duration: 1, delay: 0.7, ease: 'power2.out'});
        
        // Text color animation
        gsap.fromTo('.center-text',
            { color: 'black' },
            {
                color: '#00ffff',
                scrollTrigger: {
                    trigger: '.center-text',
                    start: 'top 70%',
                    end: 'bottom 20%',
                    scrub: true,
                }
            }
        );
        
        // Image movement animations
        gsap.fromTo('.image-left', 
            { x: 150 },
            {
                x: -450,
                scrollTrigger: {
                    trigger: '.image-left',
                    start: 'top 80%',
                    end: 'bottom 50%',
                    scrub: true,
                }
            }
        );

        gsap.fromTo('.image-right', 
            { x: -150 },
            {
                x: 450,
                scrollTrigger: {
                    trigger: '.image-right',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: true,
                }
            }
        );

        gsap.from(".categories", {
            y: 50,
            stagger: 0.2,
            duration: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: '.categories',
                start: "top 85%"
            }
        })

        gsap.from(".course-card", {
            y: 50,
            stagger: 0.2,
            duration: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: '.categories',
                start: "top 70%"
            }
        })

        gsap.from(".dev-talking", {
            y: 50,
            stagger: 0.2,
            duration: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: '.categories',
                start: "top 70%"
            }
        })

        gsap.from(".questions", {
            y: 50,
            stagger: 0.2,
            duration: 1,
            opacity: 0,
            scrollTrigger: {
                trigger: '.categories',
                start: "top 70%"
            }
        })

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
    });

    // Check authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setIsLoggedIn(true);
                setUser({
                    name: currentUser.displayName || 'User',
                    email: currentUser.email,
                    avatar: currentUser.photoURL || `https://placehold.co/40x40?text=${currentUser.displayName ? currentUser.displayName.charAt(0) : 'U'}`
                });
            } else {
                setIsLoggedIn(false);
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

        // close mobile menu when a link inside it is clicked
        const handleMobileClick = (e) => {
            const link = e.target.closest && e.target.closest('a');
            if (!link) return;
            const menu = document.getElementById('mobile-menu');
            if (menu && menu.contains(link)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', handleMobileClick);

        // focus first link when menu opens
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

    // Filter courses based on selected category
    const filteredCourses = selectedCategory === 'All' 
        ? courses 
        : courses.filter(course => course.category === selectedCategory);

    // Cart functions
    const addToCart = (course) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === course.id);
            if (existingItem) {
                return prev.map(item => 
                    item.id === course.id 
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
            }
            return [...prev, {...course, quantity: 1}];
        });
    };

    const removeFromCart = (courseId) => {
        setCartItems(prev => prev.filter(item => item.id !== courseId));
    };

    const updateQuantity = (courseId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(courseId);
            return;
        }
        setCartItems(prev => 
            prev.map(item => 
                item.id === courseId 
                    ? {...item, quantity: newQuantity}
                    : item
            )
        );
    };

    const cartTotal = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return total + (price * item.quantity);
    }, 0);

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

    return (
        <main className="bg-black text-white font-f2 overflow-x-hidden min-h-screen flex flex-col">
            <title>vertX - Courses</title>

            {/* Mobile nav panel */}
            {menuOpen && (
                <div id="mobile-menu" className="md:hidden relative bg-black/95 z-40 p-6 mt-20">
                    <ul className="flex flex-col gap-4 text-lg">
                        {["Shop", "Courses", "Customize"].map((tab) => (
                            <li key={tab}><a href={`/${tab.toLowerCase()}`} className={`${tab === 'Courses' ? 'text-cyan-300' : 'text-white'} block`}>{tab}</a></li>
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

            {/* Hero Section */}
            <div className="Hero flex flex-col md:flex-col items-center justify-center min-h-screen pt-20 px-4 md:px-6 bg-gradient-to-t from-gray-950/50 via-slate-950/70 to-cyan-950/50 gap-4 flex-grow">
                <h1 className="text-4xl md:text-5xl text-white font-extrabold text-center mt-48 md:mt-52">Welcome To vertX <span className='text-cyan-300'>Courses</span></h1>
                <p className='text-gray-500 text-center max-w-md'>Expand Your Skills With Our Expert-Led Programs</p>
                <button className="mt-4 px-6 py-3 bg-cyan-400 text-black font-semibold rounded-full hover:bg-cyan-300 transition transform">
                    Explore Courses
                </button>
                <div className="images mt-8 md:mt-10 flex flex-col md:flex-row relative gap-4 md:gap-8 items-center justify-center w-full max-w-6xl">
                    <img src={img1} alt="" className='rounded-3xl w-1/3 h-1/2 brightness-75 image-left z-10 hidden md:block'/>
                    <h1 className='font-extrabold text-xl md:text-3xl text-center center-text text-cyan-300 max-w-2xl hidden md:block'>Transform your career with hands-on learning. Master cutting-edge technologies with our expert-led courses.</h1>
                    <img src={img2} alt="" className='rounded-3xl w-1/3 h-1/2 brightness-75 image-right z-10 hidden md:block'/>
                </div>
            </div>

            {/* Category Strip */}
            <section className="py-6 px-4 md:px-6 bg-black border-b border-black w-full">
                <div className="max-w-6xl mx-auto">
                    <div className=" categories flex space-x-3 md:space-x-6 overflow-x-auto pb-2 scrollbar-hide justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 md:px-6 md:py-3 rounded-full whitespace-nowrap text-sm md:text-base transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-cyan-400 text-black font-bold'
                                        : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Grid Section */}
            <section className="py-16 px-4 md:px-6 flex-grow">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Featured Courses</h2>
                    <div className="course-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                        {filteredCourses.map((course) => (
                            <div 
                                key={course.id}
                                className="group bg-[#0f0f14] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className="relative h-48 md:h-64 overflow-hidden">
                                    <img 
                                        src={course.image} 
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-4 md:p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg md:text-xl font-bold">{course.title}</h3>
                                        <span className="text-cyan-300 font-semibold">{course.price}</span>
                                    </div>
                                    <p className="text-gray-400 mb-2 text-sm">by {course.instructor}</p>
                                    <p className="text-gray-300 mb-4 text-sm">{course.description}</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs bg-gray-800 px-2 py-1 rounded">{course.duration}</span>
                                        <span className="text-xs bg-gray-800 px-2 py-1 rounded">{course.level}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => setSelectedCourse(course)}
                                                className="px-3 py-1.5 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs md:text-sm"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => addToCart(course)}
                                            className="px-3 py-1.5 bg-cyan-400 text-black rounded-full text-xs md:text-sm font-semibold hover:bg-cyan-500 transition"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-gray-900 to-black flex-grow">
                <div className="dev-talking max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Student Success Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-[#1a1a24] p-6 rounded-xl">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <svg key={j} className="w-4 md:w-5 h-4 md:h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-4 text-sm md:text-base">
                                    "The courses transformed my career. I went from junior dev to senior engineer in just 6 months!"
                                </p>
                                <div className="flex items-center">
                                    <div className="bg-gray-700 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mr-3">
                                        <span className="font-bold text-xs md:text-sm">JD</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm md:text-base">Jane Developer</p>
                                        <p className="text-gray-400 text-xs md:text-sm">Full Stack Engineer</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 px-4 md:px-6 flex-grow">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-gray-400 mb-8">Subscribe to get exclusive course announcements and early access</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 px-4 py-3 bg-gray-900 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm md:text-base"
                        />
                        <button className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-full hover:bg-cyan-300 transition text-sm md:text-base">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Course Detail Modal */}
            {selectedCourse && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
                    <div className="bg-[#0f0f14] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-4 md:p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold">{selectedCourse.title}</h2>
                                <button 
                                    onClick={() => setSelectedCourse(null)}
                                    className="text-gray-400 hover:text-white text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div>
                                    <img 
                                        src={selectedCourse.image} 
                                        alt={selectedCourse.title}
                                        className="w-full h-64 md:h-80 object-cover rounded-lg"
                                    />
                                </div>
                                
                                <div>
                                    <p className="text-gray-300 mb-4 text-sm">by {selectedCourse.instructor}</p>
                                    <p className="text-gray-400 mb-6 text-sm md:text-base">{selectedCourse.description}</p>
                                    <div className="flex items-center gap-3 md:gap-4 mb-6">
                                        <span className="bg-cyan-400 text-black px-3 py-1 rounded-full text-xs md:text-sm">{selectedCourse.duration}</span>
                                        <span className="bg-gray-800 px-3 py-1 rounded-full text-xs md:text-sm">{selectedCourse.level}</span>
                                    </div>
                                    <p className="text-cyan-300 text-xl md:text-2xl font-bold mb-6">{selectedCourse.price}</p>
                                    
                                    <button 
                                        onClick={() => {
                                            addToCart(selectedCourse);
                                            setSelectedCourse(null);
                                        }}
                                        className="w-full py-3 bg-cyan-400 text-black font-semibold rounded-full hover:bg-cyan-500 transition text-sm md:text-base"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            
                            {/* Course Curriculum */}
                            <div className="mt-10 md:mt-12">
                                <h3 className="text-xl md:text-2xl font-bold mb-6">Course Curriculum</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((week) => (
                                        <div key={week} className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-400 flex items-center justify-center text-black font-bold text-xs md:text-sm flex-shrink-0">
                                                {week}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm md:text-base">Week {week}: Module Title</h4>
                                                <p className="text-gray-400 text-xs md:text-sm">Duration: 2 hours | Content: Video lectures, exercises</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Modal */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
                    <div className="bg-[#0f0f14] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-4 md:p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">Your Cart</h2>
                                <button 
                                    onClick={() => {
                                        setCartItems([]);
                                        setIsCartOpen(false);
                                    }}
                                    className="text-gray-400 hover:text-white text-sm md:text-base"
                                >
                                    Clear All
                                </button>
                            </div>
                            
                            <div className="space-y-4 mb-6">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm md:text-base">{item.title}</h3>
                                            <p className="text-cyan-300 text-sm md:text-base">{item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition text-sm"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm md:text-base">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition text-sm"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-400 hover:text-red-300 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="border-t border-gray-800 pt-4">
                                <div className="flex justify-between text-lg md:text-xl font-bold mb-6">
                                    <span>Total:</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <button className="w-full py-3 bg-cyan-400 text-black font-semibold rounded-full hover:bg-cyan-500 transition">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FAQ Section */}
            <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-gray-900 to-black flex-grow">
                <div className="questions max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                question: "How do I access course materials?",
                                answer: "After enrollment, you'll gain immediate access to all course content including videos, downloads, and resources through our learning platform."
                            },
                            {
                                question: "Are there any prerequisites?",
                                answer: "Prerequisites vary by course. We clearly indicate requirements in each course description. Most courses are designed for beginners to intermediate developers."
                            },
                            {
                                question: "Can I get a refund?",
                                answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with a course, contact support for a full refund."
                            },
                            {
                                question: "How long do I have access?",
                                answer: "You'll have lifetime access to course materials. Updates and new content are provided at no additional cost during your enrollment period."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-[#1a1a24] p-5 md:p-6 rounded-xl">
                                <h3 className="text-lg md:text-xl font-semibold mb-2 text-cyan-400">{faq.question}</h3>
                                <p className="text-gray-300 text-sm md:text-base">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-4 md:px-6 border-t border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <img src={logo} alt="vertX Logo" className="w-12 md:w-16 mb-4" />
                            <p className="text-gray-400 text-sm md:text-base">Building the future of developer education and community.</p>
                        </div>
                        
                        <div className="flex gap-4 md:gap-6">
                            <a href="#" className="text-gray-400 hover:text-cyan-300 transition text-sm md:text-base">Twitter</a>
                            <a href="#" className="text-gray-400 hover:text-cyan-300 transition text-sm md:text-base">GitHub</a>
                            <a href="#" className="text-gray-400 hover:text-cyan-300 transition text-sm md:text-base">Instagram</a>
                            <a href="#" className="text-gray-400 hover:text-cyan-300 transition text-sm md:text-base">Discord</a>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-xs md:text-sm">
                        <p>© 2025 vertX. All rights reserved.</p>
                        <div className="mt-2 flex justify-center gap-4 md:gap-6">
                            <a href="#" className="hover:text-cyan-300 transition">Privacy Policy</a>
                            <a href="#" className="hover:text-cyan-300 transition">Terms of Service</a>
                            <a href="#" className="hover:text-cyan-300 transition">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}