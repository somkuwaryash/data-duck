import React from 'react';
import FeatureCard from './FeatureCard';
import { features } from '../constants/features';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-5xl font-bold mb-8 text-primary-600 dark:text-primary-400">Welcome to DataDuck</h1>
      <p className="text-xl mb-12 text-center max-w-2xl text-gray-700 dark:text-gray-300">
        Explore your data with the power of AI. Upload, analyze, and visualize your datasets using natural language queries.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={<feature.icon className="w-8 h-8" />}
            link={feature.link}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;