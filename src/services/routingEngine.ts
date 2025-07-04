import { Claim, RoutingDecision } from '../types';

export class RoutingEngine {
  static makeRoutingDecision(claim: Claim): RoutingDecision {
    const { complexityScore, claimAmount, claimType, documents } = claim;

    // Auto-approval criteria
    if (
      complexityScore < 30 &&
      claimAmount < 5000 &&
      documents.length <= 3 &&
      this.hasRequiredDocuments(claim)
    ) {
      return {
        route: 'auto-approve',
        reason: 'Low complexity, meets auto-approval criteria',
        confidence: 0.95,
        estimatedReviewTime: 0
      };
    }

    // Auto-rejection criteria
    if (
      this.hasFraudIndicators(claim) ||
      this.hasMissingCriticalInfo(claim)
    ) {
      return {
        route: 'reject',
        reason: 'Fraud indicators detected or critical information missing',
        confidence: 0.90,
        estimatedReviewTime: 0
      };
    }

    // Manual review routing
    const reviewerAssigned = this.assignReviewer(claim);
    const estimatedTime = this.estimateReviewTime(claim);

    return {
      route: 'manual-review',
      reason: this.getManualReviewReason(claim),
      confidence: 0.85,
      reviewerAssigned,
      estimatedReviewTime: estimatedTime
    };
  }

  private static hasRequiredDocuments(claim: Claim): boolean {
    const requiredDocs = {
      medical: ['medical-report', 'receipt'],
      auto: ['police-report', 'photos'],
      property: ['photos', 'repair-estimate'],
      life: ['death-certificate', 'policy']
    };

    // Simplified check - in real system would validate specific document types
    return claim.documents.length >= 2;
  }

  private static hasFraudIndicators(claim: Claim): boolean {
    const suspiciousIndicators = [
      'fraud',
      'suspicious',
      'inconsistent',
      'disputed'
    ];

    const description = claim.extractedInfo.description?.toLowerCase() || '';
    return suspiciousIndicators.some(indicator => description.includes(indicator));
  }

  private static hasMissingCriticalInfo(claim: Claim): boolean {
    const infoFields = Object.values(claim.extractedInfo).filter(v => v !== undefined).length;
    return infoFields < 2;
  }

  private static assignReviewer(claim: Claim): string {
    const reviewers = {
      medical: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Lisa Rodriguez'],
      auto: ['James Wilson', 'Maria Garcia', 'Robert Taylor'],
      property: ['David Brown', 'Jennifer Davis', 'Christopher Moore'],
      life: ['Patricia Martinez', 'Mark Anderson', 'Laura Thomas']
    };

    const typeReviewers = reviewers[claim.claimType as keyof typeof reviewers] || reviewers.auto;
    return typeReviewers[Math.floor(Math.random() * typeReviewers.length)];
  }

  private static estimateReviewTime(claim: Claim): number {
    const baseTime = 2; // 2 hours base
    const complexityMultiplier = claim.complexityScore / 100;
    const documentMultiplier = Math.min(claim.documents.length * 0.5, 3);
    
    return Math.round(baseTime + (complexityMultiplier * 6) + documentMultiplier);
  }

  private static getManualReviewReason(claim: Claim): string {
    const reasons = [];
    
    if (claim.claimAmount > 10000) reasons.push('High claim amount');
    if (claim.complexityScore > 50) reasons.push('High complexity score');
    if (claim.documents.length > 4) reasons.push('Multiple documents require review');
    if (claim.claimType === 'life' || claim.claimType === 'medical') reasons.push('Requires specialized review');

    return reasons.join(', ') || 'Standard manual review required';
  }
}