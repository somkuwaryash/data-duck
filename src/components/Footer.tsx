// src/components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} DataDuck. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;