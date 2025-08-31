import logo from '../../public/vertX-logo-bold.svg'
import img1 from '../../public/mugs.png'
import img2 from '../../public/shirts.png'
import gsap from 'gsap'
import { useState, useEffect } from 'react'
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

export const Shop = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Mock product data
    const products = [
        {
            id: 1,
            name: "Code Loop Tee",
            tagline: "Syntax meets style",
            price: "$28",
            image: img1,
            category: "Shirts"
        },
        {
            id: 2,
            name: "Debug Warrior Hoodie",
            tagline: "Built for late nights",
            price: "$59",
            image: img2,
            category: "Hoodies"
        },
        {
            id: 3,
            name: "Pixel Hacker Cap",
            tagline: "Design with precision",
            price: "$32",
            image: img1,
            category: "Accessories"
        },
        {
            id: 4,
            name: "Syntax Master Sweatshirt",
            tagline: "Embrace the logic",
            price: "$45",
            image: img1,
            category: "Hoodies"
        },
        {
            id: 5,
            name: "Coffee Code Mug",
            tagline: "Morning hacks ready",
            price: "$18",
            image: img2,
            category: "Accessories"
        },
        {
            id: 6,
            name: "Logic Master Tote",
            tagline: "Carry your passion",
            price: "$25",
            image: img1,
            category: "Accessories"
        }
    ];

    // Categories
    const categories = ['All', 'Shirts', 'Hoodies', 'Accessories'];

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
                color: '#ffff00',
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

        gsap.from(".product-card", {
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

        const onKey = (e) => {
            if (e.key === 'Escape') {
                setMenuOpen(false);
                setShowUserMenu(false);
                setShowLogoutConfirm(false);
            }
        };
        const onResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
                setShowUserMenu(false);
                setShowLogoutConfirm(false);
            }
        };
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);

        // close mobile menu when a link inside it is clicked
        const onMobileClick = (e) => {
            const link = e.target.closest && e.target.closest('a');
            if (!link) return;
            const menu = document.getElementById('mobile-menu');
            if (menu && menu.contains(link)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', onMobileClick);

        // focus first link when menu opens
        if (menuOpen) {
            setTimeout(() => {
                const el = document.querySelector('#mobile-menu a');
                if (el) el.focus();
            }, 50);
        }

        return () => {
            unsubscribe();
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('click', onMobileClick);
        };
    }, []);

    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'All' 
        ? products 
        : products.filter(product => product.category === selectedCategory);

    // Cart functions
    const addToCart = (product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item => 
                    item.id === product.id 
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
            }
            return [...prev, {...product, quantity: 1}];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prev => 
            prev.map(item => 
                item.id === productId 
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
            <title>vertX - Shop</title>
            
            {/* Mobile nav panel */}
            {menuOpen && (
                <div id="mobile-menu" className="md:hidden relative bg-black/95 z-40 p-6 mt-20">
                    <ul className="flex flex-col gap-4 text-lg">
                        {["Home", "Shop", "Courses", "Customize"].map((tab) => (
                            <li key={tab}><a href={`/${tab.toLowerCase()}`} className={`${tab === 'Shop' ? 'text-yellow-400' : 'text-white'} block`}>{tab}</a></li>
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
            <div className="Hero flex flex-col md:flex-col items-center justify-center min-h-screen pt-20 px-4 md:px-6 bg-gradient-to-t from-gray-950/50 via-slate-950/70 to-yellow-950/50 gap-4 flex-grow">
                <h1 className="text-4xl md:text-5xl text-white font-extrabold text-center mt-48 md:mt-52">Welcome To vertX <span className='text-yellow-400'>SHOP</span></h1>
                <p className='text-gray-500 text-center max-w-md'>Find Products That Brings Your Code To Life!</p>
                <button className="mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition transform">
                    Explore Products
                </button>
                <div className="images mt-8 md:mt-10 flex flex-col md:flex-row relative gap-4 md:gap-8 items-center justify-center w-full max-w-6xl">
                    <img src={img1} alt="" className='rounded-3xl w-1/3 h-1/2 brightness-75 image-left z-10 hidden md:block'/>
                    <h1 className='font-extrabold text-xl md:text-3xl text-center center-text text-yellow-400 max-w-2xl hidden md:block'>Unlock a world where every product speaks code — shop vertX and wear the mindset that builds the future.</h1>
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
                                        ? 'bg-yellow-400 text-black font-bold'
                                        : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Grid Section */}
            <section className="py-16 px-4 md:px-6 flex-grow">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Premium Products</h2>
                    <div className="product-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredProducts.map((product) => (
                            <div 
                                key={product.id}
                                className="group bg-[#0f0f14] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="relative h-48 md:h-64 overflow-hidden">
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-4 md:p-6">
                                    <h3 className="text-lg md:text-xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-gray-400 mb-2 text-sm">{product.tagline}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-yellow-400 font-semibold">{product.price}</span>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => setSelectedProduct(product)}
                                                className="px-3 py-1.5 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs md:text-sm"
                                            >
                                                View
                                            </button>
                                            <button 
                                                onClick={() => addToCart(product)}
                                                className="px-3 py-1.5 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition text-xs md:text-sm"
                                            >
                                                Add to cart
                                            </button>
                                        </div>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">What Developers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-[#1a1a24] p-6 rounded-xl">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <svg key={j} className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-4 text-sm md:text-base">
                                    "These products perfectly capture the essence of our coding culture. The quality is unmatched!"
                                </p>
                                <div className="flex items-center">
                                    <div className="bg-gray-700 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mr-3">
                                        <span className="font-bold text-xs md:text-sm">JD</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm md:text-base">John Developer</p>
                                        <p className="text-gray-400 text-xs md:text-sm">Senior Engineer</p>
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
                    <p className="text-gray-400 mb-8">Subscribe to get exclusive deals and new product announcements</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 px-4 py-3 bg-gray-900 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base"
                        />
                        <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition text-sm md:text-base">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
                    <div className="bg-[#0f0f14] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-4 md:p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold">{selectedProduct.name}</h2>
                                <button 
                                    onClick={() => setSelectedProduct(null)}
                                    className="text-gray-400 hover:text-white text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div>
                                    <img 
                                        src={selectedProduct.image} 
                                        alt={selectedProduct.name}
                                        className="w-full h-64 md:h-80 object-cover rounded-lg"
                                    />
                                </div>
                                
                                <div>
                                    <p className="text-gray-300 mb-6 text-sm md:text-base">{selectedProduct.tagline}</p>
                                    <p className="text-yellow-400 text-xl md:text-2xl font-bold mb-6">{selectedProduct.price}</p>
                                    
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3">Size</h3>
                                        <div className="flex gap-3">
                                            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                                <button 
                                                    key={size}
                                                    className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition text-sm"
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                                        <div className="flex items-center gap-3">
                                            <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                                -
                                            </button>
                                            <span className="text-xl">1</span>
                                            <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => {
                                            addToCart(selectedProduct);
                                            setSelectedProduct(null);
                                        }}
                                        className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition text-sm md:text-base"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            
                            {/* Related Products */}
                            <div className="mt-10 md:mt-12">
                                <h3 className="text-xl md:text-2xl font-bold mb-6">You Might Also Like</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {products
                                        .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
                                        .slice(0, 4)
                                        .map(product => (
                                            <div 
                                                key={product.id}
                                                className="bg-[#1a1a24] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                                            >
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    className="w-full h-32 object-cover"
                                                />
                                                <div className="p-3">
                                                    <h4 className="font-semibold text-sm">{product.name}</h4>
                                                    <p className="text-yellow-400 text-sm">{product.price}</p>
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
                                            <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
                                            <p className="text-yellow-400 text-sm md:text-base">{item.price}</p>
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
                                <button className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition">
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
                                question: "How long does shipping take?",
                                answer: "Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery."
                            },
                            {
                                question: "Do you offer international shipping?",
                                answer: "Yes, we ship worldwide with varying delivery times based on location."
                            },
                            {
                                question: "What is your return policy?",
                                answer: "We offer a 30-day return policy for unworn items with original tags."
                            },
                            {
                                question: "How can I track my order?",
                                answer: "Once shipped, you'll receive a tracking number via email with real-time updates."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-[#1a1a24] p-5 md:p-6 rounded-xl">
                                <h3 className="text-lg md:text-xl font-semibold mb-2 text-yellow-400">{faq.question}</h3>
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
                            <p className="text-gray-400 text-sm md:text-base">Building the future of developer tools and community.</p>
                        </div>
                        
                        <div className="flex gap-4 md:gap-6">
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-sm md:text-base">Twitter</a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-sm md:text-base">GitHub</a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-sm md:text-base">Instagram</a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-sm md:text-base">Discord</a>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-xs md:text-sm">
                        <p>© 2025 vertX. All rights reserved.</p>
                        <div className="mt-2 flex justify-center gap-4 md:gap-6">
                            <a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a>
                            <a href="#" className="hover:text-yellow-400 transition">Terms of Service</a>
                            <a href="#" className="hover:text-yellow-400 transition">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}