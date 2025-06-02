import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-surface-900' : 'bg-gradient-to-br from-surface-50 via-blue-50 to-orange-50'}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-card">
              <ApperIcon name="Zap" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient">CompliFlow</h1>
              <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">AI Automation Showcase</p>
            </div>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 sm:p-3 rounded-xl bg-white dark:bg-surface-800 shadow-card hover:shadow-soft transition-all duration-200 border border-surface-200 dark:border-surface-700"
          >
            <ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-5 h-5 text-surface-600 dark:text-surface-400" />
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="px-4 py-8 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Experience AI-Powered</span>
            <br />
            <span className="text-surface-800 dark:text-surface-100">Compliance Automation</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-surface-600 dark:text-surface-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover how artificial intelligence transforms compliance training, partner management, 
            and client experience through interactive demonstrations and real-world use cases.
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {[
              { icon: "Shield", text: "Compliance Automation" },
              { icon: "Users", text: "Partner Success" },
              { icon: "Brain", text: "AI-Powered Insights" },
              { icon: "Zap", text: "Real-time Updates" }
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white dark:bg-surface-800 shadow-soft border border-surface-200 dark:border-surface-700"
              >
                <ApperIcon name={feature.icon} className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-surface-700 dark:text-surface-300">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Feature Component */}
      <MainFeature darkMode={darkMode} />

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="px-4 py-8 sm:px-6 lg:px-8 border-t border-surface-200 dark:border-surface-700"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-surface-500 dark:text-surface-400">
            © 2024 CompliFlow. Powered by AI. Built for compliance excellence.
          </p>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home