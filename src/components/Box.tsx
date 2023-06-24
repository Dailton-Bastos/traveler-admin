import React from 'react';

interface BoxProps {
  children: React.ReactNode;
}

export const Box = ({ children }: BoxProps) => {
  return <div className="h-fit w-full">{children}</div>;
};
