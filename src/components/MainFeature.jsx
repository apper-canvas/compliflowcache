import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = ({ darkMode }) => {
  const [activeUseCase, setActiveUseCase] = useState('compliance')
  const [chatMessages, setChatMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [regulatoryUpdates, setRegulatoryUpdates] = useState([])
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [generatedPath, setGeneratedPath] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const useCases = [
    {
      id: 'compliance',
      title: 'Intelligent Compliance Content Automation',
      icon: 'Shield',
      description: 'AI-powered course updates and multi-format content generation',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'partner',
      title: 'Partner Success Automation',
      icon: 'Users',
      description: 'Automated partner onboarding and commission tracking',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'client',
      title: 'Client Experience Enhancement',
      icon: 'Brain',
      description: 'Personalized learning paths and compliance risk assessment',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'sales',
      title: 'Sales & Customer Success Automation',
      icon: 'TrendingUp',
      description: 'Intelligent lead nurturing and client retention prediction',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'integration',
      title: 'Integration-Ready Solutions',
      icon: 'Zap',
      description: 'API integration bots and multi-platform deployment',
      color: 'from-pink-500 to-purple-500'
    }
  ]

  const roles = ['Manager', 'Compliance Officer', 'HR Director', 'Finance Manager', 'Operations Lead']
  const industries = ['Banking', 'Insurance', 'Healthcare', 'Manufacturing', 'Technology']

  // Initialize regulatory updates
  useEffect(() => {
    const updates = [
      {
        id: 1,
        source: 'ASIC',
        title: 'New Anti-Money Laundering Guidelines',
        content: 'Updated requirements for customer due diligence procedures',
        timestamp: new Date(),
        priority: 'high'
      },
      {
        id: 2,
        source: 'APRA',
        title: 'Capital Requirements Update',
        content: 'Revised capital adequacy framework for credit institutions',
        timestamp: new Date(Date.now() - 3600000),
        priority: 'medium'
      },
      {
        id: 3,
        source: 'Privacy Commission',
        title: 'Data Breach Notification Changes',
        content: 'Enhanced reporting requirements for data security incidents',
        timestamp: new Date(Date.now() - 7200000),
        priority: 'high'
      }
    ]
    setRegulatoryUpdates(updates)
  }, [])

  // Initialize partner onboarding chat
  useEffect(() => {
    if (activeUseCase === 'partner') {
      setChatMessages([
        {
          id: 1,
          sender: 'ai',
          message: 'Welcome to CompliFlow Partner Program! I\'m here to guide you through the onboarding process. What\'s your company name?',
          timestamp: new Date()
        }
      ])
    }
  }, [activeUseCase])

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      message: userInput,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, newMessage])
    setUserInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Great! I\'ve registered your company details. Now, let\'s set up your commission structure. What percentage would you like to start with?',
        'Perfect! I\'ll help you integrate with our API. Do you need SCORM compatibility or custom integration?',
        'Excellent! Your partner dashboard is being prepared. You\'ll receive access credentials within 24 hours.',
        'Thank you for that information. I\'m generating your personalized onboarding checklist now.'
      ]
      
      const aiResponse = {
        id: chatMessages.length + 2,
        sender: 'ai',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
      toast.success('AI response generated successfully!')
    }, 2000)
  }

  const generateLearningPath = () => {
    if (!selectedRole || !selectedIndustry) {
      toast.error('Please select both role and industry')
      return
    }

    setIsGenerating(true)
    
    setTimeout(() => {
      const modules = [
        'Regulatory Fundamentals',
        'Industry-Specific Compliance',
        'Risk Assessment Framework',
        'Documentation Standards',
        'Audit Preparation',
        'Incident Response Protocols'
      ]

      const path = {
        role: selectedRole,
        industry: selectedIndustry,
        modules: modules.slice(0, Math.floor(Math.random() * 3) + 4),
        estimatedDuration: `${Math.floor(Math.random() * 4) + 2} weeks`,
        difficulty: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)]
      }

      setGeneratedPath(path)
      setIsGenerating(false)
      toast.success('Personalized learning path generated!')
    }, 3000)
  }

  const simulateRegulatoryUpdate = () => {
    const newUpdate = {
      id: regulatoryUpdates.length + 1,
      source: ['ASIC', 'APRA', 'Privacy Commission'][Math.floor(Math.random() * 3)],
      title: 'Real-time Regulatory Update Detected',
      content: 'New compliance requirements identified and processed by AI monitoring system',
      timestamp: new Date(),
      priority: ['high', 'medium'][Math.floor(Math.random() * 2)]
    }

    setRegulatoryUpdates(prev => [newUpdate, ...prev.slice(0, 4)])
    toast.info('New regulatory update detected!')
  }

  const renderUseCaseContent = () => {
    switch (activeUseCase) {
      case 'compliance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Live Regulatory Monitoring</h3>
                <button
                  onClick={simulateRegulatoryUpdate}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Simulate Update
                </button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                {regulatoryUpdates.map((update) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-xl border-l-4 ${
                      update.priority === 'high' 
                        ? 'border-secondary bg-red-50 dark:bg-red-900/20' 
                        : 'border-accent bg-green-50 dark:bg-green-900/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">
                            {update.source}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            update.priority === 'high' 
                              ? 'bg-secondary text-white' 
                              : 'bg-accent text-white'
                          }`}>
                            {update.priority}
                          </span>
                        </div>
                        <h4 className="font-medium text-surface-800 dark:text-surface-100">{update.title}</h4>
                        <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">{update.content}</p>
                      </div>
                      <span className="text-xs text-surface-500 ml-4">
                        {update.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 'partner':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card"
          >
            <h3 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-4">
              AI Partner Onboarding Assistant
            </h3>
            <div className="h-80 flex flex-col">
              <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 mb-4">
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                      <p className="text-sm">{message.message}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="chat-bubble chat-bubble-ai">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <form onSubmit={handleChatSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your response..."
                  className="flex-1 px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-100"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  <ApperIcon name="Send" className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )

      case 'client':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card"
          >
            <h3 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-4">
              Personalized Learning Path Generator
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Select Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-100"
                  >
                    <option value="">Choose role...</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Select Industry
                  </label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-4 py-3 border border-surface-300 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-100"
                  >
                    <option value="">Choose industry...</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={generateLearningPath}
                  disabled={isGenerating}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-soft transition-all duration-200 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    'Generate Learning Path'
                  )}
                </button>
              </div>
              
              {generatedPath && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                    <h4 className="font-semibold text-surface-800 dark:text-surface-100 mb-2">
                      Custom Path for {generatedPath.role} in {generatedPath.industry}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-surface-600 dark:text-surface-400 mb-3">
                      <span>Duration: {generatedPath.estimatedDuration}</span>
                      <span>Level: {generatedPath.difficulty}</span>
                    </div>
                    <div className="space-y-2">
                      {generatedPath.modules.map((module, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <span className="text-sm text-surface-700 dark:text-surface-300">{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )

      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-card text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
              <ApperIcon name="Zap" className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-surface-800 dark:text-surface-100 mb-4">
              {useCases.find(uc => uc.id === activeUseCase)?.title}
            </h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              {useCases.find(uc => uc.id === activeUseCase)?.description}
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-surface-100 dark:bg-surface-700 rounded-full text-sm text-surface-600 dark:text-surface-400">
              <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
              Interactive demo coming soon
            </div>
          </motion.div>
        )
    }
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Use Case Navigation */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-4">
              AI Use Cases
            </h3>
            <div className="space-y-3">
              {useCases.map((useCase, index) => (
                <motion.button
                  key={useCase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveUseCase(useCase.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    activeUseCase === useCase.id
                      ? 'bg-white dark:bg-surface-800 shadow-card border-2 border-primary'
                      : 'bg-white dark:bg-surface-800 shadow-soft hover:shadow-card border border-surface-200 dark:border-surface-700'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${useCase.color}`}>
                      <ApperIcon name={useCase.icon} className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-surface-800 dark:text-surface-100 text-sm leading-tight">
                        {useCase.title}
                      </h4>
                      <p className="text-xs text-surface-600 dark:text-surface-400 mt-1 line-clamp-2">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Demo Showcase Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {renderUseCaseContent()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainFeature