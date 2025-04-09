
import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></span>
        </div>
        <p className="text-gray-600 text-lg font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
