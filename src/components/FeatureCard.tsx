
import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, link }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4 text-primary-500 dark:text-primary-400">
        {icon}
        <h2 className="text-2xl font-semibold ml-4">{title}</h2>
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{description}</p>
      <Link href={link} className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300">
        Get Started
      </Link>
    </div>
  );
};

export default FeatureCard;