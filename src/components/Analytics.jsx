import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

export const AnalyticsPage = () => {
    const [timeRange, setTimeRange] = useState('7d')
    const [activeTab, setActiveTab] = useState('overview')
    const [notification, setNotification] = useState(null)

    // Mock data for website behavior
    const websiteBehaviorData = [
        { date: '2023-05-01', home: 1200, shop: 800, courses: 600, customize: 300, visitors: 2500, session: 3.2, bounce: 45 },
        { date: '2023-05-02', home: 1400, shop: 950, courses: 700, customize: 350, visitors: 2800, session: 3.5, bounce: 42 },
        { date: '2023-05-03', home: 1600, shop: 1100, courses: 800, customize: 400, visitors: 3200, session: 3.8, bounce: 38 },
        { date: '2023-05-04', home: 1800, shop: 1250, courses: 900, customize: 450, visitors: 3500, session: 4.0, bounce: 35 },
        { date: '2023-05-05', home: 2000, shop: 1400, courses: 1000, customize: 500, visitors: 3800, session: 4.2, bounce: 32 },
        { date: '2023-05-06', home: 2200, shop: 1550, courses: 1100, customize: 550, visitors: 4200, session: 4.5, bounce: 28 },
        { date: '2023-05-07', home: 2400, shop: 1700, courses: 1200, customize: 600, visitors: 4500, session: 4.8, bounce: 25 },
    ]

    // Mock data for product performance
    const productPerformanceData = [
        { name: 'Premium T-Shirt', views: 1200, addToCart: 300, purchases: 150, conversion: 12.5 },
        { name: 'Designer Hoodie', views: 950, addToCart: 250, purchases: 120, conversion: 12.6 },
        { name: 'Custom Stickers', views: 800, addToCart: 200, purchases: 100, conversion: 12.5 },
        { name: 'React Course', views: 1500, addToCart: 400, purchases: 300, conversion: 20.0 },
        { name: 'JavaScript Mastery', views: 1100, addToCart: 350, purchases: 200, conversion: 18.2 },
    ]

    // Mock data for course engagement
    const courseEngagementData = [
        { name: 'Advanced JavaScript', views: 2400, enrollments: 1800, completion: 75, avgTime: 45 },
        { name: 'React Development', views: 3200, enrollments: 2400, completion: 80, avgTime: 52 },
        { name: 'UI/UX Design', views: 1800, enrollments: 1200, completion: 65, avgTime: 38 },
        { name: 'Data Science', views: 2100, enrollments: 1600, completion: 70, avgTime: 48 },
    ]

    // Mock data for user metrics
    const userMetricsData = [
        { name: 'New Signups', value: 850 },
        { name: 'Returning Users', value: 1200 },
        { name: 'Visitors', value: 3000 },
    ]

    // Mock data for device usage
    const deviceUsageData = [
        { name: 'Desktop', value: 55 },
        { name: 'Mobile', value: 35 },
        { name: 'Tablet', value: 10 },
    ]

    // Mock data for location distribution
    const locationData = [
        { name: 'USA', value: 45 },
        { name: 'Canada', value: 12 },
        { name: 'UK', value: 8 },
        { name: 'Australia', value: 6 },
        { name: 'Germany', value: 5 },
        { name: 'Other', value: 24 },
    ]

    // Mock data for customization requests
    const customizationData = [
        { month: 'Jan', requests: 45, completed: 38 },
        { month: 'Feb', requests: 52, completed: 45 },
        { month: 'Mar', requests: 60, completed: 52 },
        { month: 'Apr', requests: 58, completed: 50 },
        { month: 'May', requests: 65, completed: 58 },
    ]

    // Mock data for revenue
    const revenueData = [
        { month: 'Jan', revenue: 12000 },
        { month: 'Feb', revenue: 15000 },
        { month: 'Mar', revenue: 18000 },
        { month: 'Apr', revenue: 22000 },
        { month: 'May', revenue: 25000 },
    ]

    // Colors for charts
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
    const DEVICE_COLORS = ['#4f46e5', '#10b981', '#f59e0b']
    const LOCATION_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6']

    useGSAP(() => {
        // Animate chart containers
        gsap.from(".chart-container", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".charts-container",
                start: "top 80%"
            }
        });
    }, [])

    const showNotification = (message, type) => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
    }

    // Calculate summary statistics
    const calculateSummary = () => {
        const totalVisitors = websiteBehaviorData.reduce((sum, day) => sum + day.visitors, 0)
        const avgSession = websiteBehaviorData.reduce((sum, day) => sum + day.session, 0) / websiteBehaviorData.length
        const avgBounce = websiteBehaviorData.reduce((sum, day) => sum + day.bounce, 0) / websiteBehaviorData.length
        const totalRevenue = revenueData.reduce((sum, month) => sum + month.revenue, 0)
        const totalRequests = customizationData.reduce((sum, month) => sum + month.requests, 0)
        const completedRequests = customizationData.reduce((sum, month) => sum + month.completed, 0)
        
        return {
            totalVisitors,
            avgSession: avgSession.toFixed(1),
            avgBounce: avgBounce.toFixed(1),
            totalRevenue,
            totalRequests,
            completedRequests,
            completionRate: ((completedRequests / totalRequests) * 100).toFixed(1)
        }
    }

    const summary = calculateSummary()

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {notification && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-transform duration-300 animate-fade-in ${
                    notification.type === 'success' ? 'bg-green-500' : 
                    notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                } text-white`}>
                    {notification.message}
                </div>
            )}
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                        <p className="text-gray-600 mt-2">Track growth, engagement, and performance</p>
                    </div>
                    <div className="flex space-x-3">
                        <div className="relative">
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                                <option value="7d">Last 7 Days</option>
                                <option value="30d">Last 30 Days</option>
                                <option value="90d">Last 90 Days</option>
                            </select>
                        </div>
                        <button 
                            onClick={() => showNotification('Analytics report generated', 'success')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:scale-105"
                        >
                            <i className="fas fa-download mr-2"></i> Export Report
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="dashboard-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="dashboard-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <i className="fas fa-users text-blue-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                                <p className="text-2xl font-bold text-gray-900">{summary.totalVisitors.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dashboard-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <i className="fas fa-clock text-green-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Avg Session</p>
                                <p className="text-2xl font-bold text-gray-900">{summary.avgSession}s</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dashboard-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <i className="fas fa-chart-line text-yellow-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                                <p className="text-2xl font-bold text-gray-900">{summary.avgBounce}%</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dashboard-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <i className="fas fa-dollar-sign text-purple-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">${summary.totalRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    {['overview', 'website', 'products', 'courses', 'users', 'customization'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-medium text-sm capitalize ${
                                activeTab === tab
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.replace(/([A-Z])/g, ' $1').trim()}
                        </button>
                    ))}
                </div>

                {/* Charts Container */}
                <div className="charts-container space-y-8">
                    {/* Website Behavior Chart */}
                    {activeTab === 'website' && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Website Behavior</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={websiteBehaviorData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="home" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                            <Area type="monotone" dataKey="shop" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                            <Area type="monotone" dataKey="courses" stackId="1" stroke="#ffc658" fill="#ffc658" />
                                            <Area type="monotone" dataKey="customize" stackId="1" stroke="#ff7300" fill="#ff7300" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={websiteBehaviorData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="visitors" fill="#4f46e5" />
                                            <Bar dataKey="session" fill="#10b981" />
                                            <Bar dataKey="bounce" fill="#f59e0b" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Performance */}
                    {activeTab === 'products' && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Performance</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={productPerformanceData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="views" fill="#8884d8" />
                                            <Bar dataKey="addToCart" fill="#82ca9d" />
                                            <Bar dataKey="purchases" fill="#ffc658" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={productPerformanceData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={true}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="conversion"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {productPerformanceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Course Engagement */}
                    {activeTab === 'courses' && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Course Engagement</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={courseEngagementData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="views" fill="#8884d8" />
                                            <Bar dataKey="enrollments" fill="#82ca9d" />
                                            <Bar dataKey="completion" fill="#ffc658" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={courseEngagementData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="avgTime" stroke="#4f46e5" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User Metrics */}
                    {activeTab === 'users' && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">User Metrics</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={userMetricsData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={true}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {userMetricsData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={deviceUsageData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="value" fill="#10b981" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Customization Requests */}
                    {activeTab === 'customization' && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Customization Requests</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={customizationData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="requests" fill="#4f46e5" />
                                            <Bar dataKey="completed" fill="#10b981" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={locationData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={true}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {locationData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={LOCATION_COLORS[index % LOCATION_COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Revenue Chart */}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h3>
                                <div className="chart-container h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Summary Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="dashboard-card bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <i className="fas fa-shopping-cart text-blue-600 text-xl"></i>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                            <p className="text-2xl font-bold text-gray-900">{summary.totalRequests}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="dashboard-card bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-green-100 rounded-lg">
                                            <i className="fas fa-check-circle text-green-600 text-xl"></i>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Completed</p>
                                            <p className="text-2xl font-bold text-gray-900">{summary.completedRequests}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="dashboard-card bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <i className="fas fa-percentage text-purple-600 text-xl"></i>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                                            <p className="text-2xl font-bold text-gray-900">{summary.completionRate}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Metrics */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Website Performance</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">Page Load Time</span>
                                                <span className="text-sm font-medium text-gray-900">1.2s</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">Server Response</span>
                                                <span className="text-sm font-medium text-gray-900">0.4s</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">Uptime</span>
                                                <span className="text-sm font-medium text-gray-900">99.9%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Pages</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Course Catalog</span>
                                            <span className="text-sm font-medium text-gray-900">1,245 views</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Product Page</span>
                                            <span className="text-sm font-medium text-gray-900">980 views</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Homepage</span>
                                            <span className="text-sm font-medium text-gray-900">2,450 views</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-700">Customization</span>
                                            <span className="text-sm font-medium text-gray-900">720 views</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {activeTab === 'overview' && (
                    <div className="text-center py-12">
                        <i className="fas fa-chart-line text-6xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                        <p className="text-gray-600 mb-6">Select a specific category to view detailed analytics</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                            {['website', 'products', 'courses', 'users'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <i className={`fas fa-${tab === 'website' ? 'globe' : tab === 'products' ? 'shopping-cart' : tab === 'courses' ? 'graduation-cap' : 'users'} text-xl text-gray-600 mb-2`}></i>
                                    <p className="text-sm font-medium text-gray-900 capitalize">{tab}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}