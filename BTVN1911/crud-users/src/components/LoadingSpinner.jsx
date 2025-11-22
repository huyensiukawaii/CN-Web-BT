import React from 'react';

export default function LoadingSpinner({ show }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-4 border-sky-500 border-t-transparent"></div>
    </div>
  );
}