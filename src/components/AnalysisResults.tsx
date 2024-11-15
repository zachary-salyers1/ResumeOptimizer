import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  Sparkles,
  BarChart3,
  Target,
  Lightbulb,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface Suggestion {
  type: 'missing' | 'improvement' | 'keyword';
  text: string;
  section?: string;
}

interface SkillMatch {
  name: string;
  score: number;
  required: boolean;
}

interface SectionScore {
  name: string;
  score: number;
  icon: React.ReactNode;
}

interface AnalysisResultsProps {
  score: number;
  suggestions: Suggestion[];
  keywords: string[];
  skillMatches: SkillMatch[];
  sectionScores: SectionScore[];
  experienceYears: number;
  educationLevel: string;
  impactMetrics: string[];
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  score, 
  suggestions, 
  keywords,
  skillMatches,
  sectionScores,
  experienceYears,
  educationLevel,
  impactMetrics
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSuggestionIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'missing':
        return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
      case 'improvement':
        return <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />;
      case 'keyword':
        return <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <span className="text-sm text-gray-600">AI Powered</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">Overall Match Score</span>
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${getScoreBackground(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </motion.div>

      {/* Section Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Section Analysis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionScores.map((section, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {section.icon}
                  <span className="font-medium text-gray-700">{section.name}</span>
                </div>
                <span className={`font-semibold ${getScoreColor(section.score)}`}>
                  {section.score}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getScoreBackground(section.score)}`}
                  style={{ width: `${section.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skills Match */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Target className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Skills Match</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillMatches.map((skill, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {skill.name}
                    {skill.required && (
                      <span className="ml-2 text-xs text-red-500">(Required)</span>
                    )}
                  </span>
                  <span className={`text-sm ${getScoreColor(skill.score)}`}>
                    {skill.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${getScoreBackground(skill.score)}`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Impact Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Award className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Impact & Achievements</h3>
        </div>
        <div className="space-y-3">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">{metric}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Improvement Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Lightbulb className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Improvement Suggestions</h3>
        </div>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3"
            >
              {getSuggestionIcon(suggestion.type)}
              <div>
                <span className="text-sm text-gray-600">{suggestion.text}</span>
                {suggestion.section && (
                  <span className="ml-2 text-xs text-indigo-600">
                    ({suggestion.section})
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Skills Found */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Target className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Key Skills Found</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              <ChevronRight className="h-4 w-4 mr-1" />
              {keyword}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};