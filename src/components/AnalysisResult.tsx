import React from 'react';
import { AlertTriangle, CheckCircle, BarChart2, Brain, Hash } from 'lucide-react';

interface AnalysisResultProps {
  result: {
    isFake: boolean;
    confidence: number;
    reasons: string[];
    sentiment: {
      score: number;
      label: string;
      confidence: number;
    };
    metrics: {
      wordCount: number;
      uniqueWords: number;
      avgWordLength: number;
      emotionIntensity: number;
    };
  };
}

const AnalysisResult = ({ result }: AnalysisResultProps) => {
  const getSentimentColor = (score: number) => {
    if (score > 0.3) return 'text-green-600';
    if (score < -0.3) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.7) return 'text-green-600';
    if (confidence > 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-6 p-4 rounded-lg bg-gray-50">
        {result.isFake ? (
          <AlertTriangle className="w-8 h-8 text-red-500" />
        ) : (
          <CheckCircle className="w-8 h-8 text-green-500" />
        )}
        <div>
          <h3 className="text-xl font-semibold">
            {result.isFake ? 'Potentially Fake Review' : 'Likely Authentic Review'}
          </h3>
          <p className={`font-medium ${getConfidenceColor(result.confidence)}`}>
            Analysis Confidence: {(result.confidence * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Sentiment Analysis */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <h4 className="font-medium">Sentiment Analysis</h4>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sentiment Score</span>
              <span className={`font-medium ${getSentimentColor(result.sentiment.score)}`}>
                {result.sentiment.score.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Overall Tone</span>
              <span className="font-medium">{result.sentiment.label}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sentiment Confidence</span>
              <span className={`font-medium ${getConfidenceColor(result.sentiment.confidence)}`}>
                {(result.sentiment.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <h4 className="font-medium">Text Metrics</h4>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Word Count</span>
              <span className="font-medium">{result.metrics.wordCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Unique Words</span>
              <span className="font-medium">{result.metrics.uniqueWords}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Word Length</span>
              <span className="font-medium">{result.metrics.avgWordLength.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Emotion Intensity</span>
              <span className="font-medium">{(result.metrics.emotionIntensity * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div className="mt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Hash className="w-5 h-5 text-indigo-600" />
          <h4 className="font-medium">Key Findings</h4>
        </div>
        <ul className="space-y-2 bg-gray-50 rounded-lg p-4">
          {result.reasons.map((reason, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-indigo-400 mt-1">•</span>
              <span className="text-gray-700">{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResult;