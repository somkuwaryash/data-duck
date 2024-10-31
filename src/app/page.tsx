import React from 'react';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  // In a real application, you would check for user authentication here
  const isAuthenticated = true;

  if (isAuthenticated) {
    return <Dashboard />;
  }

  // If not authenticated, you could render a landing page or redirect to login
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to DataDuck</h1>
      <p className="mb-4">Sign in to access your AI-powered data analysis dashboard.</p>
      {/* Add your sign-in form or button here */}
    </div>
  );
}