import React from 'react';

export const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-lg w-20">
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);