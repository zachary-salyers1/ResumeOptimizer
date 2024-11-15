import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileSearch, 
  FileText, 
  Wand2,
  History,
  LayoutTemplate,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: FileSearch,
    title: 'ATS Analysis',
    description: 'Get instant feedback on how well your resume matches ATS requirements'
  },
  {
    icon: Wand2,
    title: 'AI Optimization',
    description: 'Receive smart suggestions to improve your resume content and structure'
  },
  {
    icon: History,
    title: 'Version Control',
    description: 'Maintain multiple versions of your resume for different job applications'
  },
  {
    icon: LayoutTemplate,
    title: 'Professional Templates',
    description: 'Choose from a variety of ATS-friendly professional templates'
  },
  {
    icon: FileText,
    title: 'Format Support',
    description: 'Upload your resume in PDF, DOCX, or plain text formats'
  },
  {
    icon: Shield,
    title: 'Data Security',
    description: 'Your data is encrypted and securely stored with enterprise-grade protection'
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful Features for Your Success
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to create the perfect resume for your dream job
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-4 left-6">
                <span className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-xl shadow-lg">
                  <feature.icon className="h-6 w-6 text-white" />
                </span>
              </div>
              <div className="pt-8">
                <h3 className="text-xl font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};