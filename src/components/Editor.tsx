import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import type { MdEditorType } from '~/@types/types';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const mdParser = new MarkdownIt();

type Props = MdEditorType & {
  label?: string;
  maxlength?: number;
};

export const TextEditor = ({
  label,
  maxlength = 320,
  value,
  ...props
}: Props) => {
  const truncateValue = value?.slice(0, maxlength);

  return (
    <div className="w-full relative">
      <span className="text-gray-500 text-sm mb-2 block">{label}</span>

      <React.Suspense fallback={<RotatingLines />}>
        <MdEditor
          {...props}
          value={truncateValue}
          className="h-[360px] rounded-lg overflow-hidden"
          renderHTML={(text) => mdParser.render(text)}
        />
      </React.Suspense>

      <span
        className="
        text-gray-200
        text-sm
        block
        absolute
        right-0
        mt-2
        "
      >
        {value?.length} / de {maxlength} caracteres
      </span>
    </div>
  );
};
