import React, { useState } from 'react';
import { 
  Calendar, 
  DollarSign, 
  User, 
  Brain,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

function ClaimCard({ claim, onUpdate }) {
  const [expanded, setExpanded] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'auto-approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'manual-review':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'auto-approved':
        return 'bg-green-100 text-green-800';
      case 'manual-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (newStatus) => {
    onUpdate(claim.id, { status: newStatus });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon(claim.status)}
          <span className="font-semibold text-gray-900">{claim.claimNumber}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
            {claim.status.replace('-', ' ').toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(claim.priority)}`}>
            {claim.priority.toUpperCase()}
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">{claim.name}</p>
            <p className="text-xs text-gray-600">{claim.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">${claim.amount}</p>
            <p className="text-xs text-gray-600 capitalize">{claim.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {claim.submittedAt.toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-600">
              {claim.submittedAt.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Score: {claim.complexityScore}
            </p>
            <p className="text-xs text-gray-600">ML Analysis</p>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t pt-4 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-700">{claim.description}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">ML Analysis Results</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Complexity Score:</span> {claim.complexityScore}/100</p>
              <p><span className="font-medium">Priority:</span> {claim.priority}</p>
              <p><span className="font-medium">Routing Decision:</span> {claim.routingReason}</p>
              <p><span className="font-medium">Confidence:</span> {(claim.confidence * 100).toFixed(1)}%</p>
            </div>
          </div>

          {claim.status === 'manual-review' && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Update Status</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusUpdate('auto-approved')}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ClaimCard;