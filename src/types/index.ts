export interface Claim {
  id: string;
  claimNumber: string;
  submittedAt: Date;
  status: 'submitted' | 'processing' | 'auto-approved' | 'manual-review' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  claimType: 'medical' | 'auto' | 'property' | 'life';
  claimAmount: number;
  claimant: {
    name: string;
    email: string;
    phone: string;
    policyNumber: string;
  };
  documents: Document[];
  extractedInfo: ExtractedInfo;
  complexityScore: number;
  routingDecision: RoutingDecision;
  processingTime: number;
  notes: string[];
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'text';
  size: number;
  uploadedAt: Date;
  processed: boolean;
  extractedText?: string;
  confidence?: number;
}

export interface ExtractedInfo {
  incidentDate?: string;
  location?: string;
  description?: string;
  damages?: string[];
  witnesses?: string[];
  medicalInfo?: {
    diagnosis?: string;
    provider?: string;
    treatmentDate?: string;
  };
  vehicleInfo?: {
    make?: string;
    model?: string;
    year?: number;
    vin?: string;
  };
}

export interface RoutingDecision {
  route: 'auto-approve' | 'manual-review' | 'reject';
  reason: string;
  confidence: number;
  reviewerAssigned?: string;
  estimatedReviewTime?: number;
}

export interface ProcessingStats {
  totalClaims: number;
  autoApproved: number;
  manualReview: number;
  rejected: number;
  avgProcessingTime: number;
  complexityDistribution: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
}