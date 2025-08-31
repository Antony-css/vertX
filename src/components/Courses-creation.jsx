import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const CoursesPage = () => {
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: 'Advanced JavaScript Mastery',
            description: 'Master modern JavaScript concepts including ES6+, async programming, and frameworks',
            thumbnail: 'https://placehold.co/300x200?text=JavaScript',
            enrollments: 1245,
            views: 8921,
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
                            completed: 1200,
                            videoUrl: 'https://example.com/video1',
                            description: 'Learn the fundamentals of JavaScript and its role in web development',
                            resources: ['JavaScript Basics.pdf', 'Code Examples.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'What is JavaScript primarily used for?',
                                        options: ['Server-side processing', 'Client-side scripting', 'Database management', 'Network configuration'],
                                        correct: 1
                                    }
                                ]
                            }
                        },
                        { 
                            id: 2, 
                            title: 'Variables and Data Types', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 1180,
                            videoUrl: 'https://example.com/video2',
                            description: 'Explore variables, data types, and how to declare them properly',
                            resources: ['Variables Guide.pdf', 'Practice Exercises.docx'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'Which keyword is used to declare a constant variable?',
                                        options: ['var', 'let', 'const', 'static'],
                                        correct: 2
                                    }
                                ]
                            }
                        },
                        { 
                            id: 3, 
                            title: 'Functions and Scope', 
                            duration: '20 min', 
                            type: 'video', 
                            completed: 1150,
                            videoUrl: 'https://example.com/video3',
                            description: 'Master function declarations, expressions, and scope concepts',
                            resources: ['Functions Handbook.pdf', 'Scope Examples.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'What is the difference between var and let?',
                                        options: ['No difference', 'var is block-scoped', 'var is function-scoped', 'let is global'],
                                        correct: 2
                                    }
                                ]
                            }
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
                            completed: 950,
                            videoUrl: 'https://example.com/video4',
                            description: 'Learn arrow functions and their advantages over traditional functions',
                            resources: ['Arrow Functions.pdf', 'Examples.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'How do arrow functions handle "this" differently?',
                                        options: ['They don\'t', 'They bind "this" lexically', 'They create new "this"', 'They ignore "this"'],
                                        correct: 1
                                    }
                                ]
                            }
                        },
                        { 
                            id: 2, 
                            title: 'Destructuring', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 920,
                            videoUrl: 'https://example.com/video5',
                            description: 'Extract values from arrays and objects easily',
                            resources: ['Destructuring Guide.pdf', 'Practice Files.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'What does destructuring allow you to do?',
                                        options: ['Create new variables', 'Extract properties from objects', 'Change array order', 'Define functions'],
                                        correct: 1
                                    }
                                ]
                            }
                        },
                        { 
                            id: 3, 
                            title: 'Modules and Imports', 
                            duration: '18 min', 
                            type: 'video', 
                            completed: 890,
                            videoUrl: 'https://example.com/video6',
                            description: 'Organize code into modules and import/export functionality',
                            resources: ['Modules Handbook.pdf', 'Module Examples.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'What is the purpose of default exports?',
                                        options: ['To export multiple items', 'To export one main item', 'To hide imports', 'To define types'],
                                        correct: 1
                                    }
                                ]
                            }
                        },
                        { 
                            id: 4, 
                            title: 'Promises and Async/Await', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 850,
                            videoUrl: 'https://example.com/video7',
                            description: 'Handle asynchronous operations with promises and async/await',
                            resources: ['Async Guide.pdf', 'Promise Examples.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'What does async/await do?',
                                        options: ['Makes functions synchronous', 'Simplifies promise handling', 'Creates new functions', 'Deletes promises'],
                                        correct: 1
                                    }
                                ]
                            }
                        }
                    ]
                },
                { 
                    id: 3, 
                    title: 'Async Programming', 
                    duration: '75 min', 
                    completed: 750,
                    lessons: [
                        { 
                            id: 1, 
                            title: 'Understanding Callbacks', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 720,
                            videoUrl: 'https://example.com/video8',
                            description: 'Learn callback functions and their role in asynchronous programming',
                            resources: ['Callbacks.pdf', 'Callback Examples.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'What is a callback function?',
                                        options: ['A function passed as argument', 'A function that runs automatically', 'A function with no parameters', 'A function that returns nothing'],
                                        correct: 0
                                    }
                                ]
                            }
                        },
                        { 
                            id: 2, 
                            title: 'Promises Deep Dive', 
                            duration: '20 min', 
                            type: 'video', 
                            completed: 690,
                            videoUrl: 'https://example.com/video9',
                            description: 'Deep dive into promise chains, rejection handling, and utilities',
                            resources: ['Promises.pdf', 'Promise Practice.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'What are the three states of a Promise?',
                                        options: ['Pending, Resolved, Rejected', 'Active, Inactive, Complete', 'Open, Closed, Pending', 'Ready, Running, Finished'],
                                        correct: 0
                                    }
                                ]
                            }
                        },
                        { 
                            id: 3, 
                            title: 'Async/Await Patterns', 
                            duration: '25 min', 
                            type: 'video', 
                            completed: 650,
                            videoUrl: 'https://example.com/video10',
                            description: 'Advanced patterns for handling async operations with async/await',
                            resources: ['Async Patterns.pdf', 'Pattern Examples.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'How do you handle errors in async/await?',
                                        options: ['With try/catch blocks', 'With if statements', 'With console.log', 'With return statements'],
                                        correct: 0
                                    }
                                ]
                            }
                        }
                    ]
                },
                { 
                    id: 4, 
                    title: 'Frameworks Overview', 
                    duration: '50 min', 
                    completed: 620,
                    lessons: [
                        { 
                            id: 1, 
                            title: 'React Fundamentals', 
                            duration: '20 min', 
                            type: 'video', 
                            completed: 580,
                            videoUrl: 'https://example.com/video11',
                            description: 'Introduction to React components, JSX, and virtual DOM',
                            resources: ['React Basics.pdf', 'React Examples.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'What is JSX?',
                                        options: ['JavaScript XML', 'Java Syntax Extension', 'JSON Syntax Extension', 'JavaScript Extension'],
                                        correct: 0
                                    }
                                ]
                            }
                        },
                        { 
                            id: 2, 
                            title: 'Vue.js Basics', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 550,
                            videoUrl: 'https://example.com/video12',
                            description: 'Learn Vue.js reactivity system and component structure',
                            resources: ['Vue Guide.pdf', 'Vue Examples.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'What is Vue\'s reactivity system based on?',
                                        options: ['Proxy objects', 'Event listeners', 'DOM manipulation', 'CSS transitions'],
                                        correct: 0
                                    }
                                ]
                            }
                        },
                        { 
                            id: 3, 
                            title: 'Angular Concepts', 
                            duration: '15 min', 
                            type: 'video', 
                            completed: 520,
                            videoUrl: 'https://example.com/video13',
                            description: 'Explore Angular architecture, components, and dependency injection',
                            resources: ['Angular.pdf', 'Angular Examples.zip'],
                            quiz: {
                                questions: [
                                    {
                                        question: 'What is Angular\'s dependency injection?',
                                        options: ['A service container', 'A component manager', 'A template engine', 'A testing framework'],
                                        correct: 0
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            completionRate: 65,
            avgQuizScore: 82,
            feedback: 'Great course with practical examples',
            instructor: 'Alex Johnson',
            level: 'Advanced',
            category: 'Programming',
            rating: 4.8,
            reviews: 142,
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
            tags: ['JavaScript', 'ES6+', 'Async', 'Frameworks'],
            difficulty: 'Hard',
            lastUpdated: '2023-05-15',
            targetAudience: 'Web developers with basic JS knowledge',
            learningOutcomes: [
                'Create complex JavaScript applications',
                'Implement async patterns efficiently',
                'Use modern ES6+ features',
                'Build responsive UIs with frameworks'
            ]
        }
    ])

    const [currentStep, setCurrentStep] = useState(1)
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        thumbnail: '',
        instructor: '',
        category: 'Programming',
        level: 'Beginner',
        duration: '',
        language: 'English',
        certificate: false,
        tags: [],
        prerequisites: [],
        objectives: [],
        targetAudience: '',
        learningOutcomes: [],
        modules: []
    })

    const [editingModule, setEditingModule] = useState(null)
    const [editingLesson, setEditingLesson] = useState(null)
    const [showPreview, setShowPreview] = useState(false)
    const [previewCourse, setPreviewCourse] = useState(null)
    const [lessonForm, setLessonForm] = useState({
        title: '',
        description: '',
        duration: '',
        type: 'video',
        videoUrl: '',
        thumbnail: '',
        sourceCode: '',
        resources: [],
        quiz: { questions: [] }
    })

    const steps = [
        { id: 1, title: 'Course Details', icon: 'fas fa-book' },
        { id: 2, title: 'Learning Objectives', icon: 'fas fa-bullseye' },
        { id: 3, title: 'Content Structure', icon: 'fas fa-folder' },
        { id: 4, title: 'Review & Publish', icon: 'fas fa-check-circle' }
    ]

    useGSAP(() => {
        gsap.from("h1, h2, h3, h4, h5, h6, p", {
            y: 50,
            opacity: 0,
            ease: "power2.out"
        })
        // Animate step indicators
        gsap.from(".step-indicator", {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Animate step content
        gsap.from(".step-content", {
            duration: 0.6,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 0.2
        });

        // Animate preview card
        gsap.from(".preview-card", {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "power2.out",
            delay: 0.5
        });
    }, [currentStep, showPreview])

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleInputChange = (field, value) => {
        setNewCourse({ ...newCourse, [field]: value })
    }

    const handleTagChange = (e) => {
        const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
        setNewCourse({ ...newCourse, tags })
    }

    const handlePrerequisiteChange = (e) => {
        const prereqs = e.target.value.split(',').map(prereq => prereq.trim()).filter(prereq => prereq)
        setNewCourse({ ...newCourse, prerequisites: prereqs })
    }

    const handleObjectiveChange = (e, index) => {
        const objectives = [...newCourse.objectives]
        objectives[index] = e.target.value
        setNewCourse({ ...newCourse, objectives })
    }

    const handleLearningOutcomeChange = (e, index) => {
        const outcomes = [...newCourse.learningOutcomes]
        outcomes[index] = e.target.value
        setNewCourse({ ...newCourse, learningOutcomes: outcomes })
    }

    const addModule = () => {
        const newModule = {
            id: Date.now(),
            title: 'New Module',
            description: '',
            duration: '0 min',
            lessons: []
        }
        setNewCourse({
            ...newCourse,
            modules: [...newCourse.modules, newModule]
        })
    }

    const updateModule = (id, field, value) => {
        const updatedModules = newCourse.modules.map(module => 
            module.id === id ? { ...module, [field]: value } : module
        )
        setNewCourse({ ...newCourse, modules: updatedModules })
    }

    const addLesson = (moduleId) => {
        const newLesson = {
            id: Date.now(),
            title: 'New Lesson',
            description: '',
            duration: '0 min',
            type: 'video',
            videoUrl: '',
            thumbnail: '',
            sourceCode: '',
            resources: [],
            quiz: { questions: [] }
        }
        
        const updatedModules = newCourse.modules.map(module => 
            module.id === moduleId 
                ? { ...module, lessons: [...module.lessons, newLesson] } 
                : module
        )
        
        setNewCourse({ ...newCourse, modules: updatedModules })
        setEditingLesson(newLesson.id)
    }

    const updateLesson = (moduleId, lessonId, field, value) => {
        const updatedModules = newCourse.modules.map(module => {
            if (module.id === moduleId) {
                const updatedLessons = module.lessons.map(lesson => 
                    lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
                )
                return { ...module, lessons: updatedLessons }
            }
            return module
        })
        
        setNewCourse({ ...newCourse, modules: updatedModules })
    }

    const removeModule = (moduleId) => {
        const updatedModules = newCourse.modules.filter(module => module.id !== moduleId)
        setNewCourse({ ...newCourse, modules: updatedModules })
    }

    const removeLesson = (moduleId, lessonId) => {
        const updatedModules = newCourse.modules.map(module => {
            if (module.id === moduleId) {
                const updatedLessons = module.lessons.filter(lesson => lesson.id !== lessonId)
                return { ...module, lessons: updatedLessons }
            }
            return module
        })
        
        setNewCourse({ ...newCourse, modules: updatedModules })
    }

    const saveCourse = () => {
        const course = {
            id: courses.length + 1,
            ...newCourse,
            enrollments: 0,
            views: 0,
            completionRate: 0,
            avgQuizScore: 0,
            feedback: 'No feedback yet',
            rating: 0,
            reviews: 0,
            status: 'Draft'
        }
        
        setCourses([...courses, course])
        setPreviewCourse(course)
        setShowPreview(true)
        alert('Course saved successfully!')
        setCurrentStep(1)
        setNewCourse({
            title: '',
            description: '',
            thumbnail: '',
            instructor: '',
            category: 'Programming',
            level: 'Beginner',
            duration: '',
            language: 'English',
            certificate: false,
            tags: [],
            prerequisites: [],
            objectives: [],
            targetAudience: '',
            learningOutcomes: [],
            modules: []
        })
    }

    const getLessonCount = () => {
        return newCourse.modules.reduce((total, module) => total + module.lessons.length, 0)
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'Published': return 'bg-green-100 text-green-800'
            case 'Draft': return 'bg-yellow-100 text-yellow-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getLevelColor = (level) => {
        switch(level) {
            case 'Beginner': return 'bg-lime-100 text-lime-800'
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
            case 'Advanced': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    // Lesson Form Handlers
    const handleLessonFormChange = (field, value) => {
        setLessonForm({ ...lessonForm, [field]: value })
    }

    const handleResourceChange = (index, value) => {
        const newResources = [...lessonForm.resources]
        newResources[index] = value
        setLessonForm({ ...lessonForm, resources: newResources })
    }

    const addResource = () => {
        setLessonForm({ ...lessonForm, resources: [...lessonForm.resources, ''] })
    }

    const removeResource = (index) => {
        const newResources = [...lessonForm.resources]
        newResources.splice(index, 1)
        setLessonForm({ ...lessonForm, resources: newResources })
    }

    const handleAddQuestion = () => {
        const newQuestions = [...lessonForm.quiz.questions, {
            question: '',
            options: ['', '', '', ''],
            correct: 0
        }]
        setLessonForm({ ...lessonForm, quiz: { questions: newQuestions } })
    }

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...lessonForm.quiz.questions]
        newQuestions[index][field] = value
        setLessonForm({ ...lessonForm, quiz: { questions: newQuestions } })
    }

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...lessonForm.quiz.questions]
        newQuestions[questionIndex].options[optionIndex] = value
        setLessonForm({ ...lessonForm, quiz: { questions: newQuestions } })
    }

    const handleCorrectAnswerChange = (questionIndex, value) => {
        const newQuestions = [...lessonForm.quiz.questions]
        newQuestions[questionIndex].correct = parseInt(value)
        setLessonForm({ ...lessonForm, quiz: { questions: newQuestions } })
    }

    const removeQuestion = (index) => {
        const newQuestions = [...lessonForm.quiz.questions]
        newQuestions.splice(index, 1)
        setLessonForm({ ...lessonForm, quiz: { questions: newQuestions } })
    }

    const saveLesson = (moduleId, lessonId) => {
        if (lessonForm.title && lessonForm.description) {
            updateLesson(moduleId, lessonId, 'title', lessonForm.title)
            updateLesson(moduleId, lessonId, 'description', lessonForm.description)
            updateLesson(moduleId, lessonId, 'duration', lessonForm.duration)
            updateLesson(moduleId, lessonId, 'type', lessonForm.type)
            updateLesson(moduleId, lessonId, 'videoUrl', lessonForm.videoUrl)
            updateLesson(moduleId, lessonId, 'thumbnail', lessonForm.thumbnail)
            updateLesson(moduleId, lessonId, 'sourceCode', lessonForm.sourceCode)
            updateLesson(moduleId, lessonId, 'resources', lessonForm.resources)
            updateLesson(moduleId, lessonId, 'quiz', lessonForm.quiz)
            
            setEditingLesson(null)
            setLessonForm({
                title: '',
                description: '',
                duration: '',
                type: 'video',
                videoUrl: '',
                thumbnail: '',
                sourceCode: '',
                resources: [],
                quiz: { questions: [] }
            })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto">
                <title>vertX - Courses Creation</title>
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Create Professional Course</h1>
                        <p className="text-gray-600 mt-2">Build comprehensive courses with our step-by-step process</p>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
                        <div 
                            className="absolute top-4 left-0 h-0.5 bg-lime-600 transition-all duration-700 ease-out z-10"
                            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                        ></div>
                        
                        {steps.map((step, index) => (
                            <div 
                                key={step.id} 
                                className="flex flex-col items-center relative z-20 step-indicator"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                                    currentStep >= step.id 
                                        ? 'bg-lime-600 text-white shadow-lg transform scale-110' 
                                        : 'bg-white border-2 border-gray-300 text-gray-400'
                                }`}>
                                    <i className={step.icon}></i>
                                </div>
                                <span className={`text-xs font-medium text-center ${
                                    currentStep >= step.id ? 'text-lime-600 font-semibold' : 'text-gray-500'
                                }`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 step-content">
                    {/* Step 1: Course Details */}
                    {currentStep === 1 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Details</h2>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                                        <input
                                            type="text"
                                            value={newCourse.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                            placeholder="Enter course title"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Description *</label>
                                        <textarea
                                            value={newCourse.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                            placeholder="Describe your course in detail"
                                            rows="4"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
                                        <input
                                            type="text"
                                            value={newCourse.instructor}
                                            onChange={(e) => handleInputChange('instructor', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                            placeholder="Enter instructor name"
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                            <select
                                                value={newCourse.category}
                                                onChange={(e) => handleInputChange('category', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                            >
                                                <option value="Programming">Programming</option>
                                                <option value="Design">Design</option>
                                                <option value="Data Science">Data Science</option>
                                                <option value="Business">Business</option>
                                                <option value="Marketing">Marketing</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
                                            <select
                                                value={newCourse.level}
                                                onChange={(e) => handleInputChange('level', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                            >
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                                        <input
                                            type="text"
                                            value={newCourse.duration}
                                            onChange={(e) => handleInputChange('duration', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                            placeholder="e.g., 12 hours"
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image URL</label>
                                        <input
                                            type="text"
                                            value={newCourse.thumbnail}
                                            onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                            placeholder="Enter thumbnail URL"
                                        />
                                        {newCourse.thumbnail && (
                                            <div className="mt-3">
                                                <img src={newCourse.thumbnail} alt="Thumbnail Preview" className="w-full h-40 object-cover rounded-lg border shadow-sm" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                        <select
                                            value={newCourse.language}
                                            onChange={(e) => handleInputChange('language', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                        >
                                            <option value="English">English</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="French">French</option>
                                            <option value="German">German</option>
                                            <option value="Chinese">Chinese</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={newCourse.certificate}
                                                onChange={(e) => handleInputChange('certificate', e.target.checked)}
                                                className="mr-2 h-5 w-5 text-lime-600 focus:ring-lime-500 border-gray-300 rounded transition-all duration-200"
                                            />
                                            <span className="text-sm text-gray-700">Offer Certificate upon Completion</span>
                                        </label>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                                        <input
                                            type="text"
                                            value={newCourse.tags.join(', ')}
                                            onChange={handleTagChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                            placeholder="e.g., JavaScript, React, Web Development"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                                        <input
                                            type="text"
                                            value={newCourse.targetAudience}
                                            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                            placeholder="Who is this course for?"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Learning Objectives */}
                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Objectives</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites (comma separated)</label>
                                    <input
                                        type="text"
                                        value={newCourse.prerequisites.join(', ')}
                                        onChange={handlePrerequisiteChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                        placeholder="e.g., Basic HTML/CSS, JavaScript fundamentals"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Learning Objectives *</label>
                                    <div className="space-y-3">
                                        {newCourse.objectives.map((objective, index) => (
                                            <div key={index} className="flex items-center group">
                                                <input
                                                    type="text"
                                                    value={objective}
                                                    onChange={(e) => handleObjectiveChange(e, index)}
                                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                                    placeholder="What students will learn..."
                                                />
                                                <button
                                                    onClick={() => {
                                                        const objectives = [...newCourse.objectives]
                                                        objectives.splice(index, 1)
                                                        setNewCourse({ ...newCourse, objectives })
                                                    }}
                                                    className="ml-2 text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => setNewCourse({ ...newCourse, objectives: [...newCourse.objectives, ''] })}
                                            className="text-lime-600 hover:text-lime-800 flex items-center transition-colors duration-200"
                                        >
                                            <i className="fas fa-plus mr-1"></i> Add Objective
                                        </button>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Learning Outcomes *</label>
                                    <div className="space-y-3">
                                        {newCourse.learningOutcomes.map((outcome, index) => (
                                            <div key={index} className="flex items-center group">
                                                <input
                                                    type="text"
                                                    value={outcome}
                                                    onChange={(e) => handleLearningOutcomeChange(e, index)}
                                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                                    placeholder="Students will be able to..."
                                                />
                                                <button
                                                    onClick={() => {
                                                        const outcomes = [...newCourse.learningOutcomes]
                                                        outcomes.splice(index, 1)
                                                        setNewCourse({ ...newCourse, learningOutcomes: outcomes })
                                                    }}
                                                    className="ml-2 text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => setNewCourse({ ...newCourse, learningOutcomes: [...newCourse.learningOutcomes, ''] })}
                                            className="text-lime-600 hover:text-lime-800 flex items-center transition-colors duration-200"
                                        >
                                            <i className="fas fa-plus mr-1"></i> Add Outcome
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Content Structure */}
                    {currentStep === 3 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content Structure</h2>
                            
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Modules</h3>
                                    <button
                                        onClick={addModule}
                                        className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 transform hover:scale-105"
                                    >
                                        <i className="fas fa-plus mr-2"></i> Add Module
                                    </button>
                                </div>
                                
                                <div className="space-y-6">
                                    {newCourse.modules.length === 0 ? (
                                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                            <i className="fas fa-folder-open text-5xl mb-4 text-gray-400"></i>
                                            <p className="text-lg font-medium mb-2">No modules created yet</p>
                                            <p className="mb-4">Click "Add Module" to get started building your course content</p>
                                            <div className="inline-block bg-lime-100 text-lime-800 px-4 py-2 rounded-lg">
                                                <i className="fas fa-lightbulb mr-2"></i> Modules help organize your course content
                                            </div>
                                        </div>
                                    ) : (
                                        newCourse.modules.map((module, moduleIndex) => (
                                            <div key={module.id} className="border border-gray-200 rounded-xl p-5 bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="font-semibold text-gray-900 flex items-center">
                                                        <span className="bg-lime-100 text-lime-800 text-xs font-bold mr-3 px-2 py-1 rounded-full">
                                                            Module {moduleIndex + 1}
                                                        </span>
                                                        {module.title}
                                                    </h4>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => removeModule(module.id)}
                                                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Module Title</label>
                                                        <input
                                                            type="text"
                                                            value={module.title}
                                                            onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                                        <input
                                                            type="text"
                                                            value={module.duration}
                                                            onChange={(e) => updateModule(module.id, 'duration', e.target.value)}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                    <textarea
                                                        value={module.description}
                                                        onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900 transition-all duration-200"
                                                        rows="2"
                                                    />
                                                </div>
                                                
                                                <div className="flex justify-between items-center mb-4">
                                                    <h5 className="font-medium text-gray-900">Lessons</h5>
                                                    <button
                                                        onClick={() => addLesson(module.id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm flex items-center transition-all duration-200 transform hover:scale-105"
                                                    >
                                                        <i className="fas fa-plus mr-1"></i> Add Lesson
                                                    </button>
                                                </div>
                                                
                                                <div className="space-y-3">
                                                    {module.lessons.length === 0 ? (
                                                        <div className="text-center py-4 text-gray-500 bg-white rounded-lg border border-gray-200">
                                                            <i className="fas fa-video text-2xl mb-2"></i>
                                                            <p>No lessons in this module</p>
                                                            <p className="text-sm mt-1">Add lessons to make this module complete</p>
                                                        </div>
                                                    ) : (
                                                        module.lessons.map((lesson, lessonIndex) => (
                                                            <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-all duration-200">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <h6 className="font-medium text-gray-900 flex items-center">
                                                                        <span className="bg-purple-100 text-purple-800 text-xs font-bold mr-2 px-2 py-1 rounded-full">
                                                                            Lesson {lessonIndex + 1}
                                                                        </span>
                                                                        {lesson.title || 'Untitled Lesson'}
                                                                    </h6>
                                                                    <div className="flex space-x-2">
                                                                        <button
                                                                            onClick={() => {
                                                                                setEditingLesson(lesson.id)
                                                                                setLessonForm({
                                                                                    title: lesson.title,
                                                                                    description: lesson.description,
                                                                                    duration: lesson.duration,
                                                                                    type: lesson.type,
                                                                                    videoUrl: lesson.videoUrl,
                                                                                    thumbnail: lesson.thumbnail,
                                                                                    sourceCode: lesson.sourceCode,
                                                                                    resources: lesson.resources || [],
                                                                                    quiz: lesson.quiz || { questions: [] }
                                                                                })
                                                                            }}
                                                                            className="text-lime-600 hover:text-lime-800 p-1 rounded-full hover:bg-lime-50 transition-colors duration-200"
                                                                        >
                                                                            <i className="fas fa-edit"></i>
                                                                        </button>
                                                                        <button
                                                                            onClick={() => removeLesson(module.id, lesson.id)}
                                                                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                                                                        >
                                                                            <i className="fas fa-trash"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                                                    <div className="flex items-center text-gray-600">
                                                                        <i className="fas fa-clock mr-2"></i>
                                                                        <span>{lesson.duration || '0 min'}</span>
                                                                    </div>
                                                                    <div className="flex items-center text-gray-600">
                                                                        <i className="fas fa-file-video mr-2"></i>
                                                                        <span>{lesson.type || 'video'}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            
                            <div className="bg-lime-50 rounded-xl p-5 border border-lime-200">
                                <div className="flex items-start">
                                    <i className="fas fa-info-circle text-lime-600 mt-0.5 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <h4 className="font-semibold text-lime-800 mb-2">Content Structure Tips</h4>
                                        <ul className="space-y-1 text-sm text-lime-700 list-disc list-inside">
                                            <li>Create logical sections that build upon each other</li>
                                            <li>Keep modules focused on specific topics</li>
                                            <li>Include a mix of theory, practice, and assessment</li>
                                            <li>Ensure lessons flow naturally from one to the next</li>
                                            <li>Consider different learning styles when designing content</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review & Publish */}
                    {currentStep === 4 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Publish</h2>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-lime-50 to-indigo-50 rounded-xl p-5 border border-lime-200">
                                        <div className="flex items-center mb-4">
                                            <img src={newCourse.thumbnail || 'https://placehold.co/120x80?text=Course'} 
                                                 alt="Course Thumbnail" 
                                                 className="w-20 h-12 object-cover rounded-lg mr-4 shadow-sm" />
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg">{newCourse.title || 'Untitled Course'}</h4>
                                                <p className="text-sm text-gray-600">{newCourse.instructor || 'Instructor Name'}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-white rounded-lg p-3 text-center">
                                                <p className="text-xs text-gray-500">Category</p>
                                                <p className="font-medium text-gray-900">{newCourse.category || 'Uncategorized'}</p>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 text-center">
                                                <p className="text-xs text-gray-500">Level</p>
                                                <p className="font-medium text-gray-900">{newCourse.level || 'Beginner'}</p>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 text-center">
                                                <p className="text-xs text-gray-500">Duration</p>
                                                <p className="font-medium text-gray-900">{newCourse.duration || '0 hours'}</p>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 text-center">
                                                <p className="text-xs text-gray-500">Lessons</p>
                                                <p className="font-medium text-gray-900">{getLessonCount() || 0}</p>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-700 mb-3 text-sm">{newCourse.description || 'No description provided'}</p>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(newCourse.level)}`}>
                                                {newCourse.level}
                                            </span>
                                            {newCourse.certificate && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <i className="fas fa-certificate mr-1"></i> Certificate
                                                </span>
                                            )}
                                            {newCourse.tags.length > 0 && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                    <i className="fas fa-tag mr-1"></i> {newCourse.tags[0]}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                                        <h4 className="font-semibold text-gray-900 mb-3">Learning Objectives</h4>
                                        <ul className="space-y-2">
                                            {newCourse.objectives.slice(0, 3).map((objective, index) => (
                                                <li key={index} className="flex items-start">
                                                    <i className="fas fa-check-circle text-green-500 mt-1 mr-2 flex-shrink-0"></i>
                                                    <span className="text-gray-700 text-sm">{objective || 'No objective specified'}</span>
                                                </li>
                                            ))}
                                            {newCourse.objectives.length > 3 && (
                                                <li className="text-sm text-gray-500">+ {newCourse.objectives.length - 3} more objectives</li>
                                            )}
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                                        <h4 className="font-semibold text-gray-900 mb-3">Prerequisites</h4>
                                        <ul className="space-y-2">
                                            {newCourse.prerequisites.length > 0 ? (
                                                newCourse.prerequisites.slice(0, 3).map((prereq, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <i className="fas fa-angle-right text-lime-500 mt-1 mr-2 flex-shrink-0"></i>
                                                        <span className="text-gray-700 text-sm">{prereq || 'No prerequisites'}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-sm text-gray-500 italic">No prerequisites specified</li>
                                            )}
                                            {newCourse.prerequisites.length > 3 && (
                                                <li className="text-sm text-gray-500">+ {newCourse.prerequisites.length - 3} more prerequisites</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-3">Content Structure</h3>
                                        
                                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                            {newCourse.modules.slice(0, 4).map((module, index) => (
                                                <div key={module.id} className="border-l-4 border-lime-500 pl-4 py-2">
                                                    <h4 className="font-medium text-gray-900">{module.title || `Module ${index + 1}`}</h4>
                                                    <p className="text-sm text-gray-600 mb-1">{module.description || 'No description'}</p>
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-gray-500">{module.duration || '0 min'}</span>
                                                        <span className="text-gray-500">{module.lessons.length || 0} lessons</span>
                                                    </div>
                                                </div>
                                            ))}
                                            {newCourse.modules.length > 4 && (
                                                <div className="text-center text-sm text-gray-500 py-2">
                                                    + {newCourse.modules.length - 4} more modules
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-5 border border-yellow-200">
                                        <div className="flex items-start">
                                            <i className="fas fa-exclamation-triangle text-yellow-600 mt-0.5 mr-3 flex-shrink-0"></i>
                                            <div>
                                                <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
                                                <ul className="space-y-1 text-sm text-yellow-700 list-disc list-inside">
                                                    <li>Double-check all content before publishing</li>
                                                    <li>Verify all links and resources work properly</li>
                                                    <li>Ensure the course meets quality standards</li>
                                                    <li>Consider having others review your content</li>
                                                    <li>Test the course structure thoroughly</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-3">Publish Settings</h3>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">Course Status</p>
                                                    <p className="text-sm text-gray-600">Set the initial status of your course</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="mr-2 text-sm text-gray-600">Draft</span>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600"></div>
                                                        <span className="ml-2 text-sm text-gray-600">Published</span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">Visibility</p>
                                                    <p className="text-sm text-gray-600">Control who can access this course</p>
                                                </div>
                                                <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900">
                                                    <option>Public</option>
                                                    <option>Private</option>
                                                    <option>Restricted</option>
                                                </select>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">Course Type</p>
                                                    <p className="text-sm text-gray-600">Select course format</p>
                                                </div>
                                                <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900">
                                                    <option>Self-paced</option>
                                                    <option>Instructor-led</option>
                                                    <option>Hybrid</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 1}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                                currentStep === 1 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
                            }`}
                        >
                            <i className="fas fa-arrow-left mr-2"></i> Previous
                        </button>
                        
                        {currentStep < 4 ? (
                            <button
                                onClick={handleNext}
                                className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                            >
                                Next Step <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                        ) : (
                            <button
                                onClick={saveCourse}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center"
                            >
                                <i className="fas fa-save mr-2"></i> Save Course
                            </button>
                        )}
                    </div>
                </div>

                {/* Lesson Editor Modal */}
                {editingLesson && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Edit Lesson</h2>
                                    <button 
                                        onClick={() => {
                                            setEditingLesson(null)
                                            setLessonForm({
                                                title: '',
                                                description: '',
                                                duration: '',
                                                type: 'video',
                                                videoUrl: '',
                                                thumbnail: '',
                                                sourceCode: '',
                                                resources: [],
                                                quiz: { questions: [] }
                                            })
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title *</label>
                                            <input
                                                type="text"
                                                value={lessonForm.title}
                                                onChange={(e) => handleLessonFormChange('title', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900"
                                                placeholder="Enter lesson title"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                            <input
                                                type="text"
                                                value={lessonForm.duration}
                                                onChange={(e) => handleLessonFormChange('duration', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900"
                                                placeholder="e.g., 25 min"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Type</label>
                                            <select
                                                value={lessonForm.type}
                                                onChange={(e) => handleLessonFormChange('type', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900"
                                            >
                                                <option value="video">Video Lesson</option>
                                                <option value="reading">Reading Material</option>
                                                <option value="interactive">Interactive</option>
                                                <option value="assignment">Assignment</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                            <textarea
                                                value={lessonForm.description}
                                                onChange={(e) => handleLessonFormChange('description', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900"
                                                placeholder="Describe what students will learn in this lesson"
                                                rows="4"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image URL</label>
                                            <input
                                                type="text"
                                                value={lessonForm.thumbnail}
                                                onChange={(e) => handleLessonFormChange('thumbnail', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900"
                                                placeholder="Enter thumbnail URL"
                                            />
                                            {lessonForm.thumbnail && (
                                                <div className="mt-2">
                                                    <img src={lessonForm.thumbnail} alt="Thumbnail Preview" className="w-full h-32 object-cover rounded border" />
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (for video lessons)</label>
                                            <input
                                                type="text"
                                                value={lessonForm.videoUrl}
                                                onChange={(e) => handleLessonFormChange('videoUrl', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900"
                                                placeholder="Enter video URL"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Source Code (for programming lessons)</label>
                                            <textarea
                                                value={lessonForm.sourceCode}
                                                onChange={(e) => handleLessonFormChange('sourceCode', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900"
                                                placeholder="Paste your code here..."
                                                rows="6"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Resources (comma separated)</label>
                                            <div className="space-y-2">
                                                {lessonForm.resources.map((resource, index) => (
                                                    <div key={index} className="flex items-center">
                                                        <input
                                                            type="text"
                                                            value={resource}
                                                            onChange={(e) => handleResourceChange(index, e.target.value)}
                                                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900"
                                                            placeholder="Resource file name or link"
                                                        />
                                                        <button
                                                            onClick={() => removeResource(index)}
                                                            className="ml-2 text-red-600 hover:text-red-800"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={addResource}
                                                    className="text-lime-600 hover:text-lime-800 flex items-center"
                                                >
                                                    <i className="fas fa-plus mr-1"></i> Add Resource
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-medium text-gray-900">Quiz Questions</h4>
                                                <button
                                                    onClick={handleAddQuestion}
                                                    className="text-lime-600 hover:text-lime-800 flex items-center text-sm"
                                                >
                                                    <i className="fas fa-plus mr-1"></i> Add Question
                                                </button>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                {lessonForm.quiz.questions.map((question, qIndex) => (
                                                    <div key={qIndex} className="border border-gray-200 rounded-lg p-3">
                                                        <div className="mb-3">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                                                            <input
                                                                type="text"
                                                                value={question.question}
                                                                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900"
                                                                placeholder="Enter your question"
                                                            />
                                                        </div>
                                                        
                                                        <div className="mb-3">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                                                            {question.options.map((option, oIndex) => (
                                                                <div key={oIndex} className="flex items-center mb-2">
                                                                    <input
                                                                        type="text"
                                                                        value={option}
                                                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-gray-900"
                                                                        placeholder={`Option ${oIndex + 1}`}
                                                                    />
                                                                    <div className="ml-2 flex items-center">
                                                                        <input
                                                                            type="radio"
                                                                            name={`correct-${qIndex}`}
                                                                            checked={question.correct === oIndex}
                                                                            onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                                                                            className="ml-2"
                                                                        />
                                                                        <span className="text-sm text-gray-600 ml-1">Correct</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        
                                                        <button
                                                            onClick={() => removeQuestion(qIndex)}
                                                            className="text-red-600 hover:text-red-800 text-sm flex items-center"
                                                        >
                                                            <i className="fas fa-trash mr-1"></i> Remove Question
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        onClick={() => {
                                            setEditingLesson(null)
                                            setLessonForm({
                                                title: '',
                                                description: '',
                                                duration: '',
                                                type: 'video',
                                                videoUrl: '',
                                                thumbnail: '',
                                                sourceCode: '',
                                                resources: [],
                                                quiz: { questions: [] }
                                            })
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            // Find the module that contains this lesson
                                            let moduleId = null
                                            let lessonId = editingLesson
                                            
                                            for (const module of newCourse.modules) {
                                                if (module.lessons.some(lesson => lesson.id === lessonId)) {
                                                    moduleId = module.id
                                                    break
                                                }
                                            }
                                            
                                            if (moduleId) {
                                                saveLesson(moduleId, lessonId)
                                            }
                                        }}
                                        className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
                                    >
                                        Save Lesson
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Course Preview Card */}
                {showPreview && previewCourse && (
                    <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200 preview-card">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Course Preview</h2>
                            <button 
                                onClick={() => setShowPreview(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="mb-4">
                                        <img src={previewCourse.thumbnail} alt={previewCourse.title} className="w-full h-48 object-cover rounded-lg" />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{previewCourse.title}</h3>
                                    <p className="text-gray-600 mb-4">{previewCourse.description}</p>
                                    
                                    <div className="flex items-center mb-3">
                                        <i className="fas fa-user text-gray-500 mr-2"></i>
                                        <span className="text-gray-700">{previewCourse.instructor}</span>
                                    </div>
                                    
                                    <div className="flex items-center mb-3">
                                        <i className="fas fa-folder text-gray-500 mr-2"></i>
                                        <span className="text-gray-700">{previewCourse.category}</span>
                                    </div>
                                    
                                    <div className="flex items-center mb-4">
                                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                                        <span className="font-medium text-gray-900">{previewCourse.rating}</span>
                                        <span className="text-gray-500 ml-1">({previewCourse.reviews} reviews)</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(previewCourse.level)}`}>
                                            {previewCourse.level}
                                        </span>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(previewCourse.status)}`}>
                                            {previewCourse.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-lime-50 rounded-lg p-4">
                                        <p className="text-sm text-lime-800 font-medium">Enrollments</p>
                                        <p className="text-2xl font-bold text-lime-900">{previewCourse.enrollments.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <p className="text-sm text-green-800 font-medium">Views</p>
                                        <p className="text-2xl font-bold text-green-900">{previewCourse.views.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4">
                                        <p className="text-sm text-purple-800 font-medium">Duration</p>
                                        <p className="text-2xl font-bold text-purple-900">{previewCourse.duration}</p>
                                    </div>
                                    <div className="bg-yellow-50 rounded-lg p-4">
                                        <p className="text-sm text-yellow-800 font-medium">Lessons</p>
                                        <p className="text-2xl font-bold text-yellow-900">{getLessonCount()}</p>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Learning Objectives</h4>
                                    <ul className="space-y-2">
                                        {previewCourse.objectives.map((objective, index) => (
                                            <li key={index} className="flex items-start">
                                                <i className="fas fa-check-circle text-green-500 mt-1 mr-2 flex-shrink-0"></i>
                                                <span className="text-gray-700">{objective}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Prerequisites</h4>
                                    <ul className="space-y-2">
                                        {previewCourse.prerequisites.length > 0 ? (
                                            previewCourse.prerequisites.map((prereq, index) => (
                                                <li key={index} className="flex items-start">
                                                    <i className="fas fa-angle-right text-lime-500 mt-1 mr-2 flex-shrink-0"></i>
                                                    <span className="text-gray-700">{prereq}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500 italic">No prerequisites required</li>
                                        )}
                                    </ul>
                                </div>
                                
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-3">Course Modules</h4>
                                    <div className="space-y-3">
                                        {previewCourse.modules.slice(0, 3).map((module, index) => (
                                            <div key={module.id} className="flex items-start">
                                                <div className="bg-lime-100 text-lime-800 text-xs font-bold mr-3 px-2 py-1 rounded-full mt-1">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{module.title}</p>
                                                    <p className="text-sm text-gray-600">{module.lessons.length} lessons • {module.duration}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {previewCourse.modules.length > 3 && (
                                            <p className="text-sm text-gray-500">+ {previewCourse.modules.length - 3} more modules</p>
                                        )}
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