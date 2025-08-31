import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const ProductsPage = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Premium Cotton T-Shirt',
            price: 29.99,
            stock: 45,
            views: 1242,
            purchases: 89,
            image: 'https://placehold.co/150x150?text=T-Shirt',
            category: 'Shirts',
            tags: ['Cotton', 'Premium', 'Comfort'],
            code: 'A1B2C',
            colors: ['Red', 'Blue', 'Black'],
            discount: 0,
            sizes: ['S', 'M', 'L', 'XL']
        },
        {
            id: 2,
            name: 'Hoodie Collection',
            price: 59.99,
            stock: 12,
            views: 892,
            purchases: 45,
            image: 'https://placehold.co/150x150?text=Hoodie',
            category: 'Hoodies',
            tags: ['Fleece', 'Warm', 'Comfort'],
            code: 'D3E4F',
            colors: ['Gray', 'Navy', 'Green'],
            discount: 15,
            sizes: ['S', 'M', 'L']
        },
        {
            id: 3,
            name: 'Designer Cap',
            price: 34.99,
            stock: 0,
            views: 2341,
            purchases: 156,
            image: 'https://placehold.co/150x150?text=Cap',
            category: 'Accessories',
            tags: ['Designer', 'Premium', 'Summer'],
            code: 'G5H6I',
            colors: ['White', 'Black'],
            discount: 0,
            sizes: ['One Size']
        },
        {
            id: 4,
            name: 'Vintage Graphic Tee',
            price: 24.99,
            stock: 78,
            views: 3421,
            purchases: 234,
            image: 'https://placehold.co/150x150?text=Graphic',
            category: 'Shirts',
            tags: ['Vintage', 'Graphic', 'Cotton'],
            code: 'J7K8L',
            colors: ['Yellow', 'Purple', 'Orange'],
            discount: 10,
            sizes: ['S', 'M', 'L', 'XL']
        },
        {
            id: 5,
            name: 'Sports Hoodie',
            price: 49.99,
            stock: 23,
            views: 1876,
            purchases: 123,
            image: 'https://placehold.co/150x150?text=Sports',
            category: 'Hoodies',
            tags: ['Sports', 'Performance', 'Moisture'],
            code: 'M9N0O',
            colors: ['Red', 'Blue', 'Black', 'White'],
            discount: 5,
            sizes: ['S', 'M', 'L', 'XL']
        },
        {
            id: 6,
            name: 'Wrist Watch',
            price: 89.99,
            stock: 5,
            views: 567,
            purchases: 34,
            image: 'https://placehold.co/150x150?text=Watch',
            category: 'Accessories',
            tags: ['Luxury', 'Premium', 'Classic'],
            code: 'P1Q2R',
            colors: ['Silver', 'Gold', 'Black'],
            discount: 20,
            sizes: ['One Size']
        }
    ])

    const [categories] = useState(['All', 'Shirts', 'Hoodies', 'Accessories'])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [showAddModal, setShowAddModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [stockFilter, setStockFilter] = useState('all')
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        stock: '',
        category: 'Shirts',
        tags: '',
        colors: '',
        sizes: '',
        discount: '0'
    })

    // Generate unique 5-digit product code
    const generateUniqueCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        let isUnique = false;
        let attempts = 0;
        
        while (!isUnique && attempts < 100) {
            code = '';
            for (let i = 0; i < 5; i++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            
            // Check if code already exists
            isUnique = !products.some(product => product.code === code);
            attempts++;
        }
        
        return code;
    }

    useGSAP(() => {
        // Animate header elements
        gsap.from(".header-title, .header-subtitle, .add-product-btn", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.1
        });

        // Animate category filters
        gsap.from(".category-filter", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.2
        });

        // Animate search bar
        gsap.from(".search-bar", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 0.4
        });

        // Animate inventory alerts
        gsap.from(".inventory-alerts", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 0.6
        });

        // Animate product table
        gsap.from(".product-table", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 0.8
        });

        // Animate each product row
        gsap.from(".product-row", {
            duration: 0.6,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.1,
            delay: 1.0
        });
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        let matchesStock = true
        
        if (stockFilter === 'low') {
            matchesStock = product.stock > 0 && product.stock < 10
        } else if (stockFilter === 'out') {
            matchesStock = product.stock === 0
        }
        
        return matchesCategory && matchesSearch && matchesStock
    })

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.price) {
            const product = {
                id: products.length + 1,
                ...newProduct,
                price: parseFloat(newProduct.price),
                stock: parseInt(newProduct.stock) || 0,
                views: 0,
                purchases: 0,
                image: `https://placehold.co/150x150?text=${newProduct.name.substring(0, 10)}`,
                tags: newProduct.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                code: generateUniqueCode(),
                colors: newProduct.colors.split(',').map(color => color.trim()).filter(color => color),
                sizes: newProduct.sizes.split(',').map(size => size.trim()).filter(size => size),
                discount: parseInt(newProduct.discount) || 0
            }
            setProducts([...products, product])
            setNewProduct({ 
                name: '', 
                price: '', 
                stock: '', 
                category: 'Shirts', 
                tags: '',
                colors: '',
                sizes: '',
                discount: '0'
            })
            setShowAddModal(false)
        }
    }

    const handleEditProduct = (product) => {
        setEditingProduct(product)
    }

    const handleUpdateProduct = () => {
        if (editingProduct.name && editingProduct.price) {
            setProducts(products.map(p => 
                p.id === editingProduct.id ? { 
                    ...editingProduct, 
                    price: parseFloat(editingProduct.price),
                    discount: parseInt(editingProduct.discount) || 0
                } : p
            ))
            setEditingProduct(null)
        }
    }

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id))
    }

    const getStockStatus = (stock) => {
        if (stock === 0) return 'out-of-stock'
        if (stock < 10) return 'low-stock'
        return 'in-stock'
    }

    const getStockColor = (stock) => {
        if (stock === 0) return 'text-red-600 bg-red-100'
        if (stock < 10) return 'text-yellow-600 bg-yellow-100'
        return 'text-green-600 bg-green-100'
    }

    const getDiscountColor = (discount) => {
        if (discount > 0) return 'text-red-600 bg-red-100'
        return 'text-gray-600 bg-gray-100'
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="header-title text-3xl font-bold text-gray-900">Products Management</h1>
                        <p className="header-subtitle text-gray-600 mt-2">Manage your merchandise inventory and performance</p>
                    </div>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="add-product-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                    >
                        <i className="fas fa-plus mr-2"></i> Add Product
                    </button>
                </div>

                {/* Category Filters */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`category-filter px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 search-bar">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                        <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        >
                            <option value="all">All Products</option>
                            <option value="low">Low Stock</option>
                            <option value="out">Out of Stock</option>
                        </select>
                    </div>
                </div>

                {/* Inventory Alerts */}
                <div className="mb-8 inventory-alerts">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Inventory Alerts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                <div className="flex items-center">
                                    <i className="fas fa-exclamation-triangle text-red-600 text-xl mr-3"></i>
                                    <div>
                                        <p className="font-semibold text-red-800">{products.filter(p => p.stock === 0).length}</p>
                                        <p className="text-sm text-red-600">Out of Stock</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <div className="flex items-center">
                                    <i className="fas fa-info-circle text-yellow-600 text-xl mr-3"></i>
                                    <div>
                                        <p className="font-semibold text-yellow-800">{products.filter(p => p.stock < 10 && p.stock > 0).length}</p>
                                        <p className="text-sm text-yellow-600">Low Stock</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center">
                                    <i className="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                                    <div>
                                        <p className="font-semibold text-green-800">{products.filter(p => p.stock >= 10).length}</p>
                                        <p className="text-sm text-green-600">In Stock</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product List */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8 product-table">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Product List</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Product</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Price</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Discount</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Views</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Purchases</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 product-row">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover mr-3" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{product.name}</p>
                                                    <p className="text-sm text-gray-500">{product.category}</p>
                                                    <p className="text-xs text-gray-400">Code: {product.code}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="font-medium text-gray-900">${product.price.toFixed(2)}</p>
                                            {product.discount > 0 && (
                                                <p className="text-sm text-red-600 line-through">${(product.price * 100 / (100 - product.discount)).toFixed(2)}</p>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockColor(product.stock)}`}>
                                                {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? `Low (${product.stock})` : `In Stock (${product.stock})`}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDiscountColor(product.discount)}`}>
                                                {product.discount > 0 ? `${product.discount}% OFF` : 'No Discount'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="text-gray-900">{product.views.toLocaleString()}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="text-gray-900">{product.purchases.toLocaleString()}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleEditProduct(product)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Product Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                                    <button 
                                        onClick={() => setShowAddModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Product Name</label>
                                            <input
                                                type="text"
                                                value={newProduct.name}
                                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="Enter product name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Product Code</label>
                                            <input
                                                type="text"
                                                value={generateUniqueCode()}
                                                readOnly
                                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900"
                                                placeholder="Auto-generated"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Price ($)</label>
                                            <input
                                                type="number"
                                                value={newProduct.price}
                                                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="0.00"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Stock Quantity</label>
                                            <input
                                                type="number"
                                                value={newProduct.stock}
                                                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Category</label>
                                            <select
                                                value={newProduct.category}
                                                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            >
                                                <option value="Shirts">Shirts</option>
                                                <option value="Hoodies">Hoodies</option>
                                                <option value="Accessories">Accessories</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Discount (%)</label>
                                            <input
                                                type="number"
                                                value={newProduct.discount}
                                                onChange={(e) => setNewProduct({...newProduct, discount: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="0"
                                                min="0"
                                                max="100"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Colors (comma separated)</label>
                                        <input
                                            type="text"
                                            value={newProduct.colors}
                                            onChange={(e) => setNewProduct({...newProduct, colors: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            placeholder="e.g., Red, Blue, Black"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Sizes (comma separated)</label>
                                        <input
                                            type="text"
                                            value={newProduct.sizes}
                                            onChange={(e) => setNewProduct({...newProduct, sizes: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            placeholder="e.g., S, M, L, XL"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Tags (comma separated)</label>
                                        <input
                                            type="text"
                                            value={newProduct.tags}
                                            onChange={(e) => setNewProduct({...newProduct, tags: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            placeholder="e.g., Cotton, Premium, Comfort"
                                        />
                                    </div>
                                    
                                    <div className="border-t border-gray-200 pt-4">
                                        <button
                                            onClick={handleAddProduct}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                                        >
                                            Add Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Product Modal */}
                {editingProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                                    <button 
                                        onClick={() => setEditingProduct(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Product Name</label>
                                            <input
                                                type="text"
                                                value={editingProduct.name}
                                                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Product Code</label>
                                            <input
                                                type="text"
                                                value={editingProduct.code}
                                                readOnly
                                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Price ($)</label>
                                            <input
                                                type="number"
                                                value={editingProduct.price}
                                                onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Stock Quantity</label>
                                            <input
                                                type="number"
                                                value={editingProduct.stock}
                                                onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Category</label>
                                            <select
                                                value={editingProduct.category}
                                                onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            >
                                                <option value="Shirts">Shirts</option>
                                                <option value="Hoodies">Hoodies</option>
                                                <option value="Accessories">Accessories</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-1">Discount (%)</label>
                                            <input
                                                type="number"
                                                value={editingProduct.discount}
                                                onChange={(e) => setEditingProduct({...editingProduct, discount: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                min="0"
                                                max="100"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Colors (comma separated)</label>
                                        <input
                                            type="text"
                                            value={editingProduct.colors.join(', ')}
                                            onChange={(e) => setEditingProduct({...editingProduct, colors: e.target.value.split(',').map(c => c.trim())})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-1">Sizes (comma separated)</label>
                                        <input
                                            type="text"
                                            value={editingProduct.sizes.join(', ')}
                                            onChange={(e) => setEditingProduct({...editingProduct, sizes: e.target.value.split(',').map(s => s.trim())})}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                        />
                                    </div>
                                    
                                    <div className="border-t border-gray-200 pt-4">
                                        <button
                                            onClick={handleUpdateProduct}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                                        >
                                            Update Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}