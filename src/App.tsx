import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Shield, AlertCircle, ThumbsUp, ThumbsDown, Bot } from 'lucide-react';
import { ReviewAnalyzer } from './utils/reviewAnalyzer';
import Header from './components/Header';
import ReviewForm from './components/ReviewForm';
import AnalysisResult from './components/AnalysisResult';
import InfoCard from './components/InfoCard';

function App() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    const analyzer = new ReviewAnalyzer();
    const analysis = analyzer.analyzeReview(review);
    setResult(analysis);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <InfoCard
            icon={Shield}
            title="AI-Powered Analysis"
            description="Our advanced algorithm analyzes linguistic patterns and sentiment to detect potentially fake reviews."
          />
          <InfoCard
            icon={Bot}
            title="Pattern Recognition"
            description="We identify common patterns found in fake reviews through machine learning techniques."
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <ReviewForm 
            review={review}
            setReview={setReview}
            onAnalyze={handleAnalyze}
          />
        </div>

        {result && (
          <AnalysisResult result={result} />
        )}

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-gray-600">Analyzes sentiment and emotional consistency</p>
            </div>
            <div className="flex items-start space-x-3">
              <ThumbsUp className="w-6 h-6 text-green-600 flex-shrink-0" />
              <p className="text-sm text-gray-600">Identifies authentic review patterns</p>
            </div>
            <div className="flex items-start space-x-3">
              <ThumbsDown className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-sm text-gray-600">Flags suspicious language and patterns</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;