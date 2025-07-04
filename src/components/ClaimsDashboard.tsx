import React from 'react';
import { Claim } from '../types';
import ClaimCard from './ClaimCard';
import { ProcessingStats } from './ProcessingStats';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Filter
} from 'lucide-react';

interface ClaimsDashboardProps {
  claims: Claim[];
  onUpdateStatus: (id: string, status: Claim['status'], note?: string) => void;
  processingStats: any;
}

export function ClaimsDashboard({ claims, onUpdateStatus, processingStats }: ClaimsDashboardProps) {
  const [filterStatus, setFilterStatus] = React.useState<Claim['status'] | 'all'>('all');
  const [filterPriority, setFilterPriority] = React.useState<Claim['priority'] | 'all'>('all');

  const filteredClaims = claims.filter(claim => {
    const statusMatch = filterStatus === 'all' || claim.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || claim.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const getStatusIcon = (status: Claim['status']) => {
    switch (status) {
      case 'submitted':
        return <FileText className="w-5 h-5 text-gray-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'auto-approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'manual-review':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Claim['status']) => {
    switch (status) {
      case 'submitted':
        return 'bg-gray-100 text-gray-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'auto-approved':
        return 'bg-green-100 text-green-800';
      case 'manual-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Claim['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <ProcessingStats stats={processingStats} />
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Claims Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="processing">Processing</option>
                <option value="auto-approved">Auto-Approved</option>
                <option value="manual-review">Manual Review</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {filteredClaims.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">No claims found</p>
            <p className="text-gray-600">
              {claims.length === 0 
                ? "No claims have been submitted yet." 
                : "Try adjusting your filters to see more claims."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClaims.map(claim => (
              <ClaimCard
                key={claim.id}
                claim={claim}
                onUpdateStatus={onUpdateStatus}
                getStatusIcon={getStatusIcon}
                getStatusColor={getStatusColor}
                getPriorityColor={getPriorityColor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}