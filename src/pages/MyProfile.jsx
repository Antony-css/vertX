import { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, updateProfile, updateEmail, updatePassword } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

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
const db = getFirestore(app);

export const MyProfilePage = () => {
  const [user, setUser] = useState(null)
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    bio: '',
    location: '',
    website: '',
    profilePicture: ''
  })
  const [paymentMethods, setPaymentMethods] = useState([])
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setProfileData({
          displayName: currentUser.displayName || '',
          email: currentUser.email || '',
          phoneNumber: currentUser.phoneNumber || '',
          bio: '',
          location: '',
          website: '',
          profilePicture: currentUser.photoURL || ''
        })
        
        // Load additional profile data from Firestore
        try {
          const userDoc = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userDoc);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProfileData(prev => ({
              ...prev,
              ...userData
            }));
            
            // Load payment methods
            setPaymentMethods(userData.paymentMethods || []);
            
            // Load orders
            setOrders(userData.orders || []);
          }
        } catch (error) {
          console.error("Error loading profile ", error);
        }
      } else {
        // Redirect to login if not authenticated
        window.location.href = '/login';
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: profileData.displayName,
        photoURL: profileData.profilePicture
      });
      
      // Update email if changed
      if (profileData.email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, profileData.email);
      }
      
      // Save to Firestore
      const userDoc = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDoc, {
        displayName: profileData.displayName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        bio: profileData.bio,
        location: profileData.location,
        website: profileData.website,
        profilePicture: profileData.profilePicture,
        paymentMethods: paymentMethods,
        orders: orders,
        updatedAt: new Date()
      }, { merge: true });
      
      showNotification('Profile updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating profile:", error);
      showNotification('Error updating profile: ' + error.message, 'error');
    }
  };

  const handleAddPaymentMethod = (method) => {
    setPaymentMethods([...paymentMethods, method]);
  };

  const handleRemovePaymentMethod = (index) => {
    const newMethods = [...paymentMethods];
    newMethods.splice(index, 1);
    setPaymentMethods(newMethods);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-black text-white font-f2 min-h-screen">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-transform duration-300 ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        } text-white`}>
          {notification.message}
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">My Profile</h1>
            <p className="text-gray-400 mt-2">Manage your account settings and preferences</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-cyan-400 hover:text-cyan-300 flex items-center transition-colors"
          >
            <i className="fas fa-home mr-2"></i> Back to Home
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-8">
          {[
            { id: 'profile', name: 'Profile', icon: 'fas fa-user' },
            { id: 'security', name: 'Security', icon: 'fas fa-lock' },
            { id: 'payment', name: 'Payment Methods', icon: 'fas fa-credit-card' },
            { id: 'orders', name: 'My Orders', icon: 'fas fa-shopping-cart' },
            { id: 'settings', name: 'Preferences', icon: 'fas fa-cog' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm flex items-center transition-colors ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Profile Content */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-800">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-cyan-400">Personal Information</h2>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phoneNumber}
                      onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={3}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Website</label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Profile Picture</label>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={profileData.profilePicture || 'https://placehold.co/100x100?text=Avatar'} 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full object-cover border border-gray-700"
                      />
                      <input
                        type="text"
                        value={profileData.profilePicture}
                        onChange={(e) => setProfileData({...profileData, profilePicture: e.target.value})}
                        className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-cyan-400">Security Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-800 rounded-lg p-6 bg-gray-800/50">
                  <h3 className="font-medium text-cyan-400 mb-3">Change Password</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
                
                <div className="border border-gray-800 rounded-lg p-6 bg-gray-800/50">
                  <h3 className="font-medium text-cyan-400 mb-3">Two-Factor Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <div>
                        <p className="font-medium text-gray-100">2FA Enabled</p>
                        <p className="text-sm text-gray-400">Add an extra layer of security</p>
                      </div>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                        Enabled
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <div>
                        <p className="font-medium text-gray-100">Recovery Codes</p>
                        <p className="text-sm text-gray-400">Download backup codes</p>
                      </div>
                      <button className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg text-sm">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-800 rounded-lg p-6 bg-gray-800/50">
                <h3 className="font-medium text-cyan-400 mb-3">Login Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div>
                      <p className="font-medium text-gray-100">Chrome on Windows</p>
                      <p className="text-sm text-gray-400">Last login: Today, 10:30 AM</p>
                    </div>
                    <span className="text-sm text-green-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div>
                      <p className="font-medium text-gray-100">Safari on iPhone</p>
                      <p className="text-sm text-gray-400">Last login: Yesterday, 3:45 PM</p>
                    </div>
                    <span className="text-sm text-gray-400">Inactive</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-cyan-400">Payment Methods</h2>
                <button 
                  onClick={() => {
                    // In a real app, this would open a modal to add payment method
                    showNotification('Payment method added successfully!', 'success');
                  }}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i> Add Payment Method
                </button>
              </div>
              
              {paymentMethods.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-credit-card text-5xl text-gray-600 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-100 mb-2">No payment methods added</h3>
                  <p className="text-gray-400 mb-4">Add your payment methods to make purchases</p>
                  <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Add Payment Method
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="border border-gray-800 rounded-lg p-4 bg-gray-800/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <i className="fas fa-credit-card text-cyan-400 mr-2"></i>
                            <span className="font-medium text-gray-100">{method.cardType}</span>
                          </div>
                          <p className="text-sm text-gray-400">•••• {method.lastFour}</p>
                          <p className="text-sm text-gray-400">Expires {method.expiryMonth}/{method.expiryYear}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            onClick={() => handleRemovePaymentMethod(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          method.isDefault ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {method.isDefault ? 'Default' : 'Secondary'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-cyan-400">Order History</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-shopping-cart text-5xl text-gray-600 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-100 mb-2">No orders yet</h3>
                  <p className="text-gray-400 mb-4">Start shopping to see your order history</p>
                  <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-800">
                      {orders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-cyan-400">#{order.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {formatDate(order.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {order.items.length} items
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-600 text-white' :
                              order.status === 'Processing' ? 'bg-yellow-600 text-white' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-cyan-400 hover:text-cyan-300 mr-3 transition-colors">
                              View
                            </button>
                            <button className="text-gray-400 hover:text-gray-300 transition-colors">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-cyan-400">Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-800 rounded-lg p-6 bg-gray-800/50">
                  <h3 className="font-medium text-cyan-400 mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-100">Order Updates</p>
                        <p className="text-sm text-gray-400">Receive updates about your orders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-100">Newsletter</p>
                        <p className="text-sm text-gray-400">Weekly updates and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-100">Security Alerts</p>
                        <p className="text-sm text-gray-400">Important security notices</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-800 rounded-lg p-6 bg-gray-800/50">
                  <h3 className="font-medium text-cyan-400 mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-100">Profile Visibility</p>
                        <p className="text-sm text-gray-400">Who can see your profile</p>
                      </div>
                      <select className="p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white">
                        <option>Public</option>
                        <option>Friends Only</option>
                        <option>Private</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-100">Data Collection</p>
                        <p className="text-sm text-gray-400">Allow analytics data collection</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-800 rounded-lg p-6 bg-gray-800/50">
                <h3 className="font-medium text-cyan-400 mb-4">Account Deactivation</h3>
                <p className="text-gray-400 mb-4">Permanently delete your account and all associated data</p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Deactivate Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};