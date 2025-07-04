// Simple ML-like processing using basic algorithms
// In production, this would connect to actual ML models

export async function processClaimWithML(formData, files) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  const claim = {
    id: generateId(),
    claimNumber: `CLM-${Date.now()}`,
    submittedAt: new Date(),
    ...formData,
    amount: parseFloat(formData.amount)
  };

  // ML-like complexity scoring
  const complexityScore = calculateComplexityScore(claim, files);
  const priority = getPriority(complexityScore);
  const routing = makeRoutingDecision(complexityScore, claim);

  return {
    ...claim,
    complexityScore,
    priority,
    status: routing.status,
    routingReason: routing.reason,
    confidence: routing.confidence
  };
}

function calculateComplexityScore(claim, files) {
  let score = 0;

  // Amount-based scoring (0-40 points)
  if (claim.amount > 100000) score += 40;
  else if (claim.amount > 50000) score += 30;
  else if (claim.amount > 10000) score += 20;
  else score += 10;

  // Type-based scoring (0-25 points)
  const typeScores = {
    medical: 25,
    life: 20,
    property: 15,
    auto: 10
  };
  score += typeScores[claim.type] || 10;

  // Description complexity (0-20 points)
  const description = claim.description.toLowerCase();
  const complexWords = ['surgery', 'accident', 'injury', 'damage', 'loss', 'death'];
  const wordCount = complexWords.filter(word => description.includes(word)).length;
  score += Math.min(wordCount * 4, 20);

  // File count (0-15 points)
  score += Math.min(files.length * 3, 15);

  return Math.min(score, 100);
}

function getPriority(score) {
  if (score >= 80) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

function makeRoutingDecision(score, claim) {
  // Simple decision tree
  if (score < 30 && claim.amount < 5000) {
    return {
      status: 'auto-approved',
      reason: 'Low complexity, meets auto-approval criteria',
      confidence: 0.95
    };
  }

  if (score > 80 || claim.amount > 100000) {
    return {
      status: 'manual-review',
      reason: 'High complexity requires human review',
      confidence: 0.90
    };
  }

  // Check for rejection criteria
  const description = claim.description.toLowerCase();
  if (description.includes('fraud') || description.includes('fake')) {
    return {
      status: 'rejected',
      reason: 'Potential fraud detected',
      confidence: 0.85
    };
  }

  return {
    status: 'manual-review',
    reason: 'Standard review required',
    confidence: 0.80
  };
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Text analysis functions (simplified NLP)
export function analyzeText(text) {
  const words = text.toLowerCase().split(' ');
  const sentiment = calculateSentiment(words);
  const keywords = extractKeywords(words);
  
  return { sentiment, keywords };
}

function calculateSentiment(words) {
  const positiveWords = ['good', 'excellent', 'satisfied', 'happy', 'great'];
  const negativeWords = ['bad', 'terrible', 'angry', 'frustrated', 'awful'];
  
  let score = 0;
  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });
  
  return score;
}

function extractKeywords(words) {
  const importantWords = ['accident', 'injury', 'damage', 'medical', 'surgery', 'vehicle'];
  return words.filter(word => importantWords.includes(word));
}