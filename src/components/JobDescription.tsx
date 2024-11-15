import React from 'react';
import { motion } from 'framer-motion';
import { BriefcaseIcon, SearchIcon } from 'lucide-react';

interface JobDescriptionProps {
  onSubmit: (description: string) => void;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({ onSubmit }) => {
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(description);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="flex items-center space-x-2 mb-4">
        <BriefcaseIcon className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Job Description</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        
        <button
          type="submit"
          className="mt-4 w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <SearchIcon className="h-4 w-4" />
          <span>Analyze Match</span>
        </button>
      </form>
    </motion.div>
  );
};