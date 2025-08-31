import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const CustomizationsPage = () => {
    const [requests, setRequests] = useState([
        {
            id: 1,
            customer: 'John Smith',
            email: 'john.smith@example.com',
            productType: 'T-Shirt',
            notes: 'Need custom design with company logo',
            status: 'In Progress',
            priority: 'High',
            createdAt: '2023-05-10',
            updatedAt: '2023-05-15',
            references: [
                'https://placehold.co/200x150?text=Reference+1',
                'https://placehold.co/200x150?text=Reference+2'
            ],
            feedback: [
                {
                    id: 1,
                    author: 'Design Team',
                    message: 'Initial design draft ready for review',
                    timestamp: '2023-05-12 10:30 AM',
                    type: 'design'
                },
                {
                    id: 2,
                    author: 'John Smith',
                    message: 'Looks good, just need to adjust the color scheme',
                    timestamp: '2023-05-13 2:15 PM',
                    type: 'feedback'
                }
            ],
            designer: 'Sarah Johnson',
            deadline: '2023-05-20',
            quantity: 50,
            size: 'M',
            color: 'Black',
            specialInstructions: 'Use eco-friendly materials',
            totalAmount: 1250.00,
            paymentStatus: 'Paid',
            shippingAddress: '123 Main St, New York, NY 10001',
            trackingNumber: 'TRK123456789',
            attachments: ['design_draft.pdf', 'logo.png']
        },
        {
            id: 2,
            customer: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            productType: 'Hoodie',
            notes: 'Custom hoodie with personal photo',
            status: 'Pending',
            priority: 'Medium',
            createdAt: '2023-05-12',
            updatedAt: '2023-05-12',
            references: [
                'https://placehold.co/200x150?text=Photo+1'
            ],
            feedback: [],
            designer: 'Michael Chen',
            deadline: '2023-05-25',
            quantity: 25,
            size: 'L',
            color: 'Gray',
            specialInstructions: 'Add zip pocket',
            totalAmount: 750.00,
            paymentStatus: 'Pending',
            shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
            trackingNumber: '',
            attachments: ['photo.jpg']
        },
        {
            id: 3,
            customer: 'Michael Chen',
            email: 'michael.chen@example.com',
            productType: 'Accessories',
            notes: 'Custom stickers for promotional event',
            status: 'Completed',
            priority: 'Low',
            createdAt: '2023-04-28',
            updatedAt: '2023-05-10',
            references: [
                'https://placehold.co/200x150?text=Sticker+Design',
                'https://placehold.co/200x150?text=Sample+1',
                'https://placehold.co/200x150?text=Sample+2'
            ],
            feedback: [
                {
                    id: 1,
                    author: 'Michael Chen',
                    message: 'Perfect! Exactly what I needed',
                    timestamp: '2023-05-10 4:30 PM',
                    type: 'approval'
                }
            ],
            designer: 'Emily Davis',
            deadline: '2023-05-05',
            quantity: 100,
            size: 'Standard',
            color: 'Multi-color',
            specialInstructions: 'Waterproof material',
            totalAmount: 2000.00,
            paymentStatus: 'Paid',
            shippingAddress: '789 Pine Rd, Chicago, IL 60601',
            trackingNumber: 'TRK987654321',
            attachments: ['sticker_design.ai', 'proof.pdf']
        },
        {
            id: 4,
            customer: 'Emily Davis',
            email: 'emily.davis@example.com',
            productType: 'T-Shirt',
            notes: 'Custom team shirts for company event',
            status: 'In Progress',
            priority: 'High',
            createdAt: '2023-05-14',
            updatedAt: '2023-05-15',
            references: [
                'https://placehold.co/200x150?text=Team+Logo',
                'https://placehold.co/200x150?text=Color+Scheme'
            ],
            feedback: [
                {
                    id: 1,
                    author: 'Design Team',
                    message: 'Design mockup with team names',
                    timestamp: '2023-05-15 9:00 AM',
                    type: 'design'
                }
            ],
            designer: 'David Wilson',
            deadline: '2023-05-22',
            quantity: 75,
            size: 'XL',
            color: 'White',
            specialInstructions: 'Premium quality fabric',
            totalAmount: 1875.00,
            paymentStatus: 'Paid',
            shippingAddress: '321 Elm St, Houston, TX 77001',
            trackingNumber: 'TRK456789123',
            attachments: ['team_logo.svg', 'fabric_sample.jpg']
        }
    ])

    const [selectedRequest, setSelectedRequest] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [priorityFilter, setPriorityFilter] = useState('all')
    const [paymentFilter, setPaymentFilter] = useState('all')
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' })
    const [selectedRows, setSelectedRows] = useState([])
    const [bulkAction, setBulkAction] = useState('')
    const [showRequestModal, setShowRequestModal] = useState(false)
    const [newFeedback, setNewFeedback] = useState('')
    const [notification, setNotification] = useState(null)

    const filteredRequests = requests.filter(request => {
        const matchesSearch = request.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             request.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             request.id.toString().includes(searchTerm)
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter
        const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter
        const matchesPayment = paymentFilter === 'all' || request.paymentStatus === paymentFilter
        return matchesSearch && matchesStatus && matchesPriority && matchesPayment
    })

    const sortedRequests = [...filteredRequests].sort((a, b) => {
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
            case 'Completed': return 'bg-green-100 text-green-800'
            case 'In Progress': return 'bg-blue-100 text-blue-800'
            case 'Pending': return 'bg-yellow-100 text-yellow-800'
            case 'Cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'High': return 'bg-red-100 text-red-800'
            case 'Medium': return 'bg-yellow-100 text-yellow-800'
            case 'Low': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getPaymentColor = (status) => {
        switch(status) {
            case 'Paid': return 'bg-green-100 text-green-800'
            case 'Pending': return 'bg-yellow-100 text-yellow-800'
            case 'Failed': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getRequestStats = () => {
        const totalRequests = requests.length
        const completedRequests = requests.filter(r => r.status === 'Completed').length
        const inProgressRequests = requests.filter(r => r.status === 'In Progress').length
        const pendingRequests = requests.filter(r => r.status === 'Pending').length
        const highPriorityRequests = requests.filter(r => r.priority === 'High').length
        const totalRevenue = requests.reduce((sum, r) => sum + r.totalAmount, 0)
        
        return { totalRequests, completedRequests, inProgressRequests, pendingRequests, highPriorityRequests, totalRevenue }
    }

    const stats = getRequestStats()

    const handleRowSelection = (requestId) => {
        setSelectedRows(prev => {
            if (prev.includes(requestId)) {
                return prev.filter(id => id !== requestId)
            } else {
                return [...prev, requestId]
            }
        })
    }

    const handleSelectAll = () => {
        if (selectedRows.length === sortedRequests.length) {
            setSelectedRows([])
        } else {
            setSelectedRows(sortedRequests.map(request => request.id))
        }
    }

    const handleBulkAction = () => {
        if (selectedRows.length === 0) {
            showNotification('Please select at least one request', 'warning')
            return
        }

        if (bulkAction === 'update-status') {
            // In a real app, this would update the status of all selected requests
            showNotification('Status updated for selected requests', 'success')
        } else if (bulkAction === 'send-feedback') {
            // In a real app, this would send feedback to all selected requests
            showNotification('Feedback sent to selected requests', 'success')
        } else if (bulkAction === 'delete') {
            setRequests(requests.filter(request => !selectedRows.includes(request.id)))
            showNotification('Selected requests deleted', 'success')
        }
        setSelectedRows([])
        setBulkAction('')
    }

    const handleStatusChange = (requestId, newStatus) => {
        setRequests(requests.map(request => 
            request.id === requestId ? {...request, status: newStatus, updatedAt: new Date().toISOString().split('T')[0]} : request
        ))
        showNotification('Status updated successfully', 'success')
    }

    const handleAddFeedback = (requestId) => {
        if (!newFeedback.trim()) return
        
        const feedback = {
            id: Date.now(),
            author: 'Admin',
            message: newFeedback,
            timestamp: new Date().toLocaleString(),
            type: 'feedback'
        }
        
        setRequests(requests.map(request => 
            request.id === requestId 
                ? {...request, feedback: [...request.feedback, feedback], updatedAt: new Date().toISOString().split('T')[0]} 
                : request
        ))
        
        setNewFeedback('')
        showNotification('Feedback added successfully', 'success')
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
                        <h1 className="text-3xl font-bold text-gray-900">Customization Requests</h1>
                        <p className="text-gray-600 mt-2">Manage personalized merch and branding requests</p>
                    </div>
                    <div className="flex space-x-3">
                        <button 
                            onClick={() => setShowRequestModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 hover:scale-105 transform"
                        >
                            <i className="fas fa-plus mr-2"></i> New Request
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="stats-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-list text-blue-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-check-circle text-green-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.completedRequests}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-spinner text-blue-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">In Progress</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.inProgressRequests}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-clock text-yellow-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-red-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">High Priority</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.highPriorityRequests}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-dollar-sign text-purple-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Bulk Actions */}
                <div className="filter-section bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search Requests</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by customer, email, product, or ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                />
                                <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200"
                            >
                                <option value="all">All Priorities</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                            <select
                                value={paymentFilter}
                                onChange={(e) => setPaymentFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all duration-200"
                            >
                                <option value="all">All Payments</option>
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                                <option value="Failed">Failed</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Bulk Actions */}
                    {selectedRows.length > 0 && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-sm text-blue-800 font-medium">
                                    {selectedRows.length} request{selectedRows.length !== 1 ? 's' : ''} selected
                                </span>
                                <select
                                    value={bulkAction}
                                    onChange={(e) => setBulkAction(e.target.value)}
                                    className="ml-3 p-1 border border-gray-300 rounded text-sm"
                                >
                                    <option value="">Bulk Actions</option>
                                    <option value="update-status">Update Status</option>
                                    <option value="send-feedback">Send Feedback</option>
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

                {/* Request Table */}
                <div className="requests-table-container bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === sortedRequests.length && sortedRequests.length > 0}
                                            onChange={handleSelectAll}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('id')}
                                    >
                                        <div className="flex items-center">
                                            ID
                                            {sortConfig.key === 'id' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('customer')}
                                    >
                                        <div className="flex items-center">
                                            Customer
                                            {sortConfig.key === 'customer' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('productType')}
                                    >
                                        <div className="flex items-center">
                                            Product
                                            {sortConfig.key === 'productType' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('quantity')}
                                    >
                                        <div className="flex items-center">
                                            Qty
                                            {sortConfig.key === 'quantity' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('totalAmount')}
                                    >
                                        <div className="flex items-center">
                                            Amount
                                            {sortConfig.key === 'totalAmount' && (
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
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('priority')}
                                    >
                                        <div className="flex items-center">
                                            Priority
                                            {sortConfig.key === 'priority' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('paymentStatus')}
                                    >
                                        <div className="flex items-center">
                                            Payment
                                            {sortConfig.key === 'paymentStatus' && (
                                                <i className={`fas ml-1 ${sortConfig.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                            )}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('deadline')}
                                    >
                                        <div className="flex items-center">
                                            Deadline
                                            {sortConfig.key === 'deadline' && (
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
                                {sortedRequests.map((request, index) => (
                                    <tr 
                                        key={request.id} 
                                        className={`request-row hover:bg-gray-50 transition-all duration-200 ${
                                            selectedRows.includes(request.id) ? 'bg-blue-50' : ''
                                        }`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(request.id)}
                                                onChange={() => handleRowSelection(request.id)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{request.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{request.customer}</div>
                                                    <div className="text-sm text-gray-500">{request.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{request.productType}</div>
                                                <div className="text-sm text-gray-500">
                                                    {request.size} • {request.color}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {request.quantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${request.totalAmount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                                {request.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentColor(request.paymentStatus)}`}>
                                                {request.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {request.deadline}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => setSelectedRequest(request)}
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

                {/* Request Detail Modal */}
                {selectedRequest && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-fade-in">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Request Details: #{selectedRequest.id}</h2>
                                    <button 
                                        onClick={() => setSelectedRequest(null)}
                                        className="text-gray-400 hover:text-gray-600 transform transition-transform duration-200 hover:scale-110"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column - Request Info */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Request Information</h3>
                                            
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">Customer</p>
                                                    <p className="font-medium">{selectedRequest.customer}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Email</p>
                                                    <p className="font-medium">{selectedRequest.email}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Product Type</p>
                                                    <p className="font-medium">{selectedRequest.productType}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Quantity</p>
                                                    <p className="font-medium">{selectedRequest.quantity}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Size</p>
                                                    <p className="font-medium">{selectedRequest.size}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Color</p>
                                                    <p className="font-medium">{selectedRequest.color}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Special Instructions</p>
                                                    <p className="font-medium text-gray-700">{selectedRequest.specialInstructions}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Status</p>
                                                    <div className="flex items-center mt-1">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                                                            {selectedRequest.status}
                                                        </span>
                                                        <select
                                                            value={selectedRequest.status}
                                                            onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value)}
                                                            className="ml-2 p-1 border border-gray-300 rounded text-xs"
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Priority</p>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                                                        {selectedRequest.priority}
                                                    </span>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Designer</p>
                                                    <p className="font-medium">{selectedRequest.designer}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Deadline</p>
                                                    <p className="font-medium">{selectedRequest.deadline}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Total Amount</p>
                                                    <p className="font-bold text-gray-900">${selectedRequest.totalAmount.toFixed(2)}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Payment Status</p>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentColor(selectedRequest.paymentStatus)}`}>
                                                        {selectedRequest.paymentStatus}
                                                    </span>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Created</p>
                                                    <p className="font-medium">{selectedRequest.createdAt}</p>
                                                </div>
                                                
                                                <div>
                                                    <p className="text-sm text-gray-600">Last Updated</p>
                                                    <p className="font-medium">{selectedRequest.updatedAt}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Attachments</h3>
                                            <div className="space-y-2">
                                                {selectedRequest.attachments.map((attachment, index) => (
                                                    <div key={index} className="flex items-center p-2 bg-white rounded border border-gray-200">
                                                        <i className="fas fa-file-alt text-blue-500 mr-2"></i>
                                                        <span className="text-sm text-gray-700">{attachment}</span>
                                                        <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm">
                                                            <i className="fas fa-download"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Middle Column - References */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">References</h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                {selectedRequest.references.map((ref, index) => (
                                                    <div key={index} className="relative group">
                                                        <img 
                                                            src={ref} 
                                                            alt={`Reference ${index + 1}`} 
                                                            className="w-full h-32 object-cover rounded-lg border group-hover:opacity-75 transition-opacity"
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-all">
                                                            <button className="opacity-0 group-hover:opacity-100 text-white bg-black bg-opacity-50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                                <i className="fas fa-expand"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h3>
                                            <p className="text-gray-700">{selectedRequest.shippingAddress}</p>
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-600">Tracking Number</p>
                                                <p className="font-medium">{selectedRequest.trackingNumber || 'Not yet shipped'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Right Column - Details */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Request Notes</h3>
                                            <p className="text-gray-700">{selectedRequest.notes}</p>
                                        </div>
                                        
                                        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Feedback & Communication</h3>
                                            
                                            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
                                                {selectedRequest.feedback.length > 0 ? (
                                                    selectedRequest.feedback.map(feedback => (
                                                        <div 
                                                            key={feedback.id} 
                                                            className={`p-4 rounded-lg ${
                                                                feedback.type === 'approval' ? 'bg-green-50 border border-green-200' :
                                                                feedback.type === 'design' ? 'bg-blue-50 border border-blue-200' :
                                                                'bg-gray-50 border border-gray-200'
                                                            }`}
                                                        >
                                                            <div className="flex justify-between items-start mb-2">
                                                                <span className="font-medium text-gray-900">{feedback.author}</span>
                                                                <span className="text-xs text-gray-500">{feedback.timestamp}</span>
                                                            </div>
                                                            <p className="text-gray-700">{feedback.message}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 text-center py-4">No feedback yet</p>
                                                )}
                                            </div>
                                            
                                            <div className="border-t border-gray-200 pt-4">
                                                <div className="flex">
                                                    <input
                                                        type="text"
                                                        value={newFeedback}
                                                        onChange={(e) => setNewFeedback(e.target.value)}
                                                        placeholder="Add feedback..."
                                                        className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                    />
                                                    <button
                                                        onClick={() => handleAddFeedback(selectedRequest.id)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-r-lg transition-colors"
                                                    >
                                                        <i className="fas fa-paper-plane"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Timeline</h3>
                                            <div className="space-y-4">
                                                <div className="flex">
                                                    <div className="flex flex-col items-center mr-4">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        <div className="w-0.5 h-16 bg-gray-200"></div>
                                                    </div>
                                                    <div className="pb-4">
                                                        <p className="font-medium text-gray-900">Request Created</p>
                                                        <p className="text-sm text-gray-500">{selectedRequest.createdAt}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex">
                                                    <div className="flex flex-col items-center mr-4">
                                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                        <div className="w-0.5 h-16 bg-gray-200"></div>
                                                    </div>
                                                    <div className="pb-4">
                                                        <p className="font-medium text-gray-900">Design Started</p>
                                                        <p className="text-sm text-gray-500">{selectedRequest.updatedAt}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex">
                                                    <div className="flex flex-col items-center mr-4">
                                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                        <div className="w-0.5 h-16 bg-gray-200"></div>
                                                    </div>
                                                    <div className="pb-4">
                                                        <p className="font-medium text-gray-900">Completed</p>
                                                        <p className="text-sm text-gray-500">{selectedRequest.deadline}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        onClick={() => setSelectedRequest(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transform transition-transform duration-200 hover:scale-105"
                                    >
                                        Close
                                    </button>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105">
                                        Update Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* New Request Modal */}
                {showRequestModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl animate-fade-in">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">New Customization Request</h2>
                                    <button 
                                        onClick={() => setShowRequestModal(false)}
                                        className="text-gray-400 hover:text-gray-600 transform transition-transform duration-200 hover:scale-110"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="Enter customer name"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="Enter customer email"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                                            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                                                <option>Select product type</option>
                                                <option>T-Shirt</option>
                                                <option>Hoodie</option>
                                                <option>Accessories</option>
                                                <option>Apparel</option>
                                                <option>Branding</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                                                <option>Low</option>
                                                <option>Medium</option>
                                                <option>High</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                            <input
                                                type="number"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="Enter quantity"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                                            <input
                                                type="date"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                        <textarea
                                            rows="4"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            placeholder="Describe the customization request..."
                                        ></textarea>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                                        <textarea
                                            rows="3"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            placeholder="Any special requirements..."
                                        ></textarea>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload References (Optional)</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                            <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                                            <p className="text-gray-600 mb-2">Drag and drop images here</p>
                                            <p className="text-sm text-gray-500 mb-4">or</p>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                                                Browse Files
                                            </button>
                                            <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowRequestModal(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Create Request
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {sortedRequests.length === 0 && (
                    <div className="text-center py-12 animate-fade-in">
                        <i className="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No customization requests</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                        <button 
                            onClick={() => setShowRequestModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto transform transition-transform duration-200 hover:scale-105"
                        >
                            <i className="fas fa-plus mr-2"></i> Create New Request
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}