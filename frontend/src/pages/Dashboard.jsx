import { useState } from 'react'
import { 
  MessageSquare, 
  TrendingUp, 
  Database, 
  Search,
  ArrowLeft,
  Send,
  Loader2
} from 'lucide-react'

export default function Dashboard() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim() || loading) return

    setLoading(true)
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        answer: 'Error connecting to API. Please ensure the backend is running.',
        sources: []
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a 
                href="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </a>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AxionX Dashboard</h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Database className="h-6 w-6 text-primary-600" />}
            title="Meeting Database"
            value="1,200+"
            subtitle="Processed meetings"
          />
          <StatCard
            icon={<MessageSquare className="h-6 w-6 text-primary-600" />}
            title="AI Queries"
            value="Active"
            subtitle="Real-time responses"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6 text-primary-600" />}
            title="Accuracy"
            value="95%+"
            subtitle="Context relevance"
          />
        </div>

        {/* Query Interface */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Search className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Query Interface</h2>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ask a question about EPM, implementations, or best practices
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Example: What are the top 3 mistakes companies make when implementing EPM systems?"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Submit Query</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>
            
            <div className="prose max-w-none mb-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Answer:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{result.answer}</p>
              </div>
            </div>

            {result.sources && result.sources.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sources:</h3>
                <div className="space-y-2">
                  {result.sources.map((source, index) => (
                    <div 
                      key={index}
                      className="bg-primary-50 border border-primary-200 px-4 py-2 rounded-lg text-sm text-primary-900"
                    >
                      {source}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Example Queries */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Example Queries</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example)}
                className="text-left p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition"
              >
                <p className="text-sm text-gray-700">{example}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-3">
        {icon}
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  )
}

const exampleQueries = [
  "What are the main topics discussed in meetings?",
  "What are the top 3 mistakes companies make when implementing EPM systems?",
  "What are the key challenges in financial close processes?",
  "How should we approach OneStream vs Workiva implementation?",
  "What are best practices for SAP integration?",
  "How do we handle phase 2 planning for EPM projects?"
]

