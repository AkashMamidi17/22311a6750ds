import { Claim, Document, ProcessingStats } from '../types';
import { DocumentProcessor } from './documentProcessor';
import { ComplexityAnalyzer } from './complexityAnalyzer';
import { RoutingEngine } from './routingEngine';

export class ClaimsService {
  private static claims: Claim[] = [];
  private static nextClaimNumber = 1000;

  static async submitClaim(
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
  ): Promise<Claim> {
    const claimId = this.generateClaimId();
    const claimNumber = `CLM-${this.nextClaimNumber++}`;

    // Process documents
    const documents: Document[] = [];
    for (const file of files) {
      const document = await DocumentProcessor.processDocument(file);
      documents.push(document);
    }

    // Extract information
    const extractedInfo = DocumentProcessor.extractInformation(documents);

    // Calculate complexity
    const complexityScore = ComplexityAnalyzer.calculateComplexityScore(
      claimData.claimAmount,
      claimData.claimType,
      documents,
      extractedInfo
    );

    // Create claim
    const claim: Claim = {
      id: claimId,
      claimNumber,
      submittedAt: new Date(),
      status: 'processing',
      priority: ComplexityAnalyzer.getPriorityLevel(complexityScore),
      claimType: claimData.claimType,
      claimAmount: claimData.claimAmount,
      claimant: claimData.claimant,
      documents,
      extractedInfo,
      complexityScore,
      routingDecision: { route: 'manual-review', reason: '', confidence: 0 },
      processingTime: 0,
      notes: []
    };

    // Make routing decision
    const startTime = Date.now();
    claim.routingDecision = RoutingEngine.makeRoutingDecision(claim);
    claim.processingTime = Date.now() - startTime;

    // Update status based on routing
    if (claim.routingDecision.route === 'auto-approve') {
      claim.status = 'auto-approved';
    } else if (claim.routingDecision.route === 'reject') {
      claim.status = 'rejected';
    } else {
      claim.status = 'manual-review';
    }

    this.claims.push(claim);
    return claim;
  }

  static getClaim(id: string): Claim | undefined {
    return this.claims.find(claim => claim.id === id);
  }

  static getAllClaims(): Claim[] {
    return [...this.claims].sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  static getClaimsByStatus(status: Claim['status']): Claim[] {
    return this.claims.filter(claim => claim.status === status);
  }

  static getClaimsByPriority(priority: Claim['priority']): Claim[] {
    return this.claims.filter(claim => claim.priority === priority);
  }

  static updateClaimStatus(id: string, status: Claim['status'], note?: string): boolean {
    const claim = this.getClaim(id);
    if (!claim) return false;

    claim.status = status;
    if (note) {
      claim.notes.push(`${new Date().toISOString()}: ${note}`);
    }
    return true;
  }

  static getProcessingStats(): ProcessingStats {
    const total = this.claims.length;
    const autoApproved = this.claims.filter(c => c.status === 'auto-approved').length;
    const manualReview = this.claims.filter(c => c.status === 'manual-review').length;
    const rejected = this.claims.filter(c => c.status === 'rejected').length;
    
    const avgProcessingTime = total > 0 
      ? this.claims.reduce((sum, claim) => sum + claim.processingTime, 0) / total
      : 0;

    const complexityDistribution = {
      low: this.claims.filter(c => c.priority === 'low').length,
      medium: this.claims.filter(c => c.priority === 'medium').length,
      high: this.claims.filter(c => c.priority === 'high').length,
      urgent: this.claims.filter(c => c.priority === 'urgent').length
    };

    return {
      totalClaims: total,
      autoApproved,
      manualReview,
      rejected,
      avgProcessingTime,
      complexityDistribution
    };
  }

  private static generateClaimId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}