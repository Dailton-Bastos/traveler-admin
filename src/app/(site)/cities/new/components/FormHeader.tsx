import React from 'react';

type Props = {
  title: string;
  currentStep: '01' | '02';
};

export const FormHeader = ({ title, currentStep }: Props) => {
  return (
    <div
      className="
      bg-gradient-to-r 
      from-[#F5FFF5] 
      from-0% 
      to-white-alpha-50 
      to-100% 
      py-10 
      pl-16 
      border-b
    "
    >
      <div className="flex items-center justify-start gap-x-10">
        <div
          className="
            rounded-xl 
            bg-green-500 
            w-16 
            h-16 
            flex 
            items-center 
            justify-center
          "
        >
          <span className="text-white text-2xl font-barlow font-semibold">
            {currentStep}
          </span>
        </div>

        <h1 className="text-4xl font-semibold font-barlow text-[#51B853]">
          {title}
        </h1>
      </div>
    </div>
  );
};
