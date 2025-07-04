import React, { useState } from 'react';
import { ClaimSubmissionForm } from './components/ClaimSubmissionForm';
import { ClaimsDashboard } from './components/ClaimsDashboard';
import { useClaims } from './hooks/useClaims';
import { Brain, FileText, Shield, Zap } from 'lucide-react';

function App() {
  const { claims, loading, error, submitClaim, updateClaimStatus, getProcessingStats } = useClaims();
  const [activeTab, setActiveTab] = useState<'submit' | 'dashboard'>('submit');

  const handleSubmitClaim = async (claimData: any, files: File[]) => {
    try {
      await submitClaim(claimData, files);
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Failed to submit claim:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full mr-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Claims Processing Automation
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced AI-powered system for automated claims processing and intelligent routing. 
            Simple claims are auto-approved, complex cases get prioritized human review.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Document Processing</h3>
            <p className="text-sm text-gray-600 mt-1">AI-powered text extraction and analysis</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-3">
              <Brain className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Smart Routing</h3>
            <p className="text-sm text-gray-600 mt-1">Intelligent complexity assessment</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-3">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Auto-Approval</h3>
            <p className="text-sm text-gray-600 mt-1">Instant processing for simple claims</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto mb-3">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Quality Control</h3>
            <p className="text-sm text-gray-600 mt-1">Human review for complex cases</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-8">
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
                Claims Dashboard ({claims.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'submit' ? (
              <ClaimSubmissionForm onSubmit={handleSubmitClaim} loading={loading} />
            ) : (
              <ClaimsDashboard 
                claims={claims} 
                onUpdateStatus={updateClaimStatus}
                processingStats={getProcessingStats()}
              />
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;