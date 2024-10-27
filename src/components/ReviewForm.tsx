import React from 'react';
import { Search } from 'lucide-react';

interface ReviewFormProps {
  review: string;
  setReview: (review: string) => void;
  onAnalyze: () => void;
}

const ReviewForm = ({ review, setReview, onAnalyze }: ReviewFormProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Analyze Review</h2>
      <textarea
        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Paste the review text here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        onClick={onAnalyze}
        disabled={!review.trim()}
        className="mt-4 flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
      >
        <Search className="w-4 h-4" />
        <span>Analyze Review</span>
      </button>
    </div>
  );
};

export default ReviewForm;