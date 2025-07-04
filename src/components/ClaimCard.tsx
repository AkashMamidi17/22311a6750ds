import React, { useState } from 'react';
import { Claim } from '../types';
import { 
  Calendar, 
  DollarSign, 
  FileText, 
  User, 
  Clock, 
  Brain,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from 'lucide-react';

interface ClaimCardProps {
  claim: Claim;
  onUpdateStatus: (id: string, status: Claim['status'], note?: string) => void;
  getStatusIcon: (status: Claim['status']) => React.ReactNode;
  getStatusColor: (status: Claim['status']) => string;
  getPriorityColor: (priority: Claim['priority']) => string;
}

export function ClaimCard({ 
  claim, 
  onUpdateStatus, 
  getStatusIcon, 
  getStatusColor, 
  getPriorityColor 
}: ClaimCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState('');
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);

  const handleStatusUpdate = (newStatus: Claim['status']) => {
    onUpdateStatus(claim.id, newStatus, note);
    setNote('');
    setShowStatusUpdate(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {getStatusIcon(claim.status)}
            <span className="font-semibold text-gray-900">{claim.claimNumber}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
              {claim.status.replace('-', ' ').toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(claim.priority)}`}>
              {claim.priority.toUpperCase()}
            </span>
          </div>
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
            <p className="text-sm font-medium text-gray-900">{claim.claimant.name}</p>
            <p className="text-xs text-gray-600">{claim.claimant.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              ${claim.claimAmount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 capitalize">{claim.claimType}</p>
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
              Complexity: {claim.complexityScore}
            </p>
            <p className="text-xs text-gray-600">
              {claim.processingTime}ms processing
            </p>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Documents ({claim.documents.length})</h4>
              <div className="space-y-2">
                {claim.documents.map(doc => (
                  <div key={doc.id} className="flex items-center space-x-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{doc.name}</span>
                    <span className="text-gray-500">({doc.confidence?.toFixed(2)} confidence)</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Extracted Information</h4>
              <div className="space-y-1 text-sm">
                {claim.extractedInfo.incidentDate && (
                  <p><span className="font-medium">Incident Date:</span> {claim.extractedInfo.incidentDate}</p>
                )}
                {claim.extractedInfo.location && (
                  <p><span className="font-medium">Location:</span> {claim.extractedInfo.location}</p>
                )}
                {claim.extractedInfo.description && (
                  <p><span className="font-medium">Description:</span> {claim.extractedInfo.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">AI Routing Decision</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Route:</span> {claim.routingDecision.route}</p>
              <p><span className="font-medium">Reason:</span> {claim.routingDecision.reason}</p>
              <p><span className="font-medium">Confidence:</span> {(claim.routingDecision.confidence * 100).toFixed(1)}%</p>
              {claim.routingDecision.reviewerAssigned && (
                <p><span className="font-medium">Assigned to:</span> {claim.routingDecision.reviewerAssigned}</p>
              )}
              {claim.routingDecision.estimatedReviewTime && (
                <p><span className="font-medium">Est. Review Time:</span> {claim.routingDecision.estimatedReviewTime} hours</p>
              )}
            </div>
          </div>

          {claim.status === 'manual-review' && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Update Status</h4>
              <div className="space-y-3">
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
                  <button
                    onClick={() => handleStatusUpdate('completed')}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    Complete
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {claim.notes.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Processing Notes</h4>
              <div className="space-y-1">
                {claim.notes.map((note, index) => (
                  <p key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {note}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}