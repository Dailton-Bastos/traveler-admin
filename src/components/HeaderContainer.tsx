import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

export const HeaderContainer = ({ children }: HeaderProps) => {
  return (
    <div
      className="
        flex
        items-center
        bg-white
        shadow
        h-24
        w-full
        px-5
      "
    >
      <div className="w-full max-w-[1120px] mx-auto">{children}</div>
    </div>
  );
};
