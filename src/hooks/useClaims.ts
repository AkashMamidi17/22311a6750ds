import { useState, useEffect } from 'react';
import { Claim, ProcessingStats } from '../types';
import { ClaimsService } from '../services/claimsService';

export function useClaims() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshClaims = () => {
    setClaims(ClaimsService.getAllClaims());
  };

  const submitClaim = async (
    claimData: {
      claimType: 'medical' | 'auto' | 'property' | 'life';
      claimAmount: number;
      claimant: {
        name: string;
        email: string;
        phone: string;
        policyNumber: string;
      };
    },
    files: File[]
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const claim = await ClaimsService.submitClaim(claimData, files);
      refreshClaims();
      return claim;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit claim');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateClaimStatus = (id: string, status: Claim['status'], note?: string) => {
    if (ClaimsService.updateClaimStatus(id, status, note)) {
      refreshClaims();
      return true;
    }
    return false;
  };

  const getProcessingStats = (): ProcessingStats => {
    return ClaimsService.getProcessingStats();
  };

  useEffect(() => {
    refreshClaims();
  }, []);

  return {
    claims,
    loading,
    error,
    submitClaim,
    updateClaimStatus,
    refreshClaims,
    getProcessingStats
  };
}