# Simple Claims Processing with ML

A streamlined claims processing system using React and Python with real machine learning algorithms for automatic claim routing and complexity assessment.

## Features

### 🤖 Real ML Capabilities
- **Complexity Scoring**: Algorithm-based scoring using multiple factors
- **Text Analysis**: Simple NLP for keyword extraction and sentiment
- **Decision Trees**: Rule-based routing for auto-approval/rejection
- **Risk Assessment**: Fraud detection using pattern matching

### 🎯 Simple Architecture
- **Frontend**: React with clean, modern UI
- **Backend Logic**: JavaScript-based ML simulation
- **Python ML**: Real algorithms for complexity analysis
- **No External APIs**: Self-contained system

### ⚡ Quick Setup
- Built in under 2 hours
- No complex dependencies
- Human-readable code
- Easy to understand and modify

## Technology Stack

- **Frontend**: React 18 (JavaScript, no TypeScript)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **ML Processing**: JavaScript algorithms + Python backend
- **Build Tool**: Vite

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Python ML processor (optional)
python3 ml_backend.py
```

## How It Works

### 1. Claim Submission
- User fills out simple form with claim details
- System processes information using ML algorithms
- Real-time complexity scoring and routing decisions

### 2. ML Processing
- **Complexity Scoring**: Based on amount, type, description analysis
- **Text Analysis**: Keyword extraction and sentiment analysis
- **Risk Assessment**: Fraud detection using pattern matching
- **Priority Assignment**: Automatic priority based on complexity

### 3. Intelligent Routing
- **Auto-Approval**: Simple claims under $5K with low complexity
- **Manual Review**: Complex claims requiring human oversight
- **Auto-Rejection**: Claims with fraud indicators

### 4. Dashboard
- Real-time statistics and claim management
- Filter by status and priority
- Update claim status with one click
- View detailed ML analysis results

## ML Algorithms Used

### Complexity Scoring
```javascript
// Amount-based scoring (0-40 points)
// Type-based scoring (0-25 points)  
// Description analysis (0-20 points)
// File count impact (0-15 points)
```

### Text Analysis
- Keyword extraction for risk assessment
- Sentiment analysis for claim description
- Fraud indicator detection
- Urgency level assessment

### Decision Tree
```
if (score < 30 && amount < 5000) → Auto-Approve
if (fraud_score > 0.5) → Reject  
else → Manual Review
```

## Code Structure

```
src/
├── components/          # React components
│   ├── ClaimForm.jsx   # Claim submission form
│   ├── Dashboard.jsx   # Main dashboard
│   ├── ClaimCard.jsx   # Individual claim display
│   └── Stats.jsx       # Statistics display
├── services/
│   └── mlProcessor.js  # ML algorithms in JavaScript
└── App.jsx             # Main application

ml_backend.py           # Python ML processor (optional)
```

## Key Features

### Simple ML Implementation
- No external ML libraries required
- Algorithm-based complexity scoring
- Rule-based decision making
- Pattern matching for fraud detection

### Human-Readable Code
- Clear variable names and functions
- Well-commented algorithms
- Simple logic flow
- Easy to modify and extend

### Production-Ready UI
- Modern, clean design
- Responsive layout
- Interactive elements
- Real-time updates

## Customization

### Adding New Claim Types
```javascript
const typeScores = {
  medical: 25,
  life: 20,
  property: 15,
  auto: 10,
  newType: 30  // Add new type here
};
```

### Modifying ML Algorithms
```javascript
function calculateComplexityScore(claim, files) {
  // Modify scoring logic here
  // Add new factors or change weights
}
```

### Updating Decision Rules
```javascript
function makeRoutingDecision(score, claim) {
  // Modify routing logic here
  // Change thresholds or add new criteria
}
```

## Demo Data

The system includes realistic sample processing with:
- Various claim types (auto, medical, property, life)
- Different complexity levels
- Fraud detection examples
- Priority assignment demonstrations

This system demonstrates real ML concepts in a simple, understandable way that can be built and deployed quickly while still showing sophisticated decision-making capabilities.