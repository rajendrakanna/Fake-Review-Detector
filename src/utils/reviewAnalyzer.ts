import nlp from 'compromise';

interface SentimentResult {
  score: number;
  label: string;
  confidence: number;
}

interface AnalysisResult {
  isFake: boolean;
  confidence: number;
  reasons: string[];
  sentiment: SentimentResult;
  metrics: {
    wordCount: number;
    uniqueWords: number;
    avgWordLength: number;
    emotionIntensity: number;
  };
}

export class ReviewAnalyzer {
  private patterns = {
    excessiveCapitals: /[A-Z]{3,}/g,
    repeatedPunctuation: /[!?.]{2,}/g,
    commonFakeWords: /(amazing|incredible|awesome|fantastic|perfect|best ever)/gi,
    emotionalWords: /(love|hate|terrible|excellent|awful|great|bad|good|worst|best)/gi,
    spamPatterns: /(click here|buy now|discount|offer|limited time)/gi,
    personalPronouns: /(I|me|my|mine|we|our|ours)/gi,
  };

  analyzeReview(text: string): AnalysisResult {
    try {
      const doc = nlp(text);
      
      // Enhanced metrics
      const words = text.split(/\s+/);
      const uniqueWords = new Set(words.map(w => w.toLowerCase()));
      const metrics = {
        wordCount: words.length,
        uniqueWords: uniqueWords.size,
        avgWordLength: words.reduce((sum, word) => sum + word.length, 0) / words.length,
        emotionIntensity: this.calculateEmotionIntensity(text),
      };

      // Advanced sentiment analysis
      const sentiment = this.analyzeSentiment(doc, text);
      
      // Authenticity analysis
      const authenticity = this.analyzeAuthenticity(text, metrics);
      
      return {
        ...authenticity,
        sentiment,
        metrics,
      };
    } catch (error) {
      console.error('Error analyzing review:', error);
      return this.getErrorResult();
    }
  }

  private analyzeSentiment(doc: any, text: string): SentimentResult {
    try {
      const positive = doc.match('#Positive').length;
      const negative = doc.match('#Negative').length;
      const neutral = doc.match('#Neutral').length;
      const total = positive + negative + neutral || 1;
      
      // Calculate weighted sentiment score
      const emotionalIntensity = this.calculateEmotionIntensity(text);
      const baseScore = (positive - negative) / total;
      const weightedScore = baseScore * (1 + emotionalIntensity * 0.5);
      
      // Normalize score to [-1, 1] range
      const normalizedScore = Math.max(-1, Math.min(1, weightedScore));
      
      // Calculate confidence based on sample size and consistency
      const confidence = Math.min(1, (total / 10) * (1 - Math.abs(neutral / total)));
      
      return {
        score: normalizedScore,
        label: this.getSentimentLabel(normalizedScore),
        confidence
      };
    } catch (error) {
      console.error('Error in sentiment analysis:', error);
      return { score: 0, label: 'Neutral', confidence: 0 };
    }
  }

  private analyzeAuthenticity(text: string, metrics: any) {
    const reasons: string[] = [];
    let fakeScore = 0;

    // Check for spam patterns
    if (this.patterns.spamPatterns.test(text)) {
      fakeScore += 0.3;
      reasons.push("Contains promotional or spam-like content");
    }

    // Analyze personal pronoun usage
    const pronounCount = (text.match(this.patterns.personalPronouns) || []).length;
    if (pronounCount === 0 && metrics.wordCount > 30) {
      fakeScore += 0.2;
      reasons.push("Lacks personal perspective");
    }

    // Check vocabulary diversity
    const vocabularyDiversity = metrics.uniqueWords / metrics.wordCount;
    if (vocabularyDiversity < 0.4) {
      fakeScore += 0.15;
      reasons.push("Limited vocabulary diversity");
    }

    // Check emotional consistency
    const emotionalWords = (text.match(this.patterns.emotionalWords) || []).length;
    const emotionalDensity = emotionalWords / metrics.wordCount;
    if (emotionalDensity > 0.3) {
      fakeScore += 0.25;
      reasons.push("Unusually high emotional content");
    }

    return {
      isFake: fakeScore > 0.5,
      confidence: Math.min(1, fakeScore + 0.3),
      reasons
    };
  }

  private calculateEmotionIntensity(text: string): number {
    const emotionalWords = (text.match(this.patterns.emotionalWords) || []).length;
    const exclamations = (text.match(/!/g) || []).length;
    const capitals = (text.match(/[A-Z]{2,}/g) || []).length;
    
    return Math.min(1, (emotionalWords * 0.2 + exclamations * 0.15 + capitals * 0.1) / 10);
  }

  private getSentimentLabel(score: number): string {
    if (score > 0.6) return 'Very Positive';
    if (score > 0.2) return 'Positive';
    if (score < -0.6) return 'Very Negative';
    if (score < -0.2) return 'Negative';
    return 'Neutral';
  }

  private getErrorResult(): AnalysisResult {
    return {
      isFake: false,
      confidence: 0,
      reasons: ['Error processing review'],
      sentiment: { score: 0, label: 'Neutral', confidence: 0 },
      metrics: {
        wordCount: 0,
        uniqueWords: 0,
        avgWordLength: 0,
        emotionIntensity: 0
      }
    };
  }
}