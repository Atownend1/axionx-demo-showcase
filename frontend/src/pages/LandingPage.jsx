import { useState } from 'react'
import { MessageSquare, Brain, TrendingUp, Shield, ArrowRight, Sparkles } from 'lucide-react'
import ChatWidget from '../components/ChatWidget'

export default function LandingPage() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">AxionX</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition">How It Works</a>
              <a href="/dashboard" className="text-gray-600 hover:text-primary-600 transition">Dashboard</a>
              <button 
                onClick={() => setShowChat(true)}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Try AI Assistant
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered EPM Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 text-balance">
            Transform Your EPM Strategy with
            <span className="text-primary-600"> AI Insights</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto text-balance">
            Access 10+ years of EPM consulting expertise instantly. Get answers to your toughest 
            finance transformation questions from our AI trained on thousands of hours of real implementations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowChat(true)}
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center space-x-2 shadow-lg"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Ask Our AI Assistant</span>
            </button>
            <a 
              href="#features"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition border-2 border-primary-600 flex items-center justify-center space-x-2"
            >
              <span>Learn More</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why AxionX?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get instant access to expert EPM knowledge without the consulting fees
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-primary-600" />}
              title="AI-Powered Insights"
              description="Trained on thousands of hours of EPM consulting meetings, implementations, and best practices"
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-primary-600" />}
              title="Real Implementation Data"
              description="Learn from actual project experiences, challenges, and solutions across multiple industries"
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary-600" />}
              title="Trusted Expertise"
              description="Backed by senior EPM consultants with 10+ years experience in finance transformation"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, fast, and powerful</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Ask Your Question"
              description="Type any EPM, financial planning, or implementation question into our AI chat"
            />
            <StepCard
              number="2"
              title="AI Searches Knowledge Base"
              description="Our AI instantly searches through thousands of meeting transcripts and project data"
            />
            <StepCard
              number="3"
              title="Get Expert Answer"
              description="Receive detailed, context-aware answers based on real consulting experience"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your EPM Strategy?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join leading CFOs and finance teams leveraging AI for smarter decisions
          </p>
          <button 
            onClick={() => setShowChat(true)}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Start Free Conversation
          </button>
          <p className="mt-4 text-sm opacity-75">No credit card required • Free 15-min consultation available</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-xl font-bold">AxionX</span>
          </div>
          <p className="text-gray-400 mb-4">AI-Powered EPM Intelligence</p>
          <p className="text-sm text-gray-500">© 2025 AxionX. All rights reserved.</p>
        </div>
      </footer>

      {/* Chat Widget */}
      {showChat && <ChatWidget onClose={() => setShowChat(false)} />}
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

