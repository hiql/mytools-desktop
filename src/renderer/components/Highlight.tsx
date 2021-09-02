import React from 'react';
import highlight from 'highlight.js';

interface Props {
  language: string;
  children: HTMLElement | string;
}

export default function Highlight({ language, children }: Props) {
  const codeRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    setTimeout(() => {
      highlight.highlightElement(codeRef.current as HTMLElement);
    }, 200);
  }, [children]);

  return (
    <>
      <pre>
        <code
          className={language}
          style={{ overflow: 'unset', backgroundColor: 'transparent' }}
          ref={codeRef}
        >
          {children}
        </code>
      </pre>
    </>
  );
}
