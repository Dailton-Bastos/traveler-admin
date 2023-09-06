import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const mdParser = new MarkdownIt();

type HtmlType = string | React.ReactElement;

type MdEditorType = {
  id?: string;
  defaultValue?: string;
  value?: string;
  renderHTML?: (
    text: string
  ) => HtmlType | Promise<HtmlType> | (() => HtmlType);
  style?: React.CSSProperties;
  autoFocus?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  config?: any;
  plugins?: string[];
  onChange?: (
    data: {
      text: string;
      html: string;
    },
    event?: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onScroll?: (
    e: React.UIEvent<HTMLTextAreaElement | HTMLDivElement>,
    type: 'md' | 'html'
  ) => void;
};

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
    <div className="w-full">
      <span className="text-gray-500 text-sm mb-2 block">{label}</span>

      <React.Suspense fallback={<RotatingLines />}>
        <MdEditor
          {...props}
          value={truncateValue}
          className="h-[360px] rounded-lg overflow-hidden"
          renderHTML={(text) => mdParser.render(text)}
        />
      </React.Suspense>

      <span className="text-[#A0ACB2] text-xs mt-2 block text-right">
        {value?.length} / de {maxlength} caracteres
      </span>
    </div>
  );
};
