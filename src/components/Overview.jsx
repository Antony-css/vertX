import logo from '../../public/vertX-logo-bold.svg'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState, useEffect, useRef } from 'react'

export const Overview = () => {
    const [activePeriod, setActivePeriod] = useState('today')
    const [isAnimating, setIsAnimating] = useState(false)
    const statsRefs = useRef({
        websiteVisits: null,
        revenue: null,
        newUsers: null,
        enrollments: null
    })
    
    useGSAP(() => {
        gsap.from(".overview-text, .desc, .buttons, .key-metrics", {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "power2.out"
        })

        // Animate stats cards
        gsap.from(".stats-card-grid", {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        });
        
        // Animate chart section
        gsap.from(".chart-section", {
            duration: 0.8,
            x: -50,
            opacity: 0,
            delay: 0.3,
            ease: "power2.out"
        });
        
        // Animate recent activity
        gsap.from(".recent-activity", {
            duration: 0.8,
            x: 50,
            opacity: 0,
            delay: 0.4,
            ease: "power2.out"
        });
        
        // Animate quick actions
        gsap.from(".quick-actions", {
            duration: 0.8,
            x: 50,
            opacity: 0,
            delay: 0.5,
            ease: "power2.out"
        });
    }, []);

    const handlePeriodChange = (period) => {
        if (period !== activePeriod) {
            setIsAnimating(true)
            setTimeout(() => {
                setActivePeriod(period)
                setIsAnimating(false)
            }, 300)
        }
    }

    // Get stats based on active period
    const getStats = () => {
        switch(activePeriod) {
            case 'today':
                return {
                    websiteVisits: { value: '5,678', change: '+12%', trend: '75%' },
                    revenue: { value: '$12,345', change: '+18%', trend: '85%' },
                    newUsers: { value: '892', change: '+25%', trend: '90%' },
                    enrollments: { value: '156', change: '+8%', trend: '65%' }
                };
            case 'week':
                return {
                    websiteVisits: { value: '28,456', change: '+8%', trend: '82%' },
                    revenue: { value: '$45,678', change: '+15%', trend: '92%' },
                    newUsers: { value: '4,231', change: '+12%', trend: '88%' },
                    enrollments: { value: '789', change: '+5%', trend: '78%' }
                };
            case 'month':
                return {
                    websiteVisits: { value: '128,765', change: '+5%', trend: '78%' },
                    revenue: { value: '$189,456', change: '+12%', trend: '88%' },
                    newUsers: { value: '18,456', change: '+18%', trend: '95%' },
                    enrollments: { value: '3,456', change: '+15%', trend: '82%' }
                };
            default:
                return {
                    websiteVisits: { value: '5,678', change: '+12%', trend: '75%' },
                    revenue: { value: '$12,345', change: '+18%', trend: '85%' },
                    newUsers: { value: '892', change: '+25%', trend: '90%' },
                    enrollments: { value: '156', change: '+8%', trend: '65%' }
                };
        }
    };

    const stats = getStats();

    // Animation helper for number changes with falling effect
    const animateNumbers = () => {
        const newStats = getStats();
        Object.keys(statsRefs.current).forEach((key, index) => {
            const element = statsRefs.current[key];
            if (element) {
                const oldValue = element.textContent;
                const newValue = newStats[key].value;
                
                if (oldValue !== newValue) {
                    // Add staggered animation with falling effect
                    gsap.to(element, {
                        duration: 0.5,
                        y: -20,
                        opacity: 0,
                        ease: "power1.in",
                        delay: index * 0.1,
                        onComplete: () => {
                            element.textContent = newValue;
                            gsap.to(element, {
                                duration: 0.3,
                                y: 0,
                                opacity: 1,
                                ease: "power1.out"
                            });
                        }
                    });
                }
            }
        });
    };

    // Trigger animation when stats change
    useEffect(() => {
        if (isAnimating) {
            animateNumbers();
        }
    }, [activePeriod, isAnimating]);

    return (
    <main className="bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900 font-f2 min-h-screen flex flex-col">
      <title>vertX - Overview</title>
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl bg-white rounded-2xl p-6 transition-all duration-300">
          {/* Header Section */}
          <div className="text-center mb-10 pt-4">
            <h1 className='overview-text text-4xl font-bold text-gray-800 mb-2'>Dashboard Overview</h1>
            <p className="desc text-gray-600 max-w-2xl mx-auto">Welcome to your analytics dashboard. Monitor key metrics and take action.</p>
            <div className="buttons flex justify-center mt-6 space-x-4">
              <button 
                onClick={() => handlePeriodChange('today')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                  activePeriod === 'today' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Today
              </button>
              <button 
                onClick={() => handlePeriodChange('week')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                  activePeriod === 'week' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                This Week
              </button>
              <button 
                onClick={() => handlePeriodChange('month')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                  activePeriod === 'month' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                This Month
              </button>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <section className="mb-12">
            <h2 className='key-metrics text-2xl font-bold text-gray-800 mb-8 text-center'>Key Metrics</h2>
            <div className="stats-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Website Visits Card */}
              <div className={`stats-card bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-600 flex items-center">
                      <i className="fas fa-eye text-blue-600 mr-2"></i> Website visits
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-1" 
                       ref={el => statsRefs.current.websiteVisits = el}>
                      {stats.websiteVisits.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-green-600 flex items-center">
                        <i className="fas fa-arrow-up mr-1"></i> {stats.websiteVisits.change} from yesterday
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <i className="fas fa-eye text-blue-600 text-xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: stats.websiteVisits.trend}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Weekly trend</p>
                </div>
              </div>
              
              {/* Revenue Card */}
              <div className={`stats-card bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-600 flex items-center">
                      <i className="fas fa-dollar-sign text-purple-600 mr-2"></i> Revenue
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-1" 
                       ref={el => statsRefs.current.revenue = el}>
                      {stats.revenue.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-green-600 flex items-center">
                        <i className="fas fa-arrow-up mr-1"></i> {stats.revenue.change} from yesterday
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <i className="fas fa-dollar-sign text-purple-600 text-xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: stats.revenue.trend}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Monthly growth</p>
                </div>
              </div>
              
              {/* New Users Card */}
              <div className={`stats-card bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-600 flex items-center">
                      <i className="fas fa-users text-yellow-600 mr-2"></i> New users
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-1" 
                       ref={el => statsRefs.current.newUsers = el}>
                      {stats.newUsers.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-green-600 flex items-center">
                        <i className="fas fa-arrow-up mr-1"></i> {stats.newUsers.change} from yesterday
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <i className="fas fa-users text-yellow-600 text-xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: stats.newUsers.trend}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Weekly growth</p>
                </div>
              </div>
              
              {/* Course Enrollments Card */}
              <div className={`stats-card bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-600 flex items-center">
                      <i className="fas fa-graduation-cap text-green-600 mr-2"></i> Course enrollments
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-1" 
                       ref={el => statsRefs.current.enrollments = el}>
                      {stats.enrollments.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-green-600 flex items-center">
                        <i className="fas fa-arrow-up mr-1"></i> {stats.enrollments.change} from yesterday
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <i className="fas fa-graduation-cap text-green-600 text-xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: stats.enrollments.trend}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Monthly trend</p>
                </div>
              </div>
            </div>
          </section>

          {/* Charts and Data Section */}
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Placeholder */}
              <div className="chart-section lg:col-span-1 bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Performance Overview</h3>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <i className="fas fa-chart-line text-gray-400 text-4xl mb-2"></i>
                    <p className="text-gray-500">Performance chart visualization</p>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="recent-activity lg:col-span-1 bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-50 rounded-lg mr-3">
                      <i className="fas fa-shopping-cart text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">New order placed</p>
                      <p className="text-sm text-gray-600">Order #1234 • $299.99</p>
                      <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-2 bg-green-50 rounded-lg mr-3">
                      <i className="fas fa-user-plus text-green-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">New user registered</p>
                      <p className="text-sm text-gray-600">John Doe</p>
                      <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-2 bg-purple-50 rounded-lg mr-3">
                      <i className="fas fa-book text-purple-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Course published</p>
                      <p className="text-sm text-gray-600">Advanced JavaScript</p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-2 bg-yellow-50 rounded-lg mr-3">
                      <i className="fas fa-cog text-yellow-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Customization request</p>
                      <p className="text-sm text-gray-600">Design modification</p>
                      <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="quick-actions lg:col-span-1 bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Actions</h3>
                <div className="space-y-4 flex-col flex items-stretch justify-center">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">
                    <span>Add Product</span>
                    <i className="fas fa-plus text-gray-600"></i>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">
                    <span>Publish Course</span>
                    <i className="fas fa-book text-gray-600"></i>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">
                    <span>Manage Requests</span>
                    <i className="fas fa-comment-dots text-gray-600"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    )
}