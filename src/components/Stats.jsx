import React from 'react';
import { BarChart3, CheckCircle, AlertTriangle, XCircle, Brain } from 'lucide-react';

function Stats({ stats }) {
  const approvalRate = stats.total > 0 ? 
    ((stats.autoApproved / stats.total) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Claims</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <BarChart3 className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Auto-Approved</p>
            <p className="text-2xl font-bold text-green-600">{stats.autoApproved}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-sm text-green-600 mt-2">{approvalRate}% approval rate</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Manual Review</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.manualReview}</p>
          </div>
          <AlertTriangle className="w-8 h-8 text-yellow-600" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </div>
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg ML Score</p>
            <p className="text-2xl font-bold text-purple-600">{stats.avgScore.toFixed(1)}</p>
          </div>
          <Brain className="w-8 h-8 text-purple-600" />
        </div>
      </div>
    </div>
  );
}

export default Stats;