import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  History, 
  Download,
  Settings,
  BarChart2
} from 'lucide-react';
import { ResumeUpload } from './ResumeUpload';
import { ResumeAnalyzer } from './ResumeAnalyzer';
import { Hero } from './Hero';

type Feature = 'upload' | 'analyze' | 'templates' | 'history' | 'settings';

const features = [
  {
    id: 'upload',
    name: 'Upload Resume',
    description: 'Upload your resume in PDF, DOCX, or TXT format',
    icon: FileText,
    color: 'bg-blue-500'
  },
  {
    id: 'analyze',
    name: 'ATS Analysis',
    description: 'Check how well your resume matches job requirements',
    icon: Search,
    color: 'bg-green-500'
  },
  {
    id: 'templates',
    name: 'Templates',
    description: 'Choose from professional ATS-friendly templates',
    icon: Download,
    color: 'bg-purple-500'
  },
  {
    id: 'history',
    name: 'History',
    description: 'View and manage your previous analyses',
    icon: History,
    color: 'bg-yellow-500'
  },
  {
    id: 'settings',
    name: 'Settings',
    description: 'Customize your resume optimization preferences',
    icon: Settings,
    color: 'bg-gray-500'
  }
];

export const Dashboard = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFeatureSelect = (feature: Feature) => {
    setSelectedFeature(feature);
  };

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case 'upload':
        return <ResumeUpload onFileUpload={setUploadedFile} />;
      case 'analyze':
        return uploadedFile ? (
          <ResumeAnalyzer file={uploadedFile} />
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-600">Please upload a resume first</p>
            <button 
              onClick={() => setSelectedFeature('upload')}
              className="mt-4 btn-primary"
            >
              Upload Resume
            </button>
          </div>
        );
      // Add other feature components here
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!selectedFeature ? (
        <>
          <Hero />
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              What would you like to do?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <motion.button
                  key={feature.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFeatureSelect(feature.id as Feature)}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {features.find(f => f.id === selectedFeature)?.name}
            </h2>
            <button
              onClick={() => setSelectedFeature(null)}
              className="btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderFeatureContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};