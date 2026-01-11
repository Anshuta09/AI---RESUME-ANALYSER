
export interface ResumeAnalysis {
  overallScore: number;
  atsCompatibility: number;
  keywordMatch: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  formattingScore: number;
  formattingSuggestions: string[];
  impactPhrases: { original: string; improved: string }[];
  suggestedSummary: string;
  skillGaps: { skill: string; importance: number }[];
  marketInsights: {
    trends: string[];
    salaryRange: string;
    growthOutlook: string;
  };
  sources?: { title: string; url: string }[];
}

export interface AnalysisState {
  isAnalyzing: boolean;
  results: ResumeAnalysis | null;
  error: string | null;
}
