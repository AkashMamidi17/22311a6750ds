# Simple Claims Processing with ML

A claims processing system using React and Python with real machine learning algorithms for automatic claim routing and complexity assessment.

# Install dependencies
npm install

# Start development server
npm run dev

# Run Python ML processor (optional)
python3 ml_backend.py

## How Application Works

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


This system demonstrates real ML concepts in a simple, understandable way that can be built and deployed quickly while still showing sophisticated decision-making capabilities.
