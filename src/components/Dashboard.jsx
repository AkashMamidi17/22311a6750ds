import React, { useState } from 'react';
import ClaimCard from './ClaimCard';
import Stats from './Stats';
import { Filter } from 'lucide-react';

function Dashboard({ claims, onUpdate }) {
  const [filter, setFilter] = useState('all');

  const filteredClaims = claims.filter(claim => {
    if (filter === 'all') return true;
    return claim.status === filter;
  });

  const stats = {
    total: claims.length,
    autoApproved: claims.filter(c => c.status === 'auto-approved').length,
    manualReview: claims.filter(c => c.status === 'manual-review').length,
    rejected: claims.filter(c => c.status === 'rejected').length,
    avgScore: claims.length > 0 ? 
      claims.reduce((sum, c) => sum + c.complexityScore, 0) / claims.length : 0
  };

  return (
    <div className="space-y-6">
      <Stats stats={stats} />
      
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Claims Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Claims</option>
            <option value="auto-approved">Auto-Approved</option>
            <option value="manual-review">Manual Review</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredClaims.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No claims found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClaims.map(claim => (
            <ClaimCard 
              key={claim.id} 
              claim={claim} 
              onUpdate={onUpdate} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;