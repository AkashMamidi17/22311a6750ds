#!/usr/bin/env python3
"""
Simple ML backend for claims processing
This would typically run as a separate service
"""

import json
import re
from datetime import datetime
from typing import Dict, List, Any

class ClaimsMLProcessor:
    def __init__(self):
        # Simple keyword-based classification
        self.risk_keywords = {
            'high': ['surgery', 'death', 'fire', 'flood', 'accident', 'injury'],
            'medium': ['damage', 'repair', 'medical', 'treatment'],
            'low': ['minor', 'small', 'routine', 'check']
        }
        
        self.fraud_indicators = ['fake', 'fraud', 'false', 'lie', 'cheat']
    
    def process_claim(self, claim_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process claim using simple ML algorithms"""
        
        # Extract features
        features = self.extract_features(claim_data)
        
        # Calculate complexity score
        complexity_score = self.calculate_complexity(features)
        
        # Determine priority
        priority = self.get_priority(complexity_score)
        
        # Make routing decision
        routing = self.route_claim(complexity_score, features)
        
        return {
            'complexity_score': complexity_score,
            'priority': priority,
            'routing_decision': routing,
            'features': features,
            'processed_at': datetime.now().isoformat()
        }
    
    def extract_features(self, claim_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract features from claim data"""
        description = claim_data.get('description', '').lower()
        
        features = {
            'amount': float(claim_data.get('amount', 0)),
            'claim_type': claim_data.get('type', 'unknown'),
            'description_length': len(description),
            'word_count': len(description.split()),
            'risk_level': self.assess_risk_level(description),
            'fraud_score': self.calculate_fraud_score(description),
            'urgency_indicators': self.count_urgency_words(description)
        }
        
        return features
    
    def assess_risk_level(self, description: str) -> str:
        """Assess risk level based on keywords"""
        for level, keywords in self.risk_keywords.items():
            if any(keyword in description for keyword in keywords):
                return level
        return 'low'
    
    def calculate_fraud_score(self, description: str) -> float:
        """Calculate fraud probability (0-1)"""
        fraud_count = sum(1 for indicator in self.fraud_indicators 
                         if indicator in description)
        return min(fraud_count * 0.3, 1.0)
    
    def count_urgency_words(self, description: str) -> int:
        """Count urgency indicators"""
        urgency_words = ['urgent', 'emergency', 'immediate', 'asap', 'critical']
        return sum(1 for word in urgency_words if word in description)
    
    def calculate_complexity(self, features: Dict[str, Any]) -> int:
        """Calculate complexity score (0-100)"""
        score = 0
        
        # Amount-based scoring
        amount = features['amount']
        if amount > 100000:
            score += 40
        elif amount > 50000:
            score += 30
        elif amount > 10000:
            score += 20
        else:
            score += 10
        
        # Type-based scoring
        type_scores = {
            'medical': 25,
            'life': 30,
            'property': 20,
            'auto': 15
        }
        score += type_scores.get(features['claim_type'], 15)
        
        # Risk level scoring
        risk_scores = {'high': 20, 'medium': 10, 'low': 5}
        score += risk_scores.get(features['risk_level'], 5)
        
        # Fraud score impact
        score += int(features['fraud_score'] * 15)
        
        # Urgency impact
        score += features['urgency_indicators'] * 5
        
        return min(score, 100)
    
    def get_priority(self, complexity_score: int) -> str:
        """Determine priority based on complexity"""
        if complexity_score >= 80:
            return 'high'
        elif complexity_score >= 50:
            return 'medium'
        else:
            return 'low'
    
    def route_claim(self, complexity_score: int, features: Dict[str, Any]) -> Dict[str, Any]:
        """Make routing decision"""
        
        # Auto-approval criteria
        if (complexity_score < 30 and 
            features['amount'] < 5000 and 
            features['fraud_score'] < 0.1):
            return {
                'route': 'auto_approve',
                'reason': 'Low complexity, meets auto-approval criteria',
                'confidence': 0.95
            }
        
        # Rejection criteria
        if features['fraud_score'] > 0.5:
            return {
                'route': 'reject',
                'reason': 'High fraud probability detected',
                'confidence': 0.90
            }
        
        # Manual review
        return {
            'route': 'manual_review',
            'reason': f"Complexity score {complexity_score} requires human review",
            'confidence': 0.85
        }

# Example usage
if __name__ == "__main__":
    processor = ClaimsMLProcessor()
    
    # Sample claim data
    sample_claim = {
        'type': 'auto',
        'amount': '15000',
        'description': 'Car accident on highway, minor injuries, vehicle damage'
    }
    
    result = processor.process_claim(sample_claim)
    print(json.dumps(result, indent=2))