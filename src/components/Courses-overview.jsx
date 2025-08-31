import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const CourseOverviewPage = () => {
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: 'Advanced JavaScript Mastery',
            description: 'Master modern JavaScript concepts including ES6+, async programming, and frameworks',
            thumbnail: 'https://placehold.co/300x200?text=JavaScript',
            enrollments: 1245,
            status: 'Published',
            modules: [
                { 
                    id: 1, 
                    title: 'Introduction to JavaScript', 
                    duration: '45 min', 
                    completed: 1200,
                    lessons: [
                        { 
                            id: 1, 
                            title: 'What is JavaScript?', 
                            duration: '10 min', 
                            type: 'video', 
                            completed: 1200
                        },
                        { 
                            id: 2, 
                            title: 'Variables and Data Types', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 1180
                        },
                        { 
                            id: 3, 
                            title: 'Functions and Scope', 
                            duration: '20 min', 
                            type: 'video', 
                            completed: 1150
                        }
                    ]
                },
                { 
                    id: 2, 
                    title: 'ES6+ Features', 
                    duration: '60 min', 
                    completed: 980,
                    lessons: [
                        { 
                            id: 1, 
                            title: 'Arrow Functions', 
                            duration: '12 min', 
                            type: 'video', 
                            completed: 950
                        },
                        { 
                            id: 2, 
                            title: 'Destructuring', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 920
                        },
                        { 
                            id: 3, 
                            title: 'Modules and Imports', 
                            duration: '18 min', 
                            type: 'video', 
                            completed: 890
                        },
                        { 
                            id: 4, 
                            title: 'Promises and Async/Await', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 850
                        }
                    ]
                }
            ],
            instructor: 'Alex Johnson',
            level: 'Advanced',
            category: 'Programming',
            rating: 4.8,
            prerequisites: ['Basic JavaScript knowledge'],
            objectives: [
                'Master modern JavaScript syntax',
                'Understand asynchronous programming patterns',
                'Build scalable web applications',
                'Work with popular JavaScript frameworks'
            ],
            duration: '12 hours',
            language: 'English',
            certificate: true,
            tags: ['JavaScript', 'ES6+', 'Async', 'Frameworks']
        },
        {
            id: 2,
            title: 'UI/UX Design Fundamentals',
            description: 'Learn the principles of user interface and user experience design',
            thumbnail: 'https://placehold.co/300x200?text=Design',
            enrollments: 892,
            status: 'Draft',
            modules: [
                { 
                    id: 1, 
                    title: 'Design Principles', 
                    duration: '50 min', 
                    completed: 0,
                    lessons: [
                        { 
                            id: 1, 
                            title: 'Visual Hierarchy', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 0
                        },
                        { 
                            id: 2, 
                            title: 'Color Theory', 
                            duration: '20 min', 
                            type: 'video', 
                            completed: 0
                        },
                        { 
                            id: 3, 
                            title: 'Typography Basics', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 0
                        }
                    ]
                },
                { 
                    id: 2, 
                    title: 'User Research', 
                    duration: '65 min', 
                    completed: 0,
                    lessons: [
                        { 
                            id: 1, 
                            title: 'User Personas', 
                            duration: '20 min', 
                            type: 'video', 
                            completed: 0
                        },
                        { 
                            id: 2, 
                            title: 'Usability Testing', 
                            duration: '25 min', 
                            type: 'video', 
                            completed: 0
                        },
                        { 
                            id: 3, 
                            title: 'Competitive Analysis', 
                            duration: '20 min', 
                            type: 'video', 
                            completed: 0
                        }
                    ]
                }
            ],
            instructor: 'Sarah Miller',
            level: 'Beginner',
            category: 'Design',
            rating: 0,
            prerequisites: [],
            objectives: [
                'Understand core design principles',
                'Create effective user interfaces',
                'Conduct user research',
                'Build interactive prototypes'
            ],
            duration: '8 hours',
            language: 'English',
            certificate: false,
            tags: ['Design', 'UI', 'UX', 'Research']
        },
        {
            id: 3,
            title: 'React Development Bootcamp',
            description: 'Comprehensive guide to building modern web applications with React',
            thumbnail: 'https://placehold.co/300x200?text=React',
            enrollments: 2156,
            status: 'Published',
            modules: [
                { 
                    id: 1, 
                    title: 'React Basics', 
                    duration: '60 min', 
                    completed: 2000,
                    lessons: [
                        { 
                            id: 1, 
                            title: 'Setting Up Your Environment', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 2000
                        },
                        { 
                            id: 2, 
                            title: 'Components and JSX', 
                            duration: '20 min', 
                            type: 'video', 
                            completed: 1980
                        }
                    ]
                }
            ],
            instructor: 'Michael Chen',
            level: 'Intermediate',
            category: 'Programming',
            rating: 4.9,
            prerequisites: ['HTML/CSS basics', 'JavaScript fundamentals'],
            objectives: [
                'Build responsive web applications',
                'Use React hooks effectively',
                'Implement routing and navigation',
                'Integrate with REST APIs',
                'Deploy React applications'
            ],
            duration: '18 hours',
            language: 'English',
            certificate: true,
            tags: ['React', 'JavaScript', 'Frontend', 'Web Development']
        }
    ])

    const [editingCourse, setEditingCourse] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [categoryFilter, setCategoryFilter] = useState('all')

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || course.status === statusFilter
        const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter
        return matchesSearch && matchesStatus && matchesCategory
    })

    const getStatusColor = (status) => {
        switch(status) {
            case 'Published': return 'bg-green-100 text-green-800'
            case 'Draft': return 'bg-yellow-100 text-yellow-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getLevelColor = (level) => {
        switch(level) {
            case 'Beginner': return 'bg-blue-100 text-blue-800'
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
            case 'Advanced': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const handleUpdateCourse = (updatedCourse) => {
        setCourses(courses.map(course => 
            course.id === updatedCourse.id ? updatedCourse : course
        ))
        setEditingCourse(null)
    }

    const handleDeleteCourse = (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            setCourses(courses.filter(course => course.id !== id))
        }
    }

    const getLessonCount = (course) => {
        return course.modules.reduce((total, module) => total + module.lessons.length, 0)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
                        <p className="text-gray-600 mt-2">Manage and edit all your courses</p>
                    </div>
                    <button 
                        onClick={() => window.location.href = '/create-course'}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                    >
                        <i className="fas fa-plus mr-2"></i> Create New Course
                    </button>
                </div>

                {/* Filters */}
                <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search Courses</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by title or instructor..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                />
                                <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                                <option value="all">All Categories</option>
                                <option value="Programming">Programming</option>
                                <option value="Design">Design</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="course-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                            <div className="p-4">
                                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                                    <img 
                                        src={course.thumbnail} 
                                        alt={course.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{course.title}</h3>
                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{course.description}</p>
                                
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                                        {course.status}
                                    </span>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                                        {course.level}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between text-xs text-gray-500 mb-3">
                                    <span>{course.enrollments.toLocaleString()} enrolled</span>
                                    <span>{getLessonCount(course)} lessons</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <i className="fas fa-user text-gray-400 text-xs mr-1"></i>
                                        <span className="text-xs text-gray-600">{course.instructor}</span>
                                    </div>
                                    <button 
                                        onClick={() => setEditingCourse(course)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edit Course Modal */}
                {editingCourse && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Edit Course: {editingCourse.title}</h2>
                                    <button 
                                        onClick={() => setEditingCourse(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                                <input
                                                    type="text"
                                                    value={editingCourse.title}
                                                    onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                />
                                            </div>
                                            
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
                                                <textarea
                                                    value={editingCourse.description}
                                                    onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                    rows="3"
                                                />
                                            </div>
                                            
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                                                <input
                                                    type="text"
                                                    value={editingCourse.instructor}
                                                    onChange={(e) => setEditingCourse({...editingCourse, instructor: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                />
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                                    <select
                                                        value={editingCourse.category}
                                                        onChange={(e) => setEditingCourse({...editingCourse, category: e.target.value})}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                    >
                                                        <option value="Programming">Programming</option>
                                                        <option value="Design">Design</option>
                                                        <option value="Data Science">Data Science</option>
                                                        <option value="Business">Business</option>
                                                    </select>
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                                                    <select
                                                        value={editingCourse.level}
                                                        onChange={(e) => setEditingCourse({...editingCourse, level: e.target.value})}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                    >
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Intermediate">Intermediate</option>
                                                        <option value="Advanced">Advanced</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                                <input
                                                    type="text"
                                                    value={editingCourse.duration}
                                                    onChange={(e) => setEditingCourse({...editingCourse, duration: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image URL</label>
                                                <input
                                                    type="text"
                                                    value={editingCourse.thumbnail}
                                                    onChange={(e) => setEditingCourse({...editingCourse, thumbnail: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                />
                                                {editingCourse.thumbnail && (
                                                    <div className="mt-2">
                                                        <img src={editingCourse.thumbnail} alt="Thumbnail Preview" className="w-full h-32 object-cover rounded border" />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                                <select
                                                    value={editingCourse.language}
                                                    onChange={(e) => setEditingCourse({...editingCourse, language: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                >
                                                    <option value="English">English</option>
                                                    <option value="Spanish">Spanish</option>
                                                    <option value="French">French</option>
                                                    <option value="German">German</option>
                                                    <option value="Chinese">Chinese</option>
                                                </select>
                                            </div>
                                            
                                            <div className="mb-4">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={editingCourse.certificate}
                                                        onChange={(e) => setEditingCourse({...editingCourse, certificate: e.target.checked})}
                                                        className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <span className="text-sm text-gray-700">Offer Certificate upon Completion</span>
                                                </label>
                                            </div>
                                            
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                                                <input
                                                    type="text"
                                                    value={editingCourse.tags.join(', ')}
                                                    onChange={(e) => setEditingCourse({...editingCourse, tags: e.target.value.split(',').map(tag => tag.trim())})}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Objectives</h3>
                                        <div className="space-y-2">
                                            {editingCourse.objectives.map((objective, index) => (
                                                <div key={index} className="flex items-center">
                                                    <input
                                                        type="text"
                                                        value={objective}
                                                        onChange={(e) => {
                                                            const objectives = [...editingCourse.objectives]
                                                            objectives[index] = e.target.value
                                                            setEditingCourse({...editingCourse, objectives})
                                                        }}
                                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const objectives = [...editingCourse.objectives]
                                                            objectives.splice(index, 1)
                                                            setEditingCourse({...editingCourse, objectives})
                                                        }}
                                                        className="ml-2 text-red-600 hover:text-red-800"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => setEditingCourse({...editingCourse, objectives: [...editingCourse.objectives, '']})}
                                                className="text-blue-600 hover:text-blue-800 flex items-center"
                                            >
                                                <i className="fas fa-plus mr-1"></i> Add Objective
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h3>
                                        <div className="space-y-2">
                                            {editingCourse.prerequisites.map((prereq, index) => (
                                                <div key={index} className="flex items-center">
                                                    <input
                                                        type="text"
                                                        value={prereq}
                                                        onChange={(e) => {
                                                            const prerequisites = [...editingCourse.prerequisites]
                                                            prerequisites[index] = e.target.value
                                                            setEditingCourse({...editingCourse, prerequisites})
                                                        }}
                                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const prerequisites = [...editingCourse.prerequisites]
                                                            prerequisites.splice(index, 1)
                                                            setEditingCourse({...editingCourse, prerequisites})
                                                        }}
                                                        className="ml-2 text-red-600 hover:text-red-800"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => setEditingCourse({...editingCourse, prerequisites: [...editingCourse.prerequisites, '']})}
                                                className="text-blue-600 hover:text-blue-800 flex items-center"
                                            >
                                                <i className="fas fa-plus mr-1"></i> Add Prerequisite
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={() => setEditingCourse(null)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleUpdateCourse(editingCourse)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <i className="fas fa-book-open text-6xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                        <button 
                            onClick={() => window.location.href = '/create-course'}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
                        >
                            <i className="fas fa-plus mr-2"></i> Create Your First Course
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}