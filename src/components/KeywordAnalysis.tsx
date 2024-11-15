import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertTriangle, CheckCircle2, BarChart2 } from 'lucide-react';

interface KeywordMatch {
  keyword: string;
  frequency: number;
  context: string;
  importance: 'critical' | 'recommended' | 'optional';
  found: boolean;
  variations?: string[];
}

interface KeywordAnalysisProps {
  keywords: KeywordMatch[];
  overallScore: number;
}

export const KeywordAnalysis: React.FC<KeywordAnalysisProps> = ({ keywords, overallScore }) => {
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-600';
      case 'recommended': return 'text-yellow-600';
      case 'optional': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getImportanceBg = (importance: string) => {
    switch (importance) {
      case 'critical': return 'bg-red-50';
      case 'recommended': return 'bg-yellow-50';
      case 'optional': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">ATS Keyword Analysis</h3>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-5 w-5 text-indigo-600" />
          <span className="text-sm font-medium text-gray-600">
            Match Score: {overallScore}%
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Keyword Categories */}
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Critical</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Recommended</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Optional</span>
          </div>
        </div>

        {/* Keywords List */}
        <div className="space-y-4">
          {keywords.map((keyword, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-lg ${getImportanceBg(keyword.importance)}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    {keyword.found ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-medium text-gray-900">{keyword.keyword}</span>
                    <span className={`text-sm ${getImportanceColor(keyword.importance)}`}>
                      ({keyword.importance})
                    </span>
                  </div>
                  
                  {keyword.variations && keyword.variations.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Variations: </span>
                      {keyword.variations.join(', ')}
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Context: </span>
                    {keyword.context}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">
                    {keyword.frequency}
                  </div>
                  <div className="text-xs text-gray-500">occurrences</div>
                </div>
              </div>

              {!keyword.found && (
                <div className="mt-3 text-sm text-red-600 flex items-center space-x-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Missing keyword - consider adding to your resume</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};