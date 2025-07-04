import React from 'react';
import { ProcessingStats as Stats } from '../types';
import { 
  BarChart3, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  TrendingUp
} from 'lucide-react';

interface ProcessingStatsProps {
  stats: Stats;
}

export function ProcessingStats({ stats }: ProcessingStatsProps) {
  const autoApprovalRate = stats.totalClaims > 0 
    ? (stats.autoApproved / stats.totalClaims * 100).toFixed(1)
    : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Claims</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalClaims}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Processing pipeline active</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Auto-Approved</p>
            <p className="text-2xl font-bold text-green-600">{stats.autoApproved}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-green-600">
            <span>{autoApprovalRate}% approval rate</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Manual Review</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.manualReview}</p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-yellow-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>Awaiting review</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg Processing</p>
            <p className="text-2xl font-bold text-gray-900">{stats.avgProcessingTime.toFixed(0)}ms</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-600">
            <span>Real-time processing</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 md:col-span-2 lg:col-span-4">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Complexity Distribution</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${stats.totalClaims > 0 ? (stats.complexityDistribution.low / stats.totalClaims * 100) : 0}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium text-gray-900">{stats.complexityDistribution.low}</p>
            <p className="text-xs text-gray-600">Low</p>
          </div>
          <div className="text-center">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${stats.totalClaims > 0 ? (stats.complexityDistribution.medium / stats.totalClaims * 100) : 0}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium text-gray-900">{stats.complexityDistribution.medium}</p>
            <p className="text-xs text-gray-600">Medium</p>
          </div>
          <div className="text-center">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-orange-500 h-2 rounded-full" 
                style={{ width: `${stats.totalClaims > 0 ? (stats.complexityDistribution.high / stats.totalClaims * 100) : 0}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium text-gray-900">{stats.complexityDistribution.high}</p>
            <p className="text-xs text-gray-600">High</p>
          </div>
          <div className="text-center">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ width: `${stats.totalClaims > 0 ? (stats.complexityDistribution.urgent / stats.totalClaims * 100) : 0}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium text-gray-900">{stats.complexityDistribution.urgent}</p>
            <p className="text-xs text-gray-600">Urgent</p>
          </div>
        </div>
      </div>
    </div>
  );
}