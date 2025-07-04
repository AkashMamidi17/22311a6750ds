import { Claim, ExtractedInfo, Document } from '../types';

export class ComplexityAnalyzer {
  static calculateComplexityScore(
    claimAmount: number,
    claimType: string,
    documents: Document[],
    extractedInfo: ExtractedInfo
  ): number {
    let score = 0;

    // Amount-based complexity
    if (claimAmount > 100000) score += 30;
    else if (claimAmount > 50000) score += 20;
    else if (claimAmount > 10000) score += 10;
    else score += 5;

    // Type-based complexity
    const typeScores = {
      medical: 25,
      life: 30,
      property: 20,
      auto: 15
    };
    score += typeScores[claimType as keyof typeof typeScores] || 15;

    // Document-based complexity
    score += Math.min(documents.length * 3, 15);
    
    // Low confidence in extraction
    const avgConfidence = documents.reduce((sum, doc) => sum + (doc.confidence || 0), 0) / documents.length;
    if (avgConfidence < 0.8) score += 15;

    // Missing information penalty
    const infoFields = Object.values(extractedInfo).filter(v => v !== undefined).length;
    if (infoFields < 3) score += 10;

    // Special cases
    if (extractedInfo.medicalInfo?.diagnosis?.includes('surgery')) score += 20;
    if (extractedInfo.description?.includes('fraud') || extractedInfo.description?.includes('disputed')) score += 25;

    return Math.min(score, 100);
  }

  static getPriorityLevel(complexityScore: number): 'low' | 'medium' | 'high' | 'urgent' {
    if (complexityScore >= 80) return 'urgent';
    if (complexityScore >= 60) return 'high';
    if (complexityScore >= 40) return 'medium';
    return 'low';
  }

  static getComplexityFactors(
    claimAmount: number,
    claimType: string,
    documents: Document[],
    extractedInfo: ExtractedInfo
  ): string[] {
    const factors: string[] = [];

    if (claimAmount > 100000) factors.push('High claim amount (>$100K)');
    if (claimType === 'life' || claimType === 'medical') factors.push('High-risk claim type');
    if (documents.length > 5) factors.push('Multiple documents submitted');
    
    const avgConfidence = documents.reduce((sum, doc) => sum + (doc.confidence || 0), 0) / documents.length;
    if (avgConfidence < 0.8) factors.push('Low document extraction confidence');

    const infoFields = Object.values(extractedInfo).filter(v => v !== undefined).length;
    if (infoFields < 3) factors.push('Insufficient extracted information');

    if (extractedInfo.medicalInfo?.diagnosis?.includes('surgery')) factors.push('Surgical procedure involved');
    if (extractedInfo.description?.includes('fraud')) factors.push('Potential fraud indicators');

    return factors;
  }
}