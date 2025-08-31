import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

export const UsersPage = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@example.com',
            role: 'Student',
            orders: 3,
            enrollments: 5,
            phone: '+1 (555) 123-4567',
            avatar: 'https://placehold.co/100x100?text=JS',
            joinDate: '2023-01-15',
            lastActive: '2023-05-15',
            location: 'New York, USA',
            interests: ['JavaScript', 'React', 'Node.js'],
            totalSpent: 329.97,
            purchaseHistory: [
                { id: 1, course: 'Advanced JavaScript Mastery', date: '2023-04-10', amount: 99.99, status: 'Completed' },
                { id: 2, course: 'React Development Bootcamp', date: '2023-03-22', amount: 149.99, status: 'Completed' },
                { id: 3, course: 'UI/UX Design Fundamentals', date: '2023-02-15', amount: 79.99, status: 'Completed' }
            ],
            courseProgress: [
                { course: 'Advanced JavaScript Mastery', progress: 85, lastAccessed: '2023-05-15' },
                { course: 'React Development Bootcamp', progress: 60, lastAccessed: '2023-05-10' },
                { course: 'UI/UX Design Fundamentals', progress: 100, lastAccessed: '2023-04-28' }
            ],
            requests: [
                { id: 1, type: 'Course Request', subject: 'Request for Python course', date: '2023-05-10', status: 'Pending' },
                { id: 2, type: 'Support Ticket', subject: 'Issue with video playback', date: '2023-04-25', status: 'Resolved' }
            ],
            status: 'Active',
            subscription: 'Premium',
            referral: 'Referral Code ABC123'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            role: 'Student',
            orders: 1,
            enrollments: 2,
            phone: '+1 (555) 987-6543',
            avatar: 'https://placehold.co/100x100?text=SJ',
            joinDate: '2023-02-20',
            lastActive: '2023-05-14',
            location: 'Los Angeles, USA',
            interests: ['Design', 'UI/UX', 'Figma'],
            totalSpent: 79.99,
            purchaseHistory: [
                { id: 1, course: 'UI/UX Design Fundamentals', date: '2023-03-10', amount: 79.99, status: 'Completed' }
            ],
            courseProgress: [
                { course: 'UI/UX Design Fundamentals', progress: 45, lastAccessed: '2023-05-14' }
            ],
            requests: [
                { id: 1, type: 'Support Ticket', subject: 'Mobile app issues', date: '2023-05-01', status: 'In Progress' }
            ],
            status: 'Active',
            subscription: 'Basic',
            referral: 'Referral Code XYZ789'
        },
        {
            id: 3,
            name: 'Michael Chen',
            email: 'michael.chen@example.com',
            role: 'Instructor',
            orders: 0,
            enrollments: 12,
            phone: '+1 (555) 456-7890',
            avatar: 'https://placehold.co/100x100?text=MC',
            joinDate: '2022-11-05',
            lastActive: '2023-05-16',
            location: 'Toronto, Canada',
            interests: ['JavaScript', 'React', 'Node.js', 'GraphQL'],
            totalSpent: 0,
            purchaseHistory: [],
            courseProgress: [
                { course: 'Advanced JavaScript Mastery', progress: 100, lastAccessed: '2023-05-01' },
                { course: 'React Development Bootcamp', progress: 100, lastAccessed: '2023-04-20' },
                { course: 'Node.js Backend Development', progress: 90, lastAccessed: '2023-05-12' }
            ],
            requests: [
                { id: 1, type: 'Course Request', subject: 'Request for advanced Node.js course', date: '2023-04-30', status: 'Approved' }
            ],
            status: 'Active',
            subscription: 'Premium',
            referral: 'Referral Code DEF456'
        },
        {
            id: 4,
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            role: 'Student',
            orders: 2,
            enrollments: 3,
            phone: '+1 (555) 234-5678',
            avatar: 'https://placehold.co/100x100?text=ED',
            joinDate: '2023-03-12',
            lastActive: '2023-05-13',
            location: 'London, UK',
            interests: ['Python', 'Data Science', 'Machine Learning'],
            totalSpent: 259.98,
            purchaseHistory: [
                { id: 1, course: 'Data Science Essentials', date: '2023-04-05', amount: 129.99, status: 'Completed' },
                { id: 2, course: 'Python for Beginners', date: '2023-02-28', amount: 89.99, status: 'Completed' }
            ],
            courseProgress: [
                { course: 'Data Science Essentials', progress: 70, lastAccessed: '2023-05-13' },
                { course: 'Python for Beginners', progress: 100, lastAccessed: '2023-04-15' }
            ],
            requests: [],
            status: 'Active',
            subscription: 'Premium',
            referral: 'Referral Code GHI789'
        },
        {
            id: 5,
            name: 'David Wilson',
            email: 'david.wilson@example.com',
            role: 'Student',
            orders: 4,
            enrollments: 8,
            phone: '+1 (555) 876-5432',
            avatar: 'https://placehold.co/100x100?text=DW',
            joinDate: '2022-09-18',
            lastActive: '2023-05-12',
            location: 'Sydney, Australia',
            interests: ['React', 'TypeScript', 'Next.js'],
            totalSpent: 529.96,
            purchaseHistory: [
                { id: 1, course: 'React Development Bootcamp', date: '2023-01-15', amount: 149.99, status: 'Completed' },
                { id: 2, course: 'TypeScript Masterclass', date: '2022-12-05', amount: 99.99, status: 'Completed' },
                { id: 3, course: 'Next.js Fundamentals', date: '2022-11-20', amount: 129.99, status: 'Completed' },
                { id: 4, course: 'Advanced React Patterns', date: '2022-10-10', amount: 149.99, status: 'Completed' }
            ],
            courseProgress: [
                { course: 'React Development Bootcamp', progress: 95, lastAccessed: '2023-05-12' },
                { course: 'TypeScript Masterclass', progress: 100, lastAccessed: '2023-05-05' },
                { course: 'Next.js Fundamentals', progress: 80, lastAccessed: '2023-05-08' }
            ],
            requests: [
                { id: 1, type: 'Course Request', subject: 'Request for mobile development course', date: '2023-05-05', status: 'Pending' }
            ],
            status: 'Active',
            subscription: 'Premium',
            referral: 'Referral Code JKL012'
        },
        {
            id: 6,
            name: 'Lisa Anderson',
            email: 'lisa.anderson@example.com',
            role: 'Student',
            orders: 0,
            enrollments: 1,
            phone: '+1 (555) 345-6789',
            avatar: 'https://placehold.co/100x100?text=LA',
            joinDate: '2023-04-01',
            lastActive: '2023-05-10',
            location: 'Berlin, Germany',
            interests: ['Python', 'Django', 'Web Development'],
            totalSpent: 0,
            purchaseHistory: [],
            courseProgress: [
                { course: 'Python for Beginners', progress: 20, lastAccessed: '2023-05-10' }
            ],
            requests: [],
            status: 'Inactive',
            subscription: 'Basic',
            referral: 'Referral Code MNO345'
        }
    ])

    const [selectedUser, setSelectedUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [subscriptionFilter, setSubscriptionFilter] = useState('all')
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })
    const [selectedRows, setSelectedRows] = useState([])
    const [bulkAction, setBulkAction] = useState('')
    const [showProfile, setShowProfile] = useState(false)
    const [showExportModal, setShowExportModal] = useState(false)
    const [showImportModal, setShowImportModal] = useState(false)
    const [notification, setNotification] = useState(null)

    // Mock data for charts
    const userGrowthData = [
        { month: 'Jan', users: 120 },
        { month: 'Feb', users: 180 },
        { month: 'Mar', users: 240 },
        { month: 'Apr', users: 320 },
        { month: 'May', users: 420 },
    ]

    const roleDistributionData = [
        { name: 'Students', value: 5 },
        { name: 'Instructors', value: 1 },
    ]

    const subscriptionData = [
        { name: 'Basic', value: 3 },
        { name: 'Premium', value: 3 },
    ]

    const locationData = [
        { name: 'USA', value: 3 },
        { name: 'Canada', value: 1 },
        { name: 'UK', value: 1 },
        { name: 'Australia', value: 1 },
        { name: 'Germany', value: 1 },
    ]

    const spendingData = [
        { name: '0-50', value: 2 },
        { name: '50-100', value: 1 },
        { name: '100-200', value: 2 },
        { name: '200+', value: 1 },
    ]

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
    const ROLE_COLORS = ['#4f46e5', '#10b981']
    const SUBSCRIPTION_COLORS = ['#4f46e5', '#10b981']

    useGSAP(() => {
        // Animate user table
        gsap.from(".user-row", {
            duration: 0.5,
            y: 20,
            opacity: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".user-table-container",
                start: "top 80%"
            }
        });

        // Animate filters
        gsap.from(".filter-section", {
            duration: 0.6,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 0.2
        });
    }, [users])

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             user.phone.includes(searchTerm)
        const matchesRole = roleFilter === 'all' || user.role === roleFilter
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter
        const matchesSubscription = subscriptionFilter === 'all' || user.subscription === subscriptionFilter
        return matchesSearch && matchesRole && matchesStatus && matchesSubscription
    })

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortConfig.key) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
        }
        return 0
    })

    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'Active': return 'bg-green-100 text-green-800'
            case 'Inactive': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getSubscriptionColor = (subscription) => {
        switch(subscription) {
            case 'Premium': return 'bg-purple-100 text-purple-800'
            case 'Basic': return 'bg-blue-100 text-blue-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getRoleColor = (role) => {
        switch(role) {
            case 'Instructor': return 'bg-purple-100 text-purple-800'
            case 'Student': return 'bg-blue-100 text-blue-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getUserStats = () => {
        const totalUsers = users.length
        const totalOrders = users.reduce((sum, user) => sum + user.orders, 0)
        const totalEnrollments = users.reduce((sum, user) => sum + user.enrollments, 0)
        const totalSpent = users.reduce((sum, user) => sum + user.totalSpent, 0)
        const activeUsers = users.filter(u => u.status === 'Active').length
        const instructors = users.filter(u => u.role === 'Instructor').length
        
        return { totalUsers, totalOrders, totalEnrollments, totalSpent, activeUsers, instructors }
    }

    const stats = getUserStats()

    const handleRowSelection = (userId) => {
        setSelectedRows(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId)
            } else {
                return [...prev, userId]
            }
        })
    }

    const handleSelectAll = () => {
        if (selectedRows.length === sortedUsers.length) {
            setSelectedRows([])
        } else {
            setSelectedRows(sortedUsers.map(user => user.id))
        }
    }

    const handleBulkAction = () => {
        if (selectedRows.length === 0) {
            showNotification('Please select at least one user', 'warning')
            return
        }

        if (bulkAction === 'activate') {
            setUsers(users.map(user => 
                selectedRows.includes(user.id) ? {...user, status: 'Active'} : user
            ))
            showNotification('Selected users activated successfully', 'success')
        } else if (bulkAction === 'deactivate') {
            setUsers(users.map(user => 
                selectedRows.includes(user.id) ? {...user, status: 'Inactive'} : user
            ))
            showNotification('Selected users deactivated successfully', 'success')
        } else if (bulkAction === 'delete') {
            setUsers(users.filter(user => !selectedRows.includes(user.id)))
            showNotification('Selected users deleted successfully', 'success')
        }
        setSelectedRows([])
        setBulkAction('')
    }

    const handleStatusChange = (requestId, newStatus) => {
        setUsers(users.map(user => 
            user.id === requestId ? {...user, status: newStatus, updatedAt: new Date().toISOString().split('T')[0]} : user
        ))
        showNotification('Status updated successfully', 'success')
    }

    const showNotification = (message, type) => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
    }

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
                        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                        <p className="text-gray-600 mt-2">Track and manage your audience</p>
                    </div>
                    <div className="flex space-x-3">
                        <button 
                            onClick={() => setShowImportModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:scale-105"
                        >
                            <i className="fas fa-file-import mr-2"></i> Import
                        </button>
                        <button 
                            onClick={() => setShowExportModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:scale-105"
                        >
                            <i className="fas fa-file-export mr-2"></i> Export
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:scale-105">
                            <i className="fas fa-user-plus mr-2"></i> Add User
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="stats-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-users text-blue-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-shopping-cart text-green-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-graduation-cap text-purple-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Enrollments</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-dollar-sign text-yellow-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.totalSpent.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-user-check text-yellow-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Users</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-red-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-chalkboard-teacher text-red-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Instructors</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.instructors}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="charts-container grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">User Growth Over Time</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={userGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="users" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">User Distribution by Role</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={roleDistributionData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {roleDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={ROLE_COLORS[index % ROLE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Subscription Distribution</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={subscriptionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">User Distribution by Location</h3>
                        <div className="h-64">
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
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Filters and Bulk Actions */}
                <div className="filter-section bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                />
                                <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200"
                            >
                                <option value="all">All Roles</option>
                                <option value="Student">Student</option>
                                <option value="Instructor">Instructor</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subscription</label>
                            <select
                                value={subscriptionFilter}
                                onChange={(e) => setSubscriptionFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200"
                            >
                                <option value="all">All Subscriptions</option>
                                <option value="Basic">Basic</option>
                                <option value="Premium">Premium</option>
                            </select>
                        </div>
                        
                        <div className="flex items-end">
                            <button 
                                onClick={() => {
                                    setSelectedRows([])
                                    setBulkAction('')
                                }}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <i className="fas fa-sync mr-2"></i> Reset
                            </button>
                        </div>
                    </div>
                    
                    {/* Bulk Actions */}
                    {selectedRows.length > 0 && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-sm text-blue-800 font-medium">
                                    {selectedRows.length} user{selectedRows.length !== 1 ? 's' : ''} selected
                                </span>
                                <select
                                    value={bulkAction}
                                    onChange={(e) => setBulkAction(e.target.value)}
                                    className="ml-3 p-1 border border-gray-300 rounded text-sm"
                                >
                                    <option value="">Bulk Actions</option>
                                    <option value="activate">Activate</option>
                                    <option value="deactivate">Deactivate</option>
                                    <option value="delete">Delete</option>
                                </select>
                                <button
                                    onClick={handleBulkAction}
                                    className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                            <button
                                onClick={() => setSelectedRows([])}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                Clear Selection
                            </button>
                        </div>
                    )}
                </div>

                {/* User Table */}
                <div className="user-table-container bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === sortedUsers.length && sortedUsers.length > 0}
                                            onChange={handleSelectAll}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center">
                                            User
                                            {sortConfig.key === 'name' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('email')}
                                    >
                                        <div className="flex items-center">
                                            Email
                                            {sortConfig.key === 'email' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('role')}
                                    >
                                        <div className="flex items-center">
                                            Role
                                            {sortConfig.key === 'role' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('orders')}
                                    >
                                        <div className="flex items-center">
                                            Orders
                                            {sortConfig.key === 'orders' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('enrollments')}
                                    >
                                        <div className="flex items-center">
                                            Enrollments
                                            {sortConfig.key === 'enrollments' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('totalSpent')}
                                    >
                                        <div className="flex items-center">
                                            Total Spent
                                            {sortConfig.key === 'totalSpent' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('lastActive')}
                                    >
                                        <div className="flex items-center">
                                            Last Active
                                            {sortConfig.key === 'lastActive' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('status')}
                                    >
                                        <div className="flex items-center">
                                            Status
                                            {sortConfig.key === 'status' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedUsers.map((user, index) => (
                                    <tr 
                                        key={user.id} 
                                        className={`user-row hover:bg-gray-50 transition-all duration-200 ${
                                            selectedRows.includes(user.id) ? 'bg-blue-50' : ''
                                        }`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(user.id)}
                                                onChange={() => handleRowSelection(user.id)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img className="h-10 w-10 rounded-full object-cover transform transition-transform duration-300 hover:scale-110" 
                                                     src={user.avatar} 
                                                     alt={user.name} 
                                                />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.phone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                            <div className="text-sm text-gray-500">{user.location}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.orders}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.enrollments}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${user.totalSpent.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.lastActive}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => {
                                                    setSelectedUser(user)
                                                    setShowProfile(true)
                                                }}
                                                className="text-blue-600 hover:text-blue-900 mr-3 transform transition-transform duration-200 hover:scale-110"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="text-green-600 hover:text-green-900 mr-3 transform transition-transform duration-200 hover:scale-110">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 transform transition-transform duration-200 hover:scale-110">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* User Profile Modal */}
                {showProfile && selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-fade-in">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">User Profile: {selectedUser.name}</h2>
                                    <button 
                                        onClick={() => setShowProfile(false)}
                                        className="text-gray-400 hover:text-gray-600 transform transition-transform duration-200 hover:scale-110"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* User Info */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                            <div className="flex flex-col items-center mb-4">
                                                <img 
                                                    src={selectedUser.avatar} 
                                                    alt={selectedUser.name} 
                                                    className="w-24 h-24 rounded-full object-cover mb-3"
                                                />
                                                <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                                                <p className="text-gray-600">{selectedUser.email}</p>
                                                <p className="text-sm text-gray-500">{selectedUser.phone}</p>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                                                    selectedUser.role === 'Instructor' 
                                                        ? 'bg-purple-100 text-purple-800' 
                                                        : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {selectedUser.role}
                                                </span>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Join Date:</span>
                                                    <span className="font-medium">{selectedUser.joinDate}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Last Active:</span>
                                                    <span className="font-medium">{selectedUser.lastActive}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Location:</span>
                                                    <span className="font-medium">{selectedUser.location}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Orders:</span>
                                                    <span className="font-medium">{selectedUser.orders}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Enrollments:</span>
                                                    <span className="font-medium">{selectedUser.enrollments}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Total Spent:</span>
                                                    <span className="font-bold text-gray-900">${selectedUser.totalSpent.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Status:</span>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                                                        {selectedUser.status}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Subscription:</span>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionColor(selectedUser.subscription)}`}>
                                                        {selectedUser.subscription}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Referral Code:</span>
                                                    <span className="font-medium">{selectedUser.referral}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h4 className="font-semibold text-gray-900 mb-3">Interests</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedUser.interests.map((interest, index) => (
                                                    <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                                        {interest}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* User Details */}
                                    <div className="lg:col-span-2">
                                        {/* Purchase History */}
                                        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-bold text-gray-900">Purchase History</h3>
                                                <span className="text-sm text-gray-500">{selectedUser.purchaseHistory.length} transactions</span>
                                            </div>
                                            <div className="space-y-3">
                                                {selectedUser.purchaseHistory.length > 0 ? (
                                                    selectedUser.purchaseHistory.map(purchase => (
                                                        <div key={purchase.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                                                            <div>
                                                                <p className="font-medium text-gray-900">{purchase.course}</p>
                                                                <p className="text-sm text-gray-600">{purchase.date}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-bold text-gray-900">${purchase.amount}</p>
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    {purchase.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 text-center py-4">No purchase history</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Course Progress */}
                                        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-bold text-gray-900">Course Progress</h3>
                                                <span className="text-sm text-gray-500">{selectedUser.courseProgress.length} courses</span>
                                            </div>
                                            <div className="space-y-4">
                                                {selectedUser.courseProgress.length > 0 ? (
                                                    selectedUser.courseProgress.map((progress, index) => (
                                                        <div key={index}>
                                                            <div className="flex justify-between mb-1">
                                                                <span className="font-medium text-gray-900">{progress.course}</span>
                                                                <span className="text-sm font-medium text-gray-900">{progress.progress}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div 
                                                                    className="bg-blue-600 h-2 rounded-full" 
                                                                    style={{ width: `${progress.progress}%` }}
                                                                ></div>
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">Last accessed: {progress.lastAccessed}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 text-center py-4">No course progress</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Requests */}
                                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-bold text-gray-900">Requests & Support</h3>
                                                <span className="text-sm text-gray-500">{selectedUser.requests.length} requests</span>
                                            </div>
                                            <div className="space-y-3">
                                                {selectedUser.requests.length > 0 ? (
                                                    selectedUser.requests.map(request => (
                                                        <div key={request.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                                                            <div>
                                                                <p className="font-medium text-gray-900">{request.subject}</p>
                                                                <p className="text-sm text-gray-600">{request.type} • {request.date}</p>
                                                            </div>
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                request.status === 'Resolved' 
                                                                    ? 'bg-green-100 text-green-800' 
                                                                    : request.status === 'In Progress' 
                                                                        ? 'bg-yellow-100 text-yellow-800' 
                                                                        : 'bg-blue-100 text-blue-800'
                                                            }`}>
                                                                {request.status}
                                                            </span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 text-center py-4">No requests or support tickets</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowProfile(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transform transition-transform duration-200 hover:scale-105"
                                    >
                                        Close
                                    </button>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105">
                                        Send Message
                                    </button>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transform transition-transform duration-200 hover:scale-105">
                                        Edit User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Export Modal */}
                {showExportModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Export Users</h3>
                                    <button 
                                        onClick={() => setShowExportModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <div className="mb-6">
                                    <p className="text-gray-600 mb-4">Export user data in CSV format</p>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-2">Export Options</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="all-data"
                                                    defaultChecked
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="all-data" className="ml-2 text-sm text-gray-700">
                                                    All user data
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="active-only"
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="active-only" className="ml-2 text-sm text-gray-700">
                                                    Active users only
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="subscription"
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="subscription" className="ml-2 text-sm text-gray-700">
                                                    Include subscription details
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowExportModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            // Export logic would go here
                                            setShowExportModal(false)
                                            showNotification('Users exported successfully', 'success')
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Export CSV
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Import Modal */}
                {showImportModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Import Users</h3>
                                    <button 
                                        onClick={() => setShowImportModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <div className="mb-6">
                                    <p className="text-gray-600 mb-4">Upload a CSV file to import users</p>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                        <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                                        <p className="text-gray-600 mb-2">Drag and drop your CSV file here</p>
                                        <p className="text-sm text-gray-500 mb-4">or</p>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                                            Browse Files
                                        </button>
                                        <p className="text-xs text-gray-500 mt-2">CSV files only (max 10MB)</p>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowImportModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            // Import logic would go here
                                            setShowImportModal(false)
                                            showNotification('Users imported successfully', 'success')
                                        }}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Import Users
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {sortedUsers.length === 0 && (
                    <div className="text-center py-12 animate-fade-in">
                        <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto transform transition-transform duration-200 hover:scale-105"
                        >
                            <i className="fas fa-user-plus mr-2"></i> Add New User
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}