import React, { useState } from 'react';
import ClaimForm from './components/ClaimForm';
import Dashboard from './components/Dashboard';
import { Brain, FileText, Zap, Shield } from 'lucide-react';

function App() {
  const [claims, setClaims] = useState([]);
  const [activeTab, setActiveTab] = useState('submit');

  const addClaim = (newClaim) => {
    setClaims(prev => [newClaim, ...prev]);
    setActiveTab('dashboard');
  };

  const updateClaim = (id, updates) => {
    setClaims(prev => prev.map(claim => 
      claim.id === id ? { ...claim, ...updates } : claim
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full mr-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              AI Claims Processing
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Machine Learning powered claims processing with automatic complexity scoring and intelligent routing
          </p>
        </header>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold">Document Analysis</h3>
            <p className="text-sm text-gray-600">ML text processing</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Brain className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold">Smart Scoring</h3>
            <p className="text-sm text-gray-600">Complexity algorithms</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold">Auto Processing</h3>
            <p className="text-sm text-gray-600">Instant decisions</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Shield className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold">Quality Control</h3>
            <p className="text-sm text-gray-600">Human oversight</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('submit')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'submit'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Submit Claim
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard ({claims.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'submit' ? (
              <ClaimForm onSubmit={addClaim} />
            ) : (
              <Dashboard claims={claims} onUpdate={updateClaim} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;