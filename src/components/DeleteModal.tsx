'use client';

import React from 'react';
import { Modal } from './Modal';
import { RotatingLines } from 'react-loader-spinner';

interface DeleteModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  handleConfirm: () => void;
}

export const DeleteModal = ({
  title,
  description,
  isOpen,
  isLoading,
  onClose,
  handleConfirm,
}: DeleteModalProps) => {
  const handleChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Modal isOpen={isOpen} onChange={handleChange} className="bg-[#120E0E]">
      <div className="relative h-[508px] w-[457px] flex items-center flex-col">
        <svg
          width="380"
          height="380"
          viewBox="0 0 380 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.02"
            d="M380 190C380 294.933 294.933 380 190 380C85.0778 380 0 294.933 0 190C0 85.0778 85.0778 0 190 0C294.933 0 380 85.0778 380 190Z"
            fill="#DE3838"
          />
          <path
            opacity="0.04"
            d="M330 190C330 267.319 267.319 330 190 330C112.689 330 50 267.319 50 190C50 112.689 112.689 50 190 50C267.319 50 330 112.689 330 190Z"
            fill="#DE3838"
          />
          <path
            opacity="0.04"
            d="M280 190C280 239.705 239.705 280 190 280C140.3 280 100 239.705 100 190C100 140.3 140.3 100 190 100C239.705 100 280 140.3 280 190Z"
            fill="#DE3838"
          />
          <path
            d="M230 190C230 212.091 212.091 230 190 230C167.911 230 150 212.091 150 190C150 167.911 167.911 150 190 150C212.091 150 230 167.911 230 190Z"
            fill="#DE3838"
          />
          <path
            d="M175 180H178.333H205"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M183.333 180V176.667C183.333 175.783 183.684 174.935 184.309 174.31C184.934 173.685 185.782 173.333 186.666 173.333H193.333C194.217 173.333 195.065 173.685 195.69 174.31C196.315 174.935 196.666 175.783 196.666 176.667V180M201.666 180V203.333C201.666 204.217 201.315 205.065 200.69 205.69C200.065 206.316 199.217 206.667 198.333 206.667H181.666C180.782 206.667 179.934 206.316 179.309 205.69C178.684 205.065 178.333 204.217 178.333 203.333V180H201.666Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="absolute bottom-1.5">
          <h3 className="text-[54px] text-white font-bold font-heebo mb-6 text-center">
            {title}
          </h3>

          <p className="text-2xl text-gray-200 text-center">{description}</p>

          <div className="flex items-center justify-center gap-x-2 mt-10">
            <button
              type="button"
              className="
              flex
              items-center
              justify-center
              rounded-lg
              bg-orange-600
              text-white
              font-semibold
              w-[94px]
              h-[48px]
              hover:bg-orange-700
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
              disabled={isLoading}
              onClick={() => onClose()}
            >
              Não
            </button>

            <button
              type="button"
              className="
              flex
              items-center
              justify-center
              gap-4
              rounded-lg
              bg-green-500
              text-white
              font-semibold
              w-[94px]
              h-[48px]
              hover:bg-green-600
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
              disabled={isLoading}
              onClick={handleConfirm}
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="#fff"
                  strokeWidth="3"
                  animationDuration="0.95"
                  width="30"
                  visible={isLoading}
                />
              ) : (
                'Sim'
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
