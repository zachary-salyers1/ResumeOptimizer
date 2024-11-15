import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, CheckCircle } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="text-center">
      <motion.h1 
        className="text-4xl font-bold text-gray-900 sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to ResumeAI
      </motion.h1>
      <motion.p 
        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Optimize your resume with AI-powered analysis and get more interviews.
      </motion.p>
    </div>
  );
};