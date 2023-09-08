import React from 'react';

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="w-full py-2">
      <span className="text-orange-600 text-sm text-left">{message}</span>
    </div>
  );
};
