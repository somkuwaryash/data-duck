import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated logo container */}
      <div className="relative mb-8">
        {/* Duck icon using SVG */}
        <svg
          className="w-24 h-24 text-primary-400 animate-pulse"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 16V7.5C21 7.22386 20.7761 7 20.5 7H19.5C19.2239 7 19 7.22386 19 7.5V9H5V7.5C5 7.22386 4.77614 7 4.5 7H3.5C3.22386 7 3 7.22386 3 7.5V16C3 16.5523 3.44772 17 4 17H20C20.5523 17 21 16.5523 21 16Z"
            className="fill-current"
          />
          <path
            d="M8 9V7C8 5.34315 9.34315 4 11 4H13C14.6569 4 16 5.34315 16 7V9"
            className="stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Glowing circle behind the logo */}
        <div className="absolute inset-0 -z-10 animate-pulse">
          <div className="absolute inset-0 blur-xl bg-primary-500/20 rounded-full" />
        </div>
      </div>

      {/* Text content */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
          DataDuck
        </h1>
        <div className="relative">
          <p className="text-gray-400 text-lg">Loading Python environment</p>
          {/* Animated dots */}
          <span className="inline-flex ml-1">
            <span className="animate-bounce delay-0 text-primary-400">.</span>
            <span className="animate-bounce delay-100 text-primary-400">.</span>
            <span className="animate-bounce delay-200 text-primary-400">.</span>
          </span>
        </div>
      </div>

      {/* Loading bar */}
      <div className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-loader rounded-full" />
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes loader {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 50%;
          }
          100% {
            width: 100%;
            transform: translateX(100%);
          }
        }
        .animate-loader {
          animation: loader 2s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.2s;
        }
        .delay-200 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;