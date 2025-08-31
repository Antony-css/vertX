import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const OrdersPage = () => {
    const [orders, setOrders] = useState([
        {
            id: 'ORD-001',
            user: 'John Smith',
            email: 'john@example.com',
            items: [
                { name: 'Premium Cotton T-Shirt', quantity: 2, price: 29.99 },
                { name: 'Designer Cap', quantity: 1, price: 34.99 }
            ],
            total: 94.97,
            status: 'Processing',
            shipping: {
                address: '123 Main St, New York, NY 10001',
                method: 'Standard Shipping',
                tracking: 'TRK123456789'
            },
            payment: {
                method: 'Credit Card',
                transactionId: 'TXN-789456123',
                status: 'Completed'
            },
            timeline: [
                { status: 'Order Placed', date: '2023-05-15 10:30 AM', completed: true },
                { status: 'Payment Confirmed', date: '2023-05-15 11:15 AM', completed: true },
                { status: 'Processing', date: '2023-05-16 9:00 AM', completed: true },
                { status: 'Shipped', date: '2023-05-17 2:30 PM', completed: false },
                { status: 'Delivered', date: '', completed: false }
            ]
        },
        {
            id: 'ORD-002',
            user: 'Sarah Johnson',
            email: 'sarah@example.com',
            items: [
                { name: 'Hoodie Collection', quantity: 1, price: 59.99 },
                { name: 'Sports Hoodie', quantity: 1, price: 49.99 }
            ],
            total: 109.98,
            status: 'Shipped',
            shipping: {
                address: '456 Oak Ave, Los Angeles, CA 90210',
                method: 'Express Shipping',
                tracking: 'TRK987654321'
            },
            payment: {
                method: 'PayPal',
                transactionId: 'TXN-123456789',
                status: 'Completed'
            },
            timeline: [
                { status: 'Order Placed', date: '2023-05-14 3:45 PM', completed: true },
                { status: 'Payment Confirmed', date: '2023-05-14 4:20 PM', completed: true },
                { status: 'Processing', date: '2023-05-15 11:00 AM', completed: true },
                { status: 'Shipped', date: '2023-05-16 10:15 AM', completed: true },
                { status: 'Delivered', date: '2023-05-17 4:30 PM', completed: true }
            ]
        },
        {
            id: 'ORD-003',
            user: 'Mike Wilson',
            email: 'mike@example.com',
            items: [
                { name: 'Vintage Graphic Tee', quantity: 3, price: 24.99 }
            ],
            total: 74.97,
            status: 'Delivered',
            shipping: {
                address: '789 Pine Rd, Chicago, IL 60601',
                method: 'Standard Shipping',
                tracking: 'TRK456789123'
            },
            payment: {
                method: 'Credit Card',
                transactionId: 'TXN-321654987',
                status: 'Completed'
            },
            timeline: [
                { status: 'Order Placed', date: '2023-05-10 1:20 PM', completed: true },
                { status: 'Payment Confirmed', date: '2023-05-10 2:05 PM', completed: true },
                { status: 'Processing', date: '2023-05-11 9:30 AM', completed: true },
                { status: 'Shipped', date: '2023-05-12 3:45 PM', completed: true },
                { status: 'Delivered', date: '2023-05-14 10:15 AM', completed: true }
            ]
        },
        {
            id: 'ORD-004',
            user: 'Emily Davis',
            email: 'emily@example.com',
            items: [
                { name: 'Wrist Watch', quantity: 1, price: 89.99 }
            ],
            total: 89.99,
            status: 'Processing',
            shipping: {
                address: '321 Elm St, Houston, TX 77001',
                method: 'Standard Shipping',
                tracking: 'TRK789123456'
            },
            payment: {
                method: 'Credit Card',
                transactionId: 'TXN-654321789',
                status: 'Completed'
            },
            timeline: [
                { status: 'Order Placed', date: '2023-05-17 9:15 AM', completed: true },
                { status: 'Payment Confirmed', date: '2023-05-17 9:30 AM', completed: true },
                { status: 'Processing', date: '2023-05-17 11:00 AM', completed: false },
                { status: 'Shipped', date: '', completed: false },
                { status: 'Delivered', date: '', completed: false }
            ]
        }
    ])

    const [selectedOrder, setSelectedOrder] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    useGSAP(() => {
        // Animate header elements
        gsap.from(".header-title, .header-subtitle", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.1
        });

        // Animate search and filter bar
        gsap.from(".search-filter-bar", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 0.2
        });

        // Animate orders table
        gsap.from(".orders-table", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 0.4
        });

        // Animate each order row
        gsap.from(".order-row", {
            duration: 0.6,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.6
        });
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             order.user.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusColor = (status) => {
        switch(status) {
            case 'Processing': return 'bg-yellow-100 text-yellow-800'
            case 'Shipped': return 'bg-blue-100 text-blue-800'
            case 'Delivered': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ))
        
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus })
        }
    }

    const printLabel = (orderId) => {
        alert(`Printing shipping label for order ${orderId}`)
    }

    const markAsShipped = (orderId) => {
        updateOrderStatus(orderId, 'Shipped')
        alert(`Order ${orderId} marked as shipped`)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="header-title text-3xl font-bold text-gray-900">Orders Management</h1>
                        <p className="header-subtitle text-gray-600 mt-2">Track and fulfill customer purchases</p>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="mb-8 search-filter-bar">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search orders by ID or user..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            />
                            <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        >
                            <option value="all">All Statuses</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8 orders-table">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Items</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Total</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 order-row cursor-pointer" 
                                        onClick={() => setSelectedOrder(order)}>
                                        <td className="py-4 px-4">
                                            <p className="font-medium text-gray-900">{order.id}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="font-medium text-gray-900">{order.user}</p>
                                            <p className="text-sm text-gray-500">{order.email}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="text-sm text-gray-900">{order.items.length} items</p>
                                            <p className="text-xs text-gray-500 truncate">{order.items[0]?.name}{order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Order Detail View */}
                {selectedOrder && (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Order Details: {selectedOrder.id}</h2>
                            <button 
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Order Summary */}
                            <div className="lg:col-span-2">
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h3>
                                    <div className="space-y-3">
                                        {selectedOrder.items.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                        <p className="font-semibold text-gray-900">Total</p>
                                        <p className="font-bold text-lg text-gray-900">${selectedOrder.total.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Shipping Information */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Information</h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-900"><span className="font-medium">Address:</span> {selectedOrder.shipping.address}</p>
                                        <p className="text-gray-900"><span className="font-medium">Method:</span> {selectedOrder.shipping.method}</p>
                                        <p className="text-gray-900"><span className="font-medium">Tracking:</span> {selectedOrder.shipping.tracking}</p>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-900"><span className="font-medium">Method:</span> {selectedOrder.payment.method}</p>
                                        <p className="text-gray-900"><span className="font-medium">Transaction ID:</span> {selectedOrder.payment.transactionId}</p>
                                        <p className="text-gray-900"><span className="font-medium">Status:</span> <span className="text-green-600">{selectedOrder.payment.status}</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline and Fulfillment Panel */}
                            <div>
                                {/* Timeline */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Timeline</h3>
                                    <div className="space-y-4">
                                        {selectedOrder.timeline.map((step, index) => (
                                            <div key={index} className="flex">
                                                <div className={`flex flex-col items-center mr-3 ${index < selectedOrder.timeline.length - 1 ? 'justify-between' : ''}`}>
                                                    <div className={`w-3 h-3 rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-300'} ${index === 0 ? 'mt-1' : ''}`}></div>
                                                    {index < selectedOrder.timeline.length - 1 && (
                                                        <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                    )}
                                                </div>
                                                <div className="pb-4">
                                                    <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>{step.status}</p>
                                                    <p className="text-sm text-gray-500">{step.date || 'Pending'}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Fulfillment Panel */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Fulfillment Actions</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Update Status</label>
                                            <select
                                                value={selectedOrder.status}
                                                onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => printLabel(selectedOrder.id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                                            >
                                                <i className="fas fa-print mr-2"></i> Print Label
                                            </button>
                                            <button
                                                onClick={() => markAsShipped(selectedOrder.id)}
                                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                                            >
                                                <i className="fas fa-truck mr-2"></i> Mark Shipped
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!selectedOrder && filteredOrders.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center">
                        <i className="fas fa-box-open text-gray-400 text-5xl mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                        <button 
                            onClick={() => {
                                setSearchTerm('')
                                setStatusFilter('all')
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}